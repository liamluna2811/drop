const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const [,,src,out,w,h,bg]=process.argv;
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p=await b.newPage({viewport:{width:+w,height:+h}});
await p.goto('file://'+require('path').resolve(src));await p.waitForTimeout(400);
await p.screenshot({path:out,omitBackground:bg==='transparent'});await b.close();})();
