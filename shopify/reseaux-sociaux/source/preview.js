// Aperçu : captures à des instants donnés (en secondes), assemblées en planche.
// Usage : node preview.js page.html planche.jpg 1080 1920 1,3.5,6,9,11.5
const { chromium } = require('playwright-core');
const path = require('path');
const [, , html, out, W, H, times] = process.argv;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage({ viewport: { width: +W, height: +H } });
  await p.goto('file://' + path.resolve(html));
  await p.evaluate(() => document.fonts.ready);
  const ts = times.split(',').map(Number), shots = [];
  for (const s of ts) {
    await p.evaluate(t => { if (window.tick) window.tick(t); document.getAnimations().forEach(a => { a.pause(); a.currentTime = t; }); }, s * 1000);
    shots.push((await p.screenshot({ type: 'jpeg', quality: 80 })).toString('base64'));
  }
  const sc = 0.33, w = Math.round(W * sc), h = Math.round(H * sc);
  await p.setViewportSize({ width: w * ts.length + 10 * (ts.length + 1), height: h + 20 });
  await p.setContent('<body style="margin:0;background:#333;display:flex;gap:10px;padding:10px">' + shots.map(s => `<img src="data:image/jpeg;base64,${s}" style="width:${w}px;height:${h}px">`).join('') + '</body>');
  await p.screenshot({ path: out, type: 'jpeg', quality: 85 });
  await b.close();
})();
