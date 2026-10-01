"""Nouvelles descriptions produit (FR), réécrites à partir des fiches Printful synchronisées dans Shopify.
Aucune caractéristique ajoutée : chaque donnée technique vient du texte Printful d'origine."""
import json, html
GPSR = ("Conformément au règlement général sur la sécurité des produits (GPSR), Bandeja Club garantit que tous les produits "
        "proposés sont sûrs et conformes aux normes européennes. Pour toute question sur la sécurité d'un produit, "
        "écris-nous à gramonapro83@gmail.com.")
POD = "Imprimé à la demande, après ta commande."

def page(hook, intro, specs, extra=None, legal=None):
    h = f'<p><strong>{hook}</strong></p>\n<p>{intro}</p>\n'
    h += '<h3>Caractéristiques</h3>\n<ul>\n' + ''.join(f'<li>{s}</li>\n' for s in specs) + '</ul>\n'
    if extra:
        h += f'<p><em>{extra}</em></p>\n'
    leg = legal or []
    h += ('<details>\n<summary>Informations légales et sécurité</summary>\n'
          + ''.join(f'<p>{l}</p>\n' for l in leg) + f'<p>{GPSR}</p>\n</details>')
    return h

TEE_INTRO = ("Un t-shirt classique en 100 % coton, à la coupe nette : il tombe bien, garde des lignes propres "
             "et se porte aussi bien après le match qu'en ville. " + POD)
TEE_SPECS = ["100 % coton", "Grammage : 170 à 180 g/m²", "Fil à extrémités ouvertes",
             "Tissu tubulaire", "Renforts au col et aux épaules",
             "Double couture aux manches et à l'ourlet du bas"]
TEE_NOTE = "Bon à savoir : selon le tissu, la couleur « Blanc » peut paraître légèrement cassée plutôt que blanc éclatant."
TEE_LEGAL = ["Produit brut provenant du Honduras, du Nicaragua, d'Haïti, de la République dominicaine, du Bangladesh et du Mexique.",
             "Traçabilité : tricot et teinture au Honduras et en République dominicaine ; fabrication au Nicaragua, au Honduras, en Haïti, au Salvador ou en République dominicaine.",
             "Restrictions d'âge : pour adultes. Garantie UE : 2 ans.",
             "Conformité : respecte les exigences en matière d'inflammabilité et de teneur en plomb, cadmium, phtalates et formaldéhyde."]

JER_INTRO = ("Un maillot en maille de polyester respirante, pensé pour bouger : il ventile bien pendant les matchs intenses "
             "comme pendant les sessions loisir. Coupe décontractée, longueur allongée pour une meilleure couverture. " + POD)
JER_SPECS = ["100 % polyester respirant (maille)", "Grammage : 140 g/m²", "Coupe décontractée, longueur allongée",
             "Tissu élastique et résistant", "Manches raglan courtes", "Coutures latérales",
             "Encolure ronde classique avec bordure au col"]
JER_LEGAL = ["Produit brut provenant de Chine.", "Restrictions d'âge : pour adultes. Garantie UE : 2 ans.",
             "Conformité : respecte les exigences en matière d'inflammabilité et de teneur en cadmium, bisphénols et phtalates."]

DESIGNS = {
 "drive": ("Côté drive : je prends tout à droite.", ""),
 "reves": ("Côté revés : je finis les points.", ""),
 "lob": ("Lob. Vitre. Point.", "La seule tactique qui compte."),
 "jai": ("Pas ce soir, j'ai padel.", "Pour décliner toutes les invitations, avec le sourire."),
 "club": ("Le logo Bandeja Club, brodé.", "Le t-shirt du club, tout simplement."),
 "padel": ("Le t-shirt Padel de Bandeja Club.", "Pour afficher ta passion, sur le terrain comme en dehors."),
}
def tee(d):
    hook, line = DESIGNS[d]
    specs = (["Logo brodé"] if d == "club" else []) + TEE_SPECS
    return page(f"{hook} {line}".strip(), TEE_INTRO, specs, TEE_NOTE, TEE_LEGAL)
