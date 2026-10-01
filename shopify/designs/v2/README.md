# Modèles v2 : esprit sérigraphie vintage, surf et Méditerranée

Ce qui change par rapport à la v1 : trait irrégulier, encres en aplat, léger effet usé (les zones usées laissent voir le tissu), typos rétro, illustrations plus grandes.

| Modèle | Dos | Couleurs proposées |
|---|---|---|
| Club Soleil | médaillon rond : logo au centre, signes dessinés autour (soleil, vague, fleur, étoile), soleil qui rayonne | Ivoire, Bleu marine délavé, Vert sauge |
| Souvenir du Club | carte postale rétro : « BANDEJA » en relief rempli d'un coucher de soleil sur la mer, « Club » en script, timbre avec le logo | Blanc cassé, Bleu ciel délavé, Bleu marine |
| Soleil, padel & apéro | arche méditerranéenne : la balle se couche sur la mer, palmes, logo en clé de voûte | Sable, Terracotta, Vert forêt |

Les couleurs des maquettes sont approximatives : il faut choisir la teinte Printful la plus proche.

## Fichiers d'impression (`impression/`)
PNG transparents à 300 dpi.

| Fichier | Taille | Placement |
|---|---|---|
| club-soleil-dos | 12 × 12 in (30,5 cm) | centré en haut du dos |
| souvenir-dos | 12 × 10 in | centré en haut du dos |
| apero-dos | 10,5 × 13,9 in | centré en haut du dos |
| *-coeur | 3,5 in de large (9 cm) | poitrine, côté gauche |

- `-clair` : t-shirts clairs (textes bleu nuit).
- `-fonce` : t-shirts foncés (textes crème).
- Les illustrations ont leur propre fond crème : elles restent lisibles sur toutes les couleurs.

## Sources (`src/`)
- `gen2.py` : génère les SVG.
- `render.js` : export PNG (Chromium).
- `mock2.py` et `mockshot2.js` : maquettes.
- Polices (licence OFL, Google Fonts) : Bowlby One, Pacifico, Fraunces, Archivo Black.
