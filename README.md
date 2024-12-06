<h1>Ludus Visualis</h1>

<p>Lien du site : https://marwan.zalagh.mmi-velizy.fr/ludus_visualis</p>

<h2>Ludus Visualis est une liste de toutes les consoles de jeu produites en masse
depuis la Magnavox Odyssey, sortie en 1972, jusqu’à la Playstation 5 Pro,
sortie il y a quelques semaines.</h2>

<p>Il est possible de filtrer la liste en fonction de l’époque, la génération de
console, le type de console, ainsi que le constructeur de la machine. On peut
ensuite trier par nom, ou date de sortie, dans l’ordre croissant ou décroissant.
Le site fonctionne en quatre couches : </p>

• <strong>Base de données </strong>: La base de données, appelée consoles_db, contient
une table unique nommée consoles. Cette table regroupe toutes les
informations liées aux consoles, notamment l’identifiant, le nom, la marque,
la génération, le type, l’année de sortie, une description (si disponible), et
un lien URL vers l’image associée. La majorité des données a été collectée
depuis la liste des consoles de jeu disponible sur Wikipédia. Les images
ont été récupérées manuellement, organisées dans un fichier Excel, puis
exportées en format .csv avant d’être importées dans phpMyAdmin

• <strong>Traitement des requêtes </strong>: Un fichier PHP se charge d’exécuter des
requêtes SQL de type SELECT vers la base de données. Ces requêtes
sont dynamiques et conditionnées par les critères de filtrage traités dans
le code PHP. Les résultats des requêtes sont ensuite formatés dans un
tableau (array), encodés en JSON, et envoyés à un fichier JavaScript.

• <strong>Système de filtrage </strong>: Un script JavaScript gère le filtrage des consoles et
met à jour dynamiquement l’affichage grâce à l’API Fetch. Ce mécanisme
permet de récupérer et d’afficher les données de façon asynchrone. Il n’y a
aucun rechargement de page.

• <strong>Interface utilisateur </strong>: Enfin, un fichier HTML structure le site et sert de point
d’entrée pour l’utilisateur. Il intègre le script JavaScript, ainsi qu’une légère
feuille de style CSS. L’esthétique du site s’inspire du style suisse, en restant
aussi épuré que possible.
