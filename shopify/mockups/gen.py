import html
CDN="https://cdn.shopify.com/s/files/1/1080/4317/4228/files/"
P=[
 ("T-shirt LifeStyle Padel « BandejaClub »","Lifestyle","34,99",CDN+"unisex-classic-tee-black-front-6abd637cceeee.jpg?v=1790796686","unisex-classic-tee-5"),
 ("T-shirt de sport Padel « BandejaClub »","Sport","39,99",CDN+"unisex-sports-jersey-white-front-6abd7cbd09c8e.jpg?v=1790803143","unisex-sports-jersey"),
 ("T-shirt Lifestyle Padel « côté drive »","Lifestyle","29,90",CDN+"unisex-classic-tee-black-front-6abd4b8926e36.jpg?v=1790790563","unisex-classic-tee"),
 ("T-shirt de sport Padel « côté revés »","Sport","34,99",CDN+"unisex-sports-jersey-white-front-6abd6a0e0cacb.jpg?v=1790798366","unisex-sports-jersey-5"),
 ("T-shirt Lifestyle Padel « Lob Vitre Point »","Lifestyle","29,90",CDN+"unisex-classic-tee-black-front-6abd4fc2e835e.jpg?v=1790791640","unisex-classic-tee-1"),
 ("Gourde Padel en acier inoxydable","Accessoires","30,00",CDN+"stainless-steel-water-bottle-black-17-oz-front-6abd21241eb61.jpg?v=1790779698","stainless-steel-water-bottle"),
 ("Visière Bandeja Club pour padel","Accessoires","25,00",CDN+"visor-black-front-6abd02f77b0b9.jpg?v=1790771971","visor"),
 ("Sac de sport Padel","Accessoires","80,00",CDN+"all-over-print-gym-bag-white-front-6abd24e26f1d0.jpg?v=1790780658","all-over-print-gym-bag"),
]
CATS=[("Lifestyle",P[0][3]),("Sport",P[1][3]),("Accessoires",P[7][3])]
HERO_IMG=P[0][3]
esc=html.escape
def card(p):
    return f'''<a class="pc" href="#"><div class="pc-img"><img src="{p[3]}" alt="{esc(p[0])}" loading="lazy"></div><div class="pc-info"><span class="pc-cat">{p[1]}</span><h3>{esc(p[0])}</h3><span class="pc-price">dès {p[2]} €</span></div></a>'''
HEADER='''<div class="announce"><span>Livraison offerte dès 60 € en France et en Europe</span><span class="sep">·</span><a href="#">−10 % sur ta première commande : crée ton compte</a></div>
<header class="nav"><a class="logo" href="#"><img src="assets/%s" alt="" width="34" height="34"><b>BANDEJA<i>CLUB</i></b></a>
<nav><a href="#">Lifestyle</a><a href="#">Sport</a><a href="#">Accessoires</a><a href="#">Contact</a></nav>
<div class="actions"><a href="#">Connexion</a><a href="#" class="cart">Panier (0)</a></div></header>'''
FOOT='''<footer><div class="f-top"><a class="logo" href="#"><img src="assets/logo-mark-light.png" alt="" width="34" height="34"><b>BANDEJA<i>CLUB</i></b></a>
<nav><a href="#">Mentions légales</a><a href="#">CGV</a><a href="#">CGU</a><a href="#">Confidentialité</a><a href="#">Cookies</a><a href="#">Retours et rétractation</a></nav></div>
<p>© 2026 BandejaClub · Paiement sécurisé · Livraison en France &amp; Europe</p></footer>'''
NEWS='''<section class="news"><h2>Reste informé.</h2><p>Reçois par email les nouveautés Bandeja Club.</p><form onsubmit="return false"><input type="email" placeholder="ton@email.com" aria-label="Adresse email"><button>Je m'inscris</button></form></section>'''
PRINT_TXT="Chaque pièce est imprimée à la demande, après ta commande."
BASE='''*{box-sizing:border-box;margin:0;padding:0}a{color:inherit;text-decoration:none}img{display:block;max-width:100%}button{font:inherit;cursor:pointer}
html{scroll-behavior:smooth}body{font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.pc{display:block}.pc-img{overflow:hidden}.pc-img img{width:100%;height:100%;object-fit:cover;transition:transform .5s}.pc:hover .pc-img img{transform:scale(1.03)}
.logo{display:flex;align-items:center;gap:.6rem}.logo b{font-weight:800;letter-spacing:.04em}.logo i{font-style:normal}
input{font:inherit}
@media (max-width:760px){.nav nav{display:none}}
'''
FONTS='<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Archivo+Black&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">'
def page(title,css,body):
    return f'<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title}</title>{FONTS}<style>{BASE}{css}@media (max-width:760px){{.nav nav{{display:none!important}}.nav{{padding:.8rem 1.2rem!important}}.actions{{gap:.9rem!important}}.logo b{{font-size:1rem!important}}}}</style></head><body>{body}</body></html>'

