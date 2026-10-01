// Raquette de padel Bandeja Club en 3D, animée au défilement (page d'accueil).
// Dimensions réalistes en cm : 26 cm de large, environ 46 cm de long, 3,8 cm d'épaisseur.
// Au chargement : gros plan sur le côté droit. En descendant : la raquette tourne, recule
// et sort par la droite, ce qui laisse apparaître le site. En remontant : elle revient.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

var NAVY = '#0b1b2b';
var LIME = '#d4ff3a';

// Contour de la raquette (tête + gorge), symétrique, en cm. Haut de la tête à y = 17.
function outlinePoints() {
  var right = [];
  var cx = 0, cy = 1.5, rx = 13, ry = 15.5;
  // Arc de la tête, du sommet (90°) jusqu'au début de la gorge (-54°)
  for (var a = 90; a >= -54; a -= 4) {
    var t = a * Math.PI / 180;
    right.push(new THREE.Vector2(cx + rx * Math.cos(t), cy + ry * Math.sin(t)));
  }
  // Gorge : courbe jusqu'au manche
  var p0 = right[right.length - 1], c = new THREE.Vector2(4.2, -16.5), p1 = new THREE.Vector2(2.2, -21);
  for (var i = 1; i <= 10; i++) {
    var u = i / 10, v = 1 - u;
    right.push(new THREE.Vector2(v * v * p0.x + 2 * v * u * c.x + u * u * p1.x, v * v * p0.y + 2 * v * u * c.y + u * u * p1.y));
  }
  var left = right.slice(1, -1).reverse().map(function (p) { return new THREE.Vector2(-p.x, p.y); });
  var pts = right.concat([new THREE.Vector2(-2.2, -21)], left.slice(0, -1));
  return pts;
}

function holeAt(x, y, r) {
  var h = new THREE.Path();
  h.absarc(x, y, r, 0, Math.PI * 2, true);
  return h;
}

function buildShape() {
  var shape = new THREE.Shape(outlinePoints());
  // Ouverture du cœur (pont central de la gorge)
  var heart = new THREE.Path();
  var hp = [];
  for (var a = 0; a <= 360; a += 12) {
    var t = a * Math.PI / 180;
    var x = 3.1 * Math.sin(t);
    var y = -14.2 + 4.0 * Math.cos(t);
    hp.push(new THREE.Vector2(x, y < -17.6 ? -17.6 : y));
  }
  heart.setFromPoints(hp.reverse());
  shape.holes.push(heart);
  // Trous de la face (zone sans trous pour le logo et l'inscription)
  var stepX = 2.25, stepY = 1.95, r = 0.62;
  for (var row = 0; row < 12; row++) {
    var y = 15 - row * stepY;
    var off = row % 2 ? stepX / 2 : 0;
    for (var x = -12; x <= 12; x += stepX) {
      var hx = x + off;
      var ex = hx / 10.6, ey = (y - 2.2) / 12.6;
      if (ex * ex + ey * ey > 1) continue;            // reste à l'intérieur du cadre
      if (y < -1.2) continue;                          // bas de la face : inscription
      if (Math.hypot(hx + 4.2, y - 9) < 3.7) continue;     // logo
      shape.holes.push(holeAt(hx, y, r));
    }
  }
  return shape;
}

// Styles de face disponibles
var STYLES = {
  carbone: { base: '#12161d', weave: ['#1b212b', '#181d26'], band: LIME, text: '#f6f4ee', clubBg: LIME, clubText: NAVY, logo: 'light', rim: NAVY, gloss: 0.10 },
  creme:   { base: '#efeadd', weave: ['#e6e0d1', '#ebe6d8'], band: LIME, text: NAVY, clubBg: NAVY, clubText: LIME, logo: 'dark', rim: NAVY, gloss: 0.18 },
  citron:  { base: '#d4ff3a', weave: ['#c9f330', '#cff835'], band: NAVY, text: NAVY, clubBg: NAVY, clubText: LIME, logo: 'dark', rim: NAVY, gloss: 0.15 },
  marine:  { base: '#0e2238', weave: ['#13294a', '#102540'], band: null, grid: 'rgba(212,255,58,0.22)', text: '#f6f4ee', clubBg: LIME, clubText: NAVY, logo: 'light', rim: '#08131f', gloss: 0.12, edge: LIME }
};

