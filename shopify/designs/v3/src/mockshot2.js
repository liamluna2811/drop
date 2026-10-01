const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const k of (process.env.KEYS||'club-soleil,souvenir,apero').split(',')){const p=await b.newPage({viewport:{width:1500,height:900},deviceScaleFactor:1});
await p.goto('file:///tmp/claude-0/mock2-'+k+'.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
await p.screenshot({path:(process.env.OUT||'/tmp/claude-0/')+k+'.jpg',fullPage:true,type:'jpeg',quality:90});await p.close();}
await b.close();})();