# ---------- A : Nike-like, blanc / noir, titres condensés ----------
cssA='''
:root{--ink:#111;--g:#f5f5f5;--m:#707072}
body{background:#fff;color:var(--ink)}
.announce{background:#f5f5f5;font-size:.78rem;font-weight:500;text-align:center;padding:.55rem 1rem;display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap}.announce a{text-decoration:underline}
.nav{position:sticky;top:0;z-index:5;background:#fff;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:.9rem 2.5rem}
.nav nav{display:flex;gap:2rem;font-weight:600;font-size:.95rem}.nav nav a:hover{text-decoration:underline;text-underline-offset:6px}
.actions{display:flex;gap:1.4rem;justify-content:flex-end;font-size:.88rem;font-weight:600}
.logo b{font-family:'Archivo',sans-serif;font-stretch:75%;font-weight:900;font-size:1.3rem}.logo i{background:var(--ink);color:#fff;padding:0 .3em;margin-left:.2em}
.hero{position:relative;height:min(82vh,760px);background:#e8e8e8;overflow:hidden}.hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 20%}
.hero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.55))}
.hero-text{position:absolute;left:2.5rem;bottom:3rem;z-index:2;color:#fff;max-width:640px}
.hero-text p.eb{font-weight:600;margin-bottom:.8rem}
.hero-text h1{font-family:'Archivo',sans-serif;font-stretch:62%;font-weight:900;text-transform:uppercase;font-size:clamp(3.4rem,10vw,8rem);line-height:.88;letter-spacing:-.01em}
.hero-text p.lead{margin:1.2rem 0 1.6rem;font-weight:500;max-width:46ch}
.btn{display:inline-block;background:#fff;color:var(--ink);padding:.95rem 1.8rem;border-radius:999px;font-weight:600;font-size:.95rem}.btn.dark{background:var(--ink);color:#fff}.btn:hover{opacity:.85}
.sec{padding:4rem 2.5rem 0}.sec h2{font-family:'Archivo',sans-serif;font-stretch:62%;font-weight:900;text-transform:uppercase;font-size:2.2rem;margin-bottom:1.4rem}
.cats{display:grid;grid-template-columns:repeat(3,1fr);gap:.6rem}.cat{position:relative;aspect-ratio:4/5;overflow:hidden;background:var(--g)}.cat img{width:100%;height:100%;object-fit:cover}
.cat span{position:absolute;left:1.2rem;bottom:1.2rem;background:#fff;padding:.7rem 1.4rem;border-radius:999px;font-weight:600}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.6rem .6rem}
.pc-img{aspect-ratio:4/5;background:var(--g)}.pc-info{padding:.8rem .2rem 0;display:grid;gap:.1rem}.pc-info h3{font-size:.98rem;font-weight:600}.pc-cat{color:var(--m);font-size:.9rem}.pc-price{font-weight:600;margin-top:.5rem;font-size:.95rem}
.band{margin:4rem 2.5rem 0;background:var(--g);padding:3rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center}
.band h2{margin:0;font-size:2.6rem}.band p{color:#444;max-width:44ch}.band .btn{margin-top:1.2rem}
.news{text-align:center;padding:5rem 1.5rem}.news h2{font-family:'Archivo',sans-serif;font-stretch:62%;font-weight:900;text-transform:uppercase;font-size:2.6rem}.news p{margin:.6rem 0 1.4rem;color:var(--m)}
.news form{display:flex;gap:.5rem;justify-content:center;flex-wrap:wrap}.news input{border:1px solid #ccc;border-radius:999px;padding:.9rem 1.3rem;width:min(340px,100%)}.news button{background:var(--ink);color:#fff;border:0;border-radius:999px;padding:.9rem 1.8rem;font-weight:600}
footer{background:var(--ink);color:#fff;padding:2.5rem}.f-top{display:flex;justify-content:space-between;gap:1.5rem;flex-wrap:wrap;align-items:center}.f-top nav{display:flex;gap:1.4rem;flex-wrap:wrap;font-size:.85rem;color:#bbb}.logo i{} footer .logo i{background:#fff;color:var(--ink)}footer p{margin-top:1.6rem;color:#888;font-size:.8rem}
@media (max-width:900px){.grid{grid-template-columns:repeat(2,1fr)}.cats{grid-template-columns:1fr}.band{grid-template-columns:1fr;padding:2rem}.nav{padding:.8rem 1.2rem;grid-template-columns:1fr auto}.sec{padding:3rem 1.2rem 0}.hero-text{left:1.2rem;bottom:2rem;right:1.2rem}.band{margin:3rem 1.2rem 0}}
'''
bodyA=HEADER.replace("%s","logo-mark.png")+f'''<section class="hero"><img src="{HERO_IMG}" alt=""><div class="hero-text"><p class="eb">Padel · Textiles et accessoires</p><h1>Joue<br>comme<br>tu vis.</h1><p class="lead">T-shirts, brassières et accessoires pour les joueurs de padel.</p><a class="btn" href="#">Voir la collection</a></div></section>
<section class="sec"><h2>Choisis ton univers</h2><div class="cats">{"".join(f'<a class="cat" href="#"><img src="{c[1]}" alt=""><span>{c[0]}</span></a>' for c in CATS)}</div></section>
<section class="sec"><h2>La collection</h2><div class="grid">{"".join(card(p) for p in P)}</div></section>
<section class="band"><div><h2>Imprimé à la demande</h2></div><div><p>{PRINT_TXT} Livraison offerte dès 60 € d'achat en France et en Europe.</p><a class="btn dark" href="#">Voir les produits</a></div></section>
{NEWS}{FOOT}'''
open('mockups/A-blanc-noir.html','w').write(page("Maquette A · Blanc et noir",cssA,bodyA))

