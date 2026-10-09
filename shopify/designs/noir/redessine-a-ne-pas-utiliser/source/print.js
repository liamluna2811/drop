// Export des fichiers d'impression : PNG transparent 3600 × 4800 (12 × 16 in à 300 dpi), recadré au contenu en option.
// Usage : node print.js designs-fonce.html dossier id1,id2,…
const { chromium } = require('playwright-core');
const path = require('path');
const [, , html, dir, ids] = process.argv;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage({ viewport: { width: 1200, height: 1600 }, deviceScaleFactor: 3 });
  for (const id of ids.split(',')) {
    await p.goto('file://' + path.resolve(html) + '#' + id);
    await p.reload();
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: `${dir}/${id}.png`, omitBackground: true });
    console.log(id);
  }
  await b.close();
})();
