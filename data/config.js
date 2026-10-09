/*
 * Configuration du site — tu peux modifier ce fichier librement.
 */
window.VL_CONFIG = {
  // Agent dont on référence les lineups (nom anglais, utilisé pour récupérer
  // le portrait et l'icône de la capacité sur valorant-api.com).
  agent: 'Brimstone',

  // Capacité référencée : `en` est le nom anglais officiel (pour retrouver
  // l'icône), `bind` la touche par défaut.
  ability: { name: 'Incendiaire', en: 'Incendiary', bind: 'Q', color: '#ff4655' },

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

  tagSuggestions: ['Post-plant', 'Retake', 'Exécution', 'Anti-défuse', 'Clear de coin', 'Spawn', 'Rapide', 'Safe'],

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

  // Maps à masquer de l'accueil (nom anglais en minuscules, ex: 'abyss').
  hiddenMaps: [],

  // Remplacer les images d'une map par des fichiers locaux (utile hors ligne) :
  // ascent: { splash: 'assets/maps/ascent.jpg', minimap: 'assets/maps/ascent-minimap.png' },
  mapOverrides: {},

  // Utilisé uniquement si valorant-api.com est injoignable et qu'aucun cache n'existe.
  fallbackMaps: ['Abyss', 'Ascent', 'Bind', 'Breeze', 'Corrode', 'Fracture', 'Haven', 'Icebox', 'Lotus', 'Pearl', 'Split', 'Sunset'],
};
