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
 *   "fuse": 3.5,                                 // temps avant explosion, en secondes
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
    "fuse": 3.5,
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
    "fuse": 4.5,
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
  },
  {
    "id": "haven-molly-default-c-depuis-c-long",
    "map": "haven",
    "title": "Molly default C depuis C Long",
    "site": "C",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 5,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 73.5,
      "y": 88.6
    },
    "position": {
      "image": "assets/lineups/haven/c-long-default-position.webp",
      "note": "Colle-toi dans le coin, contre le mur, juste à côté de la barrière en bois, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/haven/c-long-default-visee.webp",
      "note": "Place ton viseur un peu à gauche du bord de la montagne, puis lancer normal.",
      "target": {
        "x": 56.1,
        "y": 40.8
      }
    },
    "result": {
      "image": "assets/lineups/haven/c-long-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default C."
    },
    "notes": ""
  },
  {
    "id": "haven-molly-plant-box-c-depuis-c-long",
    "map": "haven",
    "title": "Molly plant box C depuis C Long",
    "site": "C",
    "side": "attack",
    "throwType": "Saut + lancer",
    "fuse": 3,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 73.5,
      "y": 88.6
    },
    "impact": {
      "x": 32.2,
      "y": 85.9
    },
    "position": {
      "image": "assets/lineups/haven/c-long-box-position.webp",
      "note": "Même position que la molly default C : colle-toi dans le coin, contre le mur, juste à côté de la barrière en bois."
    },
    "aim": {
      "image": "assets/lineups/haven/c-long-box-visee-2.webp",
      "note": "Place ton viseur sur le coin où le toit de gauche rejoint le bord du toit en tuiles, puis saute et lance.",
      "target": {
        "x": 56.1,
        "y": 41.6
      }
    },
    "result": {
      "image": "assets/lineups/haven/c-long-box-resultat.webp",
      "note": "La molly tombe au pied de la box, sur le spot de plant box C."
    },
    "notes": ""
  },
  {
    "id": "haven-molly-default-c-depuis-c-cubby",
    "map": "haven",
    "title": "Molly default C depuis C Cubby",
    "site": "C",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 4,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 62.3,
      "y": 78.8
    },
    "position": {
      "image": "assets/lineups/haven/c-cubby-default-position.webp",
      "note": "Colle-toi au fond du Cubby, dans le coin à gauche contre le mur, à côté du pot, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/haven/c-cubby-default-visee.webp",
      "note": "Place ton viseur sur le coin du toit de la petite tour, puis lancer normal.",
      "target": {
        "x": 65.2,
        "y": 35.4
      }
    },
    "result": {
      "image": "assets/lineups/haven/c-cubby-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default C."
    },
    "notes": ""
  },
  {
    "id": "haven-molly-plant-box-c-depuis-c-cubby",
    "map": "haven",
    "title": "Molly plant box C depuis C Cubby",
    "site": "C",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 4,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 61.9,
      "y": 79.8
    },
    "impact": {
      "x": 31.9,
      "y": 85.6
    },
    "position": {
      "image": "assets/lineups/haven/c-cubby-box-position.webp",
      "note": "Pars de la même position que la molly default C (fond du Cubby, à côté du pot), puis décale-toi un petit peu vers le couloir C pour voir le coin à viser."
    },
    "aim": {
      "image": "assets/lineups/haven/c-cubby-box-visee.webp",
      "note": "Place ton viseur sur le coin du toit du bâtiment du fond, juste contre le mur de droite, puis lancer normal.",
      "target": {
        "x": 59.0,
        "y": 29.2
      }
    },
    "result": {
      "image": "assets/lineups/haven/c-cubby-box-resultat.webp",
      "note": "La molly tombe au pied de la box, sur le spot de plant box C."
    },
    "notes": "Il faut se décaler un petit peu vers le couloir C pour voir le coin que l'on veut viser."
  },
  {
    "id": "haven-molly-plant-open-c-depuis-c-cubby",
    "map": "haven",
    "title": "Molly plant open C depuis C Cubby",
    "site": "C",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 3.5,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 62.0,
      "y": 78.7
    },
    "impact": {
      "x": 39.3,
      "y": 83.4
    },
    "position": {
      "image": "assets/lineups/haven/c-cubby-open-position.webp",
      "note": "Même position que la molly default C : fond du Cubby, dans le coin à gauche contre le mur, à côté du pot."
    },
    "aim": {
      "image": "assets/lineups/haven/c-cubby-open-visee.webp",
      "note": "Place ton viseur juste sous la console en bois du bâtiment du fond, à droite du haut-parleur, puis lancer normal.",
      "target": {
        "x": 56.7,
        "y": 28.5
      }
    },
    "result": {
      "image": "assets/lineups/haven/c-cubby-open-resultat.webp",
      "note": "La molly tombe à côté de la box, sur le spot de plant open C."
    },
    "notes": ""
  },
  {
    "id": "haven-molly-anti-plant-default-c-depuis-b-link",
    "map": "haven",
    "title": "Molly anti-plant default C depuis B Link",
    "site": "C",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 8,
    "tags": [
      "Anti-plant"
    ],
    "spot": {
      "x": 33.7,
      "y": 59.3
    },
    "position": {
      "image": "assets/lineups/haven/c-antiplant-default-position.webp",
      "note": "Colle-toi dans le coin contre le mur, juste à gauche de la porte en bois sous le graffiti B, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/haven/c-antiplant-default-visee.webp",
      "note": "Regarde vers le haut et place ton viseur juste à gauche de la petite poutre qui dépasse du toit, puis lancer normal.",
      "target": {
        "x": 58.5,
        "y": 38.1
      }
    },
    "result": {
      "image": "assets/lineups/haven/c-antiplant-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default C."
    },
    "notes": ""
  },
  {
    "id": "haven-molly-plant-open-c-depuis-c-long",
    "map": "haven",
    "title": "Molly plant open C depuis C Long",
    "site": "C",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 7.5,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 73.9,
      "y": 78.1
    },
    "impact": {
      "x": 39.6,
      "y": 84.6
    },
    "position": {
      "image": "assets/lineups/haven/c-long-open-position.webp",
      "note": "Colle-toi contre le mur du fond, sur les fleurs, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/haven/c-long-open-visee.webp",
      "note": "Place le début de la ligne de l'ultime (X), à gauche de la barre, sur le sommet de la montagne, puis lancer normal.",
      "target": {
        "x": 63.6,
        "y": 94.3
      }
    },
    "result": {
      "image": "assets/lineups/haven/c-long-open-resultat.webp",
      "note": "La molly tombe entre l'ascenseur et la box, sur le spot de plant open C."
    },
    "notes": ""
  },
  {
    "id": "haven-molly-plant-open-b-depuis-mid-doors",
    "map": "haven",
    "title": "Molly plant open B depuis Mid Doors",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 2,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 64.2,
      "y": 57.6
    },
    "impact": {
      "x": 42.5,
      "y": 51.3
    },
    "position": {
      "image": "assets/lineups/haven/b-mid-open-position.webp",
      "note": "Colle-toi contre le mur, juste à gauche des caisses en bois et du pot, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/haven/b-mid-open-visee.webp",
      "note": "Place ton viseur sur le bord du mur du site B, aligné avec la poutre rouge du bâtiment de droite (le trait rouge), puis lancer normal.",
      "target": {
        "x": 48.1,
        "y": 44.4
      }
    },
    "result": {
      "image": "assets/lineups/haven/b-mid-open-resultat.webp",
      "note": "La molly tombe devant la box, sur le spot de plant open B."
    },
    "notes": ""
  },
  {
    "id": "haven-molly-anti-plant-open-b-depuis-c-site",
    "map": "haven",
    "title": "Molly anti-plant open B depuis le site C",
    "site": "B",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 8,
    "tags": [
      "Anti-plant"
    ],
    "spot": {
      "x": 31.3,
      "y": 83.2
    },
    "impact": {
      "x": 41.5,
      "y": 49.7
    },
    "position": {
      "image": "assets/lineups/haven/b-antiplant-open-position.webp",
      "note": "Sur le site C, colle-toi dans le coin entre la grande caisse verte et le mur de droite, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/haven/b-antiplant-open-visee.webp",
      "note": "Place le point rouge au-dessus de l'icône des smokes (BS5) sur le bord du toit, puis lancer normal.",
      "target": {
        "x": 63.9,
        "y": 85.4
      }
    },
    "result": {
      "image": "assets/lineups/haven/b-antiplant-open-resultat.webp",
      "note": "La molly tombe devant la box, sur le spot de plant open B."
    },
    "notes": ""
  },
  {
    "id": "abyss-molly-plant-open-b-depuis-b-main",
    "map": "abyss",
    "title": "Molly plant open B depuis B Main",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 7,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 63.5,
      "y": 67.1
    },
    "impact": {
      "x": 40.1,
      "y": 87.0
    },
    "position": {
      "image": "assets/lineups/abyss/b-main-open-position.webp",
      "note": "Colle-toi contre le mur au bout de B Main, entre la porte grise à gauche et les bidons bleus à droite, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/abyss/b-main-open-visee.webp",
      "note": "Place ton crosshair sur le rocher, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 55.8,
        "y": 39.9
      }
    },
    "result": {
      "image": "assets/lineups/abyss/b-main-open-resultat.webp",
      "note": "La molly tombe sur le spot de plant open B, devant les bidons."
    },
    "notes": ""
  },
  {
    "id": "abyss-molly-plant-under-b-depuis-b-main",
    "map": "abyss",
    "title": "Molly plant under B depuis B Main",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 7,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 63.5,
      "y": 67.1
    },
    "impact": {
      "x": 34.6,
      "y": 86.9
    },
    "position": {
      "image": "assets/lineups/abyss/b-main-under-position.webp",
      "note": "Même position que pour l'open : contre le mur au bout de B Main, entre la porte grise et les bidons bleus."
    },
    "aim": {
      "image": "assets/lineups/abyss/b-main-under-visee.webp",
      "note": "Vise avec le haut de la flamme (icône de la molly dans le HUD) : sa pointe juste sur le bord haut de la rambarde en bois, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 48.3,
        "y": 88.9
      }
    },
    "result": {
      "image": "assets/lineups/abyss/b-main-under-resultat.webp",
      "note": "La molly tombe sur le spot de plant under B, sous le passage."
    },
    "notes": ""
  },
  {
    "id": "abyss-molly-plant-safe-b-depuis-b-main",
    "map": "abyss",
    "title": "Molly plant safe B depuis B Main",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 7,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 63.5,
      "y": 67.1
    },
    "impact": {
      "x": 42.5,
      "y": 92.8
    },
    "position": {
      "image": "assets/lineups/abyss/b-main-safe-position.webp",
      "note": "Même position que pour l'open et l'under : contre le mur au bout de B Main, entre la porte grise et les bidons bleus."
    },
    "aim": {
      "image": "assets/lineups/abyss/b-main-safe-visee.webp",
      "note": "Vise avec la flamme (icône de la molly dans le HUD) : le bas et le côté gauche de la flamme doivent suivre à peu près les lignes du mur (traits rouges), puis lancer normal.",
      "target": {
        "x": 49.0,
        "y": 92.3
      }
    },
    "result": {
      "image": "assets/lineups/abyss/b-main-safe-resultat.webp",
      "note": "La molly tombe sur le spot de plant safe B."
    },
    "notes": ""
  },
  {
    "id": "abyss-molly-safe-b-depuis-b-link",
    "map": "abyss",
    "title": "Molly safe B depuis B Link",
    "site": "B",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 4,
    "tags": [
      "Retake",
      "Anti-plant"
    ],
    "spot": {
      "x": 46.7,
      "y": 65.6
    },
    "impact": {
      "x": 42.6,
      "y": 92.7
    },
    "position": {
      "image": "assets/lineups/abyss/b-safe-retake-position.webp",
      "note": "Colle-toi dans le coin du mur, au bout de B Link côté site, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/abyss/b-safe-retake-visee.webp",
      "note": "Place ton crosshair sur le point indiqué, au bord du toit en bois à travers l'ouverture, puis lancer normal.",
      "target": {
        "x": 56.2,
        "y": 46.9
      }
    },
    "result": {
      "image": "assets/lineups/abyss/b-safe-retake-resultat.webp",
      "note": "La molly tombe sur le spot de plant safe B. Utilisable en retake ou en anti-plant."
    },
    "notes": ""
  },
  {
    "id": "abyss-molly-default-a-depuis-a-main",
    "map": "abyss",
    "title": "Molly default A depuis A Main",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 4,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 65.7,
      "y": 20.4
    },
    "impact": {
      "x": 47.6,
      "y": 13.8
    },
    "position": {
      "image": "assets/lineups/abyss/a-main-default-position.webp",
      "note": "Mets-toi dans A Main, collé contre le coin du bâtiment à côté de la porte, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/abyss/a-main-default-visee.webp",
      "note": "Place ton crosshair dans le coin en haut de l'encadrement de la porte, sous le toit, puis lancer normal.",
      "target": {
        "x": 55.8,
        "y": 48.0
      }
    },
    "result": {
      "image": "assets/lineups/abyss/a-main-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default A, devant les bidons."
    },
    "notes": ""
  }
];