// Texture de la face : fond, bande, logo et « BANDEJA CLUB »
var BOUNDS = { minX: -13.6, maxX: 13.6, minY: -21.6, maxY: 17.6 };
function faceTexture(logoImg, st) {
  st = st || STYLES.carbone;
  var W = 1024, H = Math.round(W * (BOUNDS.maxY - BOUNDS.minY) / (BOUNDS.maxX - BOUNDS.minX));
  var cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  var g = cv.getContext('2d');
  var sx = W / (BOUNDS.maxX - BOUNDS.minX), sy = H / (BOUNDS.maxY - BOUNDS.minY);
  var px = function (x) { return (x - BOUNDS.minX) * sx; };
  var py = function (y) { return (BOUNDS.maxY - y) * sy; };

  // Carbone (sergé)
  g.fillStyle = st.base; g.fillRect(0, 0, W, H);
  var cell = 8;
  for (var j = 0; j < H / cell; j++) {
    for (var i = 0; i < W / cell; i++) {
      if (((i + j) % 4) < 2) { g.fillStyle = (i % 2) ? st.weave[0] : st.weave[1]; g.fillRect(i * cell, j * cell, cell, cell); }
    }
  }
  if (st.grid) {
    // Quadrillage façon vitre et grillage de terrain
    g.strokeStyle = st.grid; g.lineWidth = 2;
    for (var gx = -13; gx <= 13; gx += 2.6) { g.beginPath(); g.moveTo(px(gx), 0); g.lineTo(px(gx), H); g.stroke(); }
    for (var gy = -21; gy <= 17; gy += 2.6) { g.beginPath(); g.moveTo(0, py(gy)); g.lineTo(W, py(gy)); g.stroke(); }
  }
  if (st.edge) {
    // Liseré citron le long du bord de la tête
    g.save(); g.strokeStyle = st.edge; g.lineWidth = 0.45 * sx;
    g.beginPath(); g.ellipse(px(0), py(1.5), 12.1 * sx, 14.6 * sy, 0, Math.PI * 1.06, Math.PI * 1.94 + 0.001, false); g.stroke();
    g.restore();
  }
  // Reflet doux
  var grad = g.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, 'rgba(255,255,255,' + st.gloss + ')'); grad.addColorStop(0.5, 'rgba(255,255,255,0)'); grad.addColorStop(1, 'rgba(255,255,255,0.05)');
  g.fillStyle = grad; g.fillRect(0, 0, W, H);

  // Bande citron diagonale
  if (st.band) {
  g.save();
  g.beginPath();
  g.moveTo(px(-14), py(-3.2)); g.bezierCurveTo(px(-4), py(-0.2), px(5), py(5.5), px(14), py(12.5));
  g.lineTo(px(14), py(9.6)); g.bezierCurveTo(px(5), py(2.6), px(-4), py(-2.8), px(-14), py(-5.6));
  g.closePath(); g.fillStyle = st.band; g.globalAlpha = 0.92; g.fill();
  g.restore();
  }

  // Logo
  if (logoImg && logoImg.complete && logoImg.naturalWidth) {
    var lw = 6.4 * sx, lh = lw * logoImg.naturalHeight / logoImg.naturalWidth;
    g.drawImage(logoImg, px(-4.2) - lw / 2, py(9) - lh / 2, lw, lh);
  }

  // Inscription
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '400 ' + Math.round(3.4 * sy) + 'px "Archivo Black", "Arial Black", sans-serif';
  g.fillStyle = st.text;
  g.fillText('BANDEJA', px(0), py(-4.6));
  var clubSize = Math.round(2.6 * sy);
  g.font = '400 ' + clubSize + 'px "Archivo Black", "Arial Black", sans-serif';
  var cw = g.measureText('CLUB').width + clubSize * 0.7, ch = clubSize * 1.3;
  var cx0 = px(0) - cw / 2, cy0 = py(-8.4) - ch / 2, rr = clubSize * 0.25;
  g.fillStyle = st.clubBg;
  g.beginPath();
  g.moveTo(cx0 + rr, cy0); g.lineTo(cx0 + cw - rr, cy0); g.quadraticCurveTo(cx0 + cw, cy0, cx0 + cw, cy0 + rr);
  g.lineTo(cx0 + cw, cy0 + ch - rr); g.quadraticCurveTo(cx0 + cw, cy0 + ch, cx0 + cw - rr, cy0 + ch);
  g.lineTo(cx0 + rr, cy0 + ch); g.quadraticCurveTo(cx0, cy0 + ch, cx0, cy0 + ch - rr);
  g.lineTo(cx0, cy0 + rr); g.quadraticCurveTo(cx0, cy0, cx0 + rr, cy0); g.fill();
  g.fillStyle = st.clubText;
  g.fillText('CLUB', px(0), py(-8.4) + clubSize * 0.04);

  var tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function gripTexture() {
  var cv = document.createElement('canvas'); cv.width = 256; cv.height = 256;
  var g = cv.getContext('2d');
  g.fillStyle = '#f1efe8'; g.fillRect(0, 0, 256, 256);
  g.strokeStyle = 'rgba(11,27,43,0.18)'; g.lineWidth = 6;
  for (var i = -256; i < 512; i += 32) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i + 256, 256); g.stroke(); }
  var tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(2, 3);
  return tex;
}

