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
