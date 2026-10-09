# Versions pour t-shirt noir

Les modèles « Côté drive », « Côté revés », « Lob. Vitre. Point. » et « J'ai padel » étaient imprimés en bleu nuit, une couleur qui se voit très mal sur le t-shirt noir. Ces fichiers sont la même chose redessinée en clair pour le noir : texte crème `#F1EBDD`, orange `#E8672E` conservé (balle, « POINT. », filet du terrain).

## Fichiers (`impression/`)

| Fichier | Emplacement |
|---|---|
| `cote-drive_devant_noir.png` / `cote-drive_dos_noir.png` | devant / dos |
| `cote-reves_devant_noir.png` / `cote-reves_dos_noir.png` | devant / dos |
| `lob-vitre-point_devant_noir.png` / `lob-vitre-point_dos_noir.png` | devant / dos |
| `j-ai-padel_devant_noir.png` / `j-ai-padel_dos_noir.png` | devant / dos |

- PNG transparents, 3600 × 4800 px : zone d'impression complète 12 × 16 in à 300 dpi.
- Le visuel est en haut et centré, comme sur les versions actuelles. Dans Printful, garder le fichier en pleine zone (ne pas le réduire) pour retrouver la même taille.
- `apercus/` : rendu sur la photo Printful du t-shirt noir, l'ancien visuel effacé. Indicatif.

## Ce qui change par rapport aux originaux

Les fichiers d'origine n'étaient pas dans le dépôt : les visuels ont été redessinés d'après les photos Printful. Textes, pictos et mise en page sont les mêmes. Les polices sont les plus proches disponibles en libre : Anton (gros titres), Archivo Expanded (petites capitales), Newsreader italique (phrases). Elles sont sous licence SIL Open Font, utilisables commercialement.

## Source

`source/designs-fonce.html` + `source/print.js` (rendu avec Chromium : `node print.js designs-fonce.html dossier drive-f,drive-b,…`).
