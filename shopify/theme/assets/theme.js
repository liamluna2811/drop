(function () {
  'use strict';
  var T = window.theme || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var fmt = function (cents) {
    try { return new Intl.NumberFormat(T.locale || undefined, { style: 'currency', currency: T.currency || 'EUR' }).format(cents / 100); }
    catch (e) { return (cents / 100).toFixed(2) + ' €'; }
  };
  var esc = function (s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; };
  var json = { 'Content-Type': 'application/json', Accept: 'application/json' };

  var drawer = $('#drawer'), overlay = $('#overlay');
  function toggle(open) {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  var toastTimer;
  function toast(msg) {
    var t = $('#toast'); if (!t) return;
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2400);
  }

  function render(cart) {
    var count = cart.item_count, total = cart.total_price;
    var badge = $('#cartCount'); if (badge) badge.textContent = count;
    var totalEl = $('#cartTotal'); if (totalEl) totalEl.textContent = fmt(total);
    var ship = $('#shipMsg');
    if (ship) {
      var min = T.freeShipping || 0;
      ship.textContent = !count || !min ? '' : total >= min ? '🎉 Livraison offerte !' : 'Plus que ' + fmt(min - total) + ' pour la livraison offerte.';
    }
    var box = $('#cartItems'); if (!box) return;
    if (!count) { box.innerHTML = '<p class="empty">Ton panier est vide.<br>Il est temps de s\'équiper 🎾</p>'; return; }
    box.innerHTML = cart.items.map(function (i) {
      var img = i.image ? '<img src="' + esc(i.image) + '" alt="" width="70" height="70">' : '';
      var variant = i.variant_title ? '<small>' + esc(i.variant_title) + '</small>' : '';
      return '<div class="line" data-key="' + esc(i.key) + '" data-qty="' + i.quantity + '">' +
        '<a class="thumb" href="' + esc(i.url) + '">' + img + '</a>' +
        '<div><h4>' + esc(i.product_title) + '</h4>' + variant +
        '<div class="qty"><button type="button" data-a="dec" aria-label="Moins">−</button><span>' + i.quantity + '</span><button type="button" data-a="inc" aria-label="Plus">+</button></div></div>' +
        '<div class="right"><strong>' + fmt(i.final_line_price) + '</strong><br><button type="button" class="rm" data-a="rm">Retirer</button></div></div>';
    }).join('');
  }

  function getCart() { return fetch('/cart.js', { headers: { Accept: 'application/json' } }).then(function (r) { return r.json(); }); }
  function change(key, qty) {
    return fetch('/cart/change.js', { method: 'POST', headers: json, body: JSON.stringify({ id: key, quantity: qty }) })
      .then(function (r) { return r.json(); }).then(render);
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('#openCart')) { e.preventDefault(); getCart().then(render); toggle(true); }
    else if (e.target.closest('#closeCart') || e.target === overlay) toggle(false);
    var a = e.target.closest('#cartItems [data-a]');
    if (a) {
      var row = a.closest('.line'), q = +row.dataset.qty, act = a.dataset.a;
      change(row.dataset.key, act === 'inc' ? q + 1 : act === 'dec' ? q - 1 : 0);
    }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });

  // Page produit ---------------------------------------------------------
  var form = $('#product-form');
  var dataEl = $('#product-json');
  if (form && dataEl) {
    var variants = JSON.parse(dataEl.textContent);
    var btn = $('#addToCart'), err = $('#formError');

    var slides = [].slice.call(document.querySelectorAll('.slide'));
    var thumbs = [].slice.call(document.querySelectorAll('.thumb'));
    var colorInput = form.querySelector('input[data-color-option]');
    var colorIdx = colorInput ? +colorInput.dataset.index : -1;

    // Couleur de chaque image : détectée dans le nom du fichier, sinon via l'image de la variante
    var mediaColor = {};
    if (colorIdx > -1) {
      variants.forEach(function (v) {
        if (v.featured_media) mediaColor[v.featured_media.id] = v.options[colorIdx];
      });
    }
    var colorOf = function (el) { return el.dataset.color || mediaColor[el.dataset.mediaId || el.dataset.thumb] || ''; };

    var loadScript = function (src) {
      return new Promise(function (resolve, reject) {
        var el = document.createElement('script');
        el.src = src; el.async = true;
        el.onload = resolve;
        el.onerror = function () { reject(new Error('fichier introuvable : ' + src)); };
        document.head.appendChild(el);
      });
    };
    var load3D = function () {
      if (load3D.done) return;
      load3D.done = true;
      var host = document.querySelector('.slide-3d');
      var cfg = (window.theme || {}).bottle;
      if (!host || !cfg) return;
      var canvasHost = host.querySelector('[data-3d-canvas]');
      var fail = function (err) {
        if (window.console) console.error('Modèle 3D :', err);
        canvasHost.textContent = 'Le modèle 3D n\'a pas pu se charger (' + (err && err.message ? err.message : err) + ').';
        load3D.done = false;
      };
      canvasHost.textContent = 'Chargement du modèle 3D…';
      (window.BottleViewer ? Promise.resolve() : loadScript(cfg.module)).then(function () {
        canvasHost.textContent = '';
        var viewer = window.BottleViewer.mount(host, { bodyTexture: cfg.texture });
        if (!viewer) load3D.done = false;
      }).catch(fail);
    };

    var showMedia = function (id) {
      if (!id) return;
      if (String(id) === '3d') load3D();
      slides.forEach(function (s) { s.classList.toggle('on', s.dataset.mediaId == id); });
      thumbs.forEach(function (t) { t.classList.toggle('on', t.dataset.thumb == id); });
    };
    thumbs.forEach(function (t) {
      t.addEventListener('click', function () { showMedia(t.dataset.thumb); });
    });

    // N'affiche que les images de la couleur choisie (les images sans couleur restent visibles)
    var filterByColor = function (color, preferredId) {
      var visible = [];
      slides.forEach(function (s) {
        var c = colorOf(s), show = !c || !color || c === color;
        s.hidden = !show;
        if (show) visible.push(s.dataset.mediaId);
      });
      thumbs.forEach(function (t) {
        var c = colorOf(t), show = !c || !color || c === color;
        t.hidden = !show;
      });
      var wrap = document.querySelector('.thumbs');
      if (wrap) wrap.hidden = visible.length < 2;
      var pick = preferredId && visible.indexOf(String(preferredId)) > -1 ? preferredId : visible[0];
      showMedia(pick);
    };

    var selectedColor = function () {
      var r = colorInput && form.querySelector('input[data-color-option]:checked');
      return r ? r.value : '';
    };
    var lastColor = selectedColor();
    if (colorIdx > -1) {
      var v0 = variants.find(function (v) { return String(v.id) === $('#variantId').value; });
      filterByColor(lastColor, v0 && v0.featured_media && v0.featured_media.id);
    }

    var current = function () {
      var picked = [];
      form.querySelectorAll('input[type=radio]:checked').forEach(function (r) { picked[+r.dataset.index] = r.value; });
      if (!picked.length) return variants[0];
      return variants.find(function (v) { return v.options.every(function (o, i) { return o === picked[i]; }); });
    };

    form.addEventListener('change', function (e) {
      if (e.target.type !== 'radio') return;
      var idx = e.target.dataset.index, label = $('[data-selected-name="' + idx + '"]');
      if (label) label.textContent = e.target.value;
      var v = current();
      err.hidden = true;
      if (!v) { btn.disabled = true; btn.textContent = 'Indisponible'; return; }
      $('#variantId').value = v.id;
      $('#productPrice').textContent = fmt(v.price);
      btn.disabled = !v.available;
      btn.textContent = v.available ? 'Ajouter au panier' : 'Épuisé';
      var color = selectedColor();
      if (colorIdx > -1 && color !== lastColor) { lastColor = color; filterByColor(color, v.featured_media && v.featured_media.id); }
      history.replaceState(null, '', '?variant=' + v.id);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (btn.disabled) return;
      btn.disabled = true;
      fetch('/cart/add.js', { method: 'POST', headers: json, body: JSON.stringify({ items: [{ id: +$('#variantId').value, quantity: +$('#quantity').value || 1 }] }) })
        .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
        .then(function (res) {
          if (!res.ok) { err.textContent = res.d.description || 'Impossible d\'ajouter ce produit.'; err.hidden = false; return; }
          return getCart().then(function (c) { render(c); toggle(true); toast('Ajouté au panier ✓'); });
        })
        .catch(function () { err.textContent = 'Une erreur est survenue. Réessaie.'; err.hidden = false; })
        .then(function () { btn.disabled = false; });
    });
  }

  // Langue : FR / EN (traduction automatique Google, chargée uniquement si le visiteur choisit EN) --------
  (function () {
    var buttons = [].slice.call(document.querySelectorAll('.lang-btn'));
    if (!buttons.length) return;
    var loaded = false;

    function setCookie(name, value, days) {
      var d = new Date(); d.setTime(d.getTime() + (days || 0) * 864e5);
      var exp = days ? '; expires=' + d.toUTCString() : '; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      var host = location.hostname, parts = host.split('.');
      document.cookie = name + '=' + value + exp + '; path=/';
      document.cookie = name + '=' + value + exp + '; path=/; domain=' + host;
      if (parts.length > 2) document.cookie = name + '=' + value + exp + '; path=/; domain=.' + parts.slice(-2).join('.');
    }
    function current() {
      return /(?:^|; )googtrans=\/fr\/en/.test(document.cookie) ? 'en' : 'fr';
    }
    function mark(lang) {
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false'); });
      document.documentElement.setAttribute('data-lang', lang);
    }
    function load(cb) {
      if (loaded) { cb && cb(); return; }
      loaded = true;
      window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement({ pageLanguage: 'fr', includedLanguages: 'en,fr', autoDisplay: false }, 'google_translate_element');
        cb && cb();
      };
      var s = document.createElement('script');
      s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      s.async = true;
      document.head.appendChild(s);
    }
    function applyEnglish() {
      var tries = 0;
      (function wait() {
        var sel = document.querySelector('.goog-te-combo');
        if (sel) { sel.value = 'en'; sel.dispatchEvent(new Event('change')); return; }
        if (tries++ < 40) setTimeout(wait, 150);
      })();
    }
    function choose(lang) {
      if (lang === current() && (lang === 'fr' || loaded)) return;
      if (lang === 'en') {
        setCookie('googtrans', '/fr/en', 365);
        mark('en');
        load(applyEnglish);
      } else {
        setCookie('googtrans', '', 0);
        mark('fr');
        location.reload();
      }
    }
    buttons.forEach(function (b) { b.addEventListener('click', function () { choose(b.dataset.lang); }); });
    if (current() === 'en') { mark('en'); load(); } else { mark('fr'); }
  })();
})();

