(function () {
  var banner = document.getElementById('cookieBanner');
  if (!banner) return;
  var KEY = 'bc_consent';
  var MAX_DAYS = 180; // la CNIL recommande de redemander le choix au plus tard tous les 6 mois
  var options = document.getElementById('cookieOptions');
  var btnCustomize = document.getElementById('cookieCustomize');
  var btnSave = document.getElementById('cookieSave');
  var boxes = [].slice.call(banner.querySelectorAll('[data-cookie]'));

  function getCookie(name) {
    var m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : '';
  }
  function setCookie(name, value, days) {
    document.cookie = name + '=' + encodeURIComponent(value) + '; max-age=' + (days * 86400) + '; path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '');
  }

  function api() { return window.Shopify && window.Shopify.customerPrivacy; }

  // Applique le choix dans l'API « Customer Privacy » de Shopify, qui bloque ou autorise les traceurs Shopify et les applications de marketing.
  function apply(choice) {
    var p = api();
    if (p && typeof p.setTrackingConsent === 'function') {
      p.setTrackingConsent({
        analytics: !!choice.analytics,
        marketing: !!choice.marketing,
        preferences: !!choice.preferences,
        sale_of_data: !!choice.marketing
      }, function () {});
    }
  }

  function save(choice) {
    setCookie(KEY, JSON.stringify(choice), MAX_DAYS);
    apply(choice);
    hide();
    document.dispatchEvent(new CustomEvent('cookie-consent', { detail: choice }));
  }

  function current() {
    try { return JSON.parse(getCookie(KEY)) || null; } catch (e) { return null; }
  }

  function show(openOptions) {
    var c = current();
    boxes.forEach(function (b) { b.checked = !!(c && c[b.dataset.cookie]); });
    banner.hidden = false;
    setOptions(!!openOptions);
    var first = document.getElementById('cookieRefuse');
    if (first) first.focus({ preventScroll: true });
  }
  function hide() { banner.hidden = true; }

  function setOptions(open) {
    options.hidden = !open;
    btnSave.hidden = !open;
    btnCustomize.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function all(v) { return { preferences: v, analytics: v, marketing: v }; }

  document.getElementById('cookieAccept').addEventListener('click', function () { save(all(true)); });
  document.getElementById('cookieRefuse').addEventListener('click', function () { save(all(false)); });
  btnCustomize.addEventListener('click', function () { setOptions(options.hidden); });
  btnSave.addEventListener('click', function () {
    var c = {};
    boxes.forEach(function (b) { c[b.dataset.cookie] = b.checked; });
    save(c);
  });
  document.addEventListener('keydown', function (e) {
    // Échap ferme seulement la réouverture volontaire (un choix existe déjà)
    if (e.key === 'Escape' && !banner.hidden && current()) hide();
  });

  // Lien « Gérer mes cookies » (pied de page) et ancre #gerer-cookies
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-cookie-open], a[href$="#gerer-cookies"]');
    if (!a) return;
    e.preventDefault();
    show(true);
  });

  function init() {
    var c = current();
    if (c) {
      // Choix déjà fait et encore valide : on le renvoie à Shopify (au cas où le cookie Shopify aurait expiré).
      apply(c);
    } else {
      show(false);
    }
    if (location.hash === '#gerer-cookies') show(true);
  }

  // Charge l'API de consentement de Shopify, puis démarre.
  function start() {
    if (window.Shopify && typeof window.Shopify.loadFeatures === 'function') {
      window.Shopify.loadFeatures([{ name: 'consent-tracking-api', version: '0.1' }], init);
    } else {
      init();
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
