"""Descriptions v2 : accroche et argumentaire propres à chaque produit + titre et description Google.
Les caractéristiques et les informations légales restent celles vérifiées sur les fiches Printful (inchangées)."""
import json, html

# ---------- blocs vérifiés (repris tels quels des fiches actuelles) ----------
NOTE_BLANC = "<p><em>Bon à savoir : selon le tissu, la couleur « Blanc » peut paraître légèrement cassée plutôt que blanc éclatant.</em></p>"
GPSR = "<p>Conformément au règlement général sur la sécurité des produits (GPSR), Bandeja Club garantit que tous les produits proposés sont sûrs et conformes aux normes européennes. Pour toute question sur la sécurité d'un produit, écris-nous à gramonapro83@gmail.com.</p>"
FAB = "<p>Fabricant : Printful, support@printful.com, Raina bulvaris 25, Riga, LV-1050, Lettonie.</p>"
def legal(*ps): return "<details>\n<summary>Informations légales et sécurité</summary>\n" + "\n".join((FAB,) + ps + (GPSR,)) + "\n</details>"
def ul(items): return "<ul>\n" + "\n".join(f"<li>{i}</li>" for i in items) + "\n</ul>"

LEGAL_COTON = legal("<p>Produit brut provenant du Honduras, du Nicaragua, d'Haïti, de la République dominicaine, du Bangladesh et du Mexique.</p>",
  "<p>Traçabilité : tricot et teinture au Honduras et en République dominicaine ; fabrication au Nicaragua, au Honduras, en Haïti, au Salvador ou en République dominicaine.</p>",
  "<p>Restrictions d'âge : pour adultes. Garantie UE : 2 ans.</p>",
  "<p>Conformité : respecte les exigences en matière d'inflammabilité et de teneur en plomb, cadmium, phtalates et formaldéhyde.</p>")
LEGAL_SPORT = legal("<p>Produit brut provenant de Chine.</p>", "<p>Restrictions d'âge : pour adultes. Garantie UE : 2 ans.</p>",
  "<p>Conformité : respecte les exigences en matière d'inflammabilité et de teneur en cadmium, bisphénols et phtalates.</p>")
CARAC_COTON = ["100 % coton", "Grammage : 170 à 180 g/m²", "Fil à extrémités ouvertes", "Tissu tubulaire", "Renforts au col et aux épaules", "Double couture aux manches et à l'ourlet du bas"]
CARAC_SPORT = ["100 % polyester respirant (maille)", "Grammage : 140 g/m²", "Coupe décontractée, longueur allongée", "Tissu élastique et résistant", "Manches raglan courtes", "Coutures latérales", "Encolure ronde classique avec bordure au col"]
PERSO = ("<h3>Personnalisation</h3>\n" + ul(["Nom ou prénom : 10 caractères maximum", "Numéro : de 0 à 99", "Le texte est reproduit exactement comme tu l'écris : vérifie bien l'orthographe."]) +
  "\n<p><em>Produit personnalisé : il n'est ni repris ni échangé (pas de droit de rétractation, article L221-28, 3° du Code de la consommation), sauf défaut.</em></p>")

def page(hook, paras, why, carac, tail, extra=""):
    out = [f"<p><strong>{hook}</strong></p>"] + [f"<p>{p}</p>" for p in paras]
    out += ["<h3>Pourquoi tu vas l'aimer</h3>", ul(why)]
    if extra: out.append(extra)
    out += ["<h3>Caractéristiques</h3>", ul(carac)] + tail
    return "\n".join(out)

# ---------- les textes ----------
COTON_WHY = ["<strong>Coton 100 %, 170 à 180 g/m²</strong> : un t-shirt qui a de la tenue sans être lourd, agréable à porter toute la journée.",
             "<strong>Renforts au col et aux épaules, doubles coutures</strong> : il garde sa forme au fil des lavages.",
             "<strong>Fabriqué à la demande</strong>, après ta commande : pas de stock qui dort, pas de surproduction."]
SPORT_WHY = ["<strong>Maille de polyester respirante, 140 g/m²</strong> : légère, elle laisse passer l'air pendant les échanges longs.",
             "<strong>Tissu élastique et manches raglan</strong> : plus de liberté aux épaules pour un smash, un service ou une bandeja.",
             "<strong>Longueur allongée</strong> : il couvre mieux le bas du dos quand tu te baisses pour une volée basse.",
             "<strong>Fabriqué à la demande</strong>, après ta commande."]

