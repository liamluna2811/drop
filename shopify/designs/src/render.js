const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs'),path=require('path');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [src,out,scale] of JSON.parse(process.argv[2])){
 const svg=fs.readFileSync(src,'utf8');const m=svg.match(/viewBox="0 0 (\d+) (\d+)"/);
 const p=await b.newPage({viewport:{width:+m[1],height:+m[2]},deviceScaleFactor:scale});
 await p.goto('file://'+path.resolve(src));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
 await p.screenshot({path:out,omitBackground:true});await p.close();}
await b.close();})();
