# Lineups Valorant — Brimstone

Site local pour référencer tes lineups Valorant : on choisit une map, on clique sur un point de la carte, et on arrive sur la page de la lineup (positionnement, visée, résultat).

## Lancer le site

- **Le plus simple :** double-clic sur `index.html`.
- **Recommandé :** double-clic sur `lancer.bat` (Windows) ou `./lancer.sh` (Mac/Linux), puis ouvre http://localhost:8000. Il faut Python.

Il faut une connexion internet : les images des maps, les minimaps, les noms des zones et les icônes des capacités viennent de [valorant-api.com](https://valorant-api.com). Elles restent en cache 3 jours, donc ça marche encore si la connexion coupe un moment.

## Ajouter une lineup (mode édition)

1. Ouvre une map, puis clique sur **Ajouter** (ou sur l'icône crayon).
2. Clique sur la carte à l'endroit **où tu te places** (point bleu).
3. Clique à l'endroit **où la capacité atterrit** (point rouge).
4. Remplis le formulaire : titre, capacité, site, côté, type de lancer, difficulté, tags, les 3 captures avec leurs descriptions, et des notes.
5. **Enregistrer** : la lineup apparaît tout de suite. Elle est gardée comme brouillon dans le navigateur.

En mode édition, un clic sur une lineup existante (sur la carte ou dans la liste) l'ouvre pour la modifier. La page d'une lineup a aussi un bouton **Modifier**.

### Rendre les modifications définitives

Les brouillons ne vivent que dans ton navigateur. Pour les enregistrer dans les fichiers :

1. Clique sur **Exporter lineups.js** dans le bandeau en bas à droite.
2. Remplace `data/lineups.js` par le fichier téléchargé.
3. Clique sur **Vider** pour supprimer les brouillons, qui sont maintenant dans le fichier.

### Images

Range tes captures dans `assets/lineups/<map>/`, par exemple `assets/lineups/ascent/molly-a-visee.jpg`. **Parcourir** remplit le chemin tout seul : il reste à copier le fichier dans ce dossier. Tu peux aussi coller une URL d'image (Imgur, etc.).

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `data/lineups.js` | Toutes tes lineups. Contient deux exemples à supprimer. |
| `data/config.js` | Agent, capacités (noms, couleurs), types de lancer, tags, maps masquées, images locales |
| `assets/lineups/` | Tes captures d'écran |
| `index.html` / `map.html` / `lineup.html` | Les 3 pages du site |
| `js/`, `css/` | Le code |

## Astuces

- Sur la carte : **molette** pour zoomer, **glisser** pour te déplacer, bouton ↻ pour pivoter la carte (pour la voir dans le même sens qu'en jeu, côté attaque ou défense).
- Filtres par capacité, site, côté et recherche texte.
- Sur une page lineup : touches **← / →** pour passer à la lineup précédente ou suivante, clic sur une capture pour l'agrandir.
- Pour utiliser le site avec un autre agent, change `agent` et `abilities` dans `data/config.js`.