P = {}
P["unisex-classic-tee-3"] = dict(  # Lifestyle Padel
  hook="Le padel, aussi en dehors du terrain.",
  paras=["Ce t-shirt est fait pour ceux qui parlent padel au bureau, au dîner et au téléphone. Coton épais, coupe nette : il passe du club au centre-ville sans effort.",
         "Porte-le après le match, au tournoi du week-end ou simplement pour montrer que ton sport, c'est le padel."],
  why=COTON_WHY, carac=CARAC_COTON, tail=[NOTE_BLANC, LEGAL_COTON],
  seo=("T-shirt padel Lifestyle en coton", "T-shirt padel 100 % coton, coupe nette, pour afficher ta passion en dehors du terrain. Fabriqué à la demande, livré en France et dans l'UE."))
P["unisex-classic-tee"] = dict(  # côté drive lifestyle
  hook="Côté drive : je prends tout à droite.",
  paras=["Au padel, chaque paire a son joueur de droite : celui qui construit le point, relance et prépare le terrain pour son partenaire. Si c'est toi, ce t-shirt le dit pour toi.",
         "Idéal à offrir à ton partenaire de côté revés pour former la paire complète, sur le terrain comme au bar du club."],
  why=COTON_WHY, carac=CARAC_COTON, tail=[NOTE_BLANC, LEGAL_COTON],
  seo=("T-shirt padel « Côté drive » en coton", "Le t-shirt des joueurs de droite au padel : « Côté drive, je prends tout à droite ». 100 % coton, fabriqué à la demande."))
P["unisex-classic-tee-2"] = dict(  # côté revés lifestyle
  hook="Côté revés : je finis les points.",
  paras=["Le côté gauche, c'est souvent celui qui tente le smash et conclut le point. Tu te reconnais ? Ce t-shirt affiche ton poste sans avoir besoin de l'expliquer.",
         "À associer au t-shirt « Côté drive » de ton partenaire pour une paire assortie."],
  why=COTON_WHY, carac=CARAC_COTON, tail=[NOTE_BLANC, LEGAL_COTON],
  seo=("T-shirt padel « Côté revés » en coton", "Le t-shirt des joueurs de gauche au padel : « Côté revés, je finis les points ». 100 % coton, fabriqué à la demande."))
P["unisex-classic-tee-1"] = dict(  # Lob Vitre Point lifestyle
  hook="Lob. Vitre. Point. La seule tactique qui compte.",
  paras=["Trois mots que tout joueur de padel comprend : le lob qui passe, la balle qui joue avec la vitre, le point gagné. Un clin d'œil pour ceux qui aiment les échanges longs.",
         "Un cadeau facile pour un partenaire, un coach ou toute l'équipe du club."],
  why=COTON_WHY, carac=CARAC_COTON, tail=[NOTE_BLANC, LEGAL_COTON],
  seo=("T-shirt padel « Lob Vitre Point » en coton", "« Lob. Vitre. Point. » : le t-shirt padel pour les fans de jeu au fond du court. 100 % coton, fabriqué à la demande."))
P["unisex-classic-tee-4"] = dict(  # j'ai padel lifestyle
  hook="Pas ce soir, j'ai padel.",
  paras=["L'excuse officielle pour refuser un dîner, un déménagement ou une soirée : tu as padel. Ce t-shirt le dit avant même que tu ouvres la bouche.",
         "Pour les accros qui réservent leurs créneaux une semaine à l'avance, et pour leurs proches qui ont fini par comprendre."],
  why=COTON_WHY, carac=CARAC_COTON, tail=[NOTE_BLANC, LEGAL_COTON],
  seo=("T-shirt padel humour « Pas ce soir, j'ai padel »", "Le t-shirt padel humour pour les accros : « Pas ce soir, j'ai padel ». 100 % coton, idée cadeau, fabriqué à la demande."))
