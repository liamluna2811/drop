import json
IMP='/home/user/drop/shopify/designs/impression/'
SHIRT='M300,60 C340,90 410,105 450,105 C490,105 560,90 600,60 L760,120 L860,330 L740,385 L700,300 L700,1040 C560,1060 340,1060 200,1040 L200,300 L160,385 L40,330 L140,120 Z'
D={'club-soleil':('Club Soleil',[('Ivoire','#EFE6D2','clair'),('Bleu marine délavé','#2C4561','fonce'),('Terracotta','#A9573A','fonce')],0.56),
   'riviera':('Riviera',[('Blanc','#F7F6F2','clair'),('Bleu ciel','#B5D3E7','clair'),('Vert forêt','#2E4A3B','fonce')],0.52),
   'signes-du-club':('Les signes du club',[('Beurre','#F1E2A9','clair'),('Rose pâle','#EBC3BE','clair'),('Noir délavé','#2E2E2E','fonce')],0.52)}
for key,(title,cols,wr) in D.items():
    cards=''
    for name,hexc,v in cols:
        w=900*wr
        cards+=f'''<figure><svg viewBox="0 0 900 1100"><defs><linearGradient id="sh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".10"/><stop offset=".2" stop-color="#000" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient></defs>
<path d="{SHIRT}" fill="{hexc}" stroke="#0002" stroke-width="3"/><path d="{SHIRT}" fill="url(#sh)"/>
<path d="M330,72 C380,98 520,98 570,72" fill="none" stroke="#0003" stroke-width="5"/>
<image href="{IMP}{key}-dos-{v}.png" x="{450-w/2}" y="190" width="{w}"/></svg><figcaption>Dos · {name}</figcaption></figure>'''
    n,hexc,v=cols[1]
    cards+=f'''<figure><svg viewBox="0 0 900 1100"><path d="{SHIRT}" fill="{hexc}" stroke="#0002" stroke-width="3"/>
<path d="M330,62 C380,170 520,170 570,62" fill="none" stroke="#0003" stroke-width="6"/>
<image href="{IMP}{key}-coeur-{v}.png" x="545" y="230" width="120"/></svg><figcaption>Devant · logo cœur</figcaption></figure>'''
    html=f'''<!doctype html><meta charset="utf-8"><style>body{{margin:0;background:#F6F4EE;font:600 22px Inter,sans-serif;color:#0B1B2B}}
h1{{font:40px 'AB';margin:28px 36px 0}}@font-face{{font-family:AB;src:url(file:///tmp/claude-0/fonts/ArchivoBlack-Regular.ttf)}}
.row{{display:flex;gap:16px;padding:20px 28px 28px}}figure{{margin:0;flex:1;background:#fff;border-radius:18px;padding:14px;text-align:center}}svg{{width:100%}}</style>
<h1>{title}</h1><div class="row">{cards}</div>'''
    open(f'/tmp/claude-0/mock-{key}.html','w').write(html)
