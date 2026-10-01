(function(){
  var v = (location.hash.match(/q=(\d)/)||[])[1] || '1';
  [].forEach.call(document.querySelectorAll('.section-d.scheme-alt'), function(s){ s.classList.remove('scheme-alt'); s.classList.add('scheme-none'); });
  var main = document.querySelector('main');
  [].forEach.call(main.children, function(c){ if(!c.querySelector('.racket-fx')){ c.style.position='relative'; c.style.zIndex=1; }});
  var bg = document.querySelector('.court-bg');
  document.body.insertBefore(bg, document.body.firstChild);
  bg.style.cssText += ';position:fixed;top:var(--sticky-h);z-index:0;display:block;left:0;right:0;height:calc(100vh - var(--sticky-h))';
  if (v==='2') {
    var svg = bg.querySelector('svg'); var kids = [].slice.call(svg.children).slice(6);  // après defs, sol, 4 lignes de côté
    var hero = document.querySelector('.hero2').parentNode;
    function f(){ var end = hero.offsetTop + hero.offsetHeight - innerHeight; var o = Math.max(0, Math.min(1, 1 - (scrollY - end) / (innerHeight*0.5)));
      kids.forEach(function(k){ k.style.opacity = o; }); }
    addEventListener('scroll', f, {passive:true}); f();
  }
  window.__court = {y0: document.querySelector('.hero2').parentNode.offsetTop + document.querySelector('.hero2').parentNode.offsetHeight};
})();