P["unisex-classic-tee-6"] = dict(  # BandejaClub lifestyle brodé
  hook="Le t-shirt du club : logo brodé devant, grand médaillon au dos.",
  paras=["Le logo Bandeja Club est brodé côté cœur ; au dos, un grand motif circulaire « Bandeja Club · Padel » est imprimé. Sobre de face, affirmé de dos.",
         "La pièce à porter pour représenter le club, au tournoi comme en ville."],
  why=["<strong>Logo brodé</strong> : le relief et la tenue d'une broderie, pour un rendu plus soigné qu'une simple impression.", COTON_WHY[0], COTON_WHY[1], COTON_WHY[2]],
  carac=["Logo brodé devant", "Motif circulaire imprimé au dos"] + CARAC_COTON, tail=[NOTE_BLANC, LEGAL_COTON],
  seo=("T-shirt padel brodé en coton, médaillon au dos", "T-shirt padel 100 % coton : logo Bandeja Club brodé devant, médaillon « Bandeja Club · Padel » au dos. Fabriqué à la demande."))
P["unisex-classic-tee-5"] = dict(  # Bandejapéro
  hook="Bandeja, puis apéro. Dans cet ordre.",
  paras=["Le padel se joue à quatre et se termine souvent autour d'une table. Ce t-shirt célèbre la troisième mi-temps : petit logo Bandeja Club brodé devant, visuel « Bandejapéro » imprimé au dos.",
         "Parfait pour les après-matchs, les soirées du club et les tournois entre amis."],
  why=["<strong>Logo brodé devant</strong>, visuel imprimé au dos : discret de face, il fait sourire de dos.", COTON_WHY[0], COTON_WHY[1], COTON_WHY[2]],
  carac=["Logo brodé devant", "Visuel imprimé au dos"] + CARAC_COTON, tail=[NOTE_BLANC, LEGAL_COTON],
  seo=("T-shirt padel « Bandejapéro » brodé en coton", "Le t-shirt de la troisième mi-temps : logo Bandeja Club brodé devant, « Bandejapéro » au dos. 100 % coton, fabriqué à la demande."))
P["t-shirt-lifestyle-padel-bandejaclub-personnalise"] = dict(
  hook="Ton nom et ton numéro, avec le médaillon Bandeja Club.",
  paras=["Devant, le petit médaillon Bandeja Club avec ton nom et ton numéro dessous. Au dos, le grand médaillon, ton nom en grand et ton numéro entre deux traits. Une vraie tenue de membre du club.",
         "Pour toi, pour ton partenaire ou pour habiller toute l'équipe : chacun choisit son nom et son numéro."],
  why=["<strong>Unique</strong> : ton nom et ton numéro imprimés devant et au dos, que tu vois en direct sur la photo avant de commander.",
       "<strong>Une idée cadeau</strong> qui ne ressemble à aucune autre : un anniversaire, un tournoi gagné, un nouveau partenaire.", COTON_WHY[0], COTON_WHY[1]],
  carac=["Design, nom et numéro imprimés"] + CARAC_COTON, tail=[NOTE_BLANC, LEGAL_COTON], extra=PERSO,
  seo=("T-shirt padel personnalisé nom et numéro – BandejaClub", "T-shirt padel personnalisé avec ton nom et ton numéro, médaillon Bandeja Club devant et dos. 100 % coton, aperçu en direct."))
P["t-shirt-lifestyle-padel-bandejasun-personnalise"] = dict(
  hook="Ton nom au soleil, ton numéro façon maillot.",
  paras=["Au dos, ton nom et ton numéro en grand, comme sur un maillot, avec le logo Bandeja Club. Devant, ton numéro dans un soleil et ton nom souligné d'un trait orange, avec la mention « Padel au soleil ».",
         "Le t-shirt idéal pour les sessions d'été, les tournois entre amis ou pour offrir à ton partenaire."],
  why=["<strong>Unique</strong> : ton nom et ton numéro imprimés devant et au dos, que tu vois en direct sur la photo avant de commander.",
       "<strong>Un look de maillot</strong> dans un t-shirt en coton qu'on porte aussi en dehors du terrain.", COTON_WHY[0], COTON_WHY[1]],
  carac=["Design, nom et numéro imprimés"] + CARAC_COTON, tail=[NOTE_BLANC, LEGAL_COTON], extra=PERSO,
  seo=("T-shirt padel personnalisé nom et numéro – BandejaSun", "T-shirt padel personnalisé façon maillot : ton nom et ton numéro au dos, un soleil devant. 100 % coton, aperçu en direct."))
