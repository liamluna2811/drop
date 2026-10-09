/*
 * Base de données des lineups.
 *
 * Le plus simple : utilise le « Mode édition » sur la page d'une map, puis
 * « Exporter » et remplace ce fichier par celui téléchargé.
 *
 * Format d'une lineup :
 * {
 *   "id": "ascent-molly-default-a-k3f9",       // unique, généré automatiquement
 *   "map": "ascent",                             // nom anglais de la map en minuscules
 *   "title": "Molly default A",
 *   "site": "A",                                 // A | B | C | Mid
 *   "side": "attack",                            // attack | defense
 *   "throwType": "Saut + lancer",
 *   "difficulty": 1,                             // 0 facile, 1 moyen, 2 difficile
 *   "tags": ["Post-plant"],
 *   "from": { "x": 42.1, "y": 61.3 },            // position du joueur (% de la minimap)
 *   "to":   { "x": 30.5, "y": 22.8 },            // point d'impact (% de la minimap)
 *   "position": { "image": "assets/lineups/ascent/default-a-pos.jpg", "note": "Coin du mur..." },
 *   "aim":      { "image": "assets/lineups/ascent/default-a-aim.jpg", "note": "Viser le haut de l'antenne" },
 *   "result":   { "image": "assets/lineups/ascent/default-a-res.jpg", "note": "Couvre le default" },
 *   "notes": "Infos complémentaires"
 * }
 */
window.LINEUPS = [
  {
    "id": "haven-molly-default-a-depuis-a-long",
    "map": "haven",
    "title": "Molly default A depuis A Long",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "difficulty": 0,
    "tags": [
      "Post-plant"
    ],
    "from": {
      "x": 16,
      "y": 52
    },
    "to": {
      "x": 25,
      "y": 30
    },
    "position": {
      "image": "assets/lineups/haven/a-long-default-position.webp",
      "note": "Place-toi à l'endroit montré sur la capture, à A Long, contre les sacs de sable à côté de la barrière."
    },
    "aim": {
      "image": "assets/lineups/haven/a-long-default-visee.webp",
      "note": "Place le haut de la flamme sur le coin de la montagne, puis lancer normal."
    },
    "result": {
      "image": "assets/lineups/haven/a-long-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default A."
    },
    "notes": ""
  }
];
