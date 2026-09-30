// Catalogue ------------------------------------------------------------
const PRODUCTS = [
  { id: 1, name: 'La Bandeja', price: 39, cat: ['homme'], tag: 'Best-seller',
    desc: 'Le classique du club. Léger, respirant, coupe athlétique.',
    colors: [['Nuit', '#0b1b2b', '#d4ff3a'], ['Lime', '#d4ff3a', '#0b1b2b'], ['Blanc', '#ffffff', '#0b1b2b']], design: 'stripe' },
  { id: 2, name: 'La Víbora', price: 42, cat: ['femme'],
    desc: 'Coupe ajustée, dos légèrement plus long, tissu ultra-doux.',
    colors: [['Corail', '#ff6b57', '#ffffff'], ['Ciel', '#9fd3ff', '#0b1b2b'], ['Lilas', '#c9b6ff', '#0b1b2b']], design: 'ball' },
  { id: 3, name: 'Le Smash', price: 45, cat: ['homme', 'limited'], tag: 'Édition limitée',
    desc: 'Série numérotée à 300 exemplaires. Imprimé graphique exclusif.',
    colors: [['Noir', '#141414', '#d4ff3a'], ['Rouge', '#e63b2e', '#ffffff']], design: 'bolt' },
  { id: 4, name: 'La Chiquita', price: 39, cat: ['femme'],
    desc: 'Le t-shirt du quotidien : doux, léger, séchage express.',
    colors: [['Menthe', '#a8ecd0', '#0b1b2b'], ['Rose', '#ffb3c7', '#0b1b2b'], ['Blanc', '#ffffff', '#ff6b57']], design: 'circle' },
  { id: 5, name: 'Le Globo', price: 44, cat: ['homme'], tag: 'Nouveau',
    desc: 'Dégradé sublimé, col rond renforcé, anti-UV 50+.',
    colors: [['Océan', '#2563eb', '#d4ff3a'], ['Forêt', '#14532d', '#d4ff3a']], design: 'wave' },
  { id: 6, name: 'Le Remate', price: 49, cat: ['femme', 'limited'], tag: 'Édition limitée',
    desc: 'Notre pièce signature en série courte. Coutures contrastées.',
    colors: [['Sable', '#efe3c8', '#0b1b2b'], ['Lime', '#d4ff3a', '#0b1b2b']], design: 'racket' }
];
const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const FREE_SHIPPING = 60;

// T-shirt SVG ---------------------------------------------------------
function graphic(design, c) {
  switch (design) {
    case 'stripe': return `<rect x="120" y="150" width="160" height="14" fill="${c}"/><rect x="120" y="176" width="160" height="6" fill="${c}"/>`;
    case 'ball': return `<circle cx="200" cy="175" r="34" fill="${c}"/><path d="M170 160c18 4 42 4 60 0M170 190c18-4 42-4 60 0" stroke="${c === '#ffffff' ? '#0b1b2b' : '#fff'}" stroke-opacity=".0" fill="none"/>`;
    case 'bolt': return `<path d="M215 120l-48 68h32l-14 52 52-74h-34z" fill="${c}"/>`;
    case 'circle': return `<circle cx="200" cy="175" r="38" fill="none" stroke="${c}" stroke-width="8"/><circle cx="200" cy="175" r="12" fill="${c}"/>`;
    case 'wave': return `<path d="M130 175q17-24 34 0t34 0 34 0 34 0" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round"/><path d="M130 200q17-24 34 0t34 0 34 0 34 0" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round" opacity=".5"/>`;
    case 'racket': return `<ellipse cx="200" cy="160" rx="30" ry="38" fill="none" stroke="${c}" stroke-width="8"/><rect x="195" y="196" width="10" height="42" rx="4" fill="${c}"/><circle cx="192" cy="150" r="3" fill="${c}"/><circle cx="208" cy="150" r="3" fill="${c}"/><circle cx="200" cy="165" r="3" fill="${c}"/><circle cx="192" cy="178" r="3" fill="${c}"/><circle cx="208" cy="178" r="3" fill="${c}"/>`;
  }
  return '';
}
function shirt(bg, fg, design) {
  const shade = 'rgba(0,0,0,.09)';
  return `<svg viewBox="0 0 400 400" role="img" aria-label="T-shirt">
    <path d="M140 52c16 22 104 22 120 0l84 36 40 78-52 28-24-30v198c0 10-8 18-18 18H130c-10 0-18-8-18-18V164l-24 30-52-28 40-78z" fill="${bg}" stroke="rgba(11,27,43,.18)" stroke-width="2" stroke-linejoin="round"/>
    <path d="M140 52c16 22 104 22 120 0" fill="none" stroke="${fg}" stroke-width="7" stroke-linecap="round"/>
    <path d="M112 164l-24 30M288 164l24 30" stroke="${shade}" stroke-width="3"/>
    <path d="M112 300h176" stroke="${shade}" stroke-width="2"/>
    ${graphic(design, fg)}
  </svg>`;
}
const isLight = hex => { const n = parseInt(hex.slice(1), 16); return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 > 150; };
const cardBg = bg => (isLight(bg) ? '#eef0ea' : '#dfe6ee');

// Hero / split illustrations
document.getElementById('heroShirt').innerHTML = shirt('#d4ff3a', '#0b1b2b', 'bolt');
document.getElementById('splitShirt').innerHTML = shirt('#0b1b2b', '#d4ff3a', 'racket');

