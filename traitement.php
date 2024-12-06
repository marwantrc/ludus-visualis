<?php
header('Content-Type: application/json; charset=utf-8');

// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "consoles_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    die("La connexion a échoué : " . $conn->connect_error);
}

// Paramètres de tri
$column = isset($_GET['column']) ? $_GET['column'] : 'annee_sortie';
$order = isset($_GET['order']) ? $_GET['order'] : 'asc';
$generation = isset($_GET['generation']) ? intval($_GET['generation']) : '';
$decennie = isset($_GET['decennie']) ? intval($_GET['decennie']) : '';
$constructeur = isset($_GET['constructeur']) && $_GET['constructeur'] !== 'tous' ? $_GET['constructeur'] : '';
$type_console = isset($_GET['type_console']) && $_GET['type_console'] !== 'tous' ? $_GET['type_console'] : 'tous';

$conditions = [];

// Ajouter les conditions en fonction des paramètres
if ($generation !== 0) {
    $conditions[] = "generation = $generation";
}

if ($decennie !== 0) {
    $conditions[] = "annee_sortie >= $decennie AND annee_sortie < " . ($decennie + 10);
}

if ($constructeur !== '') {
    $conditions[] = "marque = '$constructeur'";
}

// Condition pour le type de console
if ($type_console !== 'tous') {
    if ($type_console === 'autre') {
        $conditions[] = "type_console NOT IN ('Console', 'Console portable', 'Console hybride')";
    } elseif ($type_console === 'salon') {
        $conditions[] = "type_console = 'Console'";
    } elseif ($type_console === 'portable') {
        $conditions[] = "type_console = 'Console portable'";
    } elseif ($type_console === 'hybride') {
        $conditions[] = "type_console = 'Console hybride'";
    }
}

// Si des conditions existent, on les assemble avec 'AND', sinon on ne met pas de condition WHERE
$whereClause = count($conditions) > 0 ? 'WHERE ' . implode(' AND ', $conditions) : '';

// Requête SQL pour récupérer les consoles
$sql = "SELECT nom, marque, generation, annee_sortie, type_console, description, image_url 
        FROM consoles 
        $whereClause
        ORDER BY $column $order";

$result = $conn->query($sql);



// Requête pour récupérer les constructeurs des consoles
$whereClauseConstructeurs = '';
if ($generation !== 0) {
    $whereClauseConstructeurs .= " AND generation = $generation";
}
if ($decennie !== 0) {
    $whereClauseConstructeurs .= " AND annee_sortie >= $decennie AND annee_sortie < " . ($decennie + 10);
}

$sql2 = "SELECT DISTINCT marque 
         FROM consoles
         WHERE 1 $whereClauseConstructeurs
         ORDER BY marque ASC";
         
$result2 = $conn->query($sql2);

// Préparer les consoles dans un array
$consoles = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $consoles[] = $row;
    }
}

// Préparer les marques/constructeurs dans un array
$constructeurs = [];
if ($result2->num_rows > 0) {
    while ($row = $result2->fetch_assoc()) {
        $constructeurs[] = $row['marque'];
    }
}

// Réponse JSON 
$response = [
    'typeconsole' => $type_console,
    'reponse' => $sql,
    'consoles' => $consoles,
    'constructeurs' => $constructeurs,
];

echo json_encode($response, JSON_PRETTY_PRINT);

$conn->close();
?>
