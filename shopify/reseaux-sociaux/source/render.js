// Rendu d'une création HTML : image (PNG) ou vidéo (MP4 H.264).
// Usage : node render.js page.html sortie.png 1080 1350
//         node render.js page.html sortie.mp4 1080 1920 12 30
// Vidéo : toutes les animations CSS / Web Animations sont mises en pause, puis avancées image par image.
const { chromium } = require('playwright-core');
const { spawn } = require('child_process');
const path = require('path');

const [, , html, out, W, H, dur, fps = 30] = process.argv;
const FFMPEG = '/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2';

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: +W, height: +H }, deviceScaleFactor: 1 });
  { const [f, h] = html.split('#'); await page.goto('file://' + path.resolve(f) + (h ? '#' + h : '')); }
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))));
  if (!dur) {
    await page.evaluate(() => document.getAnimations().forEach(a => { a.pause(); a.currentTime = 1e7; }));
    await page.screenshot({ path: out });
  } else {
    const n = Math.round(dur * fps);
    const ff = spawn(FFMPEG, ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
      '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'slow', '-crf', '18', '-movflags', '+faststart', out]);
    ff.stderr.pipe(process.stderr);
    for (let i = 0; i < n; i++) {
      const t = i * 1000 / fps;
      await page.evaluate(t => { window.__t = t; if (window.tick) window.tick(t); document.getAnimations().forEach(a => { a.pause(); a.currentTime = t; }); }, t);
      const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    }
    ff.stdin.end();
    await new Promise(r => ff.on('close', r));
  }
  await browser.close();
  console.log('ok', out);
})().catch(e => { console.error(e); process.exit(1); });