// Apparition douce des blocs au défilement
(function () {
  var els = [].slice.call(document.querySelectorAll('.reveal'));
  if (!els.length) return;
  function showAll() { els.forEach(function (e) { e.classList.add('in'); }); }
  if (!('IntersectionObserver' in window)) { showAll(); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  els.forEach(function (e) { io.observe(e); });
  setTimeout(showAll, 4000);
})();

// Raquette 3D de l'accueil : chargée seulement sur ordinateur, si les animations ne sont pas réduites
(function () {
  var el = document.querySelector('[data-racket]');
  if (!el || !window.matchMedia) return;
  if (!matchMedia('(min-width: 900px)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var root = document.documentElement;
  var s = document.createElement('script');
  s.src = el.dataset.src; s.async = true;
  s.onload = function () {
    if (!window.RacketFX) return;
    root.classList.add('racket-live');
    var ok = window.RacketFX.mount(el, { logo: el.dataset.logo, guard: el.dataset.guard === '1', ball: el.dataset.ball === '1', size: (parseFloat(el.dataset.size) || 100) / 100 });
    if (!ok) root.classList.remove('racket-live');
  };
  document.head.appendChild(s);
})();

// Hauteur du bandeau + en-tête fixés en haut (sert aux éléments qui se placent juste dessous)
(function () {
  var head = document.getElementById('shopify-section-header');
  var bar = document.querySelector('.topbar');
  function measure() {
    var h = head ? head.getBoundingClientRect().height : ((bar ? bar.offsetHeight : 0) + (document.querySelector('.nav') || { offsetHeight: 72 }).offsetHeight);
    document.documentElement.style.setProperty('--sticky-h', Math.round(h) + 'px');
    if (bar) document.documentElement.style.setProperty('--topbar-h', bar.offsetHeight + 'px');
  }
  measure();
  window.addEventListener('resize', measure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
})();

// Vitres de l'accueil : éclat et vibration à chaque rebond de la balle
(function () {
  if (!document.querySelector('.glass-wall') || !window.matchMedia || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  window.addEventListener('bc:ballbounce', function (e) {
    var fx = document.querySelector('.racket-fx');
    if (fx && parseFloat(fx.style.opacity || 1) < 0.5) return;   // balle déjà effacée avant le pied de page
    var side = document.querySelector(e.detail.side === 'left' ? '.glass-l' : '.glass-r');
    if (!side || getComputedStyle(side).display === 'none') return;
    var r = side.getBoundingClientRect();
    var hit = document.createElement('span');
    hit.className = 'glass-hit';
    hit.style.left = (e.detail.side === 'left' ? r.right : r.left) + 'px';
    hit.style.top = e.detail.y + 'px';
    document.body.appendChild(hit);
    setTimeout(function () { hit.remove(); }, 850);
    side.classList.remove('shake'); void side.offsetWidth; side.classList.add('shake');
  });
})();

// Fond terrain de padel derrière la bannière : sol, lignes et filet, en perspective avec les vitres
(function () {
  var box = document.querySelector('[data-court]');
  if (!box) return;
  function draw() {
    if (!document.documentElement.classList.contains('racket-live')) return;
    var W = box.clientWidth, H = box.clientHeight;
    if (!W || !H) return;
    var g = document.querySelector('.glass-l');
    var gw = g && getComputedStyle(g).display !== 'none' ? g.getBoundingClientRect().width : 0;
    var vy = 0.40 * H, cx = W / 2, fh = 0.86 * H - vy, fx = cx - gw;
    function P(x, z) { return [cx + fx * (x / 5) / z, vy + fh / z]; }   // x en mètres (demi-largeur 5 m), z profondeur relative
    function ln(a, b, w, c) { return '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="' + c + '" stroke-width="' + w + '"/>'; }
    var zNet = 2.6, zServ = 1 + (zNet - 1) * 0.35, white = 'rgba(255,255,255,.95)';
    var Ln = P(-5, zNet), Rn = P(5, zNet);
    var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" focusable="false">' +
      '<defs><linearGradient id="court-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--court-floor);stop-opacity:0"/><stop offset=".25" style="stop-color:var(--court-floor);stop-opacity:.55"/><stop offset="1" style="stop-color:var(--court-floor);stop-opacity:.8"/></linearGradient>' +
      '<pattern id="court-net" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M0 0H9M0 0V9" stroke="rgba(11,27,43,.28)" stroke-width="1" fill="none"/></pattern></defs>' +
      '<polygon points="0,' + H + ' ' + W + ',' + H + ' ' + W + ',' + 0.86 * H + ' ' + Rn + ' ' + Ln + ' 0,' + 0.86 * H + '" fill="url(#court-floor)"/>' +
      ln([0, H], [gw, 0.86 * H], 3, white) + ln([W, H], [W - gw, 0.86 * H], 3, white) +
      ln(P(-5, 1), Ln, 3, white) + ln(P(5, 1), Rn, 3, white) +
      '<g class="court-lines">' + ln(P(-5, zServ), P(5, zServ), 3, white) + ln(P(0, zServ), P(0, 0.33), 3, white) + ln(Ln, Rn, 3, white);
    if (box.dataset.net === '1') {
      var nh = (Ln[1] - vy) * 0.55, ny = Ln[1] - nh;
      s += '<rect x="' + Ln[0] + '" y="' + ny + '" width="' + (Rn[0] - Ln[0]) + '" height="' + nh + '" fill="url(#court-net)"/>' +
        ln([Ln[0], ny], [Rn[0], ny], 4, '#fff') + ln([Ln[0], ny - 2], [Rn[0], ny - 2], 1, 'rgba(11,27,43,.25)') +
        ln(Ln, [Ln[0], ny - 3], 3, 'rgba(11,27,43,.3)') + ln(Rn, [Rn[0], ny - 3], 3, 'rgba(11,27,43,.3)');
    }
    box.innerHTML = s + '</g></svg>';
    fade();
  }
  // Après la bannière, le filet et les lignes de service s'effacent : il ne reste que le sol et ses bords
  var hero = box.closest('.shopify-section') || box.parentNode;
  function fade() {
    var g = box.querySelector('.court-lines');
    if (!g) return;
    var end = hero.offsetTop + hero.offsetHeight - window.innerHeight;
    g.style.opacity = Math.max(0, Math.min(1, 1 - (window.scrollY - end) / (window.innerHeight * 0.5)));
  }
  window.addEventListener('scroll', fade, { passive: true });
  var t;
  function later() { clearTimeout(t); t = setTimeout(draw, 120); }
  window.addEventListener('resize', later);
  if (window.MutationObserver) new MutationObserver(later).observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });
  later();
})();

// La balle s'efface juste avant le pied de page, pour ne jamais cacher ses liens
(function () {
  var fx = document.querySelector('.racket-fx'), foot = document.querySelector('.footer');
  if (!fx || !foot) return;
  function upd() {
    var top = foot.getBoundingClientRect().top, h = window.innerHeight;
    fx.style.opacity = Math.max(0, Math.min(1, (top - h) / (h * 0.3)));
  }
  window.addEventListener('scroll', upd, { passive: true });
  window.addEventListener('resize', upd);
  upd();
})();