function buildRacket(logoImg, options) {
  options = options || {};
  var st = STYLES[options.style] || STYLES.carbone;
  var group = new THREE.Group();
  var depth = 3.1, bevel = 0.35;
  var geo = new THREE.ExtrudeGeometry(buildShape(), {
    depth: depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 4, curveSegments: 16, steps: 1
  });
  geo.translate(0, 0, -depth / 2);
  // UV des faces : coordonnées en cm ramenées à la texture ; la face arrière est inversée pour se lire à l'endroit
  geo.computeBoundingBox();
  var zMin = geo.boundingBox.min.z, zMax = geo.boundingBox.max.z;
  var pos = geo.attributes.position, uv = geo.attributes.uv;
  var W = BOUNDS.maxX - BOUNDS.minX, H = BOUNDS.maxY - BOUNDS.minY;
  var capCount = geo.groups[0].count, capStart = geo.groups[0].start;
  var index = geo.index;
  var done = {};
  for (var k = capStart; k < capStart + capCount; k++) {
    var vi = index ? index.getX(k) : k;
    if (done[vi]) continue; done[vi] = 1;
    var x = pos.getX(vi), y = pos.getY(vi), z = pos.getZ(vi);
    var u = (x - BOUNDS.minX) / W;
    if (Math.abs(z - zMin) < 1e-3) u = 1 - u;
    uv.setXY(vi, u, (y - BOUNDS.minY) / H);
  }
  uv.needsUpdate = true;
  geo.computeVertexNormals();

  var faceMat = new THREE.MeshPhysicalMaterial({ map: faceTexture(logoImg, st), roughness: 0.5, metalness: 0.05, clearcoat: 0.55, clearcoatRoughness: 0.3, envMapIntensity: 0.55 });
  var rimMat = new THREE.MeshPhysicalMaterial({ color: st.rim, roughness: 0.32, metalness: 0.25, clearcoat: 1, clearcoatRoughness: 0.12 });
  var head = new THREE.Mesh(geo, [faceMat, rimMat]);
  group.add(head);

  if (options.guard) {
    // Protection de cadre citron : bande fine qui épouse le haut de la tête (de 28° à 152°)
    var outer = [], inner = [];
    for (var ga = 28; ga <= 152; ga += 2) {
      var gt = ga * Math.PI / 180;
      outer.push(new THREE.Vector2(13.62 * Math.cos(gt), 1.5 + 16.12 * Math.sin(gt)));
      inner.push(new THREE.Vector2(12.9 * Math.cos(gt), 1.5 + 15.4 * Math.sin(gt)));
    }
    var gShape = new THREE.Shape(outer.concat(inner.reverse()));
    var gDepth = depth + bevel * 2 + 0.3;
    var gGeo = new THREE.ExtrudeGeometry(gShape, { depth: gDepth, bevelEnabled: true, bevelThickness: 0.25, bevelSize: 0.18, bevelSegments: 4, curveSegments: 8 });
    gGeo.translate(0, 0, -gDepth / 2);
    group.add(new THREE.Mesh(gGeo, new THREE.MeshPhysicalMaterial({ color: LIME, roughness: 0.55, clearcoat: 0.35, clearcoatRoughness: 0.4 })));
  }
  // Bague entre le cadre et le manche
  var collar = new THREE.Mesh(new THREE.CylinderGeometry(1.95, 1.75, 1.6, 24), rimMat);
  collar.position.y = -21.6; group.add(collar);
  // Manche octogonal avec grip
  var handle = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 1.62, 13, 8, 1), new THREE.MeshStandardMaterial({ map: gripTexture(), roughness: 0.85 }));
  handle.position.y = -28.9; group.add(handle);
  // Embout
  var cap = new THREE.Mesh(new THREE.CylinderGeometry(1.85, 1.85, 1.1, 24), new THREE.MeshPhysicalMaterial({ color: LIME, roughness: 0.4, clearcoat: 0.6 }));
  cap.position.y = -35.9; group.add(cap);
  // Dragonne
  var curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -36.4, 0), new THREE.Vector3(2.6, -40, 0.6), new THREE.Vector3(1.4, -45, 1.2),
    new THREE.Vector3(-1.6, -44.5, 0.8), new THREE.Vector3(-2.4, -40, 0.2), new THREE.Vector3(0, -36.4, 0)
  ], true);
  var strap = new THREE.Mesh(new THREE.TubeGeometry(curve, 80, 0.28, 10, true), new THREE.MeshStandardMaterial({ color: NAVY, roughness: 0.6 }));
  group.add(strap);

  // Recentre l'ensemble (milieu de la raquette à l'origine)
  group.children.forEach(function (m) { m.position.y += 9; });
  var box = new THREE.Box3().setFromObject(group), c = box.getCenter(new THREE.Vector3());
  group.children.forEach(function (m) { m.position.x -= c.x; m.position.y -= c.y; });
  group.userData.face = new THREE.Vector3(0, 10.5 - c.y, depth / 2 + bevel);
  group.userData.height = box.max.y - box.min.y;
  return group;
}

