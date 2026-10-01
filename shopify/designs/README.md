# Nouveaux modèles de t-shirts (inspiration surf / Méditerranée)

Trois modèles, chacun avec un grand visuel au dos et le petit logo au cœur.

| Modèle | Dos | Couleurs proposées |
|---|---|---|
| Club Soleil | badge rond : logo au centre, signes (soleil, vague, fleur, étoile) autour, texte circulaire | Ivoire, Bleu marine délavé, Terracotta |
| Riviera | soleil couchant rayé, logo dans le soleil, vagues, « Padel au soleil » | Blanc, Bleu ciel, Vert forêt |
| Les signes du club | planche de 9 pastilles (soleil, vague, fleur, balle, logo, palmier, étoile, vitre) | Beurre, Rose pâle, Noir délavé |

Les couleurs des maquettes sont approximatives : il faut choisir la teinte Printful la plus proche.

## Fichiers d'impression (`impression/`)
- PNG transparents à 300 dpi.
- Dos : 3000 px de large (10 pouces, environ 25 cm), à centrer en haut du dos.
- Cœur : 1050 × 840 px (3,5 pouces, environ 9 cm), côté gauche de la poitrine.
- `-clair` : pour les t-shirts clairs (traits bleu nuit).
- `-fonce` : pour les t-shirts foncés (traits crème).

## Sources (`src/`)
- `logo-mark.svg` : logo vectorisé à partir de `logo-bandeja-club-transparent.png`.
- `gen.py` : génère les SVG (`src/svg/`).
- `render.js` : export PNG.
- `mock.py` et `mockshot.js` : maquettes (`maquettes/`).
- Polices (licence OFL, Google Fonts) : Archivo Black, Caprasimo, Shrikhand.
