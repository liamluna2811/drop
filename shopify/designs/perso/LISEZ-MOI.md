# T-shirts personnalisables (NOM + NUMÉRO)

| Modèle | Support conseillé | Dos |
|---|---|---|
| `maillot` | T-shirt de sport « BandejaClub » (logo brodé devant, dos vide) | NOM en haut, grand NUMÉRO, petit logo + « BANDEJA CLUB » en bas |
| `soleil` | T-shirt Lifestyle, logo brodé devant | Médaillon Club Soleil, NOM et « N° » dessous |
| `carte` | T-shirt Lifestyle, logo brodé devant | Carte de membre avec cases NOM et NUMÉRO |

- `impression/` : partie fixe uniquement (PNG transparents, 3600 × 4800 px = 12 × 16 in à 300 dpi), à placer en haut du dos. `-clair` pour t-shirts clairs, `-fonce` pour t-shirts foncés.
- Dans Printful, ajouter ensuite 2 calques **Texte** (placeholder « NOM » et « 10 »), cocher « personnalisation », et les placer aux emplacements visibles sur `apercu/`.
- `apercu/` : rendu avec un nom et un numéro fictifs. `perso.jpg` : planche de maquettes.
- Polices des maquettes : Archivo Black (maillot, carte), Cinzel (soleil). Dans Printful, choisir la police disponible la plus proche.
- Source : `../src/gen_perso.py`.

## Devants (`*-devant-*`)
- `maillot-devant` : logo + « BANDEJA CLUB » côté cœur (partie fixe) ; calque texte NUMÉRO de l'autre côté de la poitrine.
- `soleil-devant` : petit médaillon côté cœur (partie fixe) ; calques texte NOM et « N° » dessous.
- Même format que les dos (12 × 16 in, 300 dpi), à placer en haut de la zone « devant ». Planche : `perso-devant.jpg`.
- Le médaillon réduit a des détails fins : à imprimer, pas à broder.

## Devants, autre style (sans logo ni médaillon) — `../src/gen_perso2.py`
| Modèle | Pour | Partie fixe | Calques texte Printful |
|---|---|---|---|
| `maillot-score` | Maillot | Tableau de score « COURT CENTRAL », 6-6 contre « LES AUTRES » | NUMÉRO (colonne N°), NOM (colonne JOUEUR, 9 caractères max) |
| `maillot-terrain` | Maillot | Court vu du dessus, trajectoire de la bandeja, « TERRAIN » | NUMÉRO (dans le camp gauche), NOM (sous « TERRAIN ») |
| `soleil-signature` | Club Soleil | Soleil levant, coup de pinceau orange, balle, « PADEL AU SOLEIL » | NUMÉRO (dans le soleil), Prénom en écriture manuscrite |
| `soleil-billet` | Club Soleil | Billet « COURT CENTRAL » avec talon « ADMIS · 1 JOUEUR » | NOM (après « JOUEUR »), NUMÉRO (après « PLACE N° ») |
Planche : `perso-devant-v2.jpg`. Polices des maquettes : Chango, Archivo Black, Pacifico, Fraunces italique.
