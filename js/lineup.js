'use strict';

(async () => {
  const { config, escapeHtml: esc } = VL;
  const app = document.getElementById('app');
  const lineup = VL.getLineup(VL.param('id'));

  document.querySelectorAll('[data-agent-name]').forEach(el => { el.textContent = config.agent; });

  if (!lineup) {
    document.getElementById('crumb-lineup').textContent = 'Introuvable';
    app.innerHTML = '<div class="page" style="padding-top:60px"><div class="empty">Cette lineup n\'existe pas (ou plus).<br><br><a class="btn" href="index.html">Retour aux maps</a></div></div>';
    return;
  }

  const [{ map: apiMap }, agent] = await Promise.all([VL.getMap(lineup.map), VL.getAgent()]);
  const map = apiMap || { slug: lineup.map, name: lineup.map, minimap: '', splash: '' };
  const ab = VL.ability;
  const mapUrl = `map.html?map=${encodeURIComponent(map.slug)}`;

  document.title = `${lineup.title} — ${map.name}`;
  const crumbMap = document.getElementById('crumb-map');
  crumbMap.textContent = map.name;
  crumbMap.href = mapUrl;
  document.getElementById('crumb-lineup').textContent = lineup.title;

  // Lineups voisines sur la même map (même ordre que la liste de la page map).
  const siblings = VL.lineupsForMap(lineup.map);
  const idx = siblings.findIndex(l => l.id === lineup.id);
  const prev = siblings[(idx - 1 + siblings.length) % siblings.length];
  const next = siblings[(idx + 1) % siblings.length];

  const STEPS = [
    ['position', 'Positionnement'],
    ['aim', 'Visée'],
    ['result', 'Résultat'],
  ];

  const pt = p => `left:${p.x}%;top:${p.y}%`;
  const rot = VL.mapRotation(map.slug);

  // Image d'étape ; pour la visée, cercle sur le viseur + encart zoomé.
  function media(src, label, target) {
    if (!src) return VL.imgOrPlaceholder('', `Capture « ${label} » à ajouter`);
    const ring = target ? `<span class="aim-ring" style="left:${target.x}%;top:${target.y}%"></span>` : '';
    const zoom = target ? `
      <span class="aim-zoom ${target.x < 50 ? 'right' : 'left'} ${target.y < 50 ? 'bottom' : 'top'}" style="--tx:${target.x};--ty:${target.y}">
        <img src="${esc(src)}" alt="" draggable="false"><i></i><small>Zoom visée</small>
      </span>` : '';
    return `
      <div class="media-frame">
        <img src="${esc(src)}" alt="${esc(label)}" onload="this.parentNode.style.setProperty('--ratio', this.naturalWidth / this.naturalHeight)" onerror="this.closest('.step-media').innerHTML = VL.imgOrPlaceholder('', 'Image introuvable')">
        ${ring}${zoom}
      </div>`;
  }

  function renderStep(i) {
    const [key, label] = STEPS[i];
    const step = lineup[key] || {};
    return `
      <article class="step step-${key}" style="--i:${i}">
        <div class="step-media" data-zoom="${esc(step.image || '')}" data-caption="${i + 1}. ${label}"${step.target ? ` data-tx="${step.target.x}" data-ty="${step.target.y}"` : ''}>
          ${media(step.image, label, step.target)}
        </div>
        <div class="step-text">
          <h2><span class="step-num">0${i + 1}</span>${label}${key === 'aim' ? '<span class="step-key">Étape clé</span>' : ''}</h2>
          ${step.note ? `<p>${esc(step.note)}</p>` : '<p class="empty-note">Pas de description.</p>'}
        </div>
      </article>`;
  }

  app.innerHTML = `
    <section class="lu-hero">
      <div class="lu-hero-bg" style="${map.splash ? `background-image:url('${esc(map.splash)}')` : ''}"></div>
      <div class="lu-hero-inner">
        ${VL.abilityBadge(agent)}
        <div>
          <div class="hero-kicker">${esc(map.name)} · ${esc(ab.name)} (${esc(ab.bind)})</div>
          <h1 style="margin-top:10px">${esc(lineup.title)}</h1>
          <div class="chips">
            ${lineup.site ? `<span class="chip chip-red">Site ${esc(lineup.site)}</span>` : ''}
            ${lineup.side ? `<span class="chip chip-strong">${esc(config.sides[lineup.side] || lineup.side)}</span>` : ''}
            ${lineup.throwType ? `<span class="chip chip-strong">${esc(lineup.throwType)}</span>` : ''}
            ${(lineup.tags || []).map(t => `<span class="chip">#${esc(t)}</span>`).join('')}
            ${VL.isDraft(lineup.id) ? '<span class="chip chip-draft">brouillon non exporté</span>' : ''}
          </div>
        </div>
        <div class="lu-hero-actions">
          ${siblings.length > 1 ? `
          <a class="btn btn-ghost btn-icon" href="lineup.html?id=${encodeURIComponent(prev.id)}" title="Précédente : ${esc(prev.title)} (←)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
          </a>
          <a class="btn btn-ghost btn-icon" href="lineup.html?id=${encodeURIComponent(next.id)}" title="Suivante : ${esc(next.title)} (→)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
          </a>` : ''}
          <a class="btn btn-ghost" href="${mapUrl}&focus=${encodeURIComponent(lineup.id)}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z M9 3v15 M15 6v15"/></svg>Carte
          </a>
          <a class="btn" href="${mapUrl}&edit=${encodeURIComponent(lineup.id)}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20h4L19 9l-4-4L4 16v4z"/></svg>Modifier
          </a>
        </div>
      </div>
    </section>

    <div class="lu-layout">
      <div class="lu-col">
        ${renderStep(0)}
        <a class="mini-map" href="${mapUrl}&focus=${encodeURIComponent(lineup.id)}" title="Voir sur la carte">
          <div class="mini-map-rot" style="--rot:${rot}deg">
            ${map.minimap ? `<img src="${esc(map.minimap)}" alt="Minimap ${esc(map.name)}">` : '<div class="img-ph">Minimap indisponible</div>'}
            ${lineup.spot ? `<span class="mini-map-spot" style="${pt(lineup.spot)}">${VL.abilityBadge(agent)}</span>` : ''}
          </div>
        </a>
        ${lineup.notes ? `<div class="card"><h3>Notes</h3><p class="notes">${esc(lineup.notes)}</p></div>` : ''}
      </div>

      ${renderStep(1)}

      <aside class="lu-col">
        ${renderStep(2)}

        <dl class="info-list card">
          <div><dt>Site</dt><dd>${esc(lineup.site || '—')}</dd></div>
          <div><dt>Côté</dt><dd>${esc(config.sides[lineup.side] || '—')}</dd></div>
          <div><dt>Lancer</dt><dd>${esc(lineup.throwType || '—')}</dd></div>
        </dl>
      </aside>
    </div>`;

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  app.addEventListener('click', e => {
    const box = e.target.closest('[data-zoom]');
    if (!box || !box.dataset.zoom || !box.querySelector('img')) return;
    const { tx, ty } = box.dataset;
    lightbox.querySelector('.lightbox-frame').innerHTML = `<img src="${esc(box.dataset.zoom)}" alt="">`
      + (tx ? `<span class="aim-ring" style="left:${tx}%;top:${ty}%"></span>` : '');
    lightbox.querySelector('figcaption').textContent = box.dataset.caption;
    lightbox.classList.add('open');
  });
  lightbox.addEventListener('click', () => lightbox.classList.remove('open'));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') lightbox.classList.remove('open');
    if (lightbox.classList.contains('open') || siblings.length < 2) return;
    if (e.key === 'ArrowLeft') location.href = `lineup.html?id=${encodeURIComponent(prev.id)}`;
    if (e.key === 'ArrowRight') location.href = `lineup.html?id=${encodeURIComponent(next.id)}`;
  });

  VL.renderDraftBar();
})();
