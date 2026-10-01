(function () {
  'use strict';
  var T = window.theme || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  // Prix au format de la boutique (le même que celui affiché par Shopify au chargement)
  var fmt = function (cents) {
    var f = T.moneyFormat;
    if (f && f.indexOf('{{') > -1) {
      var sep = function (n, d, t, dec) {
        var p = (n / 100).toFixed(d).split('.');
        return p[0].replace(/\B(?=(\d{3})+(?!\d))/g, t) + (p[1] ? dec + p[1] : '');
      };
      return f.replace(/\{\{\s*(\w+)\s*\}\}/, function (m, k) {
        if (k === 'amount_with_comma_separator') return sep(cents, 2, '.', ',');
        if (k === 'amount_no_decimals') return sep(cents, 0, ',', '.');
        if (k === 'amount_no_decimals_with_comma_separator') return sep(cents, 0, '.', ',');
        if (k === 'amount_with_space_separator') return sep(cents, 2, ' ', ',');
        if (k === 'amount_with_apostrophe_separator') return sep(cents, 2, "'", '.');
        return sep(cents, 2, ',', '.');
      }).replace(/<[^>]*>/g, '');
    }
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
      if (label) label.textContent = e.target.dataset.label || e.target.value;
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
      syncSticky();
    });

    // Galerie : flèches et balayage entre les images visibles (couleur choisie)
    var galMain = document.querySelector('.gallery-main');
    var stepMedia = function (dir) {
      var vis = slides.filter(function (sl) { return !sl.hidden; });
      if (vis.length < 2) return;
      var i = vis.findIndex(function (sl) { return sl.classList.contains('on'); });
      showMedia(vis[(i + dir + vis.length) % vis.length].dataset.mediaId);
    };
    var navState = function () {
      if (galMain) galMain.classList.toggle('single', slides.filter(function (sl) { return !sl.hidden; }).length < 2);
    };
    [].forEach.call(document.querySelectorAll('[data-gal]'), function (b) {
      b.addEventListener('click', function () { stepMedia(+b.dataset.gal); });
    });
    if (galMain) {
      var x0 = null, y0 = 0;
      galMain.addEventListener('touchstart', function (e) { if (e.target.closest('.slide-3d')) return; x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
      galMain.addEventListener('touchend', function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
        x0 = null;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) stepMedia(dx < 0 ? 1 : -1);
      }, { passive: true });
    }
    navState();
    form.addEventListener('change', navState);

    // Guide des tailles (fenêtre)
    var guide = document.querySelector('[data-guide]');
    if (guide && typeof guide.showModal === 'function') {
      document.addEventListener('click', function (e) {
        if (e.target.closest('[data-guide-open]')) {
          // Met en avant la ligne de la taille choisie
          var picked = [].map.call(form.querySelectorAll('input[type=radio]:checked'), function (r) { return r.value; });
          [].forEach.call(guide.querySelectorAll('tr[data-size]'), function (tr) { tr.classList.toggle('is-current', picked.indexOf(tr.dataset.size) > -1); });
          guide.showModal();
        }
        else if (e.target.closest('[data-guide-close]') || e.target === guide) guide.close();
      });
    } else {
      [].forEach.call(document.querySelectorAll('[data-guide-open]'), function (b) { b.hidden = true; });
    }

    // Barre d'achat fixe sur mobile : visible quand le bouton principal n'est plus à l'écran
    var sticky = document.querySelector('[data-sticky-atc]');
    function syncSticky() {
      if (!sticky) return;
      var names = [].map.call(form.querySelectorAll('input[type=radio]:checked'), function (r) { return r.dataset.label || r.value; });
      sticky.querySelector('[data-sticky-variant]').textContent = names.join(' · ');
      sticky.querySelector('[data-sticky-price]').textContent = $('#productPrice').textContent;
      var sb = sticky.querySelector('[data-sticky-add]');
      sb.disabled = btn.disabled && btn.textContent !== 'Ajouter au panier';
      sb.textContent = btn.textContent === 'Ajouter au panier' ? 'Ajouter' : btn.textContent;
    }
    if (sticky) {
      syncSticky();
      sticky.querySelector('[data-sticky-add]').addEventListener('click', function () {
        if (form.requestSubmit) form.requestSubmit(btn); else btn.click();
      });
      var buyRow = form.querySelector('.buy-row');
      if (buyRow && 'IntersectionObserver' in window) {
        new IntersectionObserver(function (en) {
          var off = !en[0].isIntersecting;
          sticky.classList.toggle('show', off);
          sticky.setAttribute('aria-hidden', off ? 'false' : 'true');
          sticky.querySelector('[data-sticky-add]').tabIndex = off ? 0 : -1;
        }).observe(buyRow);
      }
    }

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

// Page collection : filtres couleur et taille, tri, sans rechargement.
// Avec une couleur choisie, la carte montre la photo de cette couleur et mène à cette variante.
(function () {
  var root = document.querySelector('[data-coll]');
  if (!root) return;
  var grid = root.querySelector('[data-grid]');
  if (!grid) return;
  var cards = [].slice.call(grid.querySelectorAll('[data-card]'));
  var sortSel = root.querySelector('[data-sort]');
  var countEl = root.querySelector('[data-count]');
  var emptyEl = root.querySelector('[data-empty]');
  var groups = [].slice.call(root.querySelectorAll('.fdrop'));
  function list(s) { return (s || '').split('|').filter(Boolean); }

  cards.forEach(function (c, i) {
    c._i = i;
    c._colors = list(c.dataset.colors);
    c._sizes = list(c.dataset.sizes);
    c._combos = list(c.dataset.combos).map(function (x) { var p = x.split('/'); return { c: p[0], s: p[1] }; });
    c._imgs = {};   // [[couleur, photo, photo au survol, id de variante], …]
    try { JSON.parse(c.dataset.imgs || '[]').forEach(function (r) { c._imgs[r[0]] = r.slice(1); }); } catch (e) {}
    var main = c.querySelector('.card-img-main'), alt = c.querySelector('.card-img-alt');
    c._orig = {
      main: main && { src: main.getAttribute('src'), srcset: main.getAttribute('srcset') },
      alt: alt && { src: alt.getAttribute('src'), srcset: alt.getAttribute('srcset') },
      hrefs: [].map.call(c.querySelectorAll('.card-media,.card-title a'), function (a) { return a.getAttribute('href'); })
    };
  });

  function checked(name) {
    var g = root.querySelector('.fdrop[data-group="' + name + '"]');
    return g ? [].map.call(g.querySelectorAll('input:checked'), function (i) { return i.value; }) : [];
  }

  function setImg(img, src, srcset) {
    if (!img) return;
    if (srcset) img.setAttribute('srcset', srcset); else img.removeAttribute('srcset');
    img.setAttribute('src', src);
  }

  function show(c, colorKey) {
    var main = c.querySelector('.card-img-main'), alt = c.querySelector('.card-img-alt');
    var links = c.querySelectorAll('.card-media,.card-title a');
    var d = colorKey && c._imgs[colorKey];
    if (d && d[0]) {
      setImg(main, d[0]);
      if (alt) { if (d[1]) setImg(alt, d[1]); else setImg(alt, d[0]); }
      [].forEach.call(links, function (a) { a.setAttribute('href', c.dataset.url + (d[2] ? '?variant=' + d[2] : '')); });
    } else {
      if (c._orig.main) setImg(main, c._orig.main.src, c._orig.main.srcset);
      if (c._orig.alt) setImg(alt, c._orig.alt.src, c._orig.alt.srcset);
      [].forEach.call(links, function (a, i) { a.setAttribute('href', c._orig.hrefs[i]); });
    }
  }

  function apply(push) {
    var cs = checked('couleur'), ss = checked('taille'), n = 0;
    cards.forEach(function (c) {
      var ok = true;
      if (cs.length || ss.length) {
        var combos = c._combos.length ? c._combos : [{ c: '', s: '' }];
        ok = combos.some(function (k) {
          return (!cs.length || cs.indexOf(k.c) > -1) && (!ss.length || ss.indexOf(k.s) > -1);
        });
      }
      c.hidden = !ok;
      if (ok) n++;
      var key = null;
      if (ok && cs.length) for (var i = 0; i < cs.length; i++) if (c._colors.indexOf(cs[i]) > -1) { key = cs[i]; break; }
      show(c, key);
    });

    var mode = sortSel ? sortSel.value : '';
    var sorted = cards.slice().sort(function (a, b) {
      if (mode === 'prix-croissant') return a.dataset.price - b.dataset.price || a._i - b._i;
      if (mode === 'prix-decroissant') return b.dataset.price - a.dataset.price || a._i - b._i;
      if (mode === 'nouveautes') return b.dataset.date - a.dataset.date || a._i - b._i;
      if (mode === 'a-z') return a.dataset.title.localeCompare(b.dataset.title, 'fr');
      return a._i - b._i;
    });
    sorted.forEach(function (c) { grid.appendChild(c); });

    if (countEl) countEl.textContent = n + (n > 1 ? ' produits' : ' produit');
    if (emptyEl) emptyEl.hidden = n > 0;
    groups.forEach(function (g) {
      var k = g.querySelectorAll('input:checked').length, b = g.querySelector('[data-fcount]');
      if (b) b.textContent = k ? k : '';
    });
    [].forEach.call(root.querySelectorAll('.fclear[data-clear]'), function (b) { b.hidden = !(cs.length || ss.length); });

    if (push && window.history && history.replaceState) {
      var u = new URL(location.href);
      ['couleur', 'taille', 'tri'].forEach(function (p) { u.searchParams.delete(p); });
      if (cs.length) u.searchParams.set('couleur', cs.join(','));
      if (ss.length) u.searchParams.set('taille', ss.join(','));
      if (mode) u.searchParams.set('tri', mode);
      history.replaceState(null, '', u.toString());
    }
  }

  // État de départ depuis l'adresse (lien partagé)
  var q = new URLSearchParams(location.search);
  [['couleur', 'couleur'], ['taille', 'taille']].forEach(function (p) {
    var v = (q.get(p[0]) || '').split(',');
    [].forEach.call(root.querySelectorAll('.fdrop[data-group="' + p[1] + '"] input'), function (i) { i.checked = v.indexOf(i.value) > -1; });
  });
  if (sortSel && q.get('tri')) sortSel.value = q.get('tri');

  root.addEventListener('change', function (e) {
    if (e.target.matches('.fdrop input, [data-sort]')) apply(true);
  });
  root.addEventListener('click', function (e) {
    if (!e.target.closest('[data-clear]')) return;
    [].forEach.call(root.querySelectorAll('.fdrop input'), function (i) { i.checked = false; });
    groups.forEach(function (g) { g.open = false; });
    apply(true);
  });
  // Un seul menu ouvert à la fois ; clic à l'extérieur ou Échap pour fermer
  groups.forEach(function (g) {
    g.addEventListener('toggle', function () { if (g.open) groups.forEach(function (o) { if (o !== g) o.open = false; }); });
  });
  document.addEventListener('click', function (e) { groups.forEach(function (g) { if (g.open && !g.contains(e.target)) g.open = false; }); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    groups.forEach(function (g) { if (g.open) { g.open = false; g.querySelector('summary').focus(); } });
  });

  apply(false);
})();

// Produits associés : remplace la sélection de la collection par les recommandations de Shopify quand il y en a
(function () {
  var box = document.querySelector('[data-reco-url]');
  if (!box || !window.fetch) return;
  fetch(box.dataset.recoUrl).then(function (r) { return r.ok ? r.text() : ''; }).then(function (html) {
    if (!html) return;
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var res = doc.querySelector('[data-reco-result]');
    if (!res || res.querySelectorAll('.card').length < 2) return;
    box.querySelector('[data-reco-grid]').innerHTML = res.innerHTML;
    box.hidden = false;
  }).catch(function () {});
})();
