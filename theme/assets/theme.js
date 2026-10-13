/* ==========================================================================
   Thème « Canapé » — theme.js
   JavaScript léger, sans dépendance. Tout fonctionne aussi sans JS
   (formulaires classiques), le JS ne fait qu'améliorer l'expérience.
   ========================================================================== */
(function () {
  'use strict';

  var theme = window.theme || { routes: {}, strings: {} };

  /* ---------- Tiroirs (menu mobile, filtres, panier) ---------- */
  var lastFocused = null;

  function getFocusable(el) {
    return Array.prototype.slice.call(
      el.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter(function (node) {
      return node.offsetParent !== null;
    });
  }

  function openDrawer(drawer, trigger) {
    if (!drawer) return;
    lastFocused = trigger || document.activeElement;
    drawer.classList.add('is-open');
    document.body.classList.add('is-locked');
    document.querySelectorAll('[aria-controls="' + drawer.id + '"]').forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'true');
    });
    var panel = drawer.querySelector('.drawer__panel');
    window.setTimeout(function () {
      (panel || drawer).focus();
    }, 50);
  }

  function closeDrawer(drawer) {
    if (!drawer || !drawer.classList.contains('is-open')) return;
    drawer.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    document.querySelectorAll('[aria-controls="' + drawer.id + '"]').forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false');
    });
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  document.addEventListener('click', function (event) {
    var opener = event.target.closest('[data-drawer-open]');
    if (opener) {
      event.preventDefault();
      openDrawer(document.getElementById(opener.getAttribute('data-drawer-open')), opener);
      return;
    }
    var closer = event.target.closest('[data-drawer-close]');
    if (closer) {
      event.preventDefault();
      closeDrawer(closer.closest('.drawer'));
    }
  });

  document.addEventListener('keydown', function (event) {
    var openDrawerEl = document.querySelector('.drawer.is-open');
    if (!openDrawerEl) return;

    if (event.key === 'Escape') {
      closeDrawer(openDrawerEl);
      return;
    }

    if (event.key === 'Tab') {
      var focusable = getFocusable(openDrawerEl);
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  /* ---------- Recherche ---------- */
  var searchToggle = document.querySelector('[data-search-toggle]');
  var searchPanel = document.getElementById('HeaderSearch');
  if (searchToggle && searchPanel) {
    searchToggle.addEventListener('click', function () {
      var isHidden = searchPanel.hasAttribute('hidden');
      searchPanel.toggleAttribute('hidden', !isHidden);
      searchToggle.setAttribute('aria-expanded', String(isHidden));
      if (isHidden) searchPanel.querySelector('input[type="search"]').focus();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !searchPanel.hasAttribute('hidden')) {
        searchPanel.setAttribute('hidden', '');
        searchToggle.setAttribute('aria-expanded', 'false');
        searchToggle.focus();
      }
    });
  }

  /* ---------- Menus déroulants (ordinateur) ---------- */
  var dropdowns = document.querySelectorAll('[data-menu-dropdown]');
  dropdowns.forEach(function (details) {
    details.addEventListener('toggle', function () {
      if (!details.open) return;
      dropdowns.forEach(function (other) {
        if (other !== details) other.removeAttribute('open');
      });
    });
  });
  document.addEventListener('click', function (event) {
    dropdowns.forEach(function (details) {
      if (details.open && !details.contains(event.target)) details.removeAttribute('open');
    });
  });
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    dropdowns.forEach(function (details) {
      if (details.open) {
        details.removeAttribute('open');
        details.querySelector('summary').focus();
      }
    });
  });

  /* ---------- Bandeau d'annonce rotatif ---------- */
  var announcement = document.querySelector('[data-announcement]');
  if (announcement) {
    var messages = announcement.querySelectorAll('.announcement-bar__message');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (messages.length > 1 && !reduceMotion) {
      var current = 0;
      var interval = (parseInt(announcement.getAttribute('data-interval'), 10) || 5) * 1000;
      var timer = window.setInterval(rotate, interval);
      announcement.addEventListener('mouseenter', function () {
        window.clearInterval(timer);
      });
      announcement.addEventListener('mouseleave', function () {
        timer = window.setInterval(rotate, interval);
      });
    }
    function rotate() {
      messages[current].setAttribute('aria-hidden', 'true');
      current = (current + 1) % messages.length;
      messages[current].removeAttribute('aria-hidden');
    }
  }

  /* ---------- Tri automatique ---------- */
  document.querySelectorAll('[data-auto-submit]').forEach(function (select) {
    select.addEventListener('change', function () {
      select.form.submit();
    });
  });

  /* ---------- Panier ---------- */
  function updateCartCount(count) {
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.textContent = count > 0 ? count : '';
    });
  }

  function refreshCartDrawer(sectionsHtml) {
    if (!sectionsHtml || !sectionsHtml['cart-drawer']) return;
    var drawer = document.getElementById('CartDrawer');
    if (!drawer) return;
    var doc = new DOMParser().parseFromString(sectionsHtml['cart-drawer'], 'text/html');
    var fresh = doc.getElementById('CartDrawer');
    if (!fresh) return;
    var wasOpen = drawer.classList.contains('is-open');
    drawer.innerHTML = fresh.innerHTML;
    if (wasOpen) drawer.classList.add('is-open');
  }

  function cartRequest(url, body) {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body)
    }).then(function (response) {
      return response.json().then(function (data) {
        if (!response.ok || data.status) {
          throw new Error(data.description || data.message || theme.strings.cartError);
        }
        return data;
      });
    });
  }

  function changeLine(line, quantity) {
    var drawer = document.getElementById('CartDrawer');
    var onCartPage = !!document.querySelector('[data-cart-page]');
    if (drawer) drawer.classList.add('is-busy');

    return cartRequest(theme.routes.cart_change_url + '.js', {
      line: line,
      quantity: quantity,
      sections: onCartPage ? [] : ['cart-drawer'],
      sections_url: window.location.pathname
    })
      .then(function (cart) {
        if (onCartPage) {
          window.location.reload();
          return;
        }
        updateCartCount(cart.item_count);
        refreshCartDrawer(cart.sections);
      })
      .catch(function (error) {
        window.alert(error.message);
      })
      .finally(function () {
        if (drawer) drawer.classList.remove('is-busy');
      });
  }

  document.addEventListener('click', function (event) {
    var btn = event.target.closest('[data-cart-change]');
    if (!btn) return;
    event.preventDefault();
    changeLine(parseInt(btn.getAttribute('data-line'), 10), Math.max(0, parseInt(btn.getAttribute('data-quantity'), 10)));
  });

  document.addEventListener('change', function (event) {
    var input = event.target.closest('[data-cart-quantity]');
    if (!input) return;
    var quantity = Math.max(0, parseInt(input.value, 10) || 0);
    changeLine(parseInt(input.getAttribute('data-line'), 10), quantity);
  });

  // L'icône panier ouvre le tiroir au lieu de changer de page
  var cartToggle = document.querySelector('[data-cart-toggle]');
  if (cartToggle && theme.cartType === 'drawer' && document.getElementById('CartDrawer')) {
    cartToggle.addEventListener('click', function (event) {
      event.preventDefault();
      openDrawer(document.getElementById('CartDrawer'), cartToggle);
    });
  }

  /* ---------- Fiche produit ---------- */
  document.querySelectorAll('[data-product]').forEach(function (productEl) {
    var form = productEl.querySelector('[data-product-form]');
    var variantInput = productEl.querySelector('[data-variant-id]');
    var addButton = productEl.querySelector('[data-add-to-cart]');
    var errorEl = productEl.querySelector('[data-form-error]');
    var priceEl = productEl.querySelector('[data-product-price] [data-price]');
    var inventoryEl = productEl.querySelector('[data-inventory]');
    var picker = productEl.querySelector('[data-variant-picker]');
    var gallery = productEl.querySelector('[data-gallery]');
    var thumbs = productEl.querySelectorAll('[data-thumb]');
    var variantsJson = productEl.querySelector('[data-variants]');
    var variants = variantsJson ? JSON.parse(variantsJson.textContent) : [];

    /* Galerie : miniatures + synchronisation au défilement */
    function setActiveThumb(mediaId) {
      thumbs.forEach(function (thumb) {
        thumb.setAttribute('aria-current', String(thumb.getAttribute('data-thumb') === String(mediaId)));
      });
    }

    function showMedia(mediaId) {
      if (!gallery || !mediaId) return;
      var slide = gallery.querySelector('[data-media-id="' + mediaId + '"]');
      if (!slide) return;
      if (window.getComputedStyle(gallery).display === 'grid') {
        slide.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        gallery.scrollTo({ left: slide.offsetLeft - gallery.offsetLeft, behavior: 'smooth' });
      }
      setActiveThumb(mediaId);
    }

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        showMedia(thumb.getAttribute('data-thumb'));
      });
    });

    if (gallery && 'IntersectionObserver' in window && thumbs.length) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
              setActiveThumb(entry.target.getAttribute('data-media-id'));
            }
          });
        },
        { root: gallery, threshold: 0.6 }
      );
      gallery.querySelectorAll('[data-media-id]').forEach(function (slide) {
        observer.observe(slide);
      });
    }

    /* Quantité */
    var qtyInput = productEl.querySelector('.quantity__input');
    var qtyMinus = productEl.querySelector('[data-qty-minus]');
    var qtyPlus = productEl.querySelector('[data-qty-plus]');
    if (qtyInput && qtyMinus && qtyPlus) {
      qtyMinus.addEventListener('click', function () {
        qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1);
      });
      qtyPlus.addEventListener('click', function () {
        qtyInput.value = (parseInt(qtyInput.value, 10) || 1) + 1;
      });
    }

    /* Sélection des options */
    function getSelectedOptions() {
      return Array.prototype.map.call(picker.querySelectorAll('fieldset'), function (fieldset) {
        var checked = fieldset.querySelector('input:checked');
        return checked ? checked.value : null;
      });
    }

    function updateAvailability(selected) {
      picker.querySelectorAll('fieldset').forEach(function (fieldset, index) {
        fieldset.querySelectorAll('input').forEach(function (input) {
          var candidate = selected.slice();
          candidate[index] = input.value;
          var available = variants.some(function (variant) {
            return variant.available && variant.options.every(function (opt, i) {
              return opt === candidate[i];
            });
          });
          input.classList.toggle('is-unavailable', !available);
        });
      });
    }

    function renderPrice(variant) {
      if (!priceEl) return;
      var html = '';
      if (variant.compare_at_price) {
        html =
          '<span class="price__sale">' + variant.price + '</span>' +
          '<s class="price__compare">' + variant.compare_at_price + '</s>';
      } else {
        html = '<span class="price__regular">' + variant.price + '</span>';
      }
      priceEl.innerHTML = html;
    }

    function renderInventory(variant) {
      if (!inventoryEl) return;
      var text = inventoryEl.querySelector('[data-inventory-text]');
      if (!text) return;
      var low = parseInt(inventoryEl.getAttribute('data-low-threshold'), 10) || 3;
      text.className = 'inventory-note';
      if (!variant.available) {
        text.classList.add('inventory-note--out');
        text.textContent = inventoryEl.getAttribute('data-out-text');
      } else if (variant.inventory !== null && variant.inventory <= low) {
        text.classList.add('inventory-note--low');
        text.textContent = (inventoryEl.getAttribute('data-low-text') || '').replace('[count]', variant.inventory);
      } else {
        text.textContent = inventoryEl.getAttribute('data-in-text');
      }
    }

    function onVariantChange() {
      var selected = getSelectedOptions();
      picker.querySelectorAll('fieldset').forEach(function (fieldset, index) {
        var label = fieldset.querySelector('[data-option-value]');
        if (label) label.textContent = selected[index] || '';
      });
      updateAvailability(selected);

      var variant = variants.find(function (v) {
        return v.options.every(function (opt, i) {
          return opt === selected[i];
        });
      });

      if (!variant) {
        if (addButton) {
          addButton.disabled = true;
          addButton.textContent = theme.strings.unavailable;
        }
        return;
      }

      if (variantInput) variantInput.value = variant.id;
      if (addButton) {
        addButton.disabled = !variant.available;
        addButton.textContent = variant.available ? theme.strings.addToCart : theme.strings.soldOut;
      }
      renderPrice(variant);
      renderInventory(variant);
      if (variant.media_id) showMedia(variant.media_id);

      var url = new URL(window.location.href);
      url.searchParams.set('variant', variant.id);
      window.history.replaceState({}, '', url.toString());
    }

    if (picker && variants.length) {
      picker.addEventListener('change', onVariantChange);
    }

    /* Ajout au panier sans rechargement */
    if (form && theme.cartType === 'drawer' && document.getElementById('CartDrawer')) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!addButton || addButton.disabled) return;
        if (errorEl) errorEl.textContent = '';
        addButton.classList.add('is-loading');
        addButton.setAttribute('aria-busy', 'true');

        var formData = new FormData(form);
        formData.append('sections', 'cart-drawer');
        formData.append('sections_url', window.location.pathname);

        fetch(theme.routes.cart_add_url + '.js', {
          method: 'POST',
          headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
          body: formData
        })
          .then(function (response) {
            return response.json().then(function (data) {
              if (!response.ok || data.status) throw new Error(data.description || data.message || theme.strings.cartError);
              return data;
            });
          })
          .then(function (data) {
            refreshCartDrawer(data.sections);
            return fetch(theme.routes.cart_url + '.js', { headers: { Accept: 'application/json' } }).then(function (r) {
              return r.json();
            });
          })
          .then(function (cart) {
            updateCartCount(cart.item_count);
            openDrawer(document.getElementById('CartDrawer'), addButton);
          })
          .catch(function (error) {
            if (errorEl) errorEl.textContent = error.message;
          })
          .finally(function () {
            addButton.classList.remove('is-loading');
            addButton.removeAttribute('aria-busy');
          });
      });
    }
  });

  /* ---------- Recommandations produit ---------- */
  document.querySelectorAll('[data-recommendations]').forEach(function (section) {
    var url = section.getAttribute('data-url');
    if (!url) return;
    var load = function () {
      fetch(url)
        .then(function (response) {
          return response.text();
        })
        .then(function (text) {
          var doc = new DOMParser().parseFromString(text, 'text/html');
          var fresh = doc.querySelector('[data-recommendations]');
          if (fresh && fresh.innerHTML.trim().length) section.innerHTML = fresh.innerHTML;
        })
        .catch(function () {});
    };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(
        function (entries, obs) {
          if (entries[0].isIntersecting) {
            obs.disconnect();
            load();
          }
        },
        { rootMargin: '0px 0px 400px 0px' }
      );
      io.observe(section);
    } else {
      load();
    }
  });
})();
