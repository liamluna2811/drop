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
 *   "fuse": 3.3,                                 // temps avant explosion, en secondes
 *   "tags": ["Post-plant"],
 *   "spot": { "x": 42.1, "y": 61.3 },            // emplacement du joueur (% de la minimap)
 *   "impact": { "x": 30.5, "y": 22.8 },          // facultatif : impact de la molly, sinon celui
 *                                                // du site défini dans config.js (defaultImpacts)
 *   "position": { "image": "assets/lineups/ascent/default-a-pos.jpg", "note": "Coin du mur..." },
 *   "aim":      { "image": "assets/lineups/ascent/default-a-aim.jpg", "note": "Viser le haut de l'antenne",
 *                 "target": { "x": 54.2, "y": 27.1 } },   // point de visée (% de l'image), entouré et zoomé
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
    "fuse": 8,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 65.8,
      "y": 27.7
    },
    "position": {
      "image": "assets/lineups/haven/a-long-default-position.webp",
      "note": "Place-toi à l'endroit montré sur la capture, à A Long, contre les sacs de sable à côté de la barrière."
    },
    "aim": {
      "image": "assets/lineups/haven/a-long-default-visee-2.webp",
      "note": "Place le bas de la flamme sur la poutre, puis lancer normal.",
      "target": {
        "x": 60.3,
        "y": 89.4
      }
    },
    "result": {
      "image": "assets/lineups/haven/a-long-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default A."
    },
    "notes": ""
  },
  {
    "id": "haven-molly-default-a-depuis-short-a",
    "map": "haven",
    "title": "Molly default A depuis Short A",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 3,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 47,
      "y": 33
    },
    "position": {
      "image": "assets/lineups/haven/a-short-default-position.webp",
      "note": "Colle-toi contre le poteau en bois, à gauche de l'arche, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/haven/a-short-default-visee.webp",
      "note": "Place ton viseur sur l'arbre, juste au-dessus des caisses, puis lancer normal.",
      "target": {
        "x": 53.5,
        "y": 43.6
      }
    },
    "result": {
      "image": "assets/lineups/haven/a-short-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default A."
    },
    "notes": ""
  },
  {
    "id": "haven-molly-default-a-depuis-a-long-entree",
    "map": "haven",
    "title": "Molly default A depuis l'entrée de A Long",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 3.3,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 59.9,
      "y": 18.4
    },
    "position": {
      "image": "assets/lineups/haven/a-long-entree-default-position.webp",
      "note": "Colle-toi contre le mur, juste à droite du gros bloc de pierre, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/haven/a-long-entree-default-visee.webp",
      "note": "Place ton viseur entre les deux cercles sculptés sur la poutre en bois, puis lancer normal.",
      "target": {
        "x": 54.4,
        "y": 39.8
      }
    },
    "result": {
      "image": "assets/lineups/haven/a-long-entree-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default A."
    },
    "notes": ""
  },
  {
    "id": "haven-molly-retake-graffiti-depuis-a-link",
    "map": "haven",
    "title": "Molly retake Graffiti depuis A Link",
    "site": "A",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 4.3,
    "tags": [
      "Retake"
    ],
    "spot": {
      "x": 30.8,
      "y": 33.9
    },
    "impact": {
      "x": 34.8,
      "y": 26.1
    },
    "position": {
      "image": "assets/lineups/haven/a-retake-graffiti-position.webp",
      "note": "Colle-toi contre le mur, juste à droite des deux caisses, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/haven/a-retake-graffiti-visee.webp",
      "note": "Place ton viseur dans le coin en bas à gauche de la première fenêtre, puis lancer normal.",
      "target": {
        "x": 55.1,
        "y": 41.9
      }
    },
    "result": {
      "image": "assets/lineups/haven/a-retake-graffiti-resultat.webp",
      "note": "La molly tombe sur le spot Graffiti."
    },
    "notes": ""
  },
  {
    "id": "haven-molly-anti-plant-default-a-depuis-a-link",
    "map": "haven",
    "title": "Molly anti-plant default A depuis A Link",
    "site": "A",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 3,
    "tags": [
      "Anti-plant"
    ],
    "spot": {
      "x": 36.3,
      "y": 40.7
    },
    "position": {
      "image": "assets/lineups/haven/a-antiplant-default-position.webp",
      "note": "Place-toi contre le mur de droite, juste à droite de la porte sous le graffiti B, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/haven/a-antiplant-default-visee.webp",
      "note": "Place ton viseur sur le mur, juste sous la frise du toit, puis lancer normal.",
      "target": {
        "x": 51.6,
        "y": 34.9
      }
    },
    "result": {
      "image": "assets/lineups/haven/a-antiplant-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default A."
    },
    "notes": ""
  }
];