def jer(d):
    hook, line = DESIGNS[d]
    specs = (["Logo brodé"] if d == "club" else []) + JER_SPECS
    return page(f"{hook} {line}".strip(), JER_INTRO, specs, None, JER_LEGAL)

P = {
 "unisex-classic-tee":   ("T-shirt Lifestyle Padel \"côté drive\"", tee("drive")),
 "unisex-classic-tee-2": ("T-shirt Lifestyle Padel \"côté revés\"", tee("reves")),
 "unisex-classic-tee-1": ("T-shirt Lifestyle padel \"Lob Vitre Point\"", tee("lob")),
 "unisex-classic-tee-4": ("T-shirt Lifestyle Padel \"j'ai Padel\"", tee("jai")),
 "unisex-classic-tee-5": ("T-shirt LifeStyle Padel \"BandejaClub\"", tee("club")),
 "unisex-classic-tee-3": ("T-shirt Lifestyle Padel", tee("padel")),
 "unisex-sports-jersey-3": ("T-shirt de sport Padel \"côté drive\"", jer("drive")),
 "unisex-sports-jersey-5": ("T-shirt de sport Padel \"côté revés\"", jer("reves")),
 "unisex-sports-jersey-4": ("T-shirt de sport Padel \"Lob Vitre Point\"", jer("lob")),
 "unisex-sports-jersey-6": ("T-shirt de sport Padel \"j'ai Padel\"", jer("jai")),
 "unisex-sports-jersey":   ("T-shirt de sport Padel \"BandejaClub\"", jer("club")),
 "unisex-sports-jersey-1": ("T-shirt de sport Padel", jer("padel")),
 "padded-sports-bra": ("Brassière de sport Padel", page(
    "La brassière qui suit chaque déplacement.",
    "Confectionnée dans un tissu doux qui évacue l'humidité, elle offre un bon maintien pendant tes séances grâce à ses bretelles renforcées, sa large bande élastique et ses coussinets amovibles. " + POD,
    ["Composition : 84 % polyester, 16 % élasthanne", "Grammage : 230 g/m²",
     "Doublure en maille sportive : 90 % polyester, 10 % élasthanne",
     "Coussinets amovibles : mousse perforée 100 % polyuréthane et tissu 100 % polyester qui évacue l'humidité",
     "Doublure avec fentes pour retirer les coussinets", "Tissu extensible dans les quatre sens",
     "Encolure ronde et dos nageur", "Bretelles renforcées et large bande élastique sous la poitrine",
     "Coutures plates et biais pour éviter les frottements", "Idéale pour les bonnets A à C"],
    None,
    ["Composants du produit brut provenant du Mexique et de Chine.", "Restrictions d'âge : pour adultes. Garantie UE : 2 ans.",
     "Conformité : respecte les exigences en matière d'inflammabilité et les limites fixées pour le formaldéhyde, les colorants azoïques, le plomb, le cadmium, les bisphénols et les phtalates."])),
 "visor": ("Visière Bandeja Club pour padel", page(
    "Le soleil dans le dos, la balle en face.",
    "Une visière à profil bas, brodée Bandeja Club, qui protège tes yeux sans couvrir le haut de la tête. La fermeture auto-agrippante s'ajuste en un geste.",
    ["97 % polyester, 3 % élasthanne", "Profil bas, hauteur de 5 cm", "Sous-visière assortie",
     "Fermeture auto-agrippante avec anneau carré", "Tour de tête : 56 à 59 cm", "Broderie 3D"],
    None, ["Restrictions d'âge : pour adultes. Garantie UE : 2 ans."])),
 "eco-tote-bag": ("Eco Tote Bag", page(
    "Le tote bag du club, en coton bio.",
    "Assez grand pour tes courses, tes livres ou ta tenue d'après-match, et une bonne raison de dire adieu aux sacs en plastique.",
    ["100 % coton bio certifié, armure sergé 3/1", "Grammage : 272 g/m²", "Dimensions : 40,6 × 35,6 × 12,7 cm",
     "Charge maximale : 13,6 kg", "Deux anses de 2,5 cm de large et 62,2 cm de long", "Compartiment principal ouvert"],
    None, ["Produit brut provenant d'Inde.", "Restrictions d'âge : pour adultes. Garantie UE : 2 ans.",
           "Conformité : respecte les exigences relatives aux colorants azoïques et aux teneurs en formaldéhyde."])),
 "stainless-steel-water-bottle": ("Gourde Padel en acier inoxydable", page(
    "Fraîche du premier au dernier set.",
    "Une gourde isotherme de 500 ml en acier inoxydable à double paroi : elle garde ta boisson chaude ou froide pendant 6 heures. Son bouchon étanche et anti-odeurs se glisse dans le sac de padel sans crainte.",
    ["Acier inoxydable de haute qualité", "Contenance : 500 ml", "Dimensions : 27 × 7 cm",
     "Double paroi isotherme : boisson chaude ou froide pendant 6 heures", "Bouchon étanche et anti-odeurs",
     "Forme de quille, finition brillante", "Revêtement ORCA breveté pour des couleurs éclatantes", "Lavage à la main uniquement"],
    "Conseil : ne garde pas d'eau plus de 24 heures dans la gourde, pour l'hygiène et pour éviter les odeurs.",
    ["Produit brut provenant de Chine.", "Restrictions d'âge : pour adultes. Garantie UE : 2 ans.",
     "Conformité : respecte les exigences relatives aux teneurs en plomb, cadmium, métaux lourds, amines aromatiques et BPA."])),
 "all-over-print-gym-bag": ("Sac de sport Padel", page(
    "Ton sac pour le padel… et pour la salle.",
    "Un sac de 30 litres en polyester robuste et résistant à l'eau, imprimé sur toute sa surface. Deux poignées rembourrées et une poche intérieure pour garder clés et téléphone à l'abri.",
    ["100 % polyester", "Grammage : 305 g/m²", "Capacité : 30 litres", "Résistant à l'eau et durable",
     "Tissu robuste avec doublure thermocollée pour plus de tenue", "Passepoil en T pour plus de stabilité",
     "Deux poignées rembourrées", "Poche intérieure pour les objets de valeur"],
    None, ["Restrictions d'âge : pour adultes. Garantie UE : 2 ans.",
           "Conformité : respecte les exigences en matière d'inflammabilité et les limites maximales de plomb, de cadmium, de bisphénols et de phtalates."])),
}
json.dump({k: {"title": t, "descriptionHtml": d} for k, (t, d) in P.items()}, open('descriptions.json', 'w'), ensure_ascii=False, indent=1)

