# Thème Shopify « Canapé »

Thème Shopify sur mesure pour une boutique de canapés : **sobre, épuré et facile à utiliser**.
Tons neutres et chauds, beaucoup d'espace, peu d'effets, avec un parcours d'achat sans friction.

- `theme/` : le thème Shopify (Online Store 2.0, 100 % personnalisable dans l'éditeur Shopify)
- `dist/theme-canape.zip` : le même thème, prêt à être importé dans Shopify
- `preview/` : un aperçu statique (`index.html` pour l'accueil, `produit.html` pour une fiche produit) à ouvrir dans un navigateur

> Le thème n'a été installé sur **aucune** boutique. C'est vous qui choisissez où et quand l'importer.

---

## 1. Installer le thème

1. Dans Shopify, ouvrez **Boutique en ligne > Thèmes**.
2. Dans la *Bibliothèque de thèmes*, cliquez sur **Ajouter un thème > Importer un fichier zip**.
3. Choisissez `dist/theme-canape.zip`.
4. Cliquez sur **Personnaliser** pour le régler. Il ne sera visible par vos clients qu'une fois **publié**.

## 2. Ce qu'il faut configurer (environ 30 minutes)

| Où | Quoi |
|---|---|
| **Paramètres > Général** | Le nom de la boutique (il s'affiche en logo tant que vous n'avez pas de logo image) |
| **Contenu > Menus** | `main-menu` : Canapés droits, Canapés d'angle, Convertibles, Fauteuils, Échantillons · `footer` : Livraison, Retours, FAQ, Contact, CGV |
| **Produits > Collections** | Une collection par catégorie, à relier aux blocs « Liste de catégories » de l'accueil |
| **Éditeur de thème > Bannière principale** | Votre plus belle photo de canapé en situation (paysage, 2400 px minimum) |
| **Éditeur de thème > Avis clients** | Remplacez les textes d'exemple par de **vrais** avis |
| **Paramètres du thème > Panier** | Le seuil de livraison offerte (500 € par défaut). Réglez le même dans **Paramètres > Expédition** |
| **Paramètres > Politiques** | CGV, retours, confidentialité, mentions légales (obligatoires en France) |
| **Applications > Search & Discovery** | Les filtres de collection : couleur, tissu, nombre de places, prix |

## 3. Bien remplir une fiche produit de canapé

- **Options** : `Coloris` (ou `Tissu`) et `Taille` (2 places, 3 places, angle gauche/droit…).
  Pour afficher des **pastilles de couleur**, ajoutez une pastille (couleur ou photo du tissu) à chaque valeur d'option dans Shopify.
- **Photos** : au format paysage 4:3, sur fond neutre, avec au moins une photo en situation. Associez une photo à chaque variante de couleur : elle s'affichera automatiquement quand le client choisira cette couleur.
- **Dimensions** : créez ces métachamps produit (**Paramètres > Données personnalisées > Produits**), de type « Texte sur une seule ligne » :

  | Nom | Clé |
  |---|---|
  | Largeur | `custom.largeur` |
  | Profondeur | `custom.profondeur` |
  | Hauteur | `custom.hauteur` |
  | Hauteur d'assise | `custom.hauteur_assise` |
  | Profondeur d'assise | `custom.profondeur_assise` |
  | Sous-titre (ex. « Velours côtelé · Déhoussable ») | `custom.sous_titre` |

  Exemple de valeur : `214 cm`. L'onglet « Dimensions » apparaît automatiquement sur la fiche produit.
- **Badge « Nouveau »** : ajoutez le tag `nouveau` au produit.

## 4. Pages incluses

| Page | Contenu |
|---|---|
| Accueil | Bannière, réassurance (livraison, retours, garantie, paiement en plusieurs fois), catégories, best-sellers, savoir-faire, avis, FAQ, newsletter |
| Fiche produit | Galerie avec miniatures, pastilles de couleur, tailles, disponibilité, ajout au panier sans rechargement, paiement en 4x (Shop Pay), avantages, onglets Description / Dimensions / Matières / Livraison, produits similaires |
| Collection | Filtres dans un panneau latéral, tri, pagination |
| Panier | Panier coulissant + page panier, barre « livraison offerte », note de livraison (étage, digicode…) |
| Autres | Recherche, contact (modèle `page.contact`), blog, article, 404, page « bientôt ouvert », carte cadeau |

Toutes les sections se modifient, se déplacent ou se masquent depuis l'éditeur de thème, sans toucher au code.

## 5. Choix de design

- **Couleurs** : fond crème `#FAF8F5`, sable `#F1ECE5`, texte brun-noir `#1F1C19`, accent caramel `#8A6A4F`. Toutes les combinaisons respectent le contraste AA (WCAG), et chaque couleur se change dans **Paramètres du thème > Couleurs**.
- **Typographie** : *Jost*, servie par Shopify (pas de Google Fonts, donc pas de souci RGPD). Modifiable dans **Paramètres du thème > Typographie**.
- **Accessibilité** : navigation complète au clavier, lien « Aller au contenu », zones cliquables de 44 px minimum, prise en compte de « réduire les animations ».
- **Performance** : aucune librairie externe, JavaScript léger, images responsives chargées à la demande.

## Développement

```bash
# Vérification du code (Theme Check)
npx @shopify/cli theme check --path theme

# Prévisualisation sur une boutique de développement
npx @shopify/cli theme dev --path theme --store votre-boutique.myshopify.com

# Regénérer le zip
cd theme && zip -r ../dist/theme-canape.zip . -x '.*'
```
