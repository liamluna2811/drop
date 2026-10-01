(function(){
  var v = (location.hash.match(/v=(\d)/)||[])[1] || '1';
  if (v==='0') return;
  var NS='http://www.w3.org/2000/svg';
  var st = getComputedStyle(document.documentElement);
  var top = parseFloat(st.getPropertyValue('--sticky-h')) || 110;
  var W = innerWidth, H = innerHeight - top;
  var g = document.querySelector('.glass-l'); var gw = g && getComputedStyle(g).display!=='none' ? g.getBoundingClientRect().width : 0;
  // Perspective : horizon, distance focale déduite du bas intérieur des vitres
  var vy = 0.40*H, cx = W/2, z0 = 1;
  var fh = 0.86*H - vy;            // f*h/z0
  var fx = (cx - gw);              // f*5/z0  (demi-largeur 5 m)
  function P(x, z){ return [cx + fx*(x/5)*(z0/z), vy + fh*(z0/z)]; }
  function line(a,b,w,c,extra){ return '<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" stroke="'+c+'" stroke-width="'+w+'" '+(extra||'')+'/>'; }
  var zNear = 0.55, zNet = 2.6, zServ = z0 + (zNet - z0)*0.35;   // profondeurs (unités relatives)
  var col = v!=='1' ? 'rgba(255,255,255,.95)' : 'rgba(11,27,43,.13)', lw = v!=='1' ? 3 : 2.2;
  var s = '<svg xmlns="'+NS+'" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'">';
  s += '<defs><linearGradient id="fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9D6DE" stop-opacity=".0"/><stop offset=".25" stop-color="#C9D6DE" stop-opacity=".55"/><stop offset="1" stop-color="#B9C9D3" stop-opacity=".75"/></linearGradient>'+
       '<pattern id="net" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M0 0H9M0 0V9" stroke="rgba(11,27,43,.28)" stroke-width="1" fill="none"/></pattern></defs>';
  var L0=P(-5,zNear), R0=P(5,zNear), Ln=P(-5,zNet), Rn=P(5,zNet);
  // sol : du bas de l'écran jusqu'au filet, sous les vitres jusqu'aux bords
  if (v!=='1') s += '<polygon points="0,'+H+' '+W+','+H+' '+W+','+(0.86*H)+' '+Rn[0]+','+Rn[1]+' '+Ln[0]+','+Ln[1]+' 0,'+(0.86*H)+'" fill="url(#fl)"/>';
  // lignes de côté (pied des vitres prolongé)
  s += line([0,H],[gw,0.86*H],lw,col) + line([W,H],[W-gw,0.86*H],lw,col);
  s += line(P(-5,z0),Ln,lw,col) + line(P(5,z0),Rn,lw,col);
  // ligne de service + ligne centrale
  s += line(P(-5,zServ),P(5,zServ),lw,col) + line(P(0,zServ),P(0,zNear*0.6),lw,col);
  // pied du filet
  s += line(Ln,Rn,lw,col);
  if (v==='3') {
    var netH = (Ln[1]-vy)*0.55;   // filet ≈ 0.88 m vu de loin
    s += '<rect x="'+Ln[0]+'" y="'+(Ln[1]-netH)+'" width="'+(Rn[0]-Ln[0])+'" height="'+netH+'" fill="url(#net)"/>';
    s += line([Ln[0],Ln[1]-netH],[Rn[0],Rn[1]-netH],4,'rgba(255,255,255,1)') + line([Ln[0],Ln[1]-netH-2],[Rn[0],Rn[1]-netH-2],1,'rgba(11,27,43,.25)');
    s += line(Ln,[Ln[0],Ln[1]-netH-3],3,'rgba(11,27,43,.3)') + line(Rn,[Rn[0],Rn[1]-netH-3],3,'rgba(11,27,43,.3)');
  }
  s += '</svg>';
  var d = document.createElement('div');
  d.style.cssText='position:fixed;left:0;right:0;top:'+top+'px;height:'+H+'px;z-index:0;pointer-events:none';
  d.innerHTML = s; document.body.insertBefore(d, document.body.firstChild);
  var hero=document.querySelector('.hero2'); hero.style.zIndex=1;
})();