// Grille produits -----------------------------------------------------
const grid = document.getElementById('grid');
const state = {}; // id -> {color, size}

function renderGrid(filter = 'all') {
  const list = PRODUCTS.filter(p => filter === 'all' || p.cat.includes(filter));
  grid.innerHTML = list.map(p => {
    const s = state[p.id] || (state[p.id] = { color: 0, size: 'M' });
    const [, bg, fg] = p.colors[s.color];
    return `<article class="card" data-id="${p.id}">
      <div class="card-img" style="background:${cardBg(bg)}">
        ${p.tag ? `<span class="tag">${p.tag}</span>` : ''}
        ${shirt(bg, fg, p.design)}
      </div>
      <div class="card-body">
        <div class="card-top"><h3>${p.name}</h3><span class="price">${p.price} €</span></div>
        <p class="desc">${p.desc}</p>
        <div class="swatches">${p.colors.map((c, i) => `<button class="sw ${i === s.color ? 'on' : ''}" data-color="${i}" style="background:${c[1]}" aria-label="${c[0]}" title="${c[0]}"></button>`).join('')}</div>
        <div class="sizes">${SIZES.map(z => `<button class="size ${z === s.size ? 'on' : ''}" data-size="${z}">${z}</button>`).join('')}</div>
        <button class="add">Ajouter au panier</button>
      </div>
    </article>`;
  }).join('');
}

grid.addEventListener('click', e => {
  const card = e.target.closest('.card');
  if (!card) return;
  const id = +card.dataset.id, s = state[id], p = PRODUCTS.find(x => x.id === id);
  const sw = e.target.closest('.sw'), sz = e.target.closest('.size');
  if (sw || sz) {
    if (sw) s.color = +sw.dataset.color;
    if (sz) s.size = sz.dataset.size;
    const active = document.querySelector('.chip.active').dataset.f;
    const scroll = window.scrollY;
    renderGrid(active);
    window.scrollTo(0, scroll);
  } else if (e.target.closest('.add')) {
    addToCart(p, s);
  }
});

document.getElementById('filters').addEventListener('click', e => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c === chip));
  renderGrid(chip.dataset.f);
});

// Panier ---------------------------------------------------------------
let cart = [];
try { cart = JSON.parse(localStorage.getItem('bc-cart')) || []; } catch (_) {}
const $ = id => document.getElementById(id);
const save = () => { try { localStorage.setItem('bc-cart', JSON.stringify(cart)); } catch (_) {} };

function addToCart(p, s) {
  const key = `${p.id}-${s.color}-${s.size}`;
  const line = cart.find(l => l.key === key);
  if (line) line.qty++;
  else cart.push({ key, id: p.id, color: s.color, size: s.size, qty: 1 });
  renderCart(); toast(`${p.name} ajouté au panier ✓`);
}

function renderCart() {
  save();
  const count = cart.reduce((n, l) => n + l.qty, 0);
  const total = cart.reduce((n, l) => n + l.qty * PRODUCTS.find(p => p.id === l.id).price, 0);
  $('cartCount').textContent = count;
  $('cartTotal').textContent = `${total} €`;
  $('shipMsg').textContent = !count ? '' : total >= FREE_SHIPPING ? '🎉 Livraison offerte !' : `Plus que ${FREE_SHIPPING - total} € pour la livraison offerte.`;
  $('cartItems').innerHTML = !count ? '<p class="empty">Ton panier est vide.<br>Il est temps de s\'équiper 🎾</p>' :
    cart.map(l => {
      const p = PRODUCTS.find(x => x.id === l.id), [name, bg, fg] = p.colors[l.color];
      return `<div class="line" data-key="${l.key}">
        <div class="thumb" style="background:${cardBg(bg)}">${shirt(bg, fg, p.design)}</div>
        <div><h4>${p.name}</h4><small>${name} · ${l.size}</small>
          <div class="qty"><button data-a="dec" aria-label="Moins">−</button><span>${l.qty}</span><button data-a="inc" aria-label="Plus">+</button></div></div>
        <div style="text-align:right"><strong>${p.price * l.qty} €</strong><br><button class="rm" data-a="rm">Retirer</button></div>
      </div>`;
    }).join('');
}

$('cartItems').addEventListener('click', e => {
  const a = e.target.dataset.a, row = e.target.closest('.line');
  if (!a || !row) return;
  const l = cart.find(x => x.key === row.dataset.key);
  if (a === 'inc') l.qty++;
  if (a === 'dec') l.qty--;
  if (a === 'rm') l.qty = 0;
  cart = cart.filter(x => x.qty > 0);
  renderCart();
});

const toggle = open => { $('drawer').classList.toggle('open', open); $('overlay').classList.toggle('open', open); };
$('openCart').onclick = () => toggle(true);
$('closeCart').onclick = $('overlay').onclick = () => toggle(false);
document.addEventListener('keydown', e => e.key === 'Escape' && toggle(false));
$('checkout').onclick = () => toast(cart.length ? 'Démo : le paiement sera branché ici 💳' : 'Ajoute d\'abord un t-shirt !');

let toastTimer;
function toast(msg) {
  const t = $('toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

$('nlForm').addEventListener('submit', e => {
  e.preventDefault(); e.target.reset();
  $('nlMsg').textContent = 'Bienvenue au club ! Ton code −10 % : BANDEJA10';
});

renderGrid(); renderCart();
