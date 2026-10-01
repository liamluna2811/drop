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
  // Noms de couleurs Printful en français (même table que snippets/color-label.liquid)
  var COLORS = { 'white': 'Blanc', 'black': 'Noir', 'vintage black': 'Noir', 'navy': 'Bleu marine', 'navy blue': 'Bleu marine', 'french navy': 'Bleu marine', 'midnight navy': 'Bleu marine',
    'royal': 'Bleu roi', 'royal blue': 'Bleu roi', 'true royal': 'Bleu roi', 'carolina blue': 'Bleu ciel', 'sky blue': 'Bleu ciel', 'light blue': 'Bleu ciel', 'baby blue': 'Bleu ciel',
    'red': 'Rouge', 'azalea': 'Rose', 'pink': 'Rose', 'hot pink': 'Rose', 'gold': 'Jaune', 'daisy': 'Jaune', 'yellow': 'Jaune', 'neon orange': 'Orange fluo', 'safety orange': 'Orange fluo',
    'orange': 'Orange', 'forest green': 'Vert forêt', 'forest': 'Vert forêt', 'dark green': 'Vert forêt', 'green': 'Vert', 'kelly green': 'Vert', 'grey': 'Gris', 'gray': 'Gris',
    'heather grey': 'Gris', 'sport grey': 'Gris', 'athletic heather': 'Gris', 'charcoal': 'Anthracite', 'dark heather': 'Anthracite', 'dark grey': 'Anthracite',
    'sand': 'Sable', 'natural': 'Sable', 'cream': 'Sable', 'beige': 'Sable', 'ivory': 'Sable' };
  var colorLabel = function (v) { return COLORS[String(v).toLowerCase().trim()] || v; };
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
    var badge = $('#cartCount'); if (badge) { badge.textContent = count; badge.dataset.n = count; }
    var totalEl = $('#cartTotal'); if (totalEl) totalEl.textContent = fmt(total);
    // Barre de progression vers la livraison offerte
    var min = T.freeShipping || 0;
    [].forEach.call(document.querySelectorAll('[data-ship]'), function (el) {
      el.hidden = !count || !min;
      var left = min - total, pct = min ? Math.min(100, Math.round(total * 100 / min)) : 100;
      el.classList.toggle('done', left <= 0);
      el.querySelector('[data-ship-msg]').innerHTML = left > 0
        ? 'Plus que <strong>' + esc(fmt(left)) + '</strong> pour la livraison offerte'
        : '<strong>Livraison offerte</strong> sur cette commande';
      var bar = el.querySelector('[data-ship-bar]');
      bar.setAttribute('aria-valuenow', pct);
      bar.firstElementChild.style.width = pct + '%';
    });
    var box = $('#cartItems'); if (!box) return;
    if (!count) { box.innerHTML = '<div class="empty">Ton panier est vide.<br>Il est temps de s\'équiper 🎾<p><a class="btn" href="' + esc(T.collectionUrl || '/collections/all') + '">Voir la collection</a></p></div>'; return; }
    box.innerHTML = cart.items.map(function (i) {
      var img = i.image ? '<img src="' + esc(i.image) + '" alt="" width="70" height="70">' : '';
      var opts = (i.options_with_values || []).filter(function (o) { return o.value !== 'Default Title'; }).map(function (o) {
        return /^(colou?r|couleur)$/i.test(o.name) ? colorLabel(o.value) : o.value;
      });
      var variant = opts.length ? '<small>' + esc(opts.join(' · ')) + '</small>' : '';
      return '<div class="line" data-key="' + esc(i.key) + '" data-qty="' + i.quantity + '">' +
        '<a class="thumb" href="' + esc(i.url) + '">' + img + '</a>' +
        '<div><h4>' + esc(i.product_title) + '</h4>' + variant +
        '<div class="qty"><button type="button" data-a="dec" aria-label="Moins">−</button><span>' + i.quantity + '</span><button type="button" data-a="inc" aria-label="Plus">+</button></div></div>' +
        '<div class="right"><strong>' + fmt(i.final_line_price) + '</strong><br><button type="button" class="rm" data-a="rm">Retirer</button></div></div>';
    }).join('');
  }

  // Détourage du t-shirt : sur une photo à fond uni, le fond est retiré dans le navigateur
  // (remplissage depuis les bords). Renvoie une image PNG transparente, ou null si la photo ne s'y prête pas.
  function cutout(src) {
    return new Promise(function (resolve) {
      var im = new Image();
      im.crossOrigin = 'anonymous';
      im.onerror = function () { resolve(null); };
      im.onload = function () {
        try {
          var W = 300, H = Math.round(W * im.naturalHeight / im.naturalWidth) || W;
          var cv = document.createElement('canvas'); cv.width = W; cv.height = H;
          var cx = cv.getContext('2d'); cx.drawImage(im, 0, 0, W, H);
          var d = cx.getImageData(0, 0, W, H), px = d.data, n = W * H;
          // Couleur du fond = moyenne du contour ; il doit être uni
          var border = [], i, x, y;
          for (x = 0; x < W; x++) { border.push(x, (H - 1) * W + x); }
          for (y = 0; y < H; y++) { border.push(y * W, y * W + W - 1); }
          var r = 0, g = 0, b = 0;
          border.forEach(function (k) { r += px[k * 4]; g += px[k * 4 + 1]; b += px[k * 4 + 2]; });
          r /= border.length; g /= border.length; b /= border.length;
          var dist = function (k) { return Math.abs(px[k * 4] - r) + Math.abs(px[k * 4 + 1] - g) + Math.abs(px[k * 4 + 2] - b); };
          var uniform = border.filter(function (k) { return dist(k) < 30; }).length / border.length;
          if (uniform < 0.9) return resolve(null);           // photo avec décor ou mannequin : pas de détourage
          // Remplissage depuis les bords : tout ce qui ressemble au fond devient transparent
          var TOL = 34, seen = new Uint8Array(n), stack = border.slice(), removed = 0;
          while (stack.length) {
            var k = stack.pop();
            if (seen[k]) continue;
            seen[k] = 1;
            if (dist(k) > TOL) continue;
            px[k * 4 + 3] = 0; removed++;
            x = k % W; y = (k - x) / W;
            if (x > 0) stack.push(k - 1); if (x < W - 1) stack.push(k + 1);
            if (y > 0) stack.push(k - W); if (y < H - 1) stack.push(k + W);
          }
          if (removed / n > 0.88 || removed / n < 0.15) return resolve(null);   // le t-shirt a été « mangé » : abandon
          // Bords adoucis : pixels proches du fond voisins d'un pixel retiré
          for (i = 0; i < n; i++) {
            if (!px[i * 4 + 3]) continue;
            x = i % W; y = (i - x) / W;
            var edge = (x > 0 && !px[(i - 1) * 4 + 3]) || (x < W - 1 && !px[(i + 1) * 4 + 3]) || (y > 0 && !px[(i - W) * 4 + 3]) || (y < H - 1 && !px[(i + W) * 4 + 3]);
            if (edge) px[i * 4 + 3] = Math.min(255, Math.round(255 * Math.max(0.35, (dist(i) - TOL) / TOL)));
          }
          cx.putImageData(d, 0, 0);
          // Recadrage au plus près du t-shirt
          var x0 = W, y0 = H, x1 = 0, y1 = 0;
          for (i = 0; i < n; i++) if (px[i * 4 + 3] > 40) { x = i % W; y = (i - x) / W; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
          if (x1 <= x0 || y1 <= y0) return resolve(null);
          // Forme d'un t-shirt seul ? Un mannequin donne une silhouette haute (jambes)
          // ou une tête étroite au-dessus des épaules : la photo est alors écartée.
          var bw = x1 - x0 + 1, bh = y1 - y0 + 1, ratio = bh / bw;
          if (ratio > 1.4 || ratio < 0.65) return resolve(null);
          // Moyenne de couleur et largeur des pixels gardés dans une zone
          var zone = function (ya, yb, xa, xb) {
            var c = 0, R = 0, G = 0, B = 0, wsum = 0, rows = 0;
            for (var yy = Math.round(y0 + bh * ya); yy < y0 + bh * yb; yy++) {
              var rc = 0; rows++;
              for (var xx = Math.round(x0 + bw * xa); xx < x0 + bw * xb; xx++) {
                var q = (yy * W + xx) * 4;
                if (px[q + 3] > 40) { rc++; c++; R += px[q]; G += px[q + 1]; B += px[q + 2]; }
              }
              wsum += rc;
            }
            return { w: rows ? wsum / rows : 0, r: c ? R / c : 0, g: c ? G / c : 0, b: c ? B / c : 0, n: c };
          };
          var maxW = 0;
          for (y = y0; y <= y1; y += 2) { var cw = 0; for (x = x0; x <= x1; x++) if (px[(y * W + x) * 4 + 3] > 40) cw++; if (cw > maxW) maxW = cw; }
          var top = zone(0, 0.15, 0, 1);
          var fl = zone(0.45, 0.6, 0.15, 0.3), fr = zone(0.45, 0.6, 0.7, 0.85);
          var fn = fl.n + fr.n || 1;
          var fab = { r: (fl.r * fl.n + fr.r * fr.n) / fn, g: (fl.g * fl.n + fr.g * fr.n) / fn, b: (fl.b * fl.n + fr.b * fr.n) / fn };
          var diff = Math.abs(top.r - fab.r) + Math.abs(top.g - fab.g) + Math.abs(top.b - fab.b);
          if (maxW && top.w / maxW < 0.45 && diff > 70) return resolve(null);   // tête au-dessus du t-shirt
          var out = document.createElement('canvas'); out.width = x1 - x0 + 1; out.height = y1 - y0 + 1;
          out.getContext('2d').drawImage(cv, x0, y0, out.width, out.height, 0, 0, out.width, out.height);
          resolve({ url: out.toDataURL('image/png'), ratio: out.height / out.width });
        } catch (e) { resolve(null); }   // image d'un autre domaine sans autorisation : pas de détourage
      };
      im.src = src;
    });
  }
  // Petite version de l'image Shopify (plus rapide à détourer)
  function small(src) {
    try { var u = new URL(src, location.href); u.searchParams.set('width', '400'); return u.toString(); } catch (e) { return src; }
  }

  // Animation d'ajout : le t-shirt détouré (sinon la photo) vole jusqu'à l'icône du panier
  function flyToCart(img, cut) {
    var target = $('#openCart');
    if (!img || !target || !img.animate || matchMedia('(prefers-reduced-motion: reduce)').matches) return Promise.resolve();
    var a = img.getBoundingClientRect(), b = target.getBoundingClientRect();
    if (!a.width || !b.width) return Promise.resolve();
    var size = Math.min(a.width, a.height, 260) * (cut ? 0.8 : 1);
    var h = cut ? size * cut.ratio : size;
    var x0 = a.left + a.width / 2 - size / 2, y0 = Math.max(a.top + a.height / 2 - h / 2, 8);
    if (a.bottom < 60 || a.top > window.innerHeight - 60) {
      // Photo hors de l'écran (achat depuis la barre du bas sur mobile) : départ du bas de l'écran
      size = 120; h = cut ? size * cut.ratio : size; x0 = window.innerWidth / 2 - size / 2; y0 = window.innerHeight - h - 90;
    }
    var dx = b.left + b.width / 2 - (x0 + size / 2), dy = b.top + b.height / 2 - (y0 + h / 2);
    var end = 26 / Math.max(size, h);
    var fly = document.createElement('img');
    fly.className = 'fly-img' + (cut ? ' cut' : ''); fly.alt = '';
    fly.src = cut ? cut.url : (img.currentSrc || img.src);
    fly.style.cssText = 'left:' + x0 + 'px;top:' + y0 + 'px;width:' + size + 'px;height:' + h + 'px';
    document.body.appendChild(fly);
    var r0 = cut ? '0' : '16px', r1 = cut ? '0' : '40%', r2 = cut ? '0' : '50%';
    var anim = fly.animate([
      { transform: 'translate(0,0) scale(1)', opacity: 1, borderRadius: r0 },
      { transform: 'translate(' + dx * 0.45 + 'px,' + (dy * 0.45 - 90) + 'px) scale(.55) rotate(-10deg)', opacity: 1, borderRadius: r1, offset: 0.45 },
      { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + end + ') rotate(-20deg)', opacity: 0.35, borderRadius: r2 }
    ], { duration: 800, easing: 'cubic-bezier(.45,0,.25,1)' });
    return new Promise(function (res) {
      var done = function () { fly.remove(); res(); };
      anim.onfinish = done; setTimeout(done, 1000);
    });
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

    // T-shirt détouré pour l'animation d'ajout : préparé à l'avance pour la couleur choisie
    var cuts = {};
    var prepareCut = function () {
      var key = selectedColor() || '_';
      if (cuts[key]) return cuts[key];
      var cands = slides.filter(function (sl) { return !sl.hidden && sl.querySelector('img'); }).map(function (sl) { return sl.querySelector('img'); });
      var rank = function (im) {
        var u = (im.getAttribute('src') || '').toLowerCase();
        return /-front-and-back|-left-front|-right-front/.test(u) ? 2 : /-front[-.]/.test(u) ? 0 : /-back/.test(u) ? 3 : 1;
      };
      cands.sort(function (p, q) { return rank(p) - rank(q); });
      cuts[key] = cands.slice(0, 12).reduce(function (prev, im) {
        return prev.then(function (found) { return found || cutout(small(im.currentSrc || im.src)); });
      }, Promise.resolve(null));
      return cuts[key];
    };
    var idle = window.requestIdleCallback || function (f) { return setTimeout(f, 800); };
    idle(prepareCut);
    form.addEventListener('change', function () { idle(prepareCut); });

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
          var waitCut = Promise.race([prepareCut(), new Promise(function (r) { setTimeout(function () { r(null); }, 400); })]);
          return Promise.all([getCart(), waitCut.then(function (cut) { return flyToCart(document.querySelector('.slide.on img'), cut); })]).then(function (r) {
            render(r[0]);
            var cb = $('#openCart');
            if (cb) { cb.classList.remove('bump'); void cb.offsetWidth; cb.classList.add('bump'); }
            toast('Ajouté au panier ✓');
          });
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

// Menu mobile (panneau latéral)
(function () {
  var dlg = document.querySelector('[data-menu]'), btn = document.querySelector('[data-menu-open]');
  if (!dlg || !btn || typeof dlg.showModal !== 'function') return;
  function close() {
    if (!dlg.open) return;
    dlg.classList.add('closing');
    setTimeout(function () { dlg.classList.remove('closing'); dlg.close(); }, 220);
  }
  btn.addEventListener('click', function () { dlg.showModal(); btn.setAttribute('aria-expanded', 'true'); });
  dlg.addEventListener('close', function () { btn.setAttribute('aria-expanded', 'false'); });
  dlg.addEventListener('cancel', function (e) { e.preventDefault(); close(); });
  dlg.addEventListener('click', function (e) {
    if (e.target === dlg || e.target.closest('[data-menu-close]')) close();
  });
  // Si l'écran s'élargit (rotation, fenêtre), le menu se ferme
  window.addEventListener('resize', function () { if (window.innerWidth > 860 && dlg.open) dlg.close(); });
})();

// Recherche : la loupe ouvre une barre de recherche (sinon, le lien mène à la page de recherche)
(function () {
  var dlg = document.querySelector('[data-search]');
  if (!dlg || typeof dlg.showModal !== 'function') return;
  document.addEventListener('click', function (e) {
    var open = e.target.closest('[data-search-open]');
    if (open) { e.preventDefault(); dlg.showModal(); var i = dlg.querySelector('input[type=search]'); if (i) i.focus(); return; }
    if (e.target.closest('[data-search-close]') || e.target === dlg) dlg.close();
  });
})();
