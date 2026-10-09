const { chromium } = require('playwright-core'); const path=require('path');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:1400,height:1400}});
for(const id of ['sun','club']){await p.goto('file://'+path.resolve('perso-text.html')+'#'+id);await p.reload();await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
const ok=await p.evaluate(()=>document.fonts.check('900 20px Montserrat'));console.log(id,ok);
await p.screenshot({path:`txt-${id}.png`,omitBackground:true});}
await b.close();})();
