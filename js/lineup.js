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

  const pt = p => p ? `left:${p.x}%;top:${p.y}%` : 'display:none';

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
          <a class="btn btn-ghost" href="${mapUrl}&focus=${encodeURIComponent(lineup.id)}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>Carte
          </a>
          <a class="btn" href="${mapUrl}&edit=${encodeURIComponent(lineup.id)}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20h4L19 9l-4-4L4 16v4z"/></svg>Modifier
          </a>
        </div>
      </div>
    </section>

    <div class="lu-layout">
      <div class="steps">
        ${STEPS.map(([key, label], i) => {
          const step = lineup[key] || {};
          return `
            <article class="step" style="--i:${i}">
              <div class="step-media" data-zoom="${esc(step.image || '')}" data-caption="${i + 1}. ${label}">
                ${VL.imgOrPlaceholder(step.image, `Capture « ${label} » à ajouter`)}
              </div>
              <div>
                <div class="step-num">0${i + 1}</div>
                <h2>${label}</h2>
                ${step.note ? `<p>${esc(step.note)}</p>` : '<p class="empty-note">Pas de description.</p>'}
              </div>
            </article>`;
        }).join('')}
      </div>

      <aside class="lu-aside">
        <div class="card">
          <h3>Sur la carte</h3>
          <a class="mini-map" href="${mapUrl}&focus=${encodeURIComponent(lineup.id)}" title="Voir sur la carte" style="display:block">
            ${map.minimap ? `<img src="${esc(map.minimap)}" alt="Minimap ${esc(map.name)}">` : '<div class="img-ph">Minimap indisponible</div>'}
            <span style="position:absolute;${pt(lineup.spot)}">${VL.abilityBadge(agent)}</span>
          </a>
        </div>

        <div class="card">
          <h3>Infos</h3>
          <dl class="info-list">
            <div><dt>Site</dt><dd>${esc(lineup.site || '—')}</dd></div>
            <div><dt>Côté</dt><dd>${esc(config.sides[lineup.side] || '—')}</dd></div>
            <div><dt>Lancer</dt><dd>${esc(lineup.throwType || '—')}</dd></div>
          </dl>
        </div>

        ${lineup.notes ? `<div class="card"><h3>Notes</h3><p class="notes">${esc(lineup.notes)}</p></div>` : ''}

        ${siblings.length > 1 ? `
          <nav class="lu-nav">
            <a href="lineup.html?id=${encodeURIComponent(prev.id)}"><small>← Précédente</small><span>${esc(prev.title)}</span></a>
            <a class="next" href="lineup.html?id=${encodeURIComponent(next.id)}"><small>Suivante →</small><span>${esc(next.title)}</span></a>
          </nav>` : ''}
      </aside>
    </div>`;

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  app.addEventListener('click', e => {
    const media = e.target.closest('[data-zoom]');
    if (!media || !media.dataset.zoom || !media.querySelector('img')) return;
    lightbox.querySelector('img').src = media.dataset.zoom;
    lightbox.querySelector('figcaption').textContent = media.dataset.caption;
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
