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
  },
  {
    "id": "abyss-molly-default-a-depuis-a-tower",
    "map": "abyss",
    "title": "Molly default A depuis A Tower",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 4,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 43.9,
      "y": 28.3
    },
    "position": {
      "image": "assets/lineups/abyss/a-tower-default-position.webp",
      "note": "Dans la salle d'A Tower, colle-toi contre la porte, dans le coin du mur, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/abyss/a-tower-default-visee.webp",
      "note": "Place ton crosshair sur le montant gauche de la porte du fond, à hauteur du petit voyant, puis lancer normal.",
      "target": {
        "x": 57.9,
        "y": 52.1
      }
    },
    "result": {
      "image": "assets/lineups/abyss/a-tower-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default A, devant les bidons."
    },
    "notes": ""
  },
  {
    "id": "abyss-molly-anti-plant-default-a-depuis-a-secret",
    "map": "abyss",
    "title": "Molly anti-plant default A depuis A Secret",
    "site": "A",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 8,
    "tags": [
      "Anti-plant"
    ],
    "spot": {
      "x": 13.7,
      "y": 25.5
    },
    "position": {
      "image": "assets/lineups/abyss/a-antiplant-default-position.webp",
      "note": "À la sortie du spawn défenseur vers A Secret, colle-toi contre le muret au bout de la rampe, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/abyss/a-antiplant-default-visee.webp",
      "note": "Place le haut de la flamme (icône de la molly dans le HUD) sur le coin du triangle dessiné sur le mur, puis lancer normal.",
      "target": {
        "x": 44.5,
        "y": 88.9
      }
    },
    "result": {
      "image": "assets/lineups/abyss/a-antiplant-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default A, devant les bidons."
    },
    "notes": ""
  },
  {
    "id": "abyss-molly-anti-plant-bridge-a-depuis-a-secret",
    "map": "abyss",
    "title": "Molly anti-plant A Bridge depuis A Secret",
    "site": "A",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 8,
    "tags": [
      "Anti-plant"
    ],
    "spot": {
      "x": 13.7,
      "y": 25.5
    },
    "impact": {
      "x": 46.5,
      "y": 3.4
    },
    "position": {
      "image": "assets/lineups/abyss/a-antiplant-bridge-position.webp",
      "note": "Même position que l'anti-plant default A : à la sortie du spawn défenseur vers A Secret, contre le muret au bout de la rampe."
    },
    "aim": {
      "image": "assets/lineups/abyss/a-antiplant-bridge-visee.webp",
      "note": "Place le haut de l'icône de la smoke (dans le HUD, là où est le point rouge) sur le bas du triangle dessiné sur le mur, puis lancer normal.",
      "target": {
        "x": 54.3,
        "y": 88.8
      }
    },
    "result": {
      "image": "assets/lineups/abyss/a-antiplant-bridge-resultat.webp",
      "note": "La molly tombe sur le pont d'A Bridge et bloque le plant."
    },
    "notes": ""
  },
  {
    "id": "abyss-molly-plant-bridge-a-depuis-a-lobby",
    "map": "abyss",
    "title": "Molly plant A Bridge depuis A Lobby",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 7,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 86.4,
      "y": 17.7
    },
    "impact": {
      "x": 46.5,
      "y": 3.4
    },
    "position": {
      "image": "assets/lineups/abyss/a-lobby-bridge-position.webp",
      "note": "Dans A Lobby, colle-toi contre la rambarde, juste à droite du petit pilier, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/abyss/a-lobby-bridge-visee.webp",
      "note": "Place le point rouge (en haut de l'icône du HUD) sur le coin de la montagne, puis lancer normal.",
      "target": {
        "x": 48.4,
        "y": 86.4
      }
    },
    "result": {
      "image": "assets/lineups/abyss/a-lobby-bridge-resultat.webp",
      "note": "La molly tombe sur le pont d'A Bridge, sur le spot de plant."
    },
    "notes": ""
  },
  {
    "id": "ascent-molly-default-a-depuis-a-wine",
    "map": "ascent",
    "title": "Molly default A depuis A Wine",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 6,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 50.1,
      "y": 4.4
    },
    "impact": {
      "x": 34.5,
      "y": 18.9
    },
    "position": {
      "image": "assets/lineups/ascent/a-wine-position.webp",
      "note": "Dans A Wine, colle-toi dans le coin contre le mur du magasin « Vini Venaro », au pied de la rambarde, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/ascent/a-wine-default-visee.webp",
      "note": "Place le haut de la flamme (icône de la molly dans le HUD, le point rouge) sur le coin du toit, puis lancer normal.",
      "target": {
        "x": 48.0,
        "y": 89.0
      }
    },
    "result": {
      "image": "assets/lineups/ascent/a-wine-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default A, autour du générateur."
    },
    "notes": ""
  },
  {
    "id": "ascent-molly-default-a-depuis-a-lobby",
    "map": "ascent",
    "title": "Molly default A depuis A Lobby",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 6,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 56.2,
      "y": 29.2
    },
    "position": {
      "image": "assets/lineups/ascent/a-lobby-position.webp",
      "note": "Dans A Lobby, colle-toi contre le mur, juste à droite de la grande caisse verte, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/ascent/a-lobby-default-visee.webp",
      "note": "Place le trait du HUD à côté des HP (le point rouge) sur le bord de la partie claire du mur, puis lancer normal.",
      "target": {
        "x": 32.6,
        "y": 90.1
      }
    },
    "result": {
      "image": "assets/lineups/ascent/a-lobby-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default A, autour du générateur."
    },
    "notes": ""
  },
  {
    "id": "ascent-molly-default-a-depuis-mid-cubby",
    "map": "ascent",
    "title": "Molly default A depuis Mid Cubby",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 5,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 46.6,
      "y": 38.2
    },
    "position": {
      "image": "assets/lineups/ascent/a-cubby-default-position.webp",
      "note": "Dans Mid Cubby, colle-toi contre le mur beige, vers son coin droit, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/ascent/a-default-5s-visee.webp",
      "note": "Place la flèche du HUD (le point rouge, au-dessus de l'icône de la souris) sur le coin du carré, puis lancer normal.",
      "target": {
        "x": 50.0,
        "y": 76.9
      }
    },
    "result": {
      "image": "assets/lineups/ascent/a-default-5s-resultat.webp",
      "note": "La molly tombe sur le spot de plant default A, autour du générateur."
    },
    "notes": ""
  },
  {
    "id": "ascent-molly-anti-plant-default-a-depuis-spawn",
    "map": "ascent",
    "title": "Molly anti-plant default A depuis le spawn",
    "site": "A",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 6,
    "tags": [
      "Anti-plant"
    ],
    "spot": {
      "x": 13.2,
      "y": 35.9
    },
    "position": {
      "image": "assets/lineups/ascent/a-antiplant-spawn-position.webp",
      "note": "À la sortie du spawn défenseur côté A, colle-toi dans le coin du mur, juste à droite de l'arche, sur la grille au sol, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/ascent/a-antiplant-default-visee.webp",
      "note": "Place le trait de la barre des HP (le trait rouge) à côté de la fenêtre du bâtiment, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 34.9,
        "y": 90.8
      }
    },
    "result": {
      "image": "assets/lineups/ascent/a-antiplant-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default A, autour du générateur."
    },
    "notes": ""
  },
  {
    "id": "ascent-molly-anti-plant-dice-a-depuis-spawn",
    "map": "ascent",
    "title": "Molly anti-plant dice A depuis le spawn",
    "site": "A",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 8,
    "tags": [
      "Anti-plant"
    ],
    "spot": {
      "x": 13.2,
      "y": 35.9
    },
    "impact": {
      "x": 32.8,
      "y": 12.6
    },
    "position": {
      "image": "assets/lineups/ascent/a-antiplant-spawn-position.webp",
      "note": "Même position que l'anti-plant default A : dans le coin du mur juste à droite de l'arche, sur la grille au sol."
    },
    "aim": {
      "image": "assets/lineups/ascent/a-antiplant-dice-visee.webp",
      "note": "Place le trait de la barre des HP (le point rouge) au bas de la tuile du toit qui touche la barrière, puis lancer normal.",
      "target": {
        "x": 37.1,
        "y": 90.7
      }
    },
    "result": {
      "image": "assets/lineups/ascent/a-antiplant-dice-resultat.webp",
      "note": "La molly tombe sur le spot de plant dice A, devant les caisses."
    },
    "notes": ""
  },
  {
    "id": "ascent-molly-plant-dice-a-depuis-a-lobby",
    "map": "ascent",
    "title": "Molly plant dice A depuis A Lobby",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 4,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 56.2,
      "y": 29.2
    },
    "impact": {
      "x": 32.8,
      "y": 12.6
    },
    "position": {
      "image": "assets/lineups/ascent/a-lobby-position.webp",
      "note": "Même position que la default A depuis A Lobby : contre le mur, juste à droite de la grande caisse verte."
    },
    "aim": {
      "image": "assets/lineups/ascent/a-lobby-dice-visee.webp",
      "note": "Place ton crosshair juste au-dessus du coin du mur, à gauche du petit pot de fleurs, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 53.6,
        "y": 50.0
      }
    },
    "result": {
      "image": "assets/lineups/ascent/a-lobby-dice-resultat.webp",
      "note": "La molly tombe sur le spot de plant dice A, devant les caisses."
    },
    "notes": ""
  },
  {
    "id": "ascent-molly-plant-dice-a-depuis-mid-cubby",
    "map": "ascent",
    "title": "Molly plant dice A depuis Mid Cubby",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 8,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 48.6,
      "y": 35.3
    },
    "impact": {
      "x": 32.8,
      "y": 12.6
    },
    "position": {
      "image": "assets/lineups/ascent/a-cubby-dice-position.webp",
      "note": "Dans Mid Cubby, colle-toi dans le coin du mur, juste à droite du dessin de chien, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/ascent/a-cubby-dice-visee.webp",
      "note": "Place le trait de la barre des HP (le point rouge) à côté de la tuile du toit, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 32.2,
        "y": 95.4
      }
    },
    "result": {
      "image": "assets/lineups/ascent/a-cubby-dice-resultat.webp",
      "note": "La molly tombe sur le spot de plant dice A, devant les caisses."
    },
    "notes": ""
  },
  {
    "id": "ascent-molly-plant-open-a-depuis-a-lobby",
    "map": "ascent",
    "title": "Molly plant open A depuis A Lobby",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 7,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 56.2,
      "y": 29.2
    },
    "impact": {
      "x": 34.4,
      "y": 7.9
    },
    "position": {
      "image": "assets/lineups/ascent/a-lobby-position.webp",
      "note": "Même position que la default A depuis A Lobby : contre le mur, juste à droite de la grande caisse verte."
    },
    "aim": {
      "image": "assets/lineups/ascent/a-lobby-open-visee.webp",
      "note": "Place le trait de la barre de vie (le trait rouge) sous la structure et contre le mur, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 14.8,
        "y": 97.8
      }
    },
    "result": {
      "image": "assets/lineups/ascent/a-lobby-open-resultat.webp",
      "note": "La molly tombe sur le spot de plant open A, sous la caisse suspendue."
    },
    "notes": ""
  },
  {
    "id": "ascent-molly-plant-open-a-depuis-mid-cubby",
    "map": "ascent",
    "title": "Molly plant open A depuis Mid Cubby",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 6,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 48.6,
      "y": 35.3
    },
    "impact": {
      "x": 34.4,
      "y": 7.9
    },
    "position": {
      "image": "assets/lineups/ascent/a-cubby-dice-position.webp",
      "note": "Même position que la plant dice A depuis Mid Cubby : dans le coin du mur, juste à droite du dessin de chien."
    },
    "aim": {
      "image": "assets/lineups/ascent/a-cubby-open-visee.webp",
      "note": "Place le trait de la barre des HP (le point rouge) à côté de la tuile du toit, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 35.4,
        "y": 92.0
      }
    },
    "result": {
      "image": "assets/lineups/ascent/a-cubby-open-resultat.webp",
      "note": "La molly tombe sur le spot de plant open A, sous la caisse suspendue."
    },
    "notes": ""
  },
  {
    "id": "ascent-molly-anti-plant-open-a-depuis-spawn",
    "map": "ascent",
    "title": "Molly anti-plant open A depuis le spawn",
    "site": "A",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 6,
    "tags": [
      "Anti-plant"
    ],
    "spot": {
      "x": 13.2,
      "y": 35.9
    },
    "impact": {
      "x": 34.4,
      "y": 7.9
    },
    "position": {
      "image": "assets/lineups/ascent/a-antiplant-spawn-position.webp",
      "note": "Même position que l'anti-plant default A : dans le coin du mur juste à droite de l'arche, sur la grille au sol."
    },
    "aim": {
      "image": "assets/lineups/ascent/a-antiplant-open-visee.webp",
      "note": "Place le haut de la flamme (icône de la molly dans le HUD, le point rouge) en bas de la fenêtre, puis lancer normal.",
      "target": {
        "x": 51.5,
        "y": 94.5
      }
    },
    "result": {
      "image": "assets/lineups/ascent/a-antiplant-open-resultat.webp",
      "note": "La molly tombe sur le spot de plant open A, sous la caisse suspendue."
    },
    "notes": ""
  },
  {
    "id": "ascent-molly-default-b-depuis-b-main",
    "map": "ascent",
    "title": "Molly default B depuis B Main",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 4,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 47.7,
      "y": 72.7
    },
    "position": {
      "image": "assets/lineups/ascent/b-main-default-position.webp",
      "note": "En bas de B Main, colle-toi dans le coin entre le mur de la « Pescheria » et le pilier, à côté de la petite grille, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/ascent/b-main-default-visee.webp",
      "note": "Place ton crosshair en bas de la fenêtre arrondie, au niveau du petit arbre, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 51.7,
        "y": 45.5
      }
    },
    "result": {
      "image": "assets/lineups/ascent/b-main-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default B, autour des caisses."
    },
    "notes": ""
  },
  {
    "id": "ascent-molly-default-b-depuis-b-lobby",
    "map": "ascent",
    "title": "Molly default B depuis B Lobby",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 7,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 54.0,
      "y": 76.7
    },
    "position": {
      "image": "assets/lineups/ascent/b-lobby-default-position.webp",
      "note": "Dans B Lobby, colle-toi devant la porte de la petite cabane, dans le coin contre le muret de droite, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/ascent/b-lobby-default-visee.webp",
      "note": "Place le bas de la flèche du HUD (le point rouge) sur le coin du bâtiment, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 53.3,
        "y": 87.5
      }
    },
    "result": {
      "image": "assets/lineups/ascent/b-lobby-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default B, autour des caisses."
    },
    "notes": ""
  },
  {
    "id": "ascent-molly-default-b-depuis-mid-pizza",
    "map": "ascent",
    "title": "Molly default B depuis Mid Pizza",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 7,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 28.5,
      "y": 42.8
    },
    "position": {
      "image": "assets/lineups/ascent/b-pizza-default-position.webp",
      "note": "Dans Mid Pizza, colle-toi dans le coin entre le mur et le rideau de fer de la « Pizzeria da Marzio », sur les sacs, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/ascent/b-pizza-default-visee.webp",
      "note": "Place le « C » du HUD (sous l'icône de la molly, encadré en rouge) dans la fenêtre, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 54.2,
        "y": 98.4
      }
    },
    "result": {
      "image": "assets/lineups/ascent/b-pizza-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default B, autour des caisses."
    },
    "notes": ""
  },
  {
    "id": "ascent-molly-anti-plant-default-b-depuis-ct",
    "map": "ascent",
    "title": "Molly anti-plant default B depuis CT",
    "site": "B",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 3,
    "tags": [
      "Anti-plant"
    ],
    "spot": {
      "x": 14.2,
      "y": 52.8
    },
    "position": {
      "image": "assets/lineups/ascent/b-antiplant-ct-position.webp",
      "note": "Au spawn défenseur côté B, colle-toi contre le muret orange, vers le milieu, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/ascent/b-antiplant-default-visee.webp",
      "note": "Place ton crosshair sur le bord gauche du bâtiment orange, à droite de la statue du lion, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 56.1,
        "y": 51.5
      }
    },
    "result": {
      "image": "assets/lineups/ascent/b-antiplant-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default B, devant les caisses."
    },
    "notes": ""
  },
  {
    "id": "ascent-molly-stairs-b-depuis-b-main",
    "map": "ascent",
    "title": "Molly stairs B depuis B Main",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 3,
    "tags": [
      "Post-plant",
      "Délogement"
    ],
    "spot": {
      "x": 47.7,
      "y": 76.4
    },
    "impact": {
      "x": 22.8,
      "y": 72.9
    },
    "position": {
      "image": "assets/lineups/ascent/b-main-stairs-position.webp",
      "note": "En bas de B Main, colle-toi dans le coin entre le pilier de droite et le mur, en face de la position de la default B, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/ascent/b-main-stairs-visee.webp",
      "note": "Place ton crosshair en bas de la fenêtre arrondie de gauche, au niveau du toit de la maison, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 47.3,
        "y": 50.5
      }
    },
    "result": {
      "image": "assets/lineups/ascent/b-main-stairs-resultat.webp",
      "note": "La molly tombe dans les escaliers (stairs) du site B : pour le post-plant ou pour déloger un défenseur."
    },
    "notes": ""
  },
  {
    "id": "bind-molly-default-a-depuis-a-short",
    "map": "bind",
    "title": "Molly default A depuis A Short",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 2,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 59.2,
      "y": 53.9
    },
    "impact": {
      "x": 69.8,
      "y": 35.4
    },
    "position": {
      "image": "assets/lineups/bind/a-short-default-position.webp",
      "note": "Dans A Short, monte sur l'étal en bois contre le mur, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/bind/a-short-default-visee.webp",
      "note": "Place ton crosshair (le point rouge) dans l'ouverture entre les deux murs, juste au-dessus des caisses, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 52.7,
        "y": 49.6
      }
    },
    "result": {
      "image": "assets/lineups/bind/a-short-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default A, contre le véhicule."
    },
    "notes": ""
  },
  {
    "id": "bind-molly-default-a-depuis-a-lobby",
    "map": "bind",
    "title": "Molly default A depuis A Lobby",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 8,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 69.0,
      "y": 51.4
    },
    "position": {
      "image": "assets/lineups/bind/a-lobby-default-position.webp",
      "note": "Au bout d'A Short, monte sur le rebord en hauteur contre le mur, à côté du boîtier électrique, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/bind/a-lobby-default-visee.webp",
      "note": "Place ton crosshair (le point rouge) juste à droite du coin du toit, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 50.8,
        "y": 49.7
      }
    },
    "result": {
      "image": "assets/lineups/bind/a-lobby-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default A, contre le véhicule."
    },
    "notes": ""
  },
  {
    "id": "bind-molly-default-b-depuis-tp-b",
    "map": "bind",
    "title": "Molly default B depuis le TP B",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 3,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 15.5,
      "y": 46.2
    },
    "position": {
      "image": "assets/lineups/bind/b-tp-default-position.webp",
      "note": "À la sortie du téléporteur B, colle-toi dans le coin du mur juste à gauche du TP, à côté de la planche, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/bind/b-tp-default-visee.webp",
      "note": "Place ton crosshair (le point rouge) dans l'arche, juste au-dessus du bord gauche de l'arche du fond, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 57.5,
        "y": 46.3
      }
    },
    "result": {
      "image": "assets/lineups/bind/b-tp-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default B, devant les caisses."
    },
    "notes": ""
  },
  {
    "id": "bind-molly-default-b-depuis-b-elbow",
    "map": "bind",
    "title": "Molly default B depuis B Elbow",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 3,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 20.0,
      "y": 29.1
    },
    "position": {
      "image": "assets/lineups/bind/b-elbow-default-position.webp",
      "note": "Dans B Elbow, colle-toi contre le mur, juste devant la barre verticale, à droite de l'écran bleu, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/bind/b-elbow-default-visee.webp",
      "note": "Place ton crosshair juste sous le coin inférieur gauche de la petite ouverture dans le mur, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 49.4,
        "y": 49.9
      }
    },
    "result": {
      "image": "assets/lineups/bind/b-elbow-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default B, devant les caisses."
    },
    "notes": ""
  },
  {
    "id": "bind-molly-anti-plant-default-b-depuis-ct",
    "map": "bind",
    "title": "Molly anti-plant default B depuis CT",
    "site": "B",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 3,
    "tags": [
      "Anti-plant"
    ],
    "spot": {
      "x": 42.7,
      "y": 20.0
    },
    "position": {
      "image": "assets/lineups/bind/b-antiplant-ct-position.webp",
      "note": "À la sortie du spawn défenseur vers B Hall, colle-toi dans le coin entre les deux murs, le long du câble au sol, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/bind/b-antiplant-ct-visee.webp",
      "note": "Place ton crosshair (le point rouge) sur le petit poteau qui dépasse derrière la rambarde, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 52.9,
        "y": 49.4
      }
    },
    "result": {
      "image": "assets/lineups/bind/b-antiplant-ct-resultat.webp",
      "note": "La molly tombe sur le spot de plant default B, devant les caisses."
    },
    "notes": ""
  },
  {
    "id": "bind-molly-anti-plant-default-a-depuis-ct-b",
    "map": "bind",
    "title": "Molly anti-plant default A depuis CT B",
    "site": "A",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 8,
    "tags": [
      "Anti-plant"
    ],
    "spot": {
      "x": 37.6,
      "y": 19.9
    },
    "position": {
      "image": "assets/lineups/bind/a-antiplant-ctb-position.webp",
      "note": "Côté CT, au début de B Hall, colle-toi contre le pilier juste à droite de la porte « B », au bout du câble au sol, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/bind/a-antiplant-ctb-visee.webp",
      "note": "Place le haut de la flamme (icône de la molly dans le HUD, le point rouge) sur le bord gauche de la tour en ruine, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 41.2,
        "y": 89.0
      }
    },
    "result": {
      "image": "assets/lineups/bind/a-antiplant-ctb-resultat.webp",
      "note": "La molly tombe sur le spot de plant default A, contre le véhicule."
    },
    "notes": ""
  },
  {
    "id": "bind-molly-plant-triple-a-depuis-showers",
    "map": "bind",
    "title": "Molly plant triple A depuis Showers",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 7,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 85.0,
      "y": 45.9
    },
    "impact": {
      "x": 76.7,
      "y": 35.6
    },
    "position": {
      "image": "assets/lineups/bind/a-shower-triple-position.webp",
      "note": "Dans Showers, place-toi devant le mur à gauche de l'arche qui mène au site, juste devant les planches posées contre le mur, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/bind/a-shower-triple-visee.webp",
      "note": "Place ton crosshair (le point rouge) dans le trou du plafond, sur le bâtiment au loin, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 45.3,
        "y": 43.6
      }
    },
    "result": {
      "image": "assets/lineups/bind/a-shower-triple-resultat.webp",
      "note": "La molly tombe sur le spot de plant triple A, à côté des caisses empilées."
    },
    "notes": ""
  },
  {
    "id": "bind-molly-plant-triple-a-depuis-a-short",
    "map": "bind",
    "title": "Molly plant triple A depuis A Short",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 7,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 57.7,
      "y": 54.4
    },
    "impact": {
      "x": 75.9,
      "y": 34.5
    },
    "position": {
      "image": "assets/lineups/bind/a-short-triple-position.webp",
      "note": "Dans A Short, monte sur le tonneau dans le coin, au bout de l'étal en bois, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/bind/a-short-triple-visee.webp",
      "note": "Place le point rouge (en haut de l'icône de lancer du HUD) juste sous le coin inférieur droit de la fenêtre du bâtiment orange, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 41.5,
        "y": 77.5
      }
    },
    "result": {
      "image": "assets/lineups/bind/a-short-triple-resultat.webp",
      "note": "La molly tombe sur le spot de plant triple A, à côté des caisses empilées."
    },
    "notes": ""
  },
  {
    "id": "bind-molly-anti-plant-triple-a-depuis-spawn",
    "map": "bind",
    "title": "Molly anti-plant triple A depuis le spawn",
    "site": "A",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 4,
    "tags": [
      "Anti-plant"
    ],
    "spot": {
      "x": 46.4,
      "y": 12.1
    },
    "impact": {
      "x": 76.4,
      "y": 34.5
    },
    "position": {
      "image": "assets/lineups/bind/a-antiplant-triple-position.webp",
      "note": "Dans le spawn défenseur, colle-toi contre le mur, juste à gauche du premier bloc de béton, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/bind/a-antiplant-triple-visee.webp",
      "note": "Place le haut de la flèche du HUD (le point rouge) sur le bas du toit au-dessus de l'enseigne « REACTOR A », comme sur la capture, puis lancer normal.",
      "target": {
        "x": 42.3,
        "y": 88.1
      }
    },
    "result": {
      "image": "assets/lineups/bind/a-antiplant-triple-resultat.webp",
      "note": "La molly tombe sur le spot de plant triple A, à côté des caisses empilées."
    },
    "notes": ""
  },
  {
    "id": "corrode-molly-plant-hut-b-depuis-b-main",
    "map": "corrode",
    "title": "Molly plant hut B depuis B Main",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 5,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 56.8,
      "y": 72.9
    },
    "impact": {
      "x": 40.5,
      "y": 74.0
    },
    "position": {
      "image": "assets/lineups/corrode/b-main-hut-position.webp",
      "note": "En bas de B Main, colle-toi dans le coin entre le mur de briques et la petite porte en bois, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/corrode/b-main-hut-visee.webp",
      "note": "Place ton crosshair (le point rouge) sur la pointe du toit de la petite lucarne de la maison, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 56.1,
        "y": 49.2
      }
    },
    "result": {
      "image": "assets/lineups/corrode/b-main-hut-resultat.webp",
      "note": "La molly tombe sous l'abri (hut) du site B, sur le spot de plant."
    },
    "notes": ""
  },
  {
    "id": "corrode-molly-hut-b-depuis-ct",
    "map": "corrode",
    "title": "Molly hut B depuis le spawn CT",
    "site": "B",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 8,
    "tags": [
      "Anti-plant",
      "Retake"
    ],
    "spot": {
      "x": 14.1,
      "y": 73.4
    },
    "impact": {
      "x": 40.5,
      "y": 74.0
    },
    "position": {
      "image": "assets/lineups/corrode/b-ct-hut-position.webp",
      "note": "À la sortie du spawn défenseur, colle-toi dans le coin juste à droite de la petite porte en bois arrondie, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/corrode/b-ct-hut-visee.webp",
      "note": "Place le petit trait rouge (au bout de la ligne des HP, à droite du « 100 ») sur le bord du toit en bas à gauche, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 26.9,
        "y": 93.2
      }
    },
    "result": {
      "image": "assets/lineups/corrode/b-ct-hut-resultat.webp",
      "note": "La molly tombe sous l'abri (hut) du site B : en anti-plant ou en retake."
    },
    "notes": ""
  },
  {
    "id": "corrode-molly-plant-corner-b-depuis-b-lobby",
    "map": "corrode",
    "title": "Molly plant corner B depuis B Lobby",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 6,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 64.8,
      "y": 67.4
    },
    "impact": {
      "x": 43.2,
      "y": 79.0
    },
    "position": {
      "image": "assets/lineups/corrode/b-lobby-position.webp",
      "note": "En haut de B Lobby, colle-toi dans le coin du mur de briques, sous la branche d'arbre, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/corrode/b-lobby-corner-visee.webp",
      "note": "Place le petit trait rouge (au bout de la ligne des HP, à droite du « 100 ») sur l'arête du mur : le trait doit dépasser un peu l'arête vers la droite. Puis lancer normal.",
      "target": {
        "x": 35.7,
        "y": 91.5
      }
    },
    "result": {
      "image": "assets/lineups/corrode/b-lobby-corner-resultat.webp",
      "note": "La molly tombe dans le coin (corner) du site B, contre le muret."
    },
    "notes": ""
  },
  {
    "id": "corrode-molly-anti-plant-corner-b-depuis-ct",
    "map": "corrode",
    "title": "Molly anti-plant corner B depuis CT B",
    "site": "B",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 8,
    "tags": [
      "Anti-plant"
    ],
    "spot": {
      "x": 14.3,
      "y": 85.9
    },
    "impact": {
      "x": 43.2,
      "y": 79.0
    },
    "position": {
      "image": "assets/lineups/corrode/b-ct-corner-position.webp",
      "note": "Côté CT, au-dessus de B Arch, colle-toi dans le coin entre le muret et la caisse en bois avec le pot de fleurs, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/corrode/b-ct-corner-visee.webp",
      "note": "Place le petit trait rouge (en bas à gauche, sous le « 100 ») sur le haut de la tour en bas à gauche de l'écran, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 14.5,
        "y": 96.8
      }
    },
    "result": {
      "image": "assets/lineups/corrode/b-ct-corner-resultat.webp",
      "note": "La molly tombe dans le coin (corner) du site B, contre le muret."
    },
    "notes": ""
  },
  {
    "id": "corrode-molly-plant-hut-b-depuis-b-lobby",
    "map": "corrode",
    "title": "Molly plant hut B depuis B Lobby",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 5,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 64.8,
      "y": 67.4
    },
    "impact": {
      "x": 40.5,
      "y": 74.0
    },
    "position": {
      "image": "assets/lineups/corrode/b-lobby-position.webp",
      "note": "Même position que la plant corner B depuis B Lobby : dans le coin du mur de briques, sous la branche d'arbre."
    },
    "aim": {
      "image": "assets/lineups/corrode/b-lobby-hut-visee.webp",
      "note": "Place le petit trait rouge (au bout de la ligne des HP, à droite du « 100 ») sur le coin gauche de la petite porte en bas du bâtiment, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 29.4,
        "y": 93.2
      }
    },
    "result": {
      "image": "assets/lineups/corrode/b-lobby-hut-resultat.webp",
      "note": "La molly tombe sous l'abri (hut) du site B, sur le spot de plant."
    },
    "notes": ""
  },
  {
    "id": "corrode-molly-default-a-depuis-a-pocket",
    "map": "corrode",
    "title": "Molly default A depuis A Pocket",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 3,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 49.3,
      "y": 15.7
    },
    "impact": {
      "x": 36.7,
      "y": 22.8
    },
    "position": {
      "image": "assets/lineups/corrode/a-pocket-default-position.webp",
      "note": "Dans A Pocket, colle-toi dans le coin entre le mur et la grande caisse en bois, sur les planches au sol, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/corrode/a-pocket-default-visee.webp",
      "note": "Place ton crosshair (le petit trait rouge) juste au-dessus du muret, sur le bord gauche de l'ouverture ronde du bâtiment, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 51.0,
        "y": 46.5
      }
    },
    "result": {
      "image": "assets/lineups/corrode/a-pocket-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default A, devant la caisse."
    },
    "notes": ""
  },
  {
    "id": "corrode-molly-default-a-depuis-a-main",
    "map": "corrode",
    "title": "Molly default A depuis A Main",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 8,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 63.0,
      "y": 19.1
    },
    "position": {
      "image": "assets/lineups/corrode/a-main-default-position.webp",
      "note": "En haut d'A Main, colle-toi contre le mur, juste à gauche du bloc de pierre cerclé, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/corrode/a-main-default-visee.webp",
      "note": "Place le haut de la flamme du HUD (le point rouge) sur le haut de la cheminée, à gauche de la tour ronde, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 44.6,
        "y": 90.7
      }
    },
    "result": {
      "image": "assets/lineups/corrode/a-main-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default A, devant la caisse."
    },
    "notes": ""
  },
  {
    "id": "fracture-molly-plant-safe-a-depuis-spawn",
    "map": "fracture",
    "title": "Molly plant safe A depuis le spawn",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 6.5,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 64.5,
      "y": 91.3
    },
    "impact": {
      "x": 89.5,
      "y": 52.5
    },
    "position": {
      "image": "assets/lineups/fracture/a-spawn-safe-position.webp",
      "note": "Dans le spawn attaquant, colle-toi contre le mur au pied de la poutre en diagonale, juste à gauche du pilier, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/fracture/a-spawn-safe-visee.webp",
      "note": "Place le point rouge sur la flèche du HUD de lancer, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 47.7,
        "y": 81.1
      }
    },
    "result": {
      "image": "assets/lineups/fracture/a-spawn-safe-resultat.webp",
      "note": "La molly tombe sur le spot de plant safe A, sous la passerelle."
    },
    "notes": ""
  },
  {
    "id": "fracture-molly-plant-safe-a-depuis-dish",
    "map": "fracture",
    "title": "Molly plant safe A depuis A Dish",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 4,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 66.6,
      "y": 20.4
    },
    "impact": {
      "x": 89.5,
      "y": 52.5
    },
    "position": {
      "image": "assets/lineups/fracture/a-dish-safe-position.webp",
      "note": "En haut d'A Dish, colle-toi dans le coin gauche de la porte, contre le rocher, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/fracture/a-dish-safe-visee.webp",
      "note": "Aligne les deux points rouges de la flamme du HUD (le haut et le bas à droite de la flamme) comme sur la capture, puis lancer normal.",
      "target": {
        "x": 49.5,
        "y": 93.3
      }
    },
    "result": {
      "image": "assets/lineups/fracture/a-dish-safe-resultat.webp",
      "note": "La molly tombe sur le spot de plant safe A, sous la passerelle."
    },
    "notes": ""
  },
  {
    "id": "fracture-molly-plant-under-a-depuis-spawn",
    "map": "fracture",
    "title": "Molly plant under A depuis le spawn",
    "site": "A",
    "side": "attack",
    "throwType": "Saut + lancer",
    "fuse": 6,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 66.7,
      "y": 90.2
    },
    "impact": {
      "x": 84.6,
      "y": 46.8
    },
    "position": {
      "image": "assets/lineups/fracture/a-spawn-under-position.webp",
      "note": "Dans le spawn attaquant, colle-toi dans le coin gauche du mur vert, contre la fenêtre, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/fracture/a-spawn-under-visee.webp",
      "note": "Aligne la marque rouge du HUD (en bas à gauche, à côté des 100 PV) comme sur la capture, puis saute et lance au sommet du saut.",
      "target": {
        "x": 28.3,
        "y": 93.9
      }
    },
    "result": {
      "image": "assets/lineups/fracture/a-spawn-under-resultat.webp",
      "note": "La molly tombe sur le spot de plant under A, sous la structure."
    },
    "notes": ""
  },
  {
    "id": "fracture-molly-plant-default-b-depuis-b-tree",
    "map": "fracture",
    "title": "Molly plant default B depuis B Tree",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 7,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 26.3,
      "y": 73.2
    },
    "impact": {
      "x": 16.0,
      "y": 51.5
    },
    "position": {
      "image": "assets/lineups/fracture/b-tree-default-position.webp",
      "note": "Dans B Tree, colle-toi entre la grande caisse et la petite caisse, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/fracture/b-tree-default-visee.webp",
      "note": "Aligne la marque rouge du HUD (en bas à gauche, à côté des 100 PV) comme sur la capture, puis lancer normal.",
      "target": {
        "x": 29.2,
        "y": 90.7
      }
    },
    "result": {
      "image": "assets/lineups/fracture/b-tree-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default B, contre les caisses."
    },
    "notes": ""
  },
  {
    "id": "fracture-molly-plant-default-b-depuis-b-arcade",
    "map": "fracture",
    "title": "Molly plant default B depuis B Arcade",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 7,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 20.9,
      "y": 30.6
    },
    "impact": {
      "x": 16.0,
      "y": 51.5
    },
    "position": {
      "image": "assets/lineups/fracture/b-arcade-position.webp",
      "note": "En haut de B Arcade, monte sur la caisse et place-toi au bout gauche, contre le mur, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/fracture/b-arcade-default-visee.webp",
      "note": "Aligne la marque rouge du HUD (en bas à gauche, à droite des 100 PV) comme sur la capture, puis lancer normal.",
      "target": {
        "x": 23.0,
        "y": 92.7
      }
    },
    "result": {
      "image": "assets/lineups/fracture/b-arcade-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default B, contre les caisses."
    },
    "notes": ""
  },
  {
    "id": "fracture-molly-plant-safe-b-depuis-b-tree",
    "map": "fracture",
    "title": "Molly plant safe B depuis B Tree",
    "site": "B",
    "side": "attack",
    "throwType": "Saut + lancer",
    "fuse": 4.5,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 27.2,
      "y": 74.5
    },
    "impact": {
      "x": 8.5,
      "y": 57.3
    },
    "position": {
      "image": "assets/lineups/fracture/b-tree-safe-position.webp",
      "note": "Dans B Tree, colle-toi contre la grande caisse, juste à droite de la petite caisse, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/fracture/b-tree-safe-visee.webp",
      "note": "Place le crosshair sur le point rouge, au coin du haut du mur, comme sur la capture, puis saute et lance au sommet du saut.",
      "target": {
        "x": 47.5,
        "y": 48.8
      }
    },
    "result": {
      "image": "assets/lineups/fracture/b-tree-safe-resultat.webp",
      "note": "La molly tombe sur le spot de plant safe B, dans le coin."
    },
    "notes": ""
  },
  {
    "id": "fracture-molly-plant-safe-b-depuis-b-arcade",
    "map": "fracture",
    "title": "Molly plant safe B depuis B Arcade",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 7,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 20.9,
      "y": 30.6
    },
    "impact": {
      "x": 8.5,
      "y": 57.3
    },
    "position": {
      "image": "assets/lineups/fracture/b-arcade-position.webp",
      "note": "En haut de B Arcade, monte sur la caisse et place-toi au bout gauche, contre le mur, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/fracture/b-arcade-safe-visee.webp",
      "note": "Place le crosshair sur le point rouge, dans le ciel juste à gauche des feuilles, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 51.2,
        "y": 46.0
      }
    },
    "result": {
      "image": "assets/lineups/fracture/b-arcade-safe-resultat.webp",
      "note": "La molly tombe sur le spot de plant safe B, dans le coin."
    },
    "notes": ""
  },
  {
    "id": "split-molly-plant-default-b-depuis-b-main",
    "map": "split",
    "title": "Molly plant default B depuis B Main",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 4,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 70.8,
      "y": 74.2
    },
    "impact": {
      "x": 34.5,
      "y": 85.9
    },
    "position": {
      "image": "assets/lineups/split/b-main-default-position.webp",
      "note": "Dans B Lobby, colle-toi dans le coin entre le mur et le boîtier électrique, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/split/b-main-default-visee.webp",
      "note": "Place le crosshair sur le point rouge, sur le petit panneau vert sous l'enseigne verticale, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 52.7,
        "y": 43.4
      }
    },
    "result": {
      "image": "assets/lineups/split/b-main-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default B, contre la caisse."
    },
    "notes": ""
  },
  {
    "id": "split-molly-plant-default-b-depuis-b-alley",
    "map": "split",
    "title": "Molly plant default B depuis B Alley",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 6,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 19.1,
      "y": 69.9
    },
    "impact": {
      "x": 34.5,
      "y": 85.9
    },
    "position": {
      "image": "assets/lineups/split/b-alley-position.webp",
      "note": "Au bout de B Alley, colle-toi dans le coin au pied du mur tagué, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/split/b-alley-default-visee.webp",
      "note": "Aligne la marque rouge du HUD (en bas à gauche, à droite des 100 PV) comme sur la capture, puis lancer normal.",
      "target": {
        "x": 28.0,
        "y": 90.4
      }
    },
    "result": {
      "image": "assets/lineups/split/b-alley-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default B, contre la caisse."
    },
    "notes": ""
  },
  {
    "id": "split-molly-plant-default-b-depuis-b-back",
    "map": "split",
    "title": "Molly plant default B depuis B Back",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 9,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 22.8,
      "y": 92.4
    },
    "impact": {
      "x": 34.5,
      "y": 85.9
    },
    "position": {
      "image": "assets/lineups/split/b-back-default-position.webp",
      "note": "Au fond de B Back, colle-toi dans le coin contre le mur, juste à gauche du climatiseur, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/split/b-back-default-visee.webp",
      "note": "Aligne le trait rouge du HUD (entre la flamme et l'icône suivante) comme sur la capture, puis lancer normal.",
      "target": {
        "x": 48.0,
        "y": 92.1
      }
    },
    "result": {
      "image": "assets/lineups/split/b-back-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default B, contre la caisse."
    },
    "notes": ""
  },
  {
    "id": "split-molly-plant-default-b-depuis-b-top",
    "map": "split",
    "title": "Molly plant default B depuis B Top",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 3,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 48.7,
      "y": 64.0
    },
    "impact": {
      "x": 34.5,
      "y": 85.9
    },
    "position": {
      "image": "assets/lineups/split/b-top-default-position.webp",
      "note": "En haut de B Tower, colle-toi dans le coin entre le pilier et le mur rose, au bord des escaliers, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/split/b-top-default-visee.webp",
      "note": "Place le crosshair sur le point rouge, dans l'ouverture au fond, sous le balcon, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 55.4,
        "y": 47.1
      }
    },
    "result": {
      "image": "assets/lineups/split/b-top-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default B, contre la caisse."
    },
    "notes": ""
  },
  {
    "id": "split-molly-plant-open-b-depuis-b-lobby",
    "map": "split",
    "title": "Molly plant open B depuis B Lobby",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 7,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 64.6,
      "y": 82.9
    },
    "impact": {
      "x": 29.8,
      "y": 88.1
    },
    "position": {
      "image": "assets/lineups/split/b-lobby-open-position.webp",
      "note": "Dans B Lobby, colle-toi contre le mur peint, juste à gauche des tôles et des caisses, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/split/b-lobby-open-visee.webp",
      "note": "Aligne la marque rouge du HUD (juste au-dessus de la 3e icône de compétence) comme sur la capture, puis lancer normal.",
      "target": {
        "x": 46.4,
        "y": 90.6
      }
    },
    "result": {
      "image": "assets/lineups/split/b-lobby-open-resultat.webp",
      "note": "La molly tombe sur le spot de plant open B, au pied des escaliers."
    },
    "notes": ""
  },
  {
    "id": "split-molly-plant-open-b-depuis-b-top",
    "map": "split",
    "title": "Molly plant open B depuis B Top",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 2,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 44.6,
      "y": 64.7
    },
    "impact": {
      "x": 29.8,
      "y": 88.1
    },
    "position": {
      "image": "assets/lineups/split/b-top-open-position.webp",
      "note": "En haut de B Tower, colle-toi contre le mur, entre la boîte aux lettres et la plante, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/split/b-top-open-visee.webp",
      "note": "Place le crosshair sur le point rouge, au bout du panneau vert sous le B, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 45.7,
        "y": 46.9
      }
    },
    "result": {
      "image": "assets/lineups/split/b-top-open-resultat.webp",
      "note": "La molly tombe sur le spot de plant open B, au pied des escaliers."
    },
    "notes": ""
  },
  {
    "id": "split-molly-plant-open-b-depuis-b-alley",
    "map": "split",
    "title": "Molly plant open B depuis B Alley",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 8,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 19.1,
      "y": 69.9
    },
    "impact": {
      "x": 29.8,
      "y": 88.1
    },
    "position": {
      "image": "assets/lineups/split/b-alley-position.webp",
      "note": "Au bout de B Alley, colle-toi dans le coin au pied du mur tagué, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/split/b-alley-open-visee.webp",
      "note": "Aligne le trait rouge du HUD (en bas à gauche, juste avant la 1re icône de compétence) comme sur la capture, puis lancer normal.",
      "target": {
        "x": 31.6,
        "y": 91.4
      }
    },
    "result": {
      "image": "assets/lineups/split/b-alley-open-resultat.webp",
      "note": "La molly tombe sur le spot de plant open B, au pied des escaliers."
    },
    "notes": ""
  },
  {
    "id": "split-molly-plant-default-a-depuis-a-lobby",
    "map": "split",
    "title": "Molly plant default A depuis A Lobby",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 7,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 65.9,
      "y": 12.8
    },
    "impact": {
      "x": 29.7,
      "y": 12.8
    },
    "position": {
      "image": "assets/lineups/split/a-lobby-position.webp",
      "note": "Au fond d'A Lobby, colle-toi contre le mur en bois, juste à droite du petit bac à plantes, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/split/a-lobby-default-visee.webp",
      "note": "Aligne le trait rouge sur le coin du haut de l'immeuble grillagé (le crosshair au bout du trait), comme sur la capture, puis lancer normal.",
      "target": {
        "x": 49.9,
        "y": 41.4
      }
    },
    "result": {
      "image": "assets/lineups/split/a-lobby-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default A, autour du bac à plantes."
    },
    "notes": ""
  },
  {
    "id": "split-molly-elbow-a-depuis-a-lobby",
    "map": "split",
    "title": "Molly elbow A depuis A Lobby",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 8,
    "tags": [
      "Post-plant",
      "Délogement"
    ],
    "spot": {
      "x": 65.9,
      "y": 12.8
    },
    "impact": {
      "x": 22.6,
      "y": 11.2
    },
    "position": {
      "image": "assets/lineups/split/a-lobby-position.webp",
      "note": "Au fond d'A Lobby, colle-toi contre le mur en bois, juste à droite du petit bac à plantes, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/split/a-lobby-elbow-visee.webp",
      "note": "Aligne la marque rouge en haut de la flamme du HUD comme sur la capture, puis lancer normal.",
      "target": {
        "x": 43.6,
        "y": 90.3
      }
    },
    "result": {
      "image": "assets/lineups/split/a-lobby-elbow-resultat.webp",
      "note": "La molly tombe dans Elbow, au pied des escaliers d'A Back."
    },
    "notes": ""
  },
  {
    "id": "split-molly-retake-elbow-a-depuis-a-screens",
    "map": "split",
    "title": "Molly retake elbow A depuis A Screens",
    "site": "A",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 7,
    "tags": [
      "Retake"
    ],
    "spot": {
      "x": 13.5,
      "y": 33.8
    },
    "impact": {
      "x": 22.6,
      "y": 11.2
    },
    "position": {
      "image": "assets/lineups/split/a-screens-elbow-position.webp",
      "note": "Au début d'A Screens, colle-toi dans le coin entre les deux murs en bois, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/split/a-screens-elbow-visee.webp",
      "note": "Aligne la marque rouge en haut de l'indicateur de lancer du HUD comme sur la capture, puis lancer normal.",
      "target": {
        "x": 42.9,
        "y": 78.7
      }
    },
    "result": {
      "image": "assets/lineups/split/a-screens-elbow-resultat.webp",
      "note": "La molly tombe dans Elbow, au pied des escaliers d'A Back."
    },
    "notes": ""
  },
  {
    "id": "split-molly-plant-screen-a-depuis-a-lobby",
    "map": "split",
    "title": "Molly plant screen A depuis A Lobby",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 7,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 65.9,
      "y": 12.8
    },
    "impact": {
      "x": 33.8,
      "y": 9.4
    },
    "position": {
      "image": "assets/lineups/split/a-lobby-position.webp",
      "note": "Au fond d'A Lobby, colle-toi contre le mur en bois, juste à droite du petit bac à plantes, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/split/a-lobby-screen-visee.webp",
      "note": "Aligne le trait rouge du HUD (à droite du bas de l'indicateur de lancer) comme sur la capture, puis lancer normal.",
      "target": {
        "x": 47.9,
        "y": 88.8
      }
    },
    "result": {
      "image": "assets/lineups/split/a-lobby-screen-resultat.webp",
      "note": "La molly tombe sur le spot de plant screen A, sur la caisse au milieu du site."
    },
    "notes": ""
  },
  {
    "id": "split-molly-plant-back-screen-a-depuis-a-lobby",
    "map": "split",
    "title": "Molly back screen A depuis A Lobby",
    "site": "A",
    "side": "attack",
    "throwType": "Saut + lancer",
    "fuse": 7,
    "tags": [
      "Délogement"
    ],
    "spot": {
      "x": 65.9,
      "y": 12.8
    },
    "impact": {
      "x": 33.6,
      "y": 5.5
    },
    "position": {
      "image": "assets/lineups/split/a-lobby-position.webp",
      "note": "Au fond d'A Lobby, colle-toi contre le mur en bois, juste à droite du petit bac à plantes, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/split/a-lobby-back-screen-visee.webp",
      "note": "Aligne la marque rouge en haut à gauche de l'indicateur de lancer du HUD comme sur la capture, puis saute et lance au sommet du saut.",
      "target": {
        "x": 45.3,
        "y": 78.4
      }
    },
    "result": {
      "image": "assets/lineups/split/a-lobby-back-screen-resultat.webp",
      "note": "La molly tombe sur le spot back screen A, derrière la caisse, contre le mur."
    },
    "notes": ""
  },
  {
    "id": "split-molly-pocket-a-depuis-a-lobby",
    "map": "split",
    "title": "Molly pocket A depuis A Lobby",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 9,
    "tags": [
      "Délogement"
    ],
    "spot": {
      "x": 65.1,
      "y": 12.8
    },
    "impact": {
      "x": 41.7,
      "y": 5.9
    },
    "position": {
      "image": "assets/lineups/split/a-lobby-pocket-position.webp",
      "note": "Au fond d'A Lobby, monte sur le petit bac à plantes et colle-toi contre le mur en bois, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/split/a-lobby-pocket-visee.webp",
      "note": "Aligne la marque rouge en haut à gauche de l'indicateur de lancer du HUD comme sur la capture, puis lancer normal.",
      "target": {
        "x": 43.0,
        "y": 79.0
      }
    },
    "result": {
      "image": "assets/lineups/split/a-lobby-pocket-resultat.webp",
      "note": "La molly tombe dans le pocket du site A, dans le coin."
    },
    "notes": ""
  },
  {
    "id": "summit-molly-plant-default-b-depuis-mid-tiles",
    "map": "summit",
    "title": "Molly plant default B depuis Mid Tiles",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 8,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 34.5,
      "y": 63.1
    },
    "impact": {
      "x": 5.3,
      "y": 35.8
    },
    "position": {
      "image": "assets/lineups/summit/b-tiles-position.webp",
      "note": "Dans Mid Tiles, colle-toi contre le mur, juste à droite de la grande caisse, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/summit/b-tiles-default-visee.webp",
      "note": "Aligne le trait rouge du HUD (en bas à droite de l'indicateur de lancer) comme sur la capture, puis lancer normal.",
      "target": {
        "x": 45.1,
        "y": 85.6
      }
    },
    "result": {
      "image": "assets/lineups/summit/b-tiles-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default B, devant la porte, entre les caisses."
    },
    "notes": ""
  },
  {
    "id": "summit-molly-anti-plant-default-b-depuis-ct",
    "map": "summit",
    "title": "Molly anti-plant default B depuis CT",
    "site": "B",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 8,
    "tags": [
      "Anti-plant"
    ],
    "spot": {
      "x": 34.0,
      "y": 20.3
    },
    "impact": {
      "x": 5.3,
      "y": 35.8
    },
    "position": {
      "image": "assets/lineups/summit/b-ct-position.webp",
      "note": "Côté CT, colle-toi dans le coin du mur, juste à gauche du bac à plantes, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/summit/b-ct-default-visee.webp",
      "note": "Mets le bout de la ligne du HUD (à droite des 100 PV) dans le petit trou, à l'endroit du carré rouge, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 31.9,
        "y": 91.8
      }
    },
    "result": {
      "image": "assets/lineups/summit/b-ct-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default B, devant la porte, entre les caisses."
    },
    "notes": ""
  },
  {
    "id": "summit-molly-plant-default-b-depuis-b-drop",
    "map": "summit",
    "title": "Molly plant default B depuis B Drop",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 3,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 7.1,
      "y": 28.9
    },
    "impact": {
      "x": 5.3,
      "y": 35.8
    },
    "position": {
      "image": "assets/lineups/summit/b-drop-default-position.webp",
      "note": "En bas de B Drop, colle-toi dans le coin entre le mur et les casiers, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/summit/b-drop-default-visee.webp",
      "note": "Aligne le trait rouge en haut de l'indicateur de lancer du HUD comme sur la capture, puis lancer normal.",
      "target": {
        "x": 48.5,
        "y": 77.8
      }
    },
    "result": {
      "image": "assets/lineups/summit/b-drop-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default B, devant la porte, entre les caisses."
    },
    "notes": ""
  },
  {
    "id": "summit-molly-plant-hut-b-depuis-mid-tiles",
    "map": "summit",
    "title": "Molly plant hut B depuis Mid Tiles",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 7,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 34.5,
      "y": 63.1
    },
    "impact": {
      "x": 16.2,
      "y": 34.2
    },
    "position": {
      "image": "assets/lineups/summit/b-tiles-position.webp",
      "note": "Dans Mid Tiles, colle-toi contre le mur, juste à droite de la grande caisse, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/summit/b-tiles-hut-visee.webp",
      "note": "Aligne le trait rouge sous l'indicateur de lancer du HUD (au-dessus de la flamme) comme sur la capture, puis lancer normal.",
      "target": {
        "x": 49.4,
        "y": 89.1
      }
    },
    "result": {
      "image": "assets/lineups/summit/b-tiles-hut-resultat.webp",
      "note": "La molly tombe sur le spot de plant hut B, devant la petite maison."
    },
    "notes": ""
  },
  {
    "id": "summit-molly-hut-b-depuis-ct",
    "map": "summit",
    "title": "Molly hut B depuis CT",
    "site": "B",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 8,
    "tags": [
      "Anti-plant",
      "Retake"
    ],
    "spot": {
      "x": 34.0,
      "y": 20.3
    },
    "impact": {
      "x": 16.2,
      "y": 34.2
    },
    "position": {
      "image": "assets/lineups/summit/b-ct-position.webp",
      "note": "Côté CT, colle-toi dans le coin du mur, juste à gauche du bac à plantes, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/summit/b-ct-hut-visee.webp",
      "note": "Aligne la marque rouge en haut de la flamme du HUD comme sur la capture, puis lancer normal.",
      "target": {
        "x": 43.3,
        "y": 90.0
      }
    },
    "result": {
      "image": "assets/lineups/summit/b-ct-hut-resultat.webp",
      "note": "La molly tombe sur le spot hut B, devant la petite maison : en anti-plant ou en retake."
    },
    "notes": ""
  },
  {
    "id": "summit-molly-plant-default-a-depuis-a-main",
    "map": "summit",
    "title": "Molly plant default A depuis A Main",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 4,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 76.4,
      "y": 54.0
    },
    "impact": {
      "x": 88.0,
      "y": 46.2
    },
    "position": {
      "image": "assets/lineups/summit/a-main-default-position.webp",
      "note": "En haut d'A Main, colle-toi au bord de l'arche, juste à gauche du tronc d'arbre, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/summit/a-main-default-visee.webp",
      "note": "Place le crosshair sur le point rouge, au coin du haut du rocher, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 55.1,
        "y": 44.5
      }
    },
    "result": {
      "image": "assets/lineups/summit/a-main-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default A, au bord du site."
    },
    "notes": ""
  },
  {
    "id": "summit-molly-plant-open-a-depuis-a-lobby",
    "map": "summit",
    "title": "Molly plant open A depuis A Lobby",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 5,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 64.2,
      "y": 71.6
    },
    "impact": {
      "x": 92.4,
      "y": 44.4
    },
    "position": {
      "image": "assets/lineups/summit/a-lobby-open-position.webp",
      "note": "Dans A Lobby, colle-toi au coin du mur, juste devant le pilier à gauche, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/summit/a-lobby-open-visee.webp",
      "note": "Place le crosshair sur le point rouge, à la pointe du toit vert, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 51.6,
        "y": 48.1
      }
    },
    "result": {
      "image": "assets/lineups/summit/a-lobby-open-resultat.webp",
      "note": "La molly tombe sur le spot de plant open A, autour de la caisse au milieu du site."
    },
    "notes": ""
  },
  {
    "id": "summit-molly-plant-open-a-depuis-a-cave",
    "map": "summit",
    "title": "Molly plant open A depuis A Cave",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 3,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 92.3,
      "y": 21.3
    },
    "impact": {
      "x": 92.4,
      "y": 44.4
    },
    "position": {
      "image": "assets/lineups/summit/a-cave-position.webp",
      "note": "Dans A Cave, colle-toi contre le mur de pierre courbé, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/summit/a-cave-open-visee.webp",
      "note": "Place le crosshair sur le trait rouge, dans l'arche au bout du couloir, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 45.5,
        "y": 44.9
      }
    },
    "result": {
      "image": "assets/lineups/summit/a-cave-open-resultat.webp",
      "note": "La molly tombe sur le spot de plant open A, contre le mur à côté de la caisse."
    },
    "notes": ""
  },
  {
    "id": "summit-molly-retake-corner-a-depuis-a-cave",
    "map": "summit",
    "title": "Molly retake corner A depuis A Cave",
    "site": "A",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 3,
    "tags": [
      "Retake"
    ],
    "spot": {
      "x": 92.3,
      "y": 21.3
    },
    "impact": {
      "x": 95.8,
      "y": 39.5
    },
    "position": {
      "image": "assets/lineups/summit/a-cave-position.webp",
      "note": "Dans A Cave, colle-toi contre le mur de pierre courbé, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/summit/a-cave-corner-visee.webp",
      "note": "Place le crosshair sur le point rouge, dans l'arche au bout du couloir, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 51.2,
        "y": 49.7
      }
    },
    "result": {
      "image": "assets/lineups/summit/a-cave-corner-resultat.webp",
      "note": "La molly tombe dans le corner du site A, contre la caisse et le mur."
    },
    "notes": ""
  },
  {
    "id": "sunset-molly-plant-default-b-depuis-b-lobby",
    "map": "sunset",
    "title": "Molly plant default B depuis B Lobby",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 8,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 33.7,
      "y": 77.5
    },
    "impact": {
      "x": 14.4,
      "y": 45.8
    },
    "position": {
      "image": "assets/lineups/sunset/b-lobby-position.webp",
      "note": "À B Lobby, colle-toi dans le coin du mur de briques, entre les pots de fleurs et le muret, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/sunset/b-lobby-default-visee.webp",
      "note": "Place le crosshair sur le trait rouge, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 43.0,
        "y": 89.2
      }
    },
    "result": {
      "image": "assets/lineups/sunset/b-lobby-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default du site B, devant la porte."
    },
    "notes": ""
  },
  {
    "id": "sunset-molly-plant-stairs-b-depuis-b-lobby",
    "map": "sunset",
    "title": "Molly plant stairs B depuis B Lobby",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 6,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 33.7,
      "y": 77.5
    },
    "impact": {
      "x": 9.1,
      "y": 43.4
    },
    "position": {
      "image": "assets/lineups/sunset/b-lobby-position.webp",
      "note": "À B Lobby, colle-toi dans le coin du mur de briques, entre les pots de fleurs et le muret, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/sunset/b-lobby-stairs-visee.webp",
      "note": "Place le crosshair sur le point rouge, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 40.6,
        "y": 89.3
      }
    },
    "result": {
      "image": "assets/lineups/sunset/b-lobby-stairs-resultat.webp",
      "note": "La molly tombe au pied des escaliers du site B."
    },
    "notes": ""
  },
  {
    "id": "sunset-molly-plant-default-a-depuis-a-elbow",
    "map": "sunset",
    "title": "Molly plant default A depuis A Elbow",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 8,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 94.9,
      "y": 40.8
    },
    "impact": {
      "x": 77.8,
      "y": 33.7
    },
    "position": {
      "image": "assets/lineups/sunset/a-elbow-position.webp",
      "note": "À A Elbow, colle-toi dans le coin entre le mur et la caisse grise, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/sunset/a-elbow-default-visee.webp",
      "note": "Place le crosshair sur le trait rouge, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 38.2,
        "y": 92.4
      }
    },
    "result": {
      "image": "assets/lineups/sunset/a-elbow-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default du site A, contre la caisse."
    },
    "notes": ""
  },
  {
    "id": "sunset-molly-plant-default-a-depuis-a-lobby",
    "map": "sunset",
    "title": "Molly plant default A depuis A Lobby",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 7,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 73.2,
      "y": 65.1
    },
    "impact": {
      "x": 77.8,
      "y": 33.7
    },
    "position": {
      "image": "assets/lineups/sunset/a-lobby-position.webp",
      "note": "À A Lobby, colle-toi contre la porte vitrée, sur le montant du milieu, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/sunset/a-lobby-default-visee.webp",
      "note": "Place le crosshair là où se rejoignent les traits rouges, au-dessus de l'icône de flamme, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 41.3,
        "y": 92.9
      }
    },
    "result": {
      "image": "assets/lineups/sunset/a-lobby-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default du site A, contre la caisse."
    },
    "notes": ""
  },
  {
    "id": "sunset-molly-plant-safe-a-depuis-a-elbow",
    "map": "sunset",
    "title": "Molly plant safe A depuis A Elbow",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 5,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 94.9,
      "y": 40.8
    },
    "impact": {
      "x": 84.8,
      "y": 40.4
    },
    "position": {
      "image": "assets/lineups/sunset/a-elbow-position.webp",
      "note": "À A Elbow, colle-toi dans le coin entre le mur et la caisse grise, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/sunset/a-elbow-safe-visee.webp",
      "note": "Place le crosshair juste sous le rebord du toit, contre le mur, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 42.9,
        "y": 44.3
      }
    },
    "result": {
      "image": "assets/lineups/sunset/a-elbow-safe-resultat.webp",
      "note": "La molly tombe sur le spot de plant safe du site A, à droite de la caisse."
    },
    "notes": ""
  },
  {
    "id": "sunset-molly-retake-safe-a-depuis-a-link",
    "map": "sunset",
    "title": "Molly retake safe A depuis A Link",
    "site": "A",
    "side": "defense",
    "throwType": "Lancer normal",
    "fuse": 3,
    "tags": [
      "Retake"
    ],
    "spot": {
      "x": 56.5,
      "y": 26.8
    },
    "impact": {
      "x": 85.5,
      "y": 41.5
    },
    "position": {
      "image": "assets/lineups/sunset/a-link-position.webp",
      "note": "À A Link, monte en haut des escaliers et colle-toi contre le mur de droite, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/sunset/a-link-safe-visee.webp",
      "note": "Aligne le point rouge du haut (au-dessus de la barre de la molly) sur le coin de la caisse, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 44.4,
        "y": 76.7
      }
    },
    "result": {
      "image": "assets/lineups/sunset/a-link-safe-resultat.webp",
      "note": "La molly tombe sur le spot safe du site A, dans le coin derrière la caisse."
    },
    "notes": ""
  },
  {
    "id": "sunset-molly-plant-open-a-depuis-a-elbow",
    "map": "sunset",
    "title": "Molly plant open A depuis A Elbow",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 5,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 96.5,
      "y": 52.2
    },
    "impact": {
      "x": 82.4,
      "y": 31.1
    },
    "position": {
      "image": "assets/lineups/sunset/a-elbow-bas-position.webp",
      "note": "En bas d'A Elbow, colle-toi dans le coin entre le grillage et la tôle ondulée, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/sunset/a-elbow-open-visee.webp",
      "note": "Place le crosshair sur le point rouge, au-dessus de l'icône de flamme, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 45.8,
        "y": 91.5
      }
    },
    "result": {
      "image": "assets/lineups/sunset/a-elbow-open-resultat.webp",
      "note": "La molly tombe sur le spot de plant open du site A, devant la caisse."
    },
    "notes": ""
  },
  {
    "id": "sunset-molly-plant-open-a-depuis-a-lobby",
    "map": "sunset",
    "title": "Molly plant open A depuis A Lobby",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 8,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 73.2,
      "y": 65.1
    },
    "impact": {
      "x": 82.4,
      "y": 31.1
    },
    "position": {
      "image": "assets/lineups/sunset/a-lobby-position.webp",
      "note": "À A Lobby, colle-toi contre la porte vitrée, sur le montant du milieu, comme sur la capture."
    },
    "aim": {
      "image": "assets/lineups/sunset/a-lobby-open-visee.webp",
      "note": "Place le crosshair sur le trait rouge, à gauche de la barre de compétences, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 28.0,
        "y": 91.9
      }
    },
    "result": {
      "image": "assets/lineups/sunset/a-lobby-open-resultat.webp",
      "note": "La molly tombe sur le spot de plant open du site A, devant la caisse."
    },
    "notes": ""
  },
  {
    "id": "lotus-molly-plant-default-a-depuis-a-link",
    "map": "lotus",
    "title": "Molly plant default A depuis A Link",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 1,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 66.6,
      "y": 47.0
    },
    "impact": {
      "x": 85.4,
      "y": 37.5
    },
    "position": {
      "image": "assets/lineups/lotus/a-link-default-carte.webp",
      "note": "Place-toi au bout d'A Link, comme indiqué sur la carte."
    },
    "aim": {
      "image": "assets/lineups/lotus/a-link-default-visee.webp",
      "note": "Place le crosshair sur le trait rouge, sur le coin du muret, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 54.8,
        "y": 48.7
      }
    },
    "result": {
      "image": "assets/lineups/lotus/a-link-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default du site A, autour de la caisse."
    },
    "notes": ""
  },
  {
    "id": "lotus-molly-plant-default-a-depuis-a-rubble",
    "map": "lotus",
    "title": "Molly plant default A depuis A Rubble",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 6,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 80.0,
      "y": 66.0
    },
    "impact": {
      "x": 85.4,
      "y": 37.5
    },
    "position": {
      "image": "assets/lineups/lotus/a-rubble-default-carte.webp",
      "note": "Place-toi à A Rubble, comme indiqué sur la carte."
    },
    "aim": {
      "image": "assets/lineups/lotus/a-rubble-default-visee.webp",
      "note": "Place le crosshair sur le trait rouge, en bas à droite de la barre de compétences, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 70.5,
        "y": 91.0
      }
    },
    "result": {
      "image": "assets/lineups/lotus/a-rubble-default-resultat.webp",
      "note": "La molly tombe sur le spot de plant default du site A, à côté de la caisse."
    },
    "notes": ""
  },
  {
    "id": "lotus-molly-plant-open-a-depuis-a-rubble",
    "map": "lotus",
    "title": "Molly plant open A depuis A Rubble",
    "site": "A",
    "side": "attack",
    "throwType": "Lancer normal",
    "fuse": 6,
    "tags": [
      "Post-plant"
    ],
    "spot": {
      "x": 80.0,
      "y": 65.9
    },
    "impact": {
      "x": 92.4,
      "y": 37.6
    },
    "position": {
      "image": "assets/lineups/lotus/a-rubble-open-carte.webp",
      "note": "Place-toi à A Rubble, comme indiqué sur la carte."
    },
    "aim": {
      "image": "assets/lineups/lotus/a-rubble-open-visee.webp",
      "note": "Place le crosshair sur le trait rouge, entre les deux dernières icônes de la barre de compétences, comme sur la capture, puis lancer normal.",
      "target": {
        "x": 59.3,
        "y": 92.3
      }
    },
    "result": {
      "image": "assets/lineups/lotus/a-rubble-open-resultat.webp",
      "note": "La molly tombe sur le spot de plant open du site A, contre le mur de droite."
    },
    "notes": ""
  }
];
