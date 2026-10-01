// Raquette de padel Bandeja Club en 3D, animée au défilement (page d'accueil).
// Dimensions réalistes en cm : 26 cm de large, environ 46 cm de long, 3,8 cm d'épaisseur.
// Au chargement : gros plan sur le côté droit, sans balle. Premiers coups de molette (page figée) :
// la balle arrive de la gauche, la raquette pivote vers la gauche et la frappe, la balle repart,
// puis la raquette pivote vers la droite et sort. Ensuite seulement, le site défile et la balle
// descend en rebondissant d'une vitre à l'autre, derrière les blocs du site. En remontant : tout revient.
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

// Position de la raquette pendant la phase figée, r (0 → 1) : suite de positions clés.
var HIT = 0.42;                              // moment où la balle touche la raquette
function keys(view) {
  var top = (view.headPx || 115) / view.pxPerCm;       // hauteur du bandeau + en-tête, en cm
  var s0 = Math.min(1.35, ((2 * view.hh - top) * 1.04) / 56, (view.hw * 0.92) / 60) * (view.size || 1) * (view.fit || 1);
  var hw = view.hw, hh = view.hh, y0 = -top / 2;
  var dx = view.baseDx || 0;                // décalage pour que la tête ne recouvre pas l'arche (calculé dans resize)
  return [
    { r: 0,    s: s0,        x: hw * 0.62 + dx, y: y0 + hh * 0.04, z: 0, rx: -0.08, ry: -0.30, rz: 0.32 },  // position de base
    { r: 0.30, s: s0,        x: hw * 0.64 + dx, y: y0 + hh * 0.04, z: 0, rx: -0.10, ry: -0.16, rz: 0.42 },  // armé : léger recul
    { r: HIT,  s: s0 * 0.96, x: hw * 0.56 + dx, y: y0 + hh * 0.06, z: 5, rx: 0.02,  ry: -0.78, rz: 0.18 },  // frappe : pivote vers la gauche
    { r: 0.55, s: s0 * 0.94, x: hw * 0.54 + dx, y: y0 + hh * 0.07, z: 5, rx: 0.06,  ry: -0.95, rz: 0.02 },  // accompagnement
    { r: 0.74, s: s0 * 0.9,  x: hw * 0.66 + dx, y: y0 + hh * 0.04, z: 2, rx: 0.02,  ry: 0.55,  rz: -0.22 }, // pivote vers la droite
    { r: 1,    s: s0 * 0.8,  x: hw * 1.75 + dx, y: y0,             z: 0, rx: 0,     ry: 0.95,  rz: -0.45 }  // sort par la droite
  ];
}
function pose(r, view) {
  r = Math.min(1, Math.max(0, r));
  var k = keys(view), i = 1;
  while (i < k.length - 1 && r > k[i].r) i++;
  var a = k[i - 1], b = k[i], u = ease((r - a.r) / (b.r - a.r || 1));
  var o = {};
  ['s', 'x', 'y', 'z', 'rx', 'ry', 'rz'].forEach(function (f) { o[f] = lerp(a[f], b[f], u); });
  return o;
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
    var rootStyle = getComputedStyle(document.documentElement);
    view.headPx = (parseFloat(rootStyle.getPropertyValue('--sticky-h')) || 110) + 6;
    var glass = document.querySelector('.glass-side');
    view.glassPx = glass && getComputedStyle(glass).display !== 'none' ? glass.getBoundingClientRect().width : 0;
    // Position de base : la tête de la raquette commence juste à droite de l'arche, sans la recouvrir
    view.baseDx = 0; view.fit = 1;
    var arch = document.querySelector('.hero2 .arch');
    if (racket && arch) {
      var archRight = (arch.getBoundingClientRect().right - w / 2) / view.pxPerCm + 0.8;
      var rightEdge = view.hw - 0.5;
      var head = racket.children[0];
      var measure = function () {
        setPose(racket, keys(view)[0], 0, 0); racket.updateMatrixWorld(true);
        return new THREE.Box3().setFromObject(head);
      };
      // Si la place manque entre l'arche et le bord de l'écran, la raquette est un peu réduite
      for (var pass = 0; pass < 3; pass++) {
        var b = measure();
        view.baseDx += archRight - b.min.x;
        var hb = measure(), room = rightEdge - archRight, headW = hb.max.x - hb.min.x;
        if (headW <= room * 1.001) break;
        view.fit *= Math.max(0.55, room / headW);
      }
    }
  }

  var ball = null, dummy = new THREE.Object3D(), contact = null, contactScale = 1;
  var lastTri = 0, lastDir = 0;
  function setPose(obj, s, bob, wob) {
    obj.position.set(s.x, s.y + bob, s.z);
    obj.rotation.set(s.rx + wob, s.ry + wob * 0.8, s.rz);
    obj.scale.setScalar(s.s);
  }
  function faceCenter(obj) {
    obj.updateMatrixWorld(true);
    return obj.userData.face.clone().applyMatrix4(obj.matrixWorld);
  }
  // y = position de défilement (lissée)
  var PIN = 1;                              // la bannière reste figée pendant un écran de défilement (voir theme.css)
  function phases(y) {
    var pin = window.innerHeight * PIN;
    return { pin: pin, r: Math.min(1, Math.max(0, y / pin)) };
  }
  function edges() {
    var rb = 3.3 * 0.5, inset = ((view.glassPx || 0) + 6) / view.pxPerCm;
    return { l: -view.hw + rb + inset, r: view.hw - rb - inset, floor: -view.hh + rb + 8 / view.pxPerCm };
  }
  var wasAtWall = false;
  function bounce(side, yCm) {
    window.dispatchEvent(new CustomEvent('bc:ballbounce', { detail: { side: side, y: window.innerHeight / 2 - yCm * view.pxPerCm } }));
  }
  function apply(y, time) {
    if (!racket) return;
    var ph = phases(y);
    var s = pose(ph.r, view);
    var idle = (1 - Math.min(1, ph.r * 3)) * 0.035;
    racket.visible = ph.r < 0.999;
    if (racket.visible) setPose(racket, s, Math.sin(time / 1400) * idle * 12, Math.sin(time / 1700) * idle);
    if (ball) {
      if (!contact) {
        var sc = pose(HIT, view); setPose(dummy, sc, 0, 0); dummy.userData = racket.userData;
        contact = faceCenter(dummy); contact.z += 3.3 * sc.s; contactScale = sc.s;
      }
      var e = edges(), wallY = contact.y + view.hh * 0.22, bp, bs;
      if (ph.r <= HIT) {
        // La balle arrive de la gauche dès le premier coup de molette et touche la face au moment de la frappe
        var k0 = ph.r / HIT, tt = ease(k0);
        bp = new THREE.Vector3(-view.hw - 6, view.hh * 0.32, 0).lerp(contact, tt);
        bp.y += Math.sin(tt * Math.PI) * view.hh * 0.16;
        bs = contactScale;
        ball.visible = ph.r > 0.002;
      } else if (y <= ph.pin) {
        // Frappée : la balle repart vers la vitre de gauche, en cloche, et rapetisse en s'éloignant
        var k1 = (ph.r - HIT) / (1 - HIT), u = 1 - Math.pow(1 - k1, 1.6);
        bp = new THREE.Vector3(lerp(contact.x, e.l, u), lerp(contact.y, wallY, u) + Math.sin(u * Math.PI) * view.hh * 0.14, lerp(contact.z, 0, u));
        bs = lerp(contactScale, 0.5, u);
        ball.visible = true;
        var atWall = k1 > 0.985;
        if (atWall && !wasAtWall) bounce('left', bp.y);
        wasAtWall = atWall;
      } else {
        // Le site défile : la balle descend avec la page en rebondissant d'une vitre à l'autre
        wasAtWall = true;
        var total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight - ph.pin);
        var q = Math.min(1, Math.max(0, (y - ph.pin) / total));
        var crossings = 7, v = q * crossings;
        var f = ((v % 2) + 2) % 2, tri = f <= 1 ? f : 2 - f;
        var dir = tri > lastTri ? 1 : tri < lastTri ? -1 : lastDir;
        var by = lerp(wallY, e.floor, Math.min(1, q * 1.02));
        if (lastDir && dir !== lastDir && (tri < 0.06 || tri > 0.94)) bounce(tri < 0.5 ? 'left' : 'right', by);
        lastTri = tri; lastDir = dir;
        bp = new THREE.Vector3(e.l + tri * (e.r - e.l), by, 0);
        bs = 0.5;
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
    tgtY = window.scrollY;                  // relu à chaque image : le défilement doux peut finir sans dernier événement
    curY += (tgtY - curY) * 0.14;
    if (Math.abs(tgtY - curY) < 0.5) curY = tgtY;
    var ph = phases(curY), p = ph.r;
    var keep = !!ball || p < 0.999;
    host.style.visibility = keep ? 'visible' : 'hidden';
    // Une fois le site en mouvement, la balle passe derrière les blocs du site (voir theme.css)
    document.documentElement.classList.toggle('ball-behind', curY > ph.pin + 2);
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
