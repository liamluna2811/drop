'use strict';

(async () => {
  const { config, escapeHtml: esc } = VL;
  const mapSlug = VL.param('map');
  const $ = sel => document.querySelector(sel);

  const viewer = $('#viewer');
  const layer = $('#layer');
  const markersEl = $('#markers');
  const trajEl = $('#traj');
  const placingEl = $('#placing');
  const listEl = $('#list');
  const dialog = $('#editor');
  const form = $('#editor-form');

  document.querySelectorAll('[data-agent-name]').forEach(el => { el.textContent = config.agent; });

  const [{ map: apiMap }, agent] = await Promise.all([VL.getMap(mapSlug), VL.getAgent()]);
  const map = apiMap || { slug: mapSlug, name: mapSlug || 'Map inconnue', sites: '', minimap: '', splash: '', callouts: [] };

  document.title = `${map.name} — Lineups Valorant`;
  document.querySelectorAll('[data-map-name]').forEach(el => { el.textContent = map.name; });
  $('#map-sites').textContent = map.sites;
  if (map.splash) $('#viewer-bg').style.backgroundImage = `url("${map.splash}")`;

  const minimap = $('#minimap');
  if (map.minimap) {
    minimap.src = map.minimap;
  } else {
    minimap.remove();
    layer.insertAdjacentHTML('afterbegin', `<div class="minimap-missing">Minimap indisponible (hors ligne ?).<br>Tu peux définir une image locale dans <code>data/config.js</code> → <code>mapOverrides</code>.</div>`);
  }

  $('#callouts').innerHTML = map.callouts
    .map(c => `<span class="callout" style="left:${c.x}%;top:${c.y}%">${esc(`${c.zone} ${c.name}`)}</span>`)
    .join('');

  /* ================================================================
     Vue : zoom, déplacement, rotation
     ================================================================ */

  const prefsKey = `vl.view.${mapSlug}`;
  const prefs = (() => { try { return JSON.parse(localStorage.getItem(prefsKey)) || {}; } catch { return {}; } })();
  const view = { z: 1, tx: 0, ty: 0, rot: prefs.rot || 0 };
  const savePrefs = () => { try { localStorage.setItem(prefsKey, JSON.stringify(prefs)); } catch {} };

  function fitLayer() {
    const size = Math.min(viewer.clientWidth, viewer.clientHeight) * 0.92;
    layer.style.setProperty('--size', `${Math.max(size, 240)}px`);
  }

  function applyView(animate = false) {
    layer.classList.toggle('animate', animate);
    layer.style.transform = `translate(${view.tx}px, ${view.ty}px) rotate(${view.rot}deg) scale(${view.z})`;
    layer.style.setProperty('--z-inv', 1 / view.z);
    layer.style.setProperty('--rot-inv', `${-view.rot}deg`);
  }

  function zoomAt(clientX, clientY, factor, animate = false) {
    const z = Math.min(6, Math.max(1, view.z * factor));
    const rect = layer.getBoundingClientRect();
    const dx = clientX - (rect.left + rect.width / 2);
    const dy = clientY - (rect.top + rect.height / 2);
    view.tx += dx * (1 - z / view.z);
    view.ty += dy * (1 - z / view.z);
    view.z = z;
    if (z === 1) view.tx = view.ty = 0;
    applyView(animate);
  }

  function zoomCenter(factor) {
    const r = viewer.getBoundingClientRect();
    zoomAt(r.left + r.width / 2, r.top + r.height / 2, factor, true);
  }

  // Coordonnées écran → pourcentage de la minimap (tient compte du zoom et de la rotation).
  function clientToPct(clientX, clientY) {
    const rect = layer.getBoundingClientRect();
    const dx = clientX - (rect.left + rect.width / 2);
    const dy = clientY - (rect.top + rect.height / 2);
    const a = (-view.rot * Math.PI) / 180;
    const x = (dx * Math.cos(a) - dy * Math.sin(a)) / view.z;
    const y = (dx * Math.sin(a) + dy * Math.cos(a)) / view.z;
    const size = layer.offsetWidth;
    return { x: VL.round((x / size + 0.5) * 100), y: VL.round((y / size + 0.5) * 100) };
  }

  viewer.addEventListener('wheel', e => {
    e.preventDefault();
    zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.18 : 1 / 1.18);
  }, { passive: false });

  let drag = null;
  let suppressClick = false;

  viewer.addEventListener('pointerdown', e => {
    if (e.button !== 0 || e.target.closest('.viewer-tools, .edit-banner')) return;
    drag = { x: e.clientX, y: e.clientY, tx: view.tx, ty: view.ty, moved: false, id: e.pointerId };
  });

  viewer.addEventListener('pointermove', e => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) < 5) return;
    if (!drag.moved) {
      drag.moved = true;
      viewer.setPointerCapture(e.pointerId);
      viewer.classList.add('dragging');
    }
    view.tx = drag.tx + dx;
    view.ty = drag.ty + dy;
    applyView();
  });

  const endDrag = () => {
    if (drag?.moved) suppressClick = true;
    drag = null;
    viewer.classList.remove('dragging');
  };
  viewer.addEventListener('pointerup', endDrag);
  viewer.addEventListener('pointercancel', endDrag);

  // Un glisser-déposer ne doit pas déclencher de clic (ni ouvrir une lineup).
  viewer.addEventListener('click', e => {
    if (suppressClick) {
      suppressClick = false;
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  window.addEventListener('resize', () => { fitLayer(); applyView(); });

  /* ---------- Barre d'outils ---------- */

  const tools = Object.fromEntries([...document.querySelectorAll('[data-tool]')].map(b => [b.dataset.tool, b]));
  let showAllTraj = !!prefs.traj;
  let showCallouts = prefs.callouts !== false;

  function syncToggles() {
    tools.callouts.setAttribute('aria-pressed', showCallouts);
    tools.traj.setAttribute('aria-pressed', showAllTraj);
    layer.classList.toggle('hide-callouts', !showCallouts);
  }

  tools['zoom-in'].onclick = () => zoomCenter(1.4);
  tools['zoom-out'].onclick = () => zoomCenter(1 / 1.4);
  tools.reset.onclick = () => { Object.assign(view, { z: 1, tx: 0, ty: 0 }); applyView(true); };
  tools.rotate.onclick = () => {
    view.rot = (view.rot + 90) % 360;
    prefs.rot = view.rot;
    savePrefs();
    applyView(true);
  };
  tools.callouts.onclick = () => { showCallouts = !showCallouts; prefs.callouts = showCallouts; savePrefs(); syncToggles(); };
  tools.traj.onclick = () => { showAllTraj = !showAllTraj; prefs.traj = showAllTraj; savePrefs(); syncToggles(); renderMarkers(); };
  tools.edit.onclick = () => setEditing(!editing);

  /* ================================================================
     Filtres & liste
     ================================================================ */

  const filtersKey = `vl.filters.${mapSlug}`;
  const filters = (() => {
    try { return { site: '', side: '', q: '', ...JSON.parse(sessionStorage.getItem(filtersKey)) }; } catch { return { site: '', side: '', q: '' }; }
  })();
  const saveFilters = () => { try { sessionStorage.setItem(filtersKey, JSON.stringify(filters)); } catch {} };

  let lineups = [];
  let activeId = VL.param('focus');

  function filtered() {
    const q = filters.q.trim().toLowerCase();
    return lineups.filter(l =>
      (!filters.site || l.site === filters.site)
      && (!filters.side || l.side === filters.side)
      && (!q || [l.title, l.notes, l.throwType, ...(l.tags || [])].join(' ').toLowerCase().includes(q)));
  }

  function renderFilters() {
    const countBy = key => lineups.reduce((acc, l) => ({ ...acc, [l[key]]: (acc[l[key]] || 0) + 1 }), {});
    const siteCount = countBy('site');
    const mapSites = (map.sites.match(/\b[A-C]\b/g) || ['A', 'B']);
    const sites = [...new Set([...mapSites, ...config.sites.filter(s => siteCount[s])])];
    $('#f-site').innerHTML = ['', ...sites].map(s => `
      <button type="button" data-site="${s}" aria-pressed="${filters.site === s}">${s || 'Tous'}${s ? ` <span class="count">${siteCount[s] || 0}</span>` : ''}</button>`).join('');

    $('#f-side').innerHTML = [['', 'Tous'], ...Object.entries(config.sides)].map(([k, label]) => `
      <button type="button" data-side="${k}" aria-pressed="${filters.side === k}">${label}</button>`).join('');

    $('#f-q').value = filters.q;
  }

  $('#f-site').onclick = e => { const b = e.target.closest('[data-site]'); if (b) { filters.site = b.dataset.site; update(); } };
  $('#f-side').onclick = e => { const b = e.target.closest('[data-side]'); if (b) { filters.side = b.dataset.side; update(); } };
  $('#f-q').oninput = e => { filters.q = e.target.value; saveFilters(); renderList(); renderMarkers(); };

  function chipsFor(l) {
    return [
      l.site && `<span class="chip chip-strong">${esc(l.site)}</span>`,
      l.side && `<span class="chip">${esc(config.sides[l.side] || l.side)}</span>`,
      VL.isDraft(l.id) && '<span class="chip chip-draft">brouillon</span>',
    ].filter(Boolean).join('');
  }

  function renderList() {
    const items = filtered();
    $('#count').textContent = `(${items.length}${items.length !== lineups.length ? ` / ${lineups.length}` : ''})`;
    if (!lineups.length) {
      listEl.innerHTML = `<div class="empty">Aucune lineup sur ${esc(map.name)} pour l'instant.<br><br>Clique sur <b>Ajouter</b> puis place ta position et le point d'impact sur la carte.</div>`;
      return;
    }
    if (!items.length) {
      listEl.innerHTML = '<div class="empty">Aucune lineup ne correspond aux filtres.</div>';
      return;
    }
    listEl.innerHTML = items.map(l => `
      <a class="lineup-item ${l.id === activeId ? 'active' : ''}" href="lineup.html?id=${encodeURIComponent(l.id)}" data-id="${esc(l.id)}" style="--ab:${VL.ability.color}">
        <div class="lineup-thumb">
          ${VL.imgOrPlaceholder(l.result?.image || l.aim?.image || l.position?.image, '')}
          ${VL.abilityBadge(agent)}
        </div>
        <div>
          <h3>${esc(l.title)}</h3>
          <div class="meta">${chipsFor(l)}</div>
        </div>
      </a>`).join('');
  }

  function renderMarkers() {
    const items = filtered();
    markersEl.innerHTML = items.map(l => {
      const ab = VL.ability;
      return `
        <span class="pos-dot ${showAllTraj || l.id === activeId ? 'show' : ''}" data-dot="${esc(l.id)}" style="left:${l.from?.x}%;top:${l.from?.y}%"></span>
        <a class="marker ${l.id === activeId ? 'active' : ''}" href="lineup.html?id=${encodeURIComponent(l.id)}" data-id="${esc(l.id)}" style="left:${l.to?.x}%;top:${l.to?.y}%;--ab:${ab.color}" aria-label="${esc(l.title)}">
          ${VL.abilityBadge(agent)}
          <span class="marker-label">${esc(l.title)}</span>
        </a>`;
    }).join('');
    trajEl.innerHTML = items.filter(l => l.from && l.to).map(l => `
      <line data-line="${esc(l.id)}" class="${showAllTraj || l.id === activeId ? 'show' : ''}" x1="${l.from.x}" y1="${l.from.y}" x2="${l.to.x}" y2="${l.to.y}" style="--ab:${VL.ability.color}"/>`).join('');
  }

  function setActive(id) {
    activeId = id;
    const sel = v => `[data-id="${CSS.escape(v)}"]`;
    document.querySelectorAll('.marker.active, .lineup-item.active').forEach(el => el.classList.remove('active'));
    if (!showAllTraj) document.querySelectorAll('.pos-dot.show, .traj line.show').forEach(el => el.classList.remove('show'));
    if (!id) return;
    document.querySelectorAll(sel(id)).forEach(el => el.classList.add('active'));
    document.querySelector(`[data-dot="${CSS.escape(id)}"]`)?.classList.add('show');
    document.querySelector(`[data-line="${CSS.escape(id)}"]`)?.classList.add('show');
  }

  for (const host of [markersEl, listEl]) {
    host.addEventListener('mouseover', e => {
      const el = e.target.closest('[data-id]');
      if (el && el.dataset.id !== activeId) setActive(el.dataset.id);
    });
    host.addEventListener('mouseleave', () => setActive(null));
    host.addEventListener('click', e => {
      const el = e.target.closest('[data-id]');
      if (!el || !editing) return;
      e.preventDefault();
      openEditor(VL.getLineup(el.dataset.id));
    });
  }

  function update() {
    lineups = VL.lineupsForMap(mapSlug);
    saveFilters();
    renderFilters();
    renderList();
    renderMarkers();
    VL.renderDraftBar();
  }

  /* ================================================================
     Mode édition
     ================================================================ */

  let editing = false;
  let placing = null;        // { from, to } pendant le placement des points
  let editingLineup = null;  // lineup en cours d'édition (null = nouvelle)
  let replacing = false;     // replacement des points d'une lineup déjà dans le formulaire
  let draftPoints = null;    // points retenus pour le formulaire

  function setEditing(on) {
    editing = on;
    viewer.classList.toggle('editing', on);
    tools.edit.setAttribute('aria-pressed', on);
    if (on) startPlacing();
    else { placing = null; replacing = false; renderPlacing(); }
  }

  function startPlacing() {
    placing = { from: null, to: null };
    renderPlacing();
  }

  function renderPlacing() {
    const pts = placing || {};
    placingEl.innerHTML = [
      pts.from && `<span class="placing placing-from" style="left:${pts.from.x}%;top:${pts.from.y}%"></span>`,
      pts.to && `<span class="placing placing-to" style="left:${pts.to.x}%;top:${pts.to.y}%"></span>`,
    ].filter(Boolean).join('');
    const step = !pts.from ? 1 : 2;
    $('#edit-step').textContent = step;
    $('#edit-text').innerHTML = step === 1
      ? '<b>Position</b> — clique là où le joueur se place.' + (replacing ? '' : ' <span class="muted">(ou clique sur une lineup existante pour la modifier)</span>')
      : '<b>Impact</b> — clique là où la capacité atterrit.';
  }

  $('#edit-cancel').onclick = () => {
    if (replacing) { replacing = false; dialog.showModal(); startPlacing(); return; }
    setEditing(false);
  };

  $('#add-btn').onclick = () => {
    editingLineup = null;
    if (!editing) setEditing(true);
    else startPlacing();
    VL.toast('Place la position du joueur puis le point d\'impact sur la carte.');
  };

  viewer.addEventListener('click', e => {
    if (!editing || !placing || e.target.closest('.viewer-tools, .edit-banner, .marker')) return;
    const pt = clientToPct(e.clientX, e.clientY);
    if (pt.x < 0 || pt.x > 100 || pt.y < 0 || pt.y > 100) return;
    if (!placing.from) {
      placing.from = pt;
      renderPlacing();
      return;
    }
    placing.to = pt;
    renderPlacing();
    draftPoints = { ...placing };
    placing = null;
    if (replacing) {
      replacing = false;
      updateCoordsBox();
      dialog.showModal();
    } else {
      openEditor(null, draftPoints);
    }
  });

  /* ---------- Formulaire ---------- */

  const STEPS = [
    ['position', 'Positionnement', 'Où se placer exactement'],
    ['aim', 'Visée', 'Où placer son viseur'],
    ['result', 'Résultat', 'Ce que donne la lineup'],
  ];

  function radioChips(name, options, value) {
    return `<div class="radio-chips">${options.map(o => `
      <label style="${o.color ? `--ab:${o.color}` : ''}">
        <input type="radio" name="${name}" value="${esc(o.value)}" ${String(o.value) === String(value) ? 'checked' : ''}>
        <span>${o.html || esc(o.label)}</span>
      </label>`).join('')}</div>`;
  }

  function buildForm(l) {
    const steps = STEPS.map(([key, label, hint], i) => `
      <div class="step-fields" data-step="${key}">
        <div class="preview" data-preview="${key}"></div>
        <div class="inputs">
          <h3><span class="chip chip-red">${i + 1}</span>${label}</h3>
          <div class="file-row">
            <input class="input" name="${key}.image" placeholder="assets/lineups/${esc(mapSlug)}/capture.jpg ou URL" value="${esc(l?.[key]?.image || '')}">
            <input type="file" accept="image/*" data-file="${key}">
            <button class="btn btn-ghost" type="button" data-browse="${key}">Parcourir</button>
          </div>
          <textarea class="input" name="${key}.note" rows="2" placeholder="${hint}…">${esc(l?.[key]?.note || '')}</textarea>
        </div>
      </div>`).join('');

    $('#editor-body').innerHTML = `
      <div class="field">
        <label for="f-title">Titre *</label>
        <input class="input" id="f-title" name="title" required placeholder="Ex : Molly default A depuis Lobby" value="${esc(l?.title || '')}">
      </div>
      <div class="row-2">
        <div class="field">
          <span class="label">Site</span>
          ${radioChips('site', config.sites.map(s => ({ value: s, label: s })), l?.site || 'A')}
        </div>
        <div class="field">
          <span class="label">Côté</span>
          ${radioChips('side', Object.entries(config.sides).map(([value, label]) => ({ value, label })), l?.side || 'attack')}
        </div>
      </div>
      <div class="field">
        <label for="f-throw">Type de lancer</label>
        <input class="input" id="f-throw" name="throwType" list="throw-list" placeholder="Choisir ou écrire…" value="${esc(l?.throwType || '')}">
        <datalist id="throw-list">${config.throwTypes.map(t => `<option value="${esc(t)}">`).join('')}</datalist>
      </div>
      <div class="field">
        <label for="f-tags">Tags</label>
        <input class="input" id="f-tags" name="tags" placeholder="Séparés par des virgules" value="${esc((l?.tags || []).join(', '))}">
        <div class="chips" id="tag-suggestions">${config.tagSuggestions.map(t => `<button type="button" class="chip" data-tag="${esc(t)}">+ ${esc(t)}</button>`).join('')}</div>
      </div>
      <div class="coords-box" id="coords-box"></div>
      ${steps}
      <div class="field">
        <label for="f-notes">Notes complémentaires</label>
        <textarea class="input" id="f-notes" name="notes" rows="3" placeholder="Timing, variantes, astuces…">${esc(l?.notes || '')}</textarea>
      </div>
      <p class="hint muted" style="margin:0;font-size:12px">Les images sont lues depuis le dossier du site : après « Parcourir », copie le fichier dans <code>assets/lineups/${esc(mapSlug)}/</code>.</p>`;

    STEPS.forEach(([key]) => updatePreview(key));
    updateCoordsBox();
  }

  function updatePreview(key) {
    const val = form.elements[`${key}.image`].value.trim();
    const src = VL.localPreviews[val] || val;
    form.querySelector(`[data-preview="${key}"]`).innerHTML = VL.imgOrPlaceholder(src, 'Aucune image');
  }

  function updateCoordsBox() {
    const p = draftPoints;
    $('#coords-box').innerHTML = p?.from && p?.to
      ? `<span><i style="background:var(--cyan)"></i>Position <b>${p.from.x} / ${p.from.y}</b></span>
         <span><i style="background:var(--red)"></i>Impact <b>${p.to.x} / ${p.to.y}</b></span>
         <span class="muted">— « Replacer sur la carte » pour modifier</span>`
      : '<span>⚠ Points non placés — utilise « Replacer sur la carte ».</span>';
  }

  function openEditor(lineup, points) {
    editingLineup = lineup || null;
    draftPoints = lineup ? { from: lineup.from, to: lineup.to } : points || null;
    $('#editor-title').textContent = lineup ? 'Modifier la lineup' : 'Nouvelle lineup';
    form.querySelector('[data-act=delete]').hidden = !lineup;
    buildForm(lineup);
    dialog.showModal();
    setTimeout(() => form.elements.title.focus(), 50);
  }

  function readForm() {
    const f = form.elements;
    const title = f.title.value.trim();
    const step = key => ({ image: f[`${key}.image`].value.trim(), note: f[`${key}.note`].value.trim() });
    return {
      id: editingLineup?.id || VL.newId(mapSlug, title),
      map: mapSlug,
      title,
      site: f.site.value,
      side: f.side.value,
      throwType: f.throwType.value.trim(),
      tags: f.tags.value.split(',').map(t => t.trim()).filter(Boolean),
      from: draftPoints?.from,
      to: draftPoints?.to,
      position: step('position'),
      aim: step('aim'),
      result: step('result'),
      notes: f.notes.value.trim(),
    };
  }

  form.addEventListener('input', e => {
    const m = e.target.name?.match(/^(\w+)\.image$/);
    if (m) updatePreview(m[1]);
  });

  form.addEventListener('click', e => {
    const browse = e.target.closest('[data-browse]');
    if (browse) form.querySelector(`[data-file="${browse.dataset.browse}"]`).click();

    const tag = e.target.closest('[data-tag]');
    if (tag) {
      const input = form.elements.tags;
      const tags = input.value.split(',').map(t => t.trim()).filter(Boolean);
      if (!tags.includes(tag.dataset.tag)) tags.push(tag.dataset.tag);
      input.value = tags.join(', ');
    }

    const act = e.target.closest('[data-act]')?.dataset.act;
    if (act === 'close') dialog.close();
    if (act === 'replace') {
      replacing = true;
      dialog.close();
      if (!editing) setEditing(true);
      startPlacing();
    }
    if (act === 'copy') {
      const json = JSON.stringify(readForm(), null, 2);
      navigator.clipboard?.writeText(json)
        .then(() => VL.toast('JSON copié dans le presse-papiers.', 'ok'))
        .catch(() => VL.toast('Copie impossible dans ce navigateur.', 'err'));
    }
    if (act === 'delete' && editingLineup && confirm(`Supprimer « ${editingLineup.title} » ?`)) {
      VL.deleteLineup(editingLineup.id);
      dialog.close();
      update();
      VL.toast('Lineup supprimée (pense à exporter).', 'ok');
    }
  });

  form.addEventListener('change', e => {
    const key = e.target.dataset.file;
    const file = e.target.files?.[0];
    if (!key || !file) return;
    const path = `assets/lineups/${mapSlug}/${file.name}`;
    VL.localPreviews[path] = URL.createObjectURL(file);
    form.elements[`${key}.image`].value = path;
    updatePreview(key);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const lineup = readForm();
    if (!lineup.title) { VL.toast('Donne un titre à la lineup.', 'err'); form.elements.title.focus(); return; }
    if (!lineup.from || !lineup.to) { VL.toast('Place la position et l\'impact sur la carte.', 'err'); return; }
    try {
      VL.saveLineup(lineup);
    } catch (err) {
      VL.toast(err.message, 'err');
      return;
    }
    dialog.close();
    const picked = ['position', 'aim', 'result'].map(k => lineup[k].image).filter(p => VL.localPreviews[p]);
    VL.toast(picked.length
      ? `Lineup enregistrée. Copie ${picked.length > 1 ? 'les images' : 'l\'image'} dans assets/lineups/${mapSlug}/`
      : 'Lineup enregistrée dans les brouillons.', 'ok');
    activeId = lineup.id;
    update();
    setActive(lineup.id);
    if (editing) startPlacing();
  });

  dialog.addEventListener('close', () => {
    if (!replacing && editing) startPlacing();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && editing && !dialog.open) {
      if (placing?.from) startPlacing();
      else setEditing(false);
    }
  });

  /* ---------- Démarrage ---------- */

  fitLayer();
  applyView();
  syncToggles();
  update();
  if (activeId) setActive(activeId);

  const editId = VL.param('edit');
  if (editId && VL.getLineup(editId)) {
    setEditing(true);
    openEditor(VL.getLineup(editId));
  }
})();
