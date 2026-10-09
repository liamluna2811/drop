'use strict';

/*
 * Noyau partagé : données de l'API Valorant (avec cache), stockage des
 * lineups (fichier + brouillons du mode édition) et petits utilitaires DOM.
 */
const VL = (() => {
  const API = 'https://valorant-api.com/v1';
  const KEYS = {
    maps: 'vl.cache.maps.v1',
    agent: 'vl.cache.agent.v2',
    drafts: 'vl.drafts.v1',
  };
  const CACHE_TTL = 3 * 24 * 3600 * 1000;
  const config = window.VL_CONFIG || {};

  /* ---------- localStorage tolérant ---------- */

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function store(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  /* ---------- Utilitaires ---------- */

  function slug(text) {
    return String(text)
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  function escapeHtml(text) {
    return String(text ?? '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  function param(name) {
    return new URLSearchParams(location.search).get(name);
  }

  function round(n) {
    return Math.round(n * 10) / 10;
  }

  /* ---------- API valorant-api.com ---------- */

  async function cachedFetch(key, url, transform) {
    const cached = load(key);
    if (cached && Date.now() - cached.t < CACHE_TTL) return cached.data;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = transform((await res.json()).data);
      store(key, { t: Date.now(), data });
      return data;
    } catch (err) {
      if (cached) return cached.data;
      throw err;
    }
  }

  function normalizeMap(m) {
    const toPct = loc => ({
      x: round((loc.y * m.xMultiplier + m.xScalarToAdd) * 100),
      y: round((loc.x * m.yMultiplier + m.yScalarToAdd) * 100),
    });
    return {
      slug: slug(m.displayName),
      name: m.displayName,
      sites: m.tacticalDescription || '',
      coordinates: m.coordinates || '',
      splash: m.splash,
      minimap: m.displayIcon,
      callouts: (m.callouts || []).map(c => ({
        name: c.regionName,
        zone: c.superRegionName,
        ...toPct(c.location),
      })),
    };
  }

  let mapsPromise;
  function getMaps() {
    mapsPromise ??= cachedFetch(KEYS.maps, `${API}/maps`, data =>
      data.filter(m => m.tacticalDescription && m.displayIcon).map(normalizeMap),
    )
      .then(maps => ({ maps, offline: false }))
      .catch(() => ({
        offline: true,
        maps: (config.fallbackMaps || []).map(name => ({
          slug: slug(name), name, sites: '', coordinates: '', splash: '', minimap: '', callouts: [],
        })),
      }))
      .then(({ maps, offline }) => {
        const hidden = new Set(config.hiddenMaps || []);
        const overrides = config.mapOverrides || {};
        const list = maps
          .filter(m => !hidden.has(m.slug))
          .map(m => ({ ...m, ...(overrides[m.slug] || {}) }))
          .sort((a, b) => a.name.localeCompare(b.name));
        return { maps: list, offline };
      });
    return mapsPromise;
  }

  async function getMap(mapSlug) {
    const { maps, offline } = await getMaps();
    return { map: maps.find(m => m.slug === mapSlug), offline };
  }

  let agentPromise;
  function getAgent() {
    agentPromise ??= cachedFetch(KEYS.agent, `${API}/agents?isPlayableCharacter=true`, data => {
      const agent = data.find(a => a.displayName.toLowerCase() === String(config.agent).toLowerCase());
      if (!agent) return null;
      const en = String(config.ability?.en).toLowerCase();
      const match = agent.abilities.find(x => x.displayName.toLowerCase() === en);
      return {
        name: agent.displayName,
        portrait: agent.fullPortrait || agent.displayIcon,
        icon: agent.displayIcon,
        colors: agent.backgroundGradientColors || [],
        abilityIcon: match?.displayIcon || '',
      };
    }).catch(() => null);
    return agentPromise;
  }

  // Orientation de base d'une minimap (spawn attaquant en bas).
  function mapRotation(mapSlug) {
    return Number(config.mapRotation?.[mapSlug]) || 0;
  }

  // Point d'impact d'une lineup : le sien, sinon celui par défaut du site.
  function impactFor(lineup) {
    return lineup.impact || config.defaultImpacts?.[lineup.map]?.[lineup.site] || null;
  }

  // Pastille « joueur » (emplacement où se placer).
  function playerBadge(extraClass = '') {
    return `<span class="player-badge ${extraClass}" title="Emplacement du joueur"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8z"/></svg></span>`;
  }

  /* ---------- Capacité ---------- */

  const ability = { name: 'Capacité', bind: '?', color: '#ff4655', colorDefense: '#3d9bff', ...config.ability };

  // Rouge pour l'attaque, bleu pour la défense.
  function abilityColor(side) {
    return side === 'defense' ? ability.colorDefense : ability.color;
  }

  // Type de molly d'après les tags : post-plant ou retake.
  const TYPE_ICONS = {
    plant: { label: 'Post-plant', svg: '<path d="M12 1.5 17.5 8v12.5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V8z" fill="currentColor"/><path d="M6.5 14h11" stroke="#0b1118" stroke-width="2.4"/>' },
    retake: { label: 'Retake', svg: '<path d="M19 12a7 7 0 1 1-2.1-5" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M20 3v6h-6z" fill="currentColor"/>' },
    antiplant: { label: 'Anti-plant', svg: '<path d="M12 2 20 5v6.5c0 5-3.4 9-8 10.5-4.6-1.5-8-5.5-8-10.5V5z" fill="currentColor"/><path d="m8.5 12 2.5 2.5 4.5-5" fill="none" stroke="#0b1118" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' },
    antidefuse: { label: 'Anti-défuse', svg: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2.8"/><path d="M6.6 17.4 17.4 6.6" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>' },
  };

  // Type de la lineup d'après ses tags (anti-défuse > anti-plant > retake > post-plant).
  function lineupType(lineup) {
    const tags = (lineup?.tags || []).map(t => slug(t));
    if (tags.includes('anti-defuse')) return 'antidefuse';
    if (tags.includes('anti-plant')) return 'antiplant';
    if (tags.includes('retake')) return 'retake';
    if (tags.includes('post-plant')) return 'plant';
    return null;
  }

  // Retakes, anti-plants et anti-défuses : sur la grande carte, on montre
  // d'abord l'impact.
  function impactFirst(lineup) {
    return ['retake', 'antiplant', 'antidefuse'].includes(lineupType(lineup));
  }

  function typeIcon(type) {
    const t = TYPE_ICONS[type];
    return t ? `<span class="ab-type" title="${t.label}"><svg viewBox="0 0 24 24" aria-hidden="true">${t.svg}</svg></span>` : '';
  }

  // Pastille de la molly : icône officielle (sinon la touche), couleur selon le
  // côté, et petit symbole du type (post-plant, retake…) dans le coin.
  function abilityBadge(agent, lineup, extraClass = '') {
    const ab = ability;
    const side = lineup?.side;
    const type = lineupType(lineup);
    const icon = agent?.abilityIcon;
    const inner = icon
      ? `<img src="${escapeHtml(icon)}" alt="" draggable="false">`
      : `<span>${escapeHtml(ab.bind)}</span>`;
    const title = [ab.name, side === 'defense' ? 'défense' : '', TYPE_ICONS[type]?.label || ''].filter(Boolean).join(' · ');
    return `<span class="ab-badge ${extraClass}" style="--ab:${abilityColor(side)}" title="${escapeHtml(title)}">${inner}${typeIcon(type)}</span>`;
  }

  /* ---------- Lineups : fichier + brouillons ---------- */

  function baseLineups() {
    return Array.isArray(window.LINEUPS) ? window.LINEUPS : [];
  }

  function drafts() {
    const d = load(KEYS.drafts, null);
    return { upserts: d?.upserts || {}, deleted: d?.deleted || [] };
  }

  function allLineups() {
    const d = drafts();
    const byId = new Map();
    for (const l of baseLineups()) if (!d.deleted.includes(l.id)) byId.set(l.id, l);
    for (const [id, l] of Object.entries(d.upserts)) byId.set(id, l);
    // Anciens brouillons : l'emplacement du joueur s'appelait `from`.
    return [...byId.values()].map(({ from, to, ...l }) => ({ ...l, spot: l.spot || from }));
  }

  function lineupsForMap(mapSlug) {
    return allLineups().filter(l => l.map === mapSlug);
  }

  function getLineup(id) {
    return allLineups().find(l => l.id === id);
  }

  function isDraft(id) {
    return id in drafts().upserts;
  }

  function saveLineup(lineup) {
    const d = drafts();
    d.upserts[lineup.id] = lineup;
    d.deleted = d.deleted.filter(x => x !== lineup.id);
    if (!store(KEYS.drafts, d)) throw new Error('Impossible d\'enregistrer (stockage du navigateur indisponible ou plein).');
  }

  // Abandonne le brouillon d'une lineup : on revient à la version du fichier.
  function discardDraft(id) {
    const d = drafts();
    delete d.upserts[id];
    store(KEYS.drafts, d);
  }

  function inFile(id) {
    return baseLineups().some(l => l.id === id);
  }

  function deleteLineup(id) {
    const d = drafts();
    delete d.upserts[id];
    if (baseLineups().some(l => l.id === id) && !d.deleted.includes(id)) d.deleted.push(id);
    store(KEYS.drafts, d);
  }

  function draftCount() {
    const d = drafts();
    return Object.keys(d.upserts).length + d.deleted.length;
  }

  function clearDrafts() {
    store(KEYS.drafts, { upserts: {}, deleted: [] });
  }

  function newId(mapSlug, title) {
    const rand = Math.random().toString(36).slice(2, 6);
    return [mapSlug, slug(title).slice(0, 40), rand].filter(Boolean).join('-');
  }

  function exportLineupsFile() {
    const list = allLineups().sort((a, b) =>
      a.map.localeCompare(b.map) || (a.site || '').localeCompare(b.site || '') || a.title.localeCompare(b.title));
    const header = `/*
 * Base de données des lineups — exportée le ${new Date().toLocaleString('fr-FR')}.
 * Remplace data/lineups.js par ce fichier.
 * Images : assets/lineups/<map>/<fichier>
 */
`;
    const content = `${header}window.LINEUPS = ${JSON.stringify(list, null, 2)};\n`;
    const blob = new Blob([content], { type: 'text/javascript' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'lineups.js';
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    return list.length;
  }

  /* ---------- UI partagée ---------- */

  function toast(message, type = 'info') {
    let host = document.querySelector('.toasts');
    if (!host) {
      host = document.createElement('div');
      host.className = 'toasts';
      document.body.append(host);
    }
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.textContent = message;
    host.append(t);
    setTimeout(() => t.classList.add('out'), 2800);
    setTimeout(() => t.remove(), 3200);
  }

  // Bandeau « modifications non exportées », commun aux pages.
  function renderDraftBar() {
    let bar = document.querySelector('.draft-bar');
    const count = draftCount();
    if (!count) {
      bar?.remove();
      return;
    }
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'draft-bar';
      document.body.append(bar);
    }
    bar.innerHTML = `
      <span class="draft-dot"></span>
      <span><strong>${count}</strong> modification${count > 1 ? 's' : ''} non exportée${count > 1 ? 's' : ''}</span>
      <button class="btn btn-sm btn-red" data-act="export">Exporter lineups.js</button>
      <button class="btn btn-sm btn-ghost" data-act="clear" title="Supprimer les brouillons du navigateur">Vider</button>`;
    bar.querySelector('[data-act=export]').onclick = () => {
      const n = exportLineupsFile();
      toast(`${n} lineup${n > 1 ? 's' : ''} exportée${n > 1 ? 's' : ''} — remplace data/lineups.js par le fichier téléchargé.`, 'ok');
    };
    bar.querySelector('[data-act=clear]').onclick = () => {
      if (!confirm('Vider les brouillons ? Les modifications non exportées seront perdues.\n(À faire après avoir remplacé data/lineups.js par le fichier exporté.)')) return;
      clearDrafts();
      location.reload();
    };
  }

  // Image avec repli élégant quand le fichier n'existe pas (encore).
  function imgOrPlaceholder(src, label, cls = '') {
    const ph = `<div class="img-ph ${cls}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z M4 15l4-4 4 4 3-3 5 5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="15.5" cy="9" r="1.5" fill="currentColor"/></svg><span>${escapeHtml(label)}</span></div>`;
    if (!src) return ph;
    return `<img class="${cls}" src="${escapeHtml(src)}" alt="${escapeHtml(label)}" loading="lazy" onerror="this.outerHTML=this.nextElementSibling.innerHTML"><template>${ph}</template>`;
  }

  return {
    config, slug, escapeHtml, param, round,
    getMaps, getMap, getAgent, mapRotation, impactFor, playerBadge, ability, abilityColor, abilityBadge, typeIcon, lineupType, impactFirst,
    allLineups, lineupsForMap, getLineup, isDraft, discardDraft, inFile, saveLineup, deleteLineup,
    draftCount, clearDrafts, newId, exportLineupsFile,
    toast, renderDraftBar, imgOrPlaceholder,
    localPreviews: {},
  };
})();