# ---------- B : Adidas-like, noir dominant, tuiles, flèches ----------
cssB='''
:root{--ink:#000;--g:#ececec;--m:#6b6b6b}
body{background:#fff;color:#000}
.announce{background:#000;color:#fff;font-size:.75rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase;text-align:center;padding:.6rem 1rem;display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap}.announce a{text-decoration:underline}
.nav{background:#fff;border-bottom:1px solid #000;display:flex;align-items:center;justify-content:space-between;gap:2rem;padding:1rem 2rem}
.nav nav{display:flex;gap:1.8rem;font-weight:700;text-transform:uppercase;font-size:.82rem;letter-spacing:.06em}.nav nav a{padding-bottom:3px;border-bottom:2px solid transparent}.nav nav a:hover{border-color:#000}
.actions{display:flex;gap:1.4rem;font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em}
.logo b{font-family:'Archivo',sans-serif;font-weight:900;font-size:1.05rem}.logo i{border-bottom:3px solid #000;margin-left:.2em}
.hero{display:grid;grid-template-columns:1.1fr 1fr;min-height:620px}
.hero-text{background:#000;color:#fff;padding:4rem 3rem;display:flex;flex-direction:column;justify-content:flex-end}
.hero-text h1{font-family:'Archivo',sans-serif;font-weight:900;font-stretch:100%;text-transform:uppercase;font-size:clamp(2.6rem,6vw,5.2rem);line-height:.95;letter-spacing:-.02em}
.hero-text p{margin:1.4rem 0 2rem;max-width:42ch;color:#ddd}
.cta{display:inline-flex;align-items:center;gap:.8rem;background:#fff;color:#000;padding:1rem 1.4rem;font-weight:800;text-transform:uppercase;letter-spacing:.05em;font-size:.82rem;align-self:flex-start;border-bottom:3px solid #000;outline:1px solid #fff}.cta::after{content:"→";font-size:1.1rem}.cta:hover{background:#ececec}
.hero-img{background:#d9d9d9}.hero-img img{width:100%;height:100%;object-fit:cover;object-position:center 15%}
.sec{padding:3.5rem 2rem 0}.sec h2{font-family:'Archivo',sans-serif;font-weight:900;text-transform:uppercase;font-size:1.7rem;letter-spacing:-.01em;margin-bottom:1.2rem;display:flex;justify-content:space-between;align-items:baseline}
.sec h2 a{font-size:.8rem;border-bottom:2px solid #000;letter-spacing:.05em}
.cats{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}.cat{position:relative;aspect-ratio:1/1;overflow:hidden;background:var(--g)}.cat img{width:100%;height:100%;object-fit:cover;transition:transform .5s}.cat:hover img{transform:scale(1.04)}
.cat span{position:absolute;left:0;bottom:1.2rem;background:#fff;padding:.7rem 1.2rem;font-weight:900;text-transform:uppercase;font-family:'Archivo',sans-serif;letter-spacing:.02em;border-bottom:3px solid #000}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.4rem 1rem}
.pc{border:1px solid #e3e3e3;padding-bottom:1rem;transition:border-color .2s}.pc:hover{border-color:#000}
.pc-img{aspect-ratio:1/1;background:var(--g)}.pc-info{padding:.9rem 1rem 0;display:grid;gap:.15rem}.pc-info h3{font-size:.9rem;font-weight:600;order:2}.pc-price{font-weight:800;font-size:.95rem;order:1}.pc-cat{order:3;color:var(--m);font-size:.8rem;text-transform:uppercase;letter-spacing:.05em}
.strip{margin:3.5rem 2rem 0;border:1px solid #000;display:grid;grid-template-columns:repeat(3,1fr)}.strip div{padding:1.6rem;border-right:1px solid #000}.strip div:last-child{border:0}
.strip b{display:block;font-family:'Archivo',sans-serif;font-weight:900;text-transform:uppercase;margin-bottom:.4rem}.strip span{font-size:.9rem;color:#333}
.news{background:#ececec;margin-top:3.5rem;padding:4rem 2rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center}
.news h2{font-family:'Archivo',sans-serif;font-weight:900;text-transform:uppercase;font-size:2rem}.news p{margin-top:.5rem;color:#444}
.news form{display:flex;gap:0}.news input{flex:1;border:1px solid #000;border-right:0;padding:1rem;background:#fff;min-width:0}.news button{background:#000;color:#fff;border:1px solid #000;padding:1rem 1.4rem;font-weight:800;text-transform:uppercase;letter-spacing:.05em;font-size:.8rem}
footer{background:#000;color:#fff;padding:2.5rem 2rem}.f-top{display:flex;justify-content:space-between;gap:1.5rem;flex-wrap:wrap;align-items:center}.f-top nav{display:flex;gap:1.4rem;flex-wrap:wrap;font-size:.8rem;color:#bbb}footer .logo i{border-color:#fff}footer p{margin-top:1.6rem;color:#888;font-size:.78rem}
@media (max-width:900px){.hero{grid-template-columns:1fr}.hero-img{height:380px;order:-1}.hero-text{padding:2.5rem 1.2rem}.cats{grid-template-columns:1fr}.grid{grid-template-columns:repeat(2,1fr)}.strip{grid-template-columns:1fr}.strip div{border-right:0;border-bottom:1px solid #000}.news{grid-template-columns:1fr;padding:3rem 1.2rem}.news>*{min-width:0}.sec{padding:2.5rem 1.2rem 0}.strip{margin:2.5rem 1.2rem 0}.nav{padding:.8rem 1.2rem}}
'''
bodyB=HEADER.replace("%s","logo-mark.png")+f'''<section class="hero"><div class="hero-text"><h1>Joue<br>comme<br>tu vis.</h1><p>T-shirts, brassières et accessoires pour les joueurs de padel. {PRINT_TXT}</p><a class="cta" href="#">Voir la collection</a></div><div class="hero-img"><img src="{HERO_IMG}" alt=""></div></section>
<section class="sec"><h2>Catégories</h2><div class="cats">{"".join(f'<a class="cat" href="#"><img src="{c[1]}" alt=""><span>{c[0]}</span></a>' for c in CATS)}</div></section>
<section class="sec"><h2>La collection <a href="#">Tout voir</a></h2><div class="grid">{"".join(card(p) for p in P)}</div></section>
<section class="strip"><div><b>Livraison</b><span>Offerte dès 60 € en France et en Europe.</span></div><div><b>Imprimé à la demande</b><span>Chaque pièce est fabriquée après ta commande.</span></div><div><b>Compte client</b><span>−10 % sur ta première commande, une fois ton compte créé.</span></div></section>
{NEWS.replace('<section class="news"><h2>Reste informé.</h2><p>Reçois par email les nouveautés Bandeja Club.</p>','<section class="news"><div><h2>Reste informé.</h2><p>Reçois par email les nouveautés Bandeja Club.</p></div>')}{FOOT}'''
open('mockups/B-contraste.html','w').write(page("Maquette B · Contraste noir et blanc",cssB,bodyB))

