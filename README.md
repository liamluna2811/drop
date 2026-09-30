# Terre de Pilates — boutique Shopify

Un thème Shopify sur mesure, chaleureux et sobre (crème, lin, sable, caramel, expresso), pour une boutique de Pilates.

## Contenu du dépôt

| Dossier / fichier | Rôle |
|---|---|
| `theme/` | Le thème Shopify (Online Store 2.0, 100 % personnalisable dans l'éditeur) |
| `terre-de-pilates-theme.zip` | Le même thème, prêt à importer dans Shopify |
| `catalogue/produits-pilates.csv` | 13 produits prêts à importer (accessoires, vêtements, programme) |
| `programme/programme-pilates-maison.pdf` | Le guide PDF du programme « 4 semaines à la maison » (8 pages) |
| `programme/programme-pilates-maison.html` | La source du PDF, à modifier si besoin |

## Ce que contient le thème

**Page d'accueil**
1. Bannière d'accueil avec image en arche
2. **Banderole défilante de produits** (boucle continue, pause au survol, vitesse réglable)
3. **Univers de la boutique** : *Accessoires* (tapis de sol, bandes élastiques, petits accessoires) et *Vêtements* (leggings, brassières, chaussettes antidérapantes)
4. Sélection d'accessoires
5. **Les bienfaits du Pilates** (6 cartes avec icônes)
6. Sélection de vêtements
7. Banderole de mots-clés (les 6 principes du Pilates)
8. **Le programme maison** (mise en avant avec prix et bouton d'achat)
9. **L'histoire du Pilates** (frise chronologique de Joseph Pilates)
10. Réassurance (livraison, retours, paiement, conseils)
11. Newsletter

**Page « Histoire & bienfaits »** (modèle `page.histoire`) : l'histoire complète, les 6 principes, 9 bienfaits, des conseils pour bien débuter, le programme et une FAQ.

**Fiche produit « programme »** (modèle `product.programme`) : contenu du programme, déroulé semaine par semaine, FAQ et matériel conseillé.

Et aussi : pages collection avec filtres et tri, panier avec barre « livraison offerte », recherche, blog, page 404, page mot de passe.

## Mise en ligne (15 minutes)

1. **Importer le thème** : Shopify admin → *Boutique en ligne* → *Thèmes* → *Ajouter un thème* → *Importer un fichier .zip* → `terre-de-pilates-theme.zip`.
2. **Importer les produits** : *Produits* → *Importer* → `catalogue/produits-pilates.csv`. Ils arrivent **en brouillon** : ajoutez vos photos, vérifiez prix et stocks, puis passez-les en « Actif ».
3. **Créer les collections** (*Produits* → *Collections* → *Créer*), en collections automatiques « Le tag du produit est égal à » :

   | Collection | Identifiant (handle) | Tag |
   |---|---|---|
   | Accessoires | `accessoires` | `accessoires` |
   | Tapis de sol | `tapis-de-sol` | `tapis-de-sol` |
   | Bandes élastiques | `bandes-elastiques` | `bandes-elastiques` |
   | Petits accessoires | `petits-accessoires` | `petits-accessoires` |
   | Vêtements | `vetements` | `vetements` |
   | Leggings | `leggings` | `leggings` |
   | Brassières | `brassieres` | `brassieres` |
   | Chaussettes antidérapantes | `chaussettes-antiderapantes` | `chaussettes-antiderapantes` |

   Avec ces identifiants, la page d'accueil se remplit toute seule.
4. **Créer la page Histoire** : *Boutique en ligne* → *Pages* → *Ajouter* → titre « Histoire & bienfaits », modèle **`page.histoire`**, et dans « Référencement » fixez l’URL à `histoire-et-bienfaits` (c’est le lien utilisé par la page d’accueil).
5. **Le programme** : ouvrez le produit « Programme Pilates à la maison », choisissez le modèle **`product.programme`**, puis joignez le PDF avec l'app gratuite **Digital Downloads** de Shopify. Dans l'éditeur de thème, choisissez ce produit dans la section « Programme maison ».
6. **Le menu** (*Boutique en ligne* → *Navigation* → *Menu principal*) : Accessoires (sous-menus Tapis / Bandes / Petits accessoires), Vêtements (Leggings / Brassières / Chaussettes), Programme maison, Histoire & bienfaits.
7. **Personnaliser** : logo, photos de la bannière et des univers, couleurs et polices dans *Paramètres du thème*.

## Vérifications

- Le thème passe `theme-check` (l'outil officiel de Shopify) sans aucune erreur.
- Les avis clients sont des emplacements vides à remplir avec de vrais avis. Il n'y a volontairement aucun faux témoignage.