css = """body{margin:0;font-family:Inter,system-ui,sans-serif;background:#F6F4EE;color:#0B1B2B;line-height:1.6}
.top{background:#0B1B2B;color:#F6F4EE;padding:20px 16px}.top h1{margin:0;font-size:22px}.top p{margin:6px 0 0;opacity:.8;font-size:14px}
main{max-width:860px;margin:0 auto;padding:16px}
article{background:#fff;border:1px solid rgba(11,27,43,.14);border-radius:16px;padding:20px;margin:16px 0}
article>h2{font-size:18px;margin:0 0 4px}.h{font-size:12px;color:#4F5D6B;margin:0 0 12px}
h3{font-size:15px;margin:16px 0 6px}ul{padding-left:20px;margin:0}details{margin-top:14px;border-top:1px solid rgba(11,27,43,.14);padding-top:10px;font-size:13px;color:#4F5D6B}
summary{cursor:pointer;font-weight:600;color:#0B1B2B}.flag{display:inline-block;background:#D4FF3A;border-radius:99px;padding:2px 10px;font-size:12px;font-weight:700;margin-left:8px}"""
body = ''.join(f'<article><h2>{html.escape(t)}{" <span class=flag>motif à vérifier</span>" if k.endswith(("tee-3","jersey-1")) else ""}</h2><p class="h">/products/{k}</p>{d}</article>' for k, (t, d) in P.items())
open('apercu-descriptions.html', 'w').write(f'<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nouvelles descriptions</title><style>{css}</style></head><body><div class="top"><h1>Nouvelles descriptions des {len(P)} articles</h1><p>À valider avant publication. Rien n\'est encore modifié dans la boutique.</p></div><main>{body}</main></body></html>')
print(len(P))