# ---------- C : identité BandejaClub épurée (marine + lime en touche) ----------
cssC='''
:root{--ink:#0b1b2b;--lime:#d4ff3a;--paper:#f6f4ee;--m:#5d6b78;--line:#d9d6cc}
body{background:var(--paper);color:var(--ink)}
.announce{background:var(--ink);color:#fff;font-size:.78rem;font-weight:500;text-align:center;padding:.55rem 1rem;display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap}.announce a{color:var(--lime);text-decoration:underline;text-underline-offset:3px}.announce .sep{opacity:.5}
.nav{display:flex;align-items:center;justify-content:space-between;gap:2rem;padding:1.1rem 2.5rem;border-bottom:1px solid var(--line)}
.nav nav{display:flex;gap:2rem;font-weight:500;font-size:.92rem}.nav nav a{position:relative;padding:.2rem 0}.nav nav a::after{content:"";position:absolute;left:0;bottom:-2px;height:2px;width:0;background:var(--lime);transition:width .25s}.nav nav a:hover::after{width:100%}
.actions{display:flex;gap:1.4rem;font-size:.88rem;font-weight:500;align-items:center}.actions .cart{background:var(--ink);color:#fff;padding:.5rem 1rem;border-radius:4px}
.logo b{font-family:'Archivo Black',sans-serif;font-weight:400;font-size:1.15rem}.logo i{background:var(--ink);color:var(--lime);padding:.05em .35em;margin-left:.3em;border-radius:3px}
.hero{display:grid;grid-template-columns:1fr 1fr;align-items:stretch;min-height:640px}
.hero-text{padding:5rem 2.5rem;display:flex;flex-direction:column;justify-content:center}
.eb{text-transform:uppercase;letter-spacing:.16em;font-size:.74rem;font-weight:600;color:var(--m);margin-bottom:1.4rem}
.hero-text h1{font-family:'Archivo Black',sans-serif;font-weight:400;font-size:clamp(3rem,7vw,6rem);line-height:.95;letter-spacing:-.02em}
.hero-text h1 u{text-decoration:none;box-shadow:inset 0 -.28em 0 var(--lime)}
.lead{margin:1.6rem 0 2.2rem;color:var(--m);max-width:42ch;font-size:1.05rem}
.btn{display:inline-block;background:var(--ink);color:#fff;padding:1rem 1.8rem;border-radius:4px;font-weight:600;font-size:.92rem;align-self:flex-start}.btn:hover{background:#12283d}.btn.ghost{background:transparent;color:var(--ink);border:1px solid var(--ink)}
.hero-img{background:#e7e4da}.hero-img img{width:100%;height:100%;object-fit:cover;object-position:center 15%}
.sec{padding:5rem 2.5rem 0;max-width:1400px;margin:0 auto}.sec h2{font-family:'Archivo Black',sans-serif;font-weight:400;font-size:2rem;margin-bottom:.4rem}.sec .sub{color:var(--m);margin-bottom:1.8rem}
.cats{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem}.cat{position:relative;aspect-ratio:4/5;overflow:hidden;background:#e7e4da;border-radius:6px}.cat img{width:100%;height:100%;object-fit:cover;transition:transform .5s}.cat:hover img{transform:scale(1.04)}
.cat span{position:absolute;left:1rem;bottom:1rem;right:1rem;background:var(--paper);padding:.9rem 1.1rem;border-radius:4px;font-weight:600;display:flex;justify-content:space-between}.cat span::after{content:"→"}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem 1.2rem}
.pc-img{aspect-ratio:4/5;background:#e7e4da;border-radius:6px}.pc-info{padding:.9rem 0 0;display:grid;gap:.15rem}.pc-info h3{font-size:.95rem;font-weight:600}.pc-cat{color:var(--m);font-size:.82rem}.pc-price{font-weight:600;margin-top:.4rem;font-size:.92rem}
.facts{display:grid;grid-template-columns:repeat(3,1fr);gap:2.5rem;border-top:1px solid var(--line);margin-top:5rem;padding-top:2.5rem}
.facts b{display:block;font-family:'Archivo Black',sans-serif;font-weight:400;font-size:1.05rem;margin-bottom:.5rem}.facts span{color:var(--m);font-size:.95rem}.facts div::before{content:"";display:block;width:28px;height:4px;background:var(--lime);margin-bottom:1rem}
.news{text-align:center;padding:6rem 1.5rem}.news h2{font-family:'Archivo Black',sans-serif;font-weight:400;font-size:2.2rem}.news p{margin:.6rem 0 1.6rem;color:var(--m)}
.news form{display:flex;gap:.5rem;justify-content:center;flex-wrap:wrap}.news input{border:1px solid var(--ink);border-radius:4px;padding:.9rem 1.2rem;width:min(340px,100%);background:transparent}.news button{background:var(--ink);color:#fff;border:0;border-radius:4px;padding:.9rem 1.8rem;font-weight:600}
footer{background:var(--ink);color:#fff;padding:2.5rem}.f-top{display:flex;justify-content:space-between;gap:1.5rem;flex-wrap:wrap;align-items:center}.f-top nav{display:flex;gap:1.4rem;flex-wrap:wrap;font-size:.85rem;color:#b9c3cc}footer p{margin-top:1.6rem;color:#7d8b98;font-size:.8rem}
@media (max-width:900px){.hero{grid-template-columns:1fr}.hero-img{height:420px;order:-1}.hero-text{padding:2.5rem 1.2rem}.cats{grid-template-columns:1fr}.grid{grid-template-columns:repeat(2,1fr)}.facts{grid-template-columns:1fr}.sec{padding:3.5rem 1.2rem 0}.nav{padding:.9rem 1.2rem}}
'''
bodyC=HEADER.replace("%s","logo-mark.png")+f'''<section class="hero"><div class="hero-text"><p class="eb">Padel · Textiles et accessoires</p><h1>Joue<br>comme<br><u>tu vis.</u></h1><p class="lead">T-shirts, brassières et accessoires pour les joueurs de padel. {PRINT_TXT}</p><a class="btn" href="#">Voir la collection</a></div><div class="hero-img"><img src="{HERO_IMG}" alt=""></div></section>
<section class="sec"><h2>Par univers</h2><p class="sub">Lifestyle, sport et accessoires.</p><div class="cats">{"".join(f'<a class="cat" href="#"><img src="{c[1]}" alt=""><span>{c[0]}</span></a>' for c in CATS)}</div></section>
<section class="sec"><h2>La collection</h2><p class="sub">Les designs Bandeja Club.</p><div class="grid">{"".join(card(p) for p in P)}</div>
<div class="facts"><div><b>Livraison</b><span>Offerte dès 60 € d'achat, en France et en Europe.</span></div><div><b>Imprimé à la demande</b><span>Chaque pièce est fabriquée après ta commande.</span></div><div><b>Compte client</b><span>−10 % sur ta première commande, une fois ton compte créé.</span></div></div></section>
{NEWS}{FOOT}'''
open('mockups/C-bandejaclub-epure.html','w').write(page("Maquette C · BandejaClub épuré",cssC,bodyC))