P["unisex-sports-jersey-1"] = dict(  # sport Padel
  hook="Le maillot pour jouer, pas seulement pour poser.",
  paras=["Conçu pour bouger, ce t-shirt de sport en maille respirante t'accompagne du premier échauffement au dernier point. Il affiche ton sport sans te ralentir.",
         "Pour les matchs du soir, les tournois et les entraînements."],
  why=SPORT_WHY, carac=CARAC_SPORT, tail=[LEGAL_SPORT],
  seo=("T-shirt de sport padel respirant", "T-shirt de sport padel en maille polyester respirante, élastique, manches raglan. Pensé pour le jeu, fabriqué à la demande."))
P["unisex-sports-jersey"] = dict(  # sport BandejaClub brodé
  hook="Le maillot du club, logo brodé.",
  paras=["Le logo Bandeja Club brodé sur un maillot respirant : la tenue du club pour les matchs et les tournois.",
         "Sobre et efficace, il va avec tout et se repère dans le vestiaire."],
  why=["<strong>Logo brodé</strong> : le relief et la tenue d'une broderie sur un maillot de sport."] + SPORT_WHY,
  carac=["Logo brodé"] + CARAC_SPORT, tail=[LEGAL_SPORT],
  seo=("Maillot de padel brodé, respirant", "Maillot de padel avec logo Bandeja Club brodé, en maille polyester respirante et élastique. Fabriqué à la demande."))
P["unisex-sports-jersey-3"] = dict(
  hook="Côté drive : je prends tout à droite.",
  paras=["Le maillot des joueurs de droite, ceux qui tiennent l'échange et préparent le point. Tu l'affiches en jouant, dans une maille respirante faite pour le padel.",
         "Avec le maillot « Côté revés » de ton partenaire, la paire est complète."],
  why=SPORT_WHY, carac=CARAC_SPORT, tail=[LEGAL_SPORT],
  seo=("Maillot de padel « Côté drive » respirant", "Le maillot de padel des joueurs de droite : « Côté drive, je prends tout à droite ». Maille respirante, fabriqué à la demande."))
P["unisex-sports-jersey-5"] = dict(
  hook="Côté revés : je finis les points.",
  paras=["Le maillot des joueurs de gauche, ceux qui tentent le smash et concluent. Respirant et élastique, il suit tes frappes du côté revés.",
         "À assortir au maillot « Côté drive » de ton partenaire."],
  why=SPORT_WHY, carac=CARAC_SPORT, tail=[LEGAL_SPORT],
  seo=("Maillot de padel « Côté revés » respirant", "Le maillot de padel des joueurs de gauche : « Côté revés, je finis les points ». Maille respirante, fabriqué à la demande."))
P["unisex-sports-jersey-4"] = dict(
  hook="Lob. Vitre. Point.",
  paras=["La tactique résumée en trois mots, sur un maillot fait pour jouer. Pour ceux qui aiment faire reculer l'adversaire et utiliser les vitres.",
         "Un clin d'œil que tes adversaires comprendront vite."],
  why=SPORT_WHY, carac=CARAC_SPORT, tail=[LEGAL_SPORT],
  seo=("Maillot de padel « Lob Vitre Point »", "« Lob. Vitre. Point. » : le maillot de padel en maille respirante et élastique, pour jouer avec style. Fabriqué à la demande."))
P["unisex-sports-jersey-6"] = dict(
  hook="Pas ce soir, j'ai padel.",
  paras=["La phrase que tes proches connaissent par cœur, sur un maillot que tu portes vraiment pour jouer. Respirant, léger, il est fait pour les créneaux de 19 h comme pour les tournois du dimanche.",
         "L'idée cadeau pour l'accro du club."],
  why=SPORT_WHY, carac=CARAC_SPORT, tail=[LEGAL_SPORT],
  seo=("Maillot de padel humour « J'ai padel »", "Maillot de padel humour « Pas ce soir, j'ai padel », en maille respirante et élastique. Idée cadeau, fabriqué à la demande."))
