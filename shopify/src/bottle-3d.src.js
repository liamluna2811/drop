// Modèle 3D de la gourde inox Bandeja Club (forme mesurée sur la photo de face, 26 cm de haut).
// three.js est chargé à la demande depuis jsDelivr via l'importmap de la page.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// [hauteur en cm depuis le bas, rayon en cm], du haut vers le bas
const PROFILE_TOP = [[26, 1.594], [25.884, 1.681], [25.652, 1.71], [25.304, 1.725], [25.072, 1.768], [24.841, 1.783], [24.609, 1.725], [24.377, 1.725], [24.145, 1.855]];
const PROFILE_BODY = [[24.145, 1.855], [23.797, 1.884], [23.275, 1.855], [22.754, 1.855], [22.406, 1.942], [22.058, 2.087], [21.536, 2.246], [21.014, 2.406], [20.493, 2.551], [19.971, 2.696], [19.449, 2.812], [18.928, 2.928], [18.406, 3.029], [17.884, 3.13], [17.362, 3.188], [16.841, 3.246], [16.319, 3.319], [15.797, 3.362], [15.275, 3.391], [13.5, 3.406], [11.5, 3.391], [3.1, 3.391], [2.609, 3.362]];
const PROFILE_BOTTOM = [[2.58, 3.362], [1.884, 3.362], [1.536, 3.319], [1.188, 3.217], [0.841, 3.014], [0.725, 2.986], [0.493, 3.029], [0.377, 2.928], [0.261, 2.783], [0.145, 2.304], [0.029, 1.043], [0, 0]];
const HEIGHT = 26;

function lathe(points, material, segments) {
  // LatheGeometry attend les points du bas vers le haut
  const pts = points.slice().reverse().map(function (p) { return new THREE.Vector2(p[1], p[0]); });
  const geo = new THREE.LatheGeometry(pts, segments || 96);
  // Coordonnée v proportionnelle à la hauteur (les points du profil ne sont pas espacés régulièrement)
  geo.computeBoundingBox();
  const y0 = geo.boundingBox.min.y, span = (geo.boundingBox.max.y - y0) || 1;
  const pos = geo.attributes.position, uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setY(i, (pos.getY(i) - y0) / span);
  return new THREE.Mesh(geo, material);
}

export function mount(container, options) {
  options = options || {};
  var canvasHost = container.querySelector('[data-3d-canvas]') || container;
  var hint = container.querySelector('[data-3d-hint]');

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch (e) {
    canvasHost.textContent = 'Le modèle 3D n\'est pas disponible sur cet appareil.';
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  canvasHost.appendChild(renderer.domElement);
  var cs = renderer.domElement.style;
  cs.width = '100%'; cs.height = '100%'; cs.display = 'block'; cs.touchAction = 'none';

  var scene = new THREE.Scene();
  var pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  var camera = new THREE.PerspectiveCamera(30, 1, 1, 300);
  var HOME = new THREE.Vector3(0, 15, 50);
  camera.position.copy(HOME);

  var controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 13.5, 0);
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 26;
  controls.maxDistance = 90;
  controls.minPolarAngle = 0.35;
  controls.maxPolarAngle = Math.PI * 0.62;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.6;

  var steel = new THREE.MeshStandardMaterial({ color: 0xf0f2f5, metalness: 1, roughness: 0.2, envMapIntensity: 1.7 });
  var texture = new THREE.TextureLoader().load(options.bodyTexture, function () { renderer.domElement.dataset.ready = '1'; });
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  var paint = new THREE.MeshPhysicalMaterial({ map: texture, color: 0xffffff, metalness: 0.2, roughness: 0.34, clearcoat: 1, clearcoatRoughness: 0.08 });

  var bottle = new THREE.Group();
  bottle.add(lathe(PROFILE_BOTTOM, steel));
  bottle.add(lathe(PROFILE_BODY, paint, 160));
  bottle.add(lathe(PROFILE_TOP, steel));

  // Bouchon : posé sur le goulot, ou couché à côté comme sur les photos
  var capProfile = [[3.15, 0], [3.1, 1.5], [2.9, 1.95], [2.5, 2.05], [0.1, 2.05], [0.02, 2.02], [0, 0]];
  var capGroup = new THREE.Group();
  capGroup.add(lathe(capProfile, steel, 64));
  var CAP_ON = new THREE.Vector3(0, HEIGHT - 1.8, 0);
  var CAP_OFF = new THREE.Vector3(10.5, 2.05, 4);
  capGroup.position.copy(CAP_ON);
  bottle.add(capGroup);
  scene.add(bottle);

  // Ombre douce au sol
  var c = document.createElement('canvas'); c.width = c.height = 128;
  var g = c.getContext('2d');
  var grad = g.createRadialGradient(64, 64, 4, 64, 64, 62);
  grad.addColorStop(0, 'rgba(0,0,0,0.38)'); grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad; g.fillRect(0, 0, 128, 128);
  var shadow = new THREE.Mesh(new THREE.PlaneGeometry(26, 26), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = -0.02;
  scene.add(shadow);

  var key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(20, 40, 30); scene.add(key);
  scene.add(new THREE.AmbientLight(0xffffff, 0.35));

  // La rotation automatique s'arrête au toucher et reprend après 4 s
  var idle;
  controls.addEventListener('start', function () {
    controls.autoRotate = false; clearTimeout(idle);
    if (hint) hint.style.opacity = '0';
  });
  controls.addEventListener('end', function () {
    clearTimeout(idle);
    idle = setTimeout(function () { controls.autoRotate = true; }, 4000);
  });

  var capOpen = false, capT = 0;
  var reset = container.querySelector('[data-3d-reset]');
  if (reset) reset.addEventListener('click', function () {
    camera.position.copy(HOME); controls.target.set(0, 13.5, 0); controls.update();
  });
  var toggle = container.querySelector('[data-3d-cap]');
  if (toggle) toggle.addEventListener('click', function () {
    capOpen = !capOpen;
    toggle.setAttribute('aria-pressed', capOpen ? 'true' : 'false');
  });

  function resize() {
    var w = canvasHost.clientWidth, h = canvasHost.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(canvasHost);
  resize();

  var running = true;
  function frame() {
    if (!running) return;
    requestAnimationFrame(frame);
    if (!canvasHost.clientWidth) return; // onglet masqué
    capT += ((capOpen ? 1 : 0) - capT) * 0.12;
    capGroup.position.lerpVectors(CAP_ON, CAP_OFF, capT);
    capGroup.rotation.z = capT * (Math.PI / 2);
    controls.update();
    renderer.render(scene, camera);
  }
  frame();

  return { dispose: function () { running = false; renderer.dispose(); }, renderer: renderer };
}
