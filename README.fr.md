# Observable Universe — 1D · 2D · 3D

[English](README.md) · [Română](README.ro.md) · **Français** · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Version :** 1.2.0 · **Dernière mise à jour :** 2026-10-19

Langues de l'interface : **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

Page d'accueil qui présente et compare les trois versions (1D, 2D, 3D) de la visualisation de l'Univers observable.

**En ligne :** https://chiuta.github.io/Universul-Observabil/

![Capture d'écran](screenshot.png)

## De quoi s'agit-il

Ce fichier HTML est la page-hub de la série « Observable Universe » : il ne contient pas les visualisations elles-mêmes (il n'a qu'un petit calculateur cosmologique hors ligne), mais les présente, les compare et renvoie vers elles. Les trois versions, d'après la description de la page :

- 1D (v1.0, « Axe radial ») : 112 galaxies sur un seul axe, avec quatre modes d'axe (temps de regard en arrière, distance comobile, décalage vers le rouge z, facteur d'échelle) ; env. 160 Ko.
- 2D (v5.9, « Carte plane ») : 12 horizons cosmiques, zoom adaptatif, permalien avec état, quiz avec classement ; env. 550 Ko.
- 3D (v1.2, « Espace réel ») : coordonnées AD/Déc réelles, cosmologie ΛCDM, sélecteur de H₀ (Planck 67,4 contre SH0ES 73,0), WebGL avec Three.js r128 ; env. 1 Mo.

La page indique un catalogue mis à jour en mai 2026 et MoM-z14 (z = 14,44, confirmé spectroscopiquement par le JWST ; Naidu et al. 2025) comme record de distance **à la date du catalogue (mai 2026)** ; nous ne garantissons pas qu'il reste un record par la suite. Les chiffres ci-dessus sont ceux que déclare la page, non vérifiés ici.

## Fonctionnalités

- « À quelle distance, il y a combien de temps ? » : calculateur cosmologique hors ligne (z entre 0 et 20, H₀ = 67,4 Planck ou 73,0 SH0ES) qui donne le temps de regard en arrière, la distance comobile, l'âge de l'Univers à l'émission, le facteur d'échelle a = 1/(1+z), la distance de luminosité D_L = (1+z)·D_C et la distance de diamètre angulaire D_A = D_C/(1+z) (D_L et D_A découlent des définitions ; pour z = 1 : D_L = 22,19 Gal, D_A = 5,55 Gal) ; modèle ΛCDM plat avec Ωm = 0,315, rayonnement négligé (valeurs indicatives ; vérifié par rapport à une intégration indépendante, p. ex. z = 1 → 7,95 Ga et 3,40 Gpc pour H₀ = 67,4).
- Présentation des trois versions, avec des boutons « Lancer » et des liens vers les copies sur GitHub (« GitHub mirror »).
- Tableau comparatif par catégories (visualisation, cosmologie, UX et export, technique) pour 1D / 2D / 3D.
- Sélecteur de langue (RO, EN, FR, IT, ES, PT, DE, HU) dans le coin de la page.
- Liens Buy Me a Coffee.

## Mode d'emploi

1. Lisez la présentation et le tableau comparatif pour choisir une version.
2. Appuyez sur « 🔭 Lancer la 3D (recommandé) », « 🌐 Version 2D » ou « 📡 Version 1D » ; chacune s'ouvre dans un nouvel onglet sur alexio.tf.
3. Vous pouvez aussi utiliser les liens « GITHUB MIRRORS » 1D / 2D / 3D vers les copies sur chiuta.github.io.
4. Changez de langue avec le bouton EN / RO.

## Confidentialité et réseau

- Seule la langue choisie (`uo_lang`) est conservée dans `localStorage`.
- La page n'effectue aucune requête réseau automatique (pas de `fetch`, ni de scripts ou styles externes). Les liens mènent, au clic, vers alexio.tf, chiuta.github.io, Buy Me a Coffee et les sites partenaires affichés en pied de page (dont centrulstring.ro).
- Les versions lancées sont des applications distinctes, avec leur propre politique ; elles ne sont pas analysées ici.

## Exécution en local / hors ligne

Téléchargez `index.html` et ouvrez-le dans un navigateur : la page s'affiche sans internet, mais les boutons de lancement et les miroirs nécessitent une connexion, car ils renvoient vers des pages hébergées en ligne.

## Historique / Changelog

- 1.1.0 — 2026-10-14 : sauvegarde et étiquetage des données (fff-kit).

- 1.0.0 — 2026-10-12 : la version et la date de la dernière mise à jour sont affichées dans l'application
- Série 7 : le calculateur cosmologique fournit désormais aussi le facteur d'échelle, la distance de luminosité et la distance de diamètre angulaire (RO/EN) ; taille du fichier réduite de ~616 Ko à ~461 Ko par suppression de 8 déclarations @font-face inutilisées (Barlow 300/500/300 italique et JetBrains Mono 300), vérifiée par comparaison de captures et énumération des polices calculées ; sans perte de contenu.
- Ajout du calculateur cosmologique hors ligne ; suppression du débordement horizontal de 2 px (la ligne de séparation) ; les étiquettes flottantes décoratives de l'en-tête sont désormais du contenu généré (elles ne provoquent plus de fluctuations de contraste dans axe-core) ; CSP : `script-src` par empreinte SHA-256, sans `'unsafe-inline'`.
- Le nombre de galaxies est désormais cohérent : 1D et 2D = 112, 3D et catalogue total = 118 (auparavant, le tableau indiquait « 115+ » et l'en-tête 118).
- Ajout d'une note visible précisant que la page n'est qu'une présentation et que le lancement des versions nécessite internet.
- Le contenu principal se trouve dans `<main>`, les éléments décoratifs sont masqués aux lecteurs d'écran, le tableau comparatif et les onglets ne dépassent plus de l'écran à 360 px, et le contraste des étiquettes atténuées a été augmenté ; axe-core : 0 violation à 1280 et 360 px.
- Le record MoM-z14 (z = 14,44) reste formulé « à la date du catalogue (mai 2026) » ; dans la recherche du 11.10.2026, nous n'avons trouvé aucune confirmation spectroscopique ultérieure qui le dépasse, mais la formulation datée a été conservée volontairement. Sources vérifiées le 11.10.2026 : arXiv 2505.11263 (Naidu et al.).

## Licence

MIT — voir le fichier LICENSE

## Audit

Audit : 2026-10-10 ; série 3 : 2026-10-11 — affirmations périssables (« Record JWST 2026 ») reformulées « à la date du catalogue (mai 2026) » avec la source ; suppression de la mention du « DOI Zenodo » dans la description de la 3D (l'application 3D n'a pas de DOI).

## Auteur

Alexio — Alexandru-Ionuț Chiuță, contact : alexio@trom.tf. Le pied de page renvoie aussi vers le Centrul StrING.

## Résumé

Page d'accueil en un seul fichier pour la série « Observable Universe », qui présente et compare ses versions 1D, 2D et 3D (axe radial, carte plane, vue WebGL en espace réel) avec des liens de lancement et des miroirs GitHub, en 8 langues, ainsi qu'un petit calculateur cosmologique hors ligne (décalage vers le rouge, temps de regard en arrière et distance comobile). Elle ne conserve localement que le choix de la langue et n'effectue aucune requête réseau automatique ; les liens de lancement et de miroir ouvrent des pages externes.
