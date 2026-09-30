/* Terre de Pilates — scripts du thème */
(function () {
  'use strict';

  /* Apparition douce des sections au scroll */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { observer.observe(el); });
  }

  /* Boutons +/- de quantité */
  function initQuantity(root) {
    (root || document).querySelectorAll('.quantity').forEach(function (wrapper) {
      if (wrapper.dataset.bound) return;
      wrapper.dataset.bound = 'true';
      var input = wrapper.querySelector('input');
      wrapper.querySelectorAll('button[data-step]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var min = parseInt(input.min || '0', 10);
          var next = (parseInt(input.value, 10) || 0) + parseInt(btn.dataset.step, 10);
          input.value = Math.max(min, next);
          input.dispatchEvent(new Event('change', { bubbles: true }));
        });
      });
    });
  }

  /* Sélecteur de variantes sur la fiche produit */
  function initVariantPicker() {
    document.querySelectorAll('[data-product-form]').forEach(function (form) {
      var dataEl = form.querySelector('script[data-variants]');
      if (!dataEl) return;
      var variants = JSON.parse(dataEl.textContent);
      var idInput = form.querySelector('input[name="id"]');
      var submit = form.querySelector('[type="submit"]');
      var section = form.closest('[data-section]') || document;
      var priceEl = section.querySelector('[data-price]');
      var fieldsets = form.querySelectorAll('.variant-picker');

      function selectedOptions() {
        return Array.prototype.map.call(fieldsets, function (fs) {
          var checked = fs.querySelector('input:checked');
          return checked ? checked.value : null;
        });
      }

      function update() {
        var opts = selectedOptions();
        var variant = variants.find(function (v) {
          return v.options.every(function (o, i) { return o === opts[i]; });
        });

        fieldsets.forEach(function (fs, index) {
          var legendValue = fs.querySelector('[data-selected-value]');
          if (legendValue) legendValue.textContent = opts[index] || '';
          fs.querySelectorAll('input').forEach(function (input) {
            var candidate = opts.slice();
            candidate[index] = input.value;
            var match = variants.find(function (v) {
              return v.options.every(function (o, i) { return o === candidate[i]; });
            });
            var label = form.querySelector('label[for="' + input.id + '"]');
            if (label) label.classList.toggle('is-unavailable', !match || !match.available);
          });
        });

        if (!variant) {
          submit.disabled = true;
          submit.textContent = submit.dataset.unavailable;
          return;
        }

        idInput.value = variant.id;
        submit.disabled = !variant.available;
        submit.textContent = variant.available ? submit.dataset.add : submit.dataset.soldout;

        if (priceEl) {
          var html = '<span class="price__current">' + variant.price_formatted + '</span>';
          if (variant.compare_at_price > variant.price) {
            html += ' <s>' + variant.compare_at_formatted + '</s>';
            priceEl.classList.add('price--sale');
          } else {
            priceEl.classList.remove('price--sale');
          }
          priceEl.innerHTML = html;
        }

        if (variant.featured_media_id) {
          var media = section.querySelector('[data-media-id="' + variant.featured_media_id + '"]');
          if (media && media.parentNode.firstElementChild !== media) {
            media.parentNode.insertBefore(media, media.parentNode.firstElementChild);
          }
        }

        var url = new URL(window.location.href);
        url.searchParams.set('variant', variant.id);
        window.history.replaceState({}, '', url.toString());
      }

      form.addEventListener('change', function (e) {
        if (e.target.closest('.variant-picker')) update();
      });
    });
  }

  /* Panier : mise à jour automatique des quantités */
  function initCart() {
    var cartForm = document.querySelector('[data-cart-form]');
    if (!cartForm) return;
    var timer;
    cartForm.addEventListener('change', function (e) {
      if (e.target.name !== 'updates[]') return;
      clearTimeout(timer);
      timer = setTimeout(function () { cartForm.submit(); }, 500);
    });
  }

  /* Tri de collection */
  function initSort() {
    document.querySelectorAll('[data-sort-select]').forEach(function (select) {
      select.addEventListener('change', function () {
        var url = new URL(window.location.href);
        url.searchParams.set('sort_by', select.value);
        url.searchParams.delete('page');
        window.location.href = url.toString();
      });
    });
  }

  /* Ferme le menu mobile avec Échap */
  function initMenuDrawer() {
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      document.querySelectorAll('details[open].menu-drawer, .facets details[open]').forEach(function (d) {
        d.removeAttribute('open');
      });
    });
  }

  function init() {
    initReveal();
    initQuantity();
    initVariantPicker();
    initCart();
    initSort();
    initMenuDrawer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', function (e) {
    initReveal();
    initQuantity(e.target);
    initVariantPicker();
  });
})();
