"""Maquettes réalistes (pli du tissu, ombres, texture) pour les modèles v2."""
import os
IMP=os.environ.get('IMP','/tmp/claude-0/v2/')
BACK='M392,78 C440,96 560,96 608,78 L790,138 C845,200 905,290 948,362 L832,424 L772,346 L780,1032 Q500,1052 220,1032 L228,346 L168,424 L52,362 C95,290 155,200 210,138 Z'
NECK_B='M392,80 C440,100 560,100 608,80'
NECK_F='M398,80 C420,175 580,175 602,80'
DEFS='''<filter id="b18"><feGaussianBlur stdDeviation="18"/></filter><filter id="b8"><feGaussianBlur stdDeviation="8"/></filter>
<filter id="tex" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="5"/><feColorMatrix type="matrix" values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .55 0"/></filter>
<filter id="fold" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.004 0.012" numOctaves="2" seed="9"/><feDisplacementMap in="SourceGraphic" scale="7" xChannelSelector="R" yChannelSelector="G"/></filter>
<filter id="drop" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="16"/></filter>'''
def shirt(color,print_img,pw,py,uid,front=False,dark=False,px=None,crop=True):
    neck=NECK_F if front else NECK_B
    shade='#000'
    folds=f'''<g clip-path="url(#c{uid})" style="mix-blend-mode:multiply">
<path d="M228,346 C250,600 240,850 250,1040 L200,1040 L200,346Z" fill="#000" opacity=".10" filter="url(#b18)"/>
<path d="M772,346 C750,600 760,850 750,1040 L800,1040 L800,346Z" fill="#000" opacity=".10" filter="url(#b18)"/>
<path d="M232,350 C290,390 320,450 318,520" stroke="#000" stroke-width="18" fill="none" opacity=".07" filter="url(#b8)"/>
<path d="M768,350 C710,390 680,450 682,520" stroke="#000" stroke-width="18" fill="none" opacity=".07" filter="url(#b8)"/>
<path d="{neck}" stroke="#000" stroke-width="24" fill="none" opacity=".16" filter="url(#b8)"/>
</g>'''
    img=''
    if print_img:
        img=f'<image href="{print_img}" x="{px if px is not None else 500-pw/2}" y="{py}" width="{pw}" opacity=".97"/>'
    vb='20 40 960 1040'
    return f'''<svg viewBox="{vb}" xmlns="http://www.w3.org/2000/svg"><defs>{DEFS}<clipPath id="c{uid}"><path d="{BACK}"/></clipPath></defs>
<path d="{BACK}" transform="translate(14,26)" fill="#000" opacity=".22" filter="url(#drop)"/>
<path d="{BACK}" fill="{color}"/>
<path d="{BACK}" fill="none" stroke="#000" stroke-opacity=".12" stroke-width="3"/>
{img}
{folds}
<rect width="1000" height="1150" clip-path="url(#c{uid})" filter="url(#tex)" opacity=".18" style="mix-blend-mode:overlay"/>
<path d="{neck}" fill="none" stroke="{color}" stroke-width="26"/><path d="{neck}" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="26"/>
<path d="{neck}" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="2" transform="translate(0,14)" stroke-dasharray="6 5"/>
<path d="M178,410 L60,346 M822,410 L940,346" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="2" stroke-dasharray="6 5"/>
<path d="M222,1012 Q500,1032 778,1012" fill="none" stroke="#000" stroke-opacity=".2" stroke-width="2" stroke-dasharray="6 5"/>
</svg>'''
D={
 'club-soleil':('Club Soleil','Le badge rond : logo au centre, signes autour, soleil qui rayonne.',[('Ivoire','#EEE5D3','clair'),('Bleu marine délavé','#2D4560','fonce'),('Vert sauge','#A3B39A','clair')],330,180,1.0),
 'souvenir':('Souvenir du Club','La carte postale rétro : lettres « Bandeja » remplies d’un coucher de soleil.',[('Blanc cassé','#F4F1EA','clair'),('Bleu ciel délavé','#AECBE0','clair'),('Bleu marine','#24384F','fonce')],370,190,0.84),
 'apero':('Soleil, padel & apéro','L’arche méditerranéenne : la balle se couche sur la mer.',[('Sable','#E4D2B2','clair'),('Terracotta','#B1613F','fonce'),('Vert forêt','#2F4B3C','fonce')],285,170,1.32),
}
D['club-soleil-v3']=('Club Soleil','Médaillon une encre, esprit gravure : bague de texte continue, logo, soleil et fleurs.',[('Noir délavé','#232323','fonce'),('Ivoire','#EEE5D3','clair'),('Bleu marine délavé','#2D4560','fonce')],400,160,1.0)
D['club-soleil-v3-rayons']=('Club Soleil · variante rayons','Même médaillon, intérieur gravé de rayons fins autour du logo.',[('Noir délavé','#232323','fonce'),('Ivoire','#EEE5D3','clair'),('Bleu marine délavé','#2D4560','fonce')],400,160,1.0)
D['club-soleil-v3-rayons-leger']=('Club Soleil · rayons légers','Version allégée : 40 rayons plus fins.',[('Noir délavé','#232323','fonce'),('Ivoire','#EEE5D3','clair'),('Bleu marine délavé','#2D4560','fonce')],400,160,1.0)
ONLY=os.environ.get('ONLY')
for key,(title,sub,cols,pw,py,ratio) in D.items():
    if ONLY and key not in ONLY.split(','): continue
    main_name,main_hex,main_v=cols[0]
    zoom=f'''<div class="zoom" style="background:{main_hex}"><div class="grain"></div><img src="{IMP}{key}-dos-{main_v}.png"></div>'''
    big=shirt(main_hex,f'{IMP}{key}-dos-{main_v}.png',pw,py,'m',dark=main_v=='fonce')
    smalls=''
    for i,(n,h,v) in enumerate(cols[1:]):
        smalls+=f'<figure>{shirt(h,f"{IMP}{key}-dos-{v}.png",pw,py,"s"+str(i),dark=v=="fonce")}<figcaption>Dos · {n}</figcaption></figure>'
    cw = 110 if key=='club-soleil' else 120
    # le logo cœur se place à gauche de la poitrine (à droite sur l'image)
    front=shirt(main_hex,f"{IMP}{key}-coeur-{main_v}.png",cw,235,"f",front=True,px=590)
    smalls+=f'<figure>{front}<figcaption>Devant · {main_name}</figcaption></figure>'
    html=f'''<!doctype html><meta charset="utf-8"><style>
@font-face{{font-family:AB;src:url(file:///tmp/claude-0/fonts/ArchivoBlack-Regular.ttf)}}
@font-face{{font-family:IN;src:url(file:///tmp/claude-0/fonts/Inter.ttf)}}
body{{margin:0;background:#EAE3D6;font-family:IN;color:#14263B}}
.wrap{{display:grid;gap:18px;padding:28px}}
.hero{{background:linear-gradient(160deg,#DCD0BC,#C9BBA3);border-radius:22px;padding:34px 40px 20px;position:relative}}
h1{{font-family:AB;font-size:44px;margin:0}} p{{margin:6px 0 0;font-size:19px;opacity:.75}}
.hero .tag{{position:absolute;right:34px;top:40px;font-weight:700;font-size:17px;background:#fff;padding:8px 16px;border-radius:99px}}
.side{{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px}}
figure{{margin:0;background:linear-gradient(160deg,#DCD0BC,#C9BBA3);border-radius:18px;padding:12px 12px 14px;text-align:center}}
figcaption{{font-weight:700;font-size:17px}} svg{{width:100%;display:block}}
.hero{{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:0;background:none}} .zoom{{border-radius:18px;position:relative;display:grid;place-items:center;overflow:hidden;aspect-ratio:1}} .zoom img{{width:74%;max-height:86%;object-fit:contain;position:relative}} .grain{{position:absolute;inset:0;opacity:.35;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .35 0'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>")}} .head{{padding:4px 6px}}</style>
<div class="wrap"><div class="head"><h1>{title}</h1><p>{sub}</p></div><div class="hero">{zoom}<figure class="main">{big}<figcaption>Dos · {main_name}</figcaption></figure></div><div class="side">{smalls}</div></div>'''
    open(f'/tmp/claude-0/mock2-{key}.html','w').write(html)
print('ok')