P["padded-sports-bra"] = dict(
  hook="Le maintien qu'il faut pour les déplacements du padel.",
  paras=["Au padel, on court, on pivote, on saute pour un smash. Cette brassière offre un bon maintien grâce à ses bretelles renforcées, sa large bande élastique et ses coussinets amovibles.",
         "Son tissu évacue l'humidité et s'étire dans les quatre sens : elle suit tes mouvements sans te gêner."],
  why=["<strong>Coussinets amovibles</strong> : tu choisis le niveau de couvrance.",
       "<strong>Dos nageur et bretelles renforcées</strong> : les épaules restent libres pour les frappes au-dessus de la tête.",
       "<strong>Coutures plates</strong> : moins de frottements pendant les longs matchs.",
       "<strong>Fabriquée à la demande</strong>, après ta commande."],
  carac=["Composition : 84 % polyester, 16 % élasthanne", "Grammage : 230 g/m²", "Doublure en maille sportive : 90 % polyester, 10 % élasthanne",
         "Coussinets amovibles : mousse perforée 100 % polyuréthane et tissu 100 % polyester qui évacue l'humidité", "Doublure avec fentes pour retirer les coussinets",
         "Tissu extensible dans les quatre sens", "Encolure ronde et dos nageur", "Bretelles renforcées et large bande élastique sous la poitrine",
         "Coutures plates et biais pour éviter les frottements", "Idéale pour les bonnets A à C"],
  tail=[legal("<p>Composants du produit brut provenant du Mexique et de Chine.</p>", "<p>Restrictions d'âge : pour adultes. Garantie UE : 2 ans.</p>",
              "<p>Conformité : respecte les exigences en matière d'inflammabilité et les limites fixées pour le formaldéhyde, les colorants azoïques, le plomb, le cadmium, les bisphénols et les phtalates.</p>")],
  seo=("Brassière de sport padel, coussinets amovibles", "Brassière de sport pour le padel : bon maintien, dos nageur, coussinets amovibles, tissu qui évacue l'humidité. Bonnets A à C."))
P["stainless-steel-water-bottle"] = dict(
  hook="Ta boisson au frais, même pendant un match qui s'éternise.",
  paras=["Entre deux jeux, une gorgée d'eau fraîche fait du bien. Cette gourde isotherme de 500 ml à double paroi garde ta boisson froide ou chaude pendant 6 heures.",
         "Son bouchon étanche te laisse la glisser dans ton sac de padel, et elle remplace les bouteilles en plastique au club."],
  why=["<strong>Double paroi isotherme</strong> : froide ou chaude pendant 6 heures.", "<strong>Bouchon étanche et anti-odeurs</strong> : elle voyage dans le sac sans fuite.",
       "<strong>Acier inoxydable</strong> : réutilisable au quotidien, au club comme au bureau."],
  carac=["Acier inoxydable de haute qualité", "Contenance : 500 ml", "Dimensions : 27 × 7 cm", "Double paroi isotherme : boisson chaude ou froide pendant 6 heures",
         "Bouchon étanche et anti-odeurs", "Forme de quille, finition brillante", "Revêtement ORCA breveté pour des couleurs éclatantes", "Lavage à la main uniquement"],
  tail=["<p><em>Conseil : ne garde pas d'eau plus de 24 heures dans la gourde, pour l'hygiène et pour éviter les odeurs.</em></p>",
        legal("<p>Produit brut provenant de Chine.</p>", "<p>Restrictions d'âge : pour adultes. Garantie UE : 2 ans.</p>",
              "<p>Conformité : respecte les exigences relatives aux teneurs en plomb, cadmium, métaux lourds, amines aromatiques et BPA.</p>")],
  seo=("Gourde isotherme padel 500 ml inox", "Gourde isotherme 500 ml en acier inoxydable : boisson froide ou chaude 6 heures, bouchon étanche. L'accessoire du joueur de padel."))
P["all-over-print-gym-bag"] = dict(
  hook="Toute ta tenue de padel dans un seul sac.",
  paras=["Chaussures, serviette, tenue de rechange, balles : avec ses 30 litres, ce sac embarque tout ce qu'il faut pour une session au club ou à la salle.",
         "Son polyester résistant à l'eau protège tes affaires, et sa poche intérieure garde clés et téléphone à part."],
  why=["<strong>30 litres</strong> : de la place pour la tenue complète et les chaussures.", "<strong>Résistant à l'eau</strong> : pratique les jours de pluie entre la voiture et le club.",
       "<strong>Poignées rembourrées</strong> : confortables même quand le sac est plein.", "<strong>Imprimé sur toute sa surface</strong> : tu le reconnais au premier coup d'œil dans le vestiaire."],
  carac=["100 % polyester", "Grammage : 305 g/m²", "Capacité : 30 litres", "Résistant à l'eau et durable", "Tissu robuste avec doublure thermocollée pour plus de tenue",
         "Passepoil en T pour plus de stabilité", "Deux poignées rembourrées", "Poche intérieure pour les objets de valeur"],
  tail=[legal("<p>Restrictions d'âge : pour adultes. Garantie UE : 2 ans.</p>",
              "<p>Conformité : respecte les exigences en matière d'inflammabilité et les limites maximales de plomb, de cadmium, de bisphénols et de phtalates.</p>")],
  seo=("Sac de sport padel 30 L résistant à l'eau", "Sac de sport 30 litres pour le padel et la salle : polyester résistant à l'eau, poignées rembourrées, poche intérieure."))
