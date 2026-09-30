// Catalogue ------------------------------------------------------------
const PRODUCTS = [
  { id: 1, name: 'Padel Club', price: 39, tag: 'Best-seller',
    desc: 'Le logo du club, imprimé grand format sur le torse. Coton peigné 180 g.',
    colors: [['Nuit', '#0b1b2b', '#f3f1e7'], ['Forêt', '#14532d', '#f3f1e7'], ['Noir', '#141414', '#f3f1e7']], img: 'assets/padel-vitre.webp' },
  { id: 2, name: 'Pas ce soir, j\'ai padel', price: 39, tag: 'Nouveau',
    desc: 'Pour décliner toutes les invitations, avec le sourire.',
    colors: [['Blanc', '#ffffff', '#1b2b4b'], ['Sable', '#efe3c8', '#1b2b4b'], ['Ciel', '#bfe0ff', '#1b2b4b']], img: 'assets/pas-ce-soir.webp' },
  { id: 3, name: 'Côté Drive', price: 39,
    desc: 'Je prends tout à droite. Le t-shirt des joueurs de droite.',
    colors: [['Blanc', '#ffffff', '#1b2b4b'], ['Sable', '#efe3c8', '#1b2b4b'], ['Lime', '#d4ff3a', '#1b2b4b']], img: 'assets/cote-drive.webp' },
  { id: 4, name: 'Côté Revés', price: 39,
    desc: 'Je finis les points. Le t-shirt des joueurs de gauche.',
    colors: [['Blanc', '#ffffff', '#1b2b4b'], ['Sable', '#efe3c8', '#1b2b4b'], ['Lime', '#d4ff3a', '#1b2b4b']], img: 'assets/cote-reves.webp' },
  { id: 5, name: 'Lob. Vitre. Point.', price: 39, tag: 'Nouveau',
    desc: 'La seule tactique qui compte. Impression grand format, encre haute densité.',
    colors: [['Blanc', '#ffffff', '#1b2b4b'], ['Sable', '#efe3c8', '#1b2b4b'], ['Ciel', '#bfe0ff', '#1b2b4b']], img: 'assets/lob-vitre-point.webp' },
  { id: 6, name: 'Padel Côte d\'Azur', price: 42, tag: 'Édition été',
    desc: 'Soleil, vitres et bandejas. Le t-shirt des sessions au coucher du soleil.',
    colors: [['Blanc', '#ffffff', '#1b2b4b'], ['Sable', '#efe3c8', '#1b2b4b'], ['Ciel', '#bfe0ff', '#1b2b4b']], img: 'assets/cote-azur.webp' }
];
const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const FREE_SHIPPING = 80;

// T-shirt SVG ---------------------------------------------------------
function shirt(bg, collar, img) {
  const shade = 'rgba(0,0,0,.09)';
  return `<svg viewBox="0 0 400 400" role="img" aria-label="T-shirt">
    <path d="M140 52c16 22 104 22 120 0l84 36 40 78-52 28-24-30v198c0 10-8 18-18 18H110c-10 0-18-8-18-18V164l-24 30-52-28 40-78z" fill="${bg}" stroke="rgba(11,27,43,.18)" stroke-width="2" stroke-linejoin="round"/>
    <path d="M140 52c16 22 104 22 120 0" fill="none" stroke="${collar}" stroke-width="7" stroke-linecap="round"/>
    <path d="M92 164L58 96M308 164l34-68" stroke="${shade}" stroke-width="3" stroke-linecap="round"/>
    <image href="${img}" x="120" y="96" width="160" height="186" preserveAspectRatio="xMidYMid meet"/>
  </svg>`;
}
const isLight = hex => { const n = parseInt(hex.slice(1), 16); return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 > 150; };
const cardBg = bg => (isLight(bg) ? '#eef0ea' : '#dfe6ee');

// Hero / split illustrations
document.getElementById('heroShirt').innerHTML = shirt('#ffffff', '#1b2b4b', 'assets/pas-ce-soir.webp');
document.getElementById('splitShirt').innerHTML = shirt('#0b1b2b', '#f3f1e7', 'assets/padel-vitre.webp');

// Grille produits -----------------------------------------------------
const grid = document.getElementById('grid');
const state = {}; // id -> {color, size}

function renderGrid(filter = 'all') {
  const list = PRODUCTS;
  grid.innerHTML = list.map(p => {
    const s = state[p.id] || (state[p.id] = { color: 0, size: 'M' });
    const [, bg, fg] = p.colors[s.color];
    return `<article class="card" data-id="${p.id}">
      <div class="card-img" style="background:${cardBg(bg)}">
        ${p.tag ? `<span class="tag">${p.tag}</span>` : ''}
        ${shirt(bg, fg, p.img)}
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
    const scroll = window.scrollY;
    renderGrid();
    window.scrollTo(0, scroll);
  } else if (e.target.closest('.add')) {
    addToCart(p, s);
  }
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
        <div class="thumb" style="background:${cardBg(bg)}">${shirt(bg, fg, p.img)}</div>
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