function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
function lerp(a, b, t) { return a + (b - a) * t; }

// Position de la raquette.
// r (0 → 1) : redressement pendant que la bannière est figée (premiers coups de molette) ;
// t (0 → 1) : ensuite, pendant le défilement normal : elle rétrécit (0 → 0,7) puis sort par la droite (0,7 → 1).
function pose(r, t, view) {
  r = ease(Math.min(1, Math.max(0, r)));
  t = Math.min(1, Math.max(0, t));
  var a = ease(Math.min(1, t / 0.7));
  var b = t <= 0.7 ? 0 : ease((t - 0.7) / 0.3);
  var top = (view.headPx || 115) / view.pxPerCm;       // hauteur du bandeau + en-tête, en cm
  var s0 = Math.min(1.35, ((2 * view.hh - top) * 1.04) / 56, (view.hw * 0.92) / 60) * (view.size || 1);
  return {
    s: lerp(s0, s0 * 0.55, a),
    x: view.hw * 0.57 + r * view.hw * 0.11 + b * view.hw * 0.8,
    y: -top / 2 + r * view.hh * 0.08 + a * view.hh * 0.04, z: r * 4,
    rx: lerp(-0.1, 0.08, r),
    ry: lerp(-0.34, -0.42, r) - b * 0.9,
    rz: lerp(0.78, -0.12, r) - a * 0.15 - b * 0.3
  };
}

