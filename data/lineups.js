/*
 * Base de données des lineups.
 *
 * Le plus simple : utilise le « Mode édition » sur la page d'une map, puis
 * « Exporter » et remplace ce fichier par celui téléchargé.
 *
 * Format d'une lineup :
 * {
 *   "id": "ascent-incendiary-a-default-k3f9",   // unique, généré automatiquement
 *   "map": "ascent",                             // nom anglais de la map en minuscules
 *   "title": "Molly default A",
 *   "ability": "incendiary",                     // stim | incendiary | smoke | orbital
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
 *
 * Les deux lineups ci-dessous sont des EXEMPLES pour visualiser le rendu :
 * supprime-les quand tu ajoutes les tiennes.
 */
window.LINEUPS = [
  {
    "id": "exemple-ascent-molly-a",
    "map": "ascent",
    "title": "EXEMPLE — Molly default A",
    "ability": "incendiary",
    "site": "A",
    "side": "attack",
    "throwType": "Saut + lancer",
    "difficulty": 1,
    "tags": ["Post-plant", "Exemple"],
    "from": { "x": 30, "y": 62 },
    "to": { "x": 22, "y": 30 },
    "position": { "image": "", "note": "Exemple : colle-toi dans le coin du mur à gauche en sortant du lobby A." },
    "aim": { "image": "", "note": "Exemple : place ton viseur sur l'angle du toit, au-dessus de la fenêtre." },
    "result": { "image": "", "note": "Exemple : la molly tombe sur le spot de plant par défaut." },
    "notes": "Ceci est une lineup d'exemple, les infos ne sont pas réelles."
  },
  {
    "id": "exemple-ascent-stim-b",
    "map": "ascent",
    "title": "EXEMPLE — Stim pour l'exécution B",
    "ability": "stim",
    "site": "B",
    "side": "attack",
    "throwType": "Lancer normal",
    "difficulty": 0,
    "tags": ["Exécution", "Exemple"],
    "from": { "x": 72, "y": 70 },
    "to": { "x": 74, "y": 52 },
    "position": { "image": "", "note": "" },
    "aim": { "image": "", "note": "" },
    "result": { "image": "", "note": "" },
    "notes": "Ceci est une lineup d'exemple."
  }
];