P["eco-tote-bag"] = dict(
  hook="Le sac du club, pour tout ce qui n'est pas la raquette.",
  paras=["Tenue d'après-match, serviette, courses ou livres : ce tote bag en coton bio supporte jusqu'à 13,6 kg. Il se plie et se glisse partout.",
         "Une façon simple de porter les couleurs du club tous les jours, et de laisser les sacs plastique à la maison."],
  why=["<strong>Coton bio certifié</strong>, tissage sergé épais (272 g/m²).", "<strong>Charge maximale de 13,6 kg</strong> : solide pour un usage quotidien.",
       "<strong>Grandes anses de 62,2 cm</strong> : il se porte à l'épaule.", "<strong>Fabriqué à la demande</strong>, après ta commande."],
  carac=["100 % coton bio certifié, armure sergé 3/1", "Grammage : 272 g/m²", "Dimensions : 40,6 × 35,6 × 12,7 cm", "Charge maximale : 13,6 kg",
         "Deux anses de 2,5 cm de large et 62,2 cm de long", "Compartiment principal ouvert"],
  tail=[legal("<p>Produit brut provenant d'Inde.</p>", "<p>Restrictions d'âge : pour adultes. Garantie UE : 2 ans.</p>",
              "<p>Conformité : respecte les exigences relatives aux colorants azoïques et aux teneurs en formaldéhyde.</p>")],
  seo=("Tote bag padel en coton bio", "Tote bag Bandeja Club en coton bio certifié, 272 g/m², charge jusqu'à 13,6 kg. Le sac du quotidien des joueurs de padel."))
P["visor"] = dict(
  hook="Le soleil en face ? Garde la balle en vue.",
  paras=["En extérieur, un lob qui part dans le soleil peut te faire perdre la balle. Cette visière protège tes yeux tout en laissant le haut de la tête à l'air libre.",
         "Le logo Bandeja Club est brodé en 3D, et la fermeture auto-agrippante s'ajuste en un geste."],
  why=["<strong>Profil bas, 5 cm</strong> : elle protège sans gêner le regard vers le haut.", "<strong>Tête à l'air libre</strong> : le haut de la tête reste découvert, contrairement à une casquette.",
       "<strong>Réglable de 56 à 59 cm</strong> grâce à la fermeture auto-agrippante.", "<strong>Broderie 3D</strong> du logo Bandeja Club."],
  carac=["97 % polyester, 3 % élasthanne", "Profil bas, hauteur de 5 cm", "Sous-visière assortie", "Fermeture auto-agrippante avec anneau carré", "Tour de tête : 56 à 59 cm", "Broderie 3D"],
  tail=[legal("<p>Restrictions d'âge : pour adultes. Garantie UE : 2 ans.</p>")],
  seo=("Visière de padel brodée en 3D", "Visière de padel à profil bas, logo Bandeja Club brodé en 3D, réglable de 56 à 59 cm. Protège du soleil sur les courts extérieurs."))

if __name__ == '__main__':
    out = {}
    for h, d in P.items():
        out[h] = dict(html=page(d['hook'], d['paras'], d['why'], d['carac'], d['tail'], d.get('extra', '')), seo_title=d['seo'][0], seo_desc=d['seo'][1])
        assert len(d['seo'][0]) <= 70, (h, len(d['seo'][0]))
        assert len(d['seo'][1]) <= 160, (h, len(d['seo'][1]))
    json.dump(out, open('descriptions-v2.json', 'w'), ensure_ascii=False, indent=1)
    print(len(out), 'produits')