// Balle de padel : feutre jaune-vert et couture blanche
function ballMesh() {
  var cv = document.createElement('canvas'); cv.width = 512; cv.height = 256;
  var g = cv.getContext('2d');
  g.fillStyle = '#d7ef3f'; g.fillRect(0, 0, 512, 256);
  for (var i = 0; i < 2600; i++) { g.fillStyle = 'rgba(255,255,255,' + (Math.random() * 0.12) + ')'; g.fillRect(Math.random() * 512, Math.random() * 256, 2, 2); }
  g.strokeStyle = '#f7f7ee'; g.lineWidth = 9; g.beginPath();
  for (var x = 0; x <= 512; x += 4) { var y = 128 + 62 * Math.sin(x / 512 * Math.PI * 4); if (x === 0) g.moveTo(x, y); else g.lineTo(x, y); }
  g.stroke();
  var tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.SphereGeometry(3.3, 48, 32), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.95 }));
}

export function mount(host, options) {
  options = options || {};
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: !!options.still });
  } catch (e) { return null; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, options.still ? 2 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  host.appendChild(renderer.domElement);
  var cs = renderer.domElement.style; cs.width = '100%'; cs.height = '100%'; cs.display = 'block';

  var scene = new THREE.Scene();
  var pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  var key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(-30, 40, 60); scene.add(key);
  var rim = new THREE.DirectionalLight(0xe8ffb0, 0.8); rim.position.set(40, -10, -30); scene.add(rim);
  scene.add(new THREE.AmbientLight(0xffffff, 0.25));

  var camera = new THREE.PerspectiveCamera(30, 1, 1, 500);
  var DIST = options.still ? 128 : 100;
  camera.position.set(0, 0, DIST);
  camera.lookAt(0, 0, 0);

  var racket = null;

  var view = { hw: 40, hh: 27, pxPerCm: 15, size: options.size || 1 };
  function resize() {
    var w = host.clientWidth || 1, h = host.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    view.hh = DIST * Math.tan(camera.fov * Math.PI / 360);
    view.hw = view.hh * camera.aspect;
    view.pxPerCm = h / (2 * view.hh);
    view.headPx = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sticky-h')) || 110) + 6;
  }

  var ball = null, dummy = new THREE.Object3D(), contact = null, contactScale = 1;
  var BALL_IN = 0.26;                       // impact : juste après que la raquette s'est relevée
  function setPose(obj, s, bob, wob) {
    obj.position.set(s.x, s.y + bob, s.z);
    obj.rotation.set(s.rx + wob, s.ry + wob * 0.8, s.rz);
    obj.scale.setScalar(s.s);
  }
  function faceCenter(obj) {
    obj.updateMatrixWorld(true);
    return obj.userData.face.clone().applyMatrix4(obj.matrixWorld);
  }
  function heroRange() { return window.innerHeight * (options.range || 0.9); }

  // y = position de défilement (lissée)
  var PIN = 0.6;                            // la bannière reste figée pendant 60 % d'écran de défilement (voir theme.css)
  function phases(y) {
    var pin = window.innerHeight * PIN;
    return { pin: pin, r: Math.min(1, Math.max(0, y / pin)), t: Math.min(1, Math.max(0, (y - pin) / heroRange())) };
  }
  function apply(y, time) {
    if (!racket) return;
    var ph = phases(y);
    var s = pose(ph.r, ph.t, view);
    var idle = (1 - Math.min(1, ph.r * 3)) * 0.035;
    racket.visible = ph.t < 0.999;
    if (racket.visible) setPose(racket, s, Math.sin(time / 1400) * idle * 12, Math.sin(time / 1700) * idle);
    if (ball) {
      if (!contact) {
        var sc = pose(1, 0, view); setPose(dummy, sc, 0, 0); dummy.userData = racket.userData;
        contact = faceCenter(dummy); contact.z += 3.3 * sc.s; contactScale = sc.s;
      }
      var bp, bs;
      if (y <= ph.pin) {
        // Pendant le redressement : la balle part du bord gauche et arrive sur la face au moment où la raquette est droite
        var k0 = Math.min(1, Math.max(0, (ph.r - 0.15) / 0.85));
        var tt = ease(k0);
        bp = new THREE.Vector3(-view.hw - 6, view.hh * 0.3, 0).lerp(contact, tt);
        bp.y += Math.sin(tt * Math.PI) * view.hh * 0.18;
        bs = contactScale;
        ball.visible = k0 > 0;
      } else {
        // Après l'impact : la balle descend avec la page en rebondissant d'un bord de l'écran à l'autre
        var total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight - ph.pin);
        var q = Math.min(1, Math.max(0, (y - ph.pin) / total));
        var rb = 3.3 * 0.5;
        var edgeL = -view.hw + rb + 6 / view.pxPerCm, edgeR = view.hw - rb - 6 / view.pxPerCm;
        var k = ease(Math.min(1, q / 0.05));
        bs = lerp(contactScale, 0.5, k);
        var crossings = 7;
        var v = (contact.x - edgeL) / (edgeR - edgeL) - q * crossings * k;
        var f = ((v % 2) + 2) % 2;
        var tri = f <= 1 ? f : 2 - f;
        var x = edgeL + tri * (edgeR - edgeL);
        var floor = -view.hh + rb + 8 / view.pxPerCm;
        bp = new THREE.Vector3(x, lerp(contact.y, floor, Math.min(1, q * 1.02)), lerp(contact.z, 0, k));
        ball.visible = true;
      }
      ball.position.copy(bp);
      ball.scale.setScalar(bs);
      ball.rotation.set(y / 90, y / 140, 0);
    }
    renderer.render(scene, camera);
  }

  var curY = 0, tgtY = 0, running = false;
  function frame(time) {
    curY += (tgtY - curY) * 0.14;
    if (Math.abs(tgtY - curY) < 0.5) curY = tgtY;
    var ph = phases(curY), p = ph.t;
    var keep = !!ball || p < 0.999;
    host.style.visibility = keep ? 'visible' : 'hidden';
    if (!ball) host.style.opacity = String(Math.min(1, (1 - Math.min(1, p)) / 0.12));
    if (keep) apply(curY, time);
    var idle = ph.r < 0.34;                   // petit flottement de la raquette en haut de page
    if (curY !== tgtY || idle) { requestAnimationFrame(frame); } else { running = false; }
  }
  function wake() { tgtY = window.scrollY; if (!running) { running = true; requestAnimationFrame(frame); } }

  function start(logoImg) {
    racket = buildRacket(logoImg, options);
    scene.add(racket);
    if (options.ball && !options.still) { ball = ballMesh(); scene.add(ball); }
    resize();
    if (options.still) {
      var s = options.pose || { x: 0, y: 0, z: 0, rx: -0.18, ry: -0.5, rz: 0.32 };
      racket.position.set(s.x, s.y, s.z); racket.rotation.set(s.rx, s.ry, s.rz); racket.scale.setScalar(s.s || 1);
      renderer.render(scene, camera);
      if (options.onReady) options.onReady(renderer.domElement);
      return;
    }
    curY = tgtY = window.scrollY;
    window.addEventListener('scroll', wake, { passive: true });
    window.addEventListener('resize', function () { resize(); contact = null; wake(); });
    document.addEventListener('visibilitychange', function () { if (!document.hidden) wake(); });
    running = true; requestAnimationFrame(frame);
    if (options.onReady) options.onReady(renderer.domElement);
  }

  var fontReady = (document.fonts && document.fonts.load) ? document.fonts.load('80px "Archivo Black"').catch(function () {}) : Promise.resolve();
  var logoReady = new Promise(function (resolve) {
    var st = STYLES[options.style] || STYLES.carbone;
    var src = st.logo === 'dark' ? (options.logoDark || options.logo) : options.logo;
    if (!src) return resolve(null);
    var img = new Image(); img.crossOrigin = 'anonymous';
    img.onload = function () { resolve(img); }; img.onerror = function () { resolve(null); };
    img.src = src;
  });
  Promise.all([fontReady, logoReady]).then(function (r) { start(r[1]); });
  return { renderer: renderer };
}
