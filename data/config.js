/*
 * Configuration du site — tu peux modifier ce fichier librement.
 */
window.VL_CONFIG = {
  // Agent dont on référence les lineups (nom anglais, utilisé pour récupérer
  // le portrait et l'icône de la capacité sur valorant-api.com).
  agent: 'Brimstone',

  // Capacité référencée : `en` est le nom anglais officiel (pour retrouver
  // l'icône), `bind` la touche par défaut. `color` : lineups côté attaque,
  // `colorDefense` : lineups côté défense.
  ability: { name: 'Incendiaire', en: 'Incendiary', bind: 'Q', color: '#ff4655', colorDefense: '#3d9bff' },

  sides: { attack: 'Attaque', defense: 'Défense' },

  sites: ['A', 'B', 'C', 'Mid'],

  throwTypes: [
    'Lancer normal',
    'Lancer accroupi',
    'Saut + lancer',
    'Lancer au sommet du saut',
    'Course + saut + lancer',
    'Marche + lancer',
    'Clic droit (lancer court)',
  ],

  tagSuggestions: ['Post-plant', 'Retake', 'Anti-plant', 'Délogement', 'Exécution', 'Clear de coin', 'Spawn', 'Rapide', 'Safe'],

  // Orientation de base de chaque minimap, en degrés dans le sens horaire
  // (0, 90, 180 ou 270), pour avoir le spawn attaquant en bas.
  mapRotation: {
    abyss: 90,
    ascent: 90,
    corrode: 90,
    haven: 90,
    icebox: 270,
    split: 90,
  },

  // Point d'impact de la molly par défaut pour chaque site (en % de la
  // minimap). Affiché sur la petite carte des pages lineup quand la lineup
  // n'a pas son propre point d'impact.
  defaultImpacts: {
    abyss: { A: { x: 47.6, y: 13.8 } },
    ascent: { A: { x: 34.5, y: 18.9 }, B: { x: 28.7, y: 78.4 } },
    bind: { A: { x: 69.8, y: 35.4 }, B: { x: 28.3, y: 31.5 } },
    haven: { A: { x: 40.7, y: 16.8 }, C: { x: 41.2, y: 80.8 } },
  },

  // Maps à masquer de l'accueil (nom anglais en minuscules, ex: 'abyss').
  hiddenMaps: [],

  // Remplacer les images d'une map par des fichiers locaux (utile hors ligne) :
  // ascent: { splash: 'assets/maps/ascent.jpg', minimap: 'assets/maps/ascent-minimap.png' },
  mapOverrides: {},

  // Utilisé uniquement si valorant-api.com est injoignable et qu'aucun cache n'existe.
  fallbackMaps: ['Abyss', 'Ascent', 'Bind', 'Breeze', 'Corrode', 'Fracture', 'Haven', 'Icebox', 'Lotus', 'Pearl', 'Split', 'Sunset'],
};
