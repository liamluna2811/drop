const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const k of ['club-soleil','riviera','signes-du-club']){const p=await b.newPage({viewport:{width:1600,height:700}});
await p.goto('file:///tmp/claude-0/mock-'+k+'.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
await p.screenshot({path:'/home/user/drop/shopify/designs/maquettes/'+k+'.jpg',fullPage:true,type:'jpeg',quality:88});await p.close();}
await b.close();})();
