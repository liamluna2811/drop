# Thème Shopify « Canapé »

Thème Shopify sur mesure pour une boutique de canapés : **sobre, épuré et facile à utiliser**.
Fond blanc, tons sable et noir profond, peu d'effets, avec un parcours d'achat sans friction.
La page d'accueil est une **vitrine catalogue** : on voit les canapés dès l'arrivée sur le site.

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
| **Éditeur de thème > Vitrine catalogue** | La collection à afficher, les raccourcis (convertibles, d'angle…), le produit mis en avant, les encarts promo et leur position dans la grille |
| **Éditeur de thème > Bandeau d'offre** | Le texte de l'offre et la date de fin (`2026-11-30 23:59`). Le compte à rebours disparaît tout seul à la fin |
| **Éditeur de thème > En-tête** | Le lien « Besoin d'aide ? » (FAQ ou contact) et le menu affiché sous la barre de recherche |
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
- **Badges** : tag `nouveau` → badge « Nouveau » ; tout tag commençant par `badge:` crée un badge noir (ex. `badge:Livraison rapide`, `badge:Best-seller`, `badge:Convertible`). Le pourcentage de réduction s'affiche automatiquement à côté du prix barré.
- **Avis (étoiles)** : ils s'affichent automatiquement sur les cartes si vous utilisez une application d'avis compatible (Shopify Product Reviews, Judge.me…).

## 4. Pages incluses

| Page | Contenu |
|---|---|
| Accueil | Bandeau d'offre avec compte à rebours, vitrine catalogue (grand titre, raccourcis catégories, filtres, choix d'affichage 1/2 ou 3/4 colonnes, modèle mis en avant en grand format, encarts promo dans la grille), réassurance, avis, savoir-faire, FAQ, newsletter. La bannière photo, la liste de catégories et les produits mis en avant restent disponibles dans « Ajouter une section » |
| Fiche produit | Galerie avec miniatures, pastilles de couleur, tailles, disponibilité, ajout au panier sans rechargement, paiement en 4x (Shop Pay), avantages, onglets Description / Dimensions / Matières / Livraison, produits similaires |
| Collection | Raccourcis vers les sous-catégories, filtres dans un panneau latéral, tri, choix d'affichage, pagination |
| Panier | Panier coulissant + page panier, barre « livraison offerte », note de livraison (étage, digicode…) |
| Autres | Recherche, contact (modèle `page.contact`), blog, article, 404, page « bientôt ouvert », carte cadeau |

Toutes les sections se modifient, se déplacent ou se masquent depuis l'éditeur de thème, sans toucher au code.

## 5. Choix de design

- **Couleurs** : fond blanc, sable `#F4F1EC` (raccourcis, encarts), noir profond `#1A1816`, beige `#EFE4D6` (badge « Nouveau »), brique `#A4442E` (promos). Toutes les combinaisons respectent le contraste AA (WCAG), et chaque couleur se change dans **Paramètres du thème > Couleurs**.
- **Typographie** : *Jost* (titres en semi-gras, noms de modèles en majuscules), servie par Shopify (pas de Google Fonts, donc pas de souci RGPD). Modifiable dans **Paramètres du thème > Typographie**.
- **Inspiration** : la page d'accueil reprend le *principe* d'une page catalogue de grande enseigne de canapés (catalogue visible tout de suite, raccourcis, cartes détaillées), avec un style, des textes et un code entièrement originaux.
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
