(function(){
  var root=document.documentElement;
  // 3. Profondeur : les montants glissent vers l'extérieur au défilement, comme si l'on avançait dans le terrain
  function depth(){
    if(!/(^| )depth( |$)/.test(root.dataset.v||'')) return;
    var y=window.scrollY;
    document.querySelectorAll('.glass-wall').forEach(function(svg){
      var g=svg.querySelector('g'); if(!g) return;
      if(!svg.__posts){ svg.__posts=[0,1,2].map(function(){var p=document.createElementNS('http://www.w3.org/2000/svg','polyline');g.appendChild(p);return p;}); }
      svg.__posts.forEach(function(p,i){
        var t=((y/900+i/3)%1+1)%1;           // 0 → 1 en boucle
        var x=95-80*t;                        // du fond (bord intérieur) vers l'avant (bord extérieur)
        var yt=140*x/100, yb=1000-140*x/100;
        p.setAttribute('points',x+','+(yt+(300-0)*(1-x/100)*0+ (356-140)*x/100*0)+' '+x+','+yb);
        p.setAttribute('points',x+','+(300+(56*x/100))+' '+x+','+yb);
        p.style.opacity=String(0.25+0.75*t);
      });
      var etch=svg.parentNode.querySelector('.glass-etch'); if(etch) etch.style.marginTop=(-(y%900)/900*24)+'px';
      var mesh=svg.querySelector('pattern'); if(mesh) mesh.setAttribute('patternTransform','rotate(45) translate(0 '+(y/40%7)+')');
    });
  }
  window.addEventListener('scroll',function(){requestAnimationFrame(depth)},{passive:true}); depth();
  // 4. Interaction : éclat de lumière et légère vibration à chaque rebond de la balle
  window.addEventListener('bc:ballbounce',function(e){
    if(!/(^| )hit( |$)/.test(root.dataset.v||'')) return;
    var side=document.querySelector(e.detail.side==='left'?'.glass-l':'.glass-r'); if(!side) return;
    var r=side.getBoundingClientRect();
    var h=document.createElement('span'); h.className='glass-hit';
    h.style.position='fixed'; h.style.zIndex='25';
    h.style.left=(e.detail.side==='left'?r.right:r.left)+'px'; h.style.top=e.detail.y+'px';
    document.body.appendChild(h); setTimeout(function(){h.remove()},750);
    side.classList.remove('shake'); void side.offsetWidth; side.classList.add('shake');
    window.__lastBounce=Date.now();
  });
})();
