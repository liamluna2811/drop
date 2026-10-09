'use strict';

(async () => {
  const grid = document.getElementById('grid');
  const search = document.getElementById('search');
  const onlyFilled = document.getElementById('only-filled');
  const lineups = VL.allLineups();

  document.querySelectorAll('[data-agent-name]').forEach(el => { el.textContent = VL.config.agent; });

  // Statistiques
  const byMap = new Map();
  for (const l of lineups) {
    if (!byMap.has(l.map)) byMap.set(l.map, []);
    byMap.get(l.map).push(l);
  }
  document.getElementById('stat-total').textContent = lineups.length;
  document.getElementById('stat-maps').textContent = byMap.size;
  document.getElementById('stat-sites').textContent = new Set(lineups.map(l => `${l.map}/${l.site}`)).size;

  try { onlyFilled.checked = localStorage.getItem('vl.home.onlyFilled') === '1'; } catch {}

  VL.getAgent().then(agent => {
    if (!agent?.portrait) return;
    const img = document.getElementById('portrait');
    img.onload = () => img.classList.add('loaded');
    img.src = agent.portrait;
  });

  const { maps, offline } = await VL.getMaps();
  if (offline) {
    document.getElementById('notice').innerHTML = `<div class="notice">⚠ Impossible de joindre valorant-api.com : les images des maps ne peuvent pas être chargées. Vérifie ta connexion, ou ajoute des images locales via <code>mapOverrides</code> dans <code>data/config.js</code>.</div>`;
  }

  function card(map, i) {
    const list = byMap.get(map.slug) || [];
    const bg = map.splash
      ? `<img class="map-card-bg" src="${VL.escapeHtml(map.splash)}" alt="" loading="lazy">`
      : '<div class="map-card-fallback"></div>';
    return `
      <a class="map-card" href="map.html?map=${encodeURIComponent(map.slug)}" style="--i:${i}" aria-label="${VL.escapeHtml(map.name)} — ${list.length} lineups">
        ${bg}
        <div class="map-card-top"><span class="coords">${VL.escapeHtml(map.coordinates)}</span></div>
        <div class="map-card-body">
          <div>
            <h2>${VL.escapeHtml(map.name)}</h2>
            <div class="map-sites">${VL.escapeHtml(map.sites || '')}</div>
          </div>
          <div class="map-count">
            <strong class="${list.length ? '' : 'zero'}">${list.length}</strong>
            <span>lineup${list.length > 1 ? 's' : ''}</span>
          </div>
        </div>
      </a>`;
  }

  function render() {
    const q = VL.slug(search.value);
    const shown = maps.filter(m =>
      (!q || m.slug.includes(q)) && (!onlyFilled.checked || byMap.has(m.slug)));
    grid.innerHTML = shown.length
      ? shown.map(card).join('')
      : `<div class="empty" style="grid-column:1/-1">Aucune map ne correspond.</div>`;
  }

  search.addEventListener('input', render);
  onlyFilled.addEventListener('change', () => {
    try { localStorage.setItem('vl.home.onlyFilled', onlyFilled.checked ? '1' : '0'); } catch {}
    render();
  });

  render();
  VL.renderDraftBar();
})();
