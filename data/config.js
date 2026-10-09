/*
 * Configuration du site — tu peux modifier ce fichier librement.
 */
window.VL_CONFIG = {
  // Agent dont on référence les lineups (nom anglais, utilisé pour récupérer
  // le portrait et les icônes de capacités sur valorant-api.com).
  agent: 'Brimstone',

  // Capacités : `key` est la valeur stockée dans les lineups, `en` le nom
  // anglais officiel (pour retrouver l'icône), `bind` la touche par défaut.
  abilities: [
    { key: 'stim',       name: 'Balise stimulante', en: 'Stim Beacon',    bind: 'C', color: '#f5a524' },
    { key: 'incendiary', name: 'Incendiaire',       en: 'Incendiary',     bind: 'Q', color: '#ff4655' },
    { key: 'smoke',      name: 'Fumigène céleste',  en: 'Sky Smoke',      bind: 'E', color: '#8fb3d9' },
    { key: 'orbital',    name: 'Frappe orbitale',   en: 'Orbital Strike', bind: 'X', color: '#ffd84d' },
  ],

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

  difficulties: ['Facile', 'Moyen', 'Difficile'],

  tagSuggestions: ['Post-plant', 'Retake', 'Exécution', 'Anti-défuse', 'Clear de coin', 'Spawn', 'Rapide', 'Safe'],

  // Maps à masquer de l'accueil (nom anglais en minuscules, ex: 'abyss').
  hiddenMaps: [],

  // Remplacer les images d'une map par des fichiers locaux (utile hors ligne) :
  // ascent: { splash: 'assets/maps/ascent.jpg', minimap: 'assets/maps/ascent-minimap.png' },
  mapOverrides: {},

  // Utilisé uniquement si valorant-api.com est injoignable et qu'aucun cache n'existe.
  fallbackMaps: ['Abyss', 'Ascent', 'Bind', 'Breeze', 'Corrode', 'Fracture', 'Haven', 'Icebox', 'Lotus', 'Pearl', 'Split', 'Sunset'],
};
