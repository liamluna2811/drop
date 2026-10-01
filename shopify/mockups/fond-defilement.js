(function(){
  var v = (location.hash.match(/p=(\d)/)||[])[1] || '1';
  // toutes les sections de démonstration en fond transparent pour voir l'effet
  [].forEach.call(document.querySelectorAll('.section-d.scheme-alt'), function(s){ s.classList.remove('scheme-alt'); s.classList.add('scheme-none'); });
  var main = document.querySelector('main'); main.style.position='relative';
  [].forEach.call(main.children, function(c){ if(!c.querySelector('.racket-fx')){ c.style.position='relative'; c.style.zIndex=1; }});
  var heroSec = document.querySelector('.hero2').parentNode;
  var y0 = heroSec.offsetTop + heroSec.offsetHeight;
  var H = main.offsetHeight - y0, W = document.documentElement.clientWidth;
  var g = document.querySelector('.glass-l'); var gw = g && getComputedStyle(g).display!=='none' ? g.getBoundingClientRect().width : 0;
  var s = (W - 2*gw) / 10;     // pixels par mètre (court de 10 m de large entre les vitres)
  var lay = document.createElement('div');
  lay.style.cssText = 'position:absolute;left:0;right:0;top:'+y0+'px;height:'+H+'px;z-index:0;pointer-events:none';
  var floor = '#C9D6DE', white = 'rgba(255,255,255,.95)', navy='rgba(11,27,43,.12)';
  var tint = v==='3' ? '' : '<rect width="'+W+'" height="'+H+'" fill="url(#pf)"/>';
  var col = v==='3' ? navy : white;
  function ln(x1,y1,x2,y2,w,c){ return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(c||col)+'" stroke-width="'+(w||3)+'"/>'; }
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'"><defs>'+
    '<linearGradient id="pf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+floor+'" stop-opacity=".8"/><stop offset="'+Math.min(.5, 900/H)+'" stop-color="'+floor+'" stop-opacity=".45"/><stop offset="1" stop-color="'+floor+'" stop-opacity=".45"/></linearGradient>'+
    '<pattern id="pn" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 0H10M0 0V10" stroke="rgba(11,27,43,.18)" stroke-width="1" fill="none"/></pattern></defs>' + tint;
  // lignes de côté, au pied des vitres
  svg += ln(gw,0,gw,H) + ln(W-gw,0,W-gw,H);
  if (v!=='1') {
    // plan du court : service à 3,05 m du fond, filet à 10 m, ligne centrale entre service et filet, puis l'autre moitié
    var a = 3.05*s, net = 10*s, b = 16.95*s, end = 20*s;
    svg += ln(gw,a,W-gw,a) + ln(W/2,a,W/2,b) + ln(gw,b,W-gw,b) + ln(gw,end,W-gw,end);
    var nh = 34;
    svg += '<rect x="'+gw+'" y="'+(net-nh)+'" width="'+(W-2*gw)+'" height="'+nh+'" fill="url(#pn)"/>' + ln(gw,net-nh,W-gw,net-nh,5,'#fff') + ln(gw,net,W-gw,net,2,'rgba(11,27,43,.18)');
  }
  lay.innerHTML = svg + '</svg>';
  main.insertBefore(lay, main.firstChild);
  window.__court = {y0:y0, s:s, gw:gw};
})();
