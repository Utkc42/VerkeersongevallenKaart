<?php
require './../dbConnection.php';

$geojsonString = file_get_contents('./../gemeentes.geojson');
$geojson = json_decode($geojsonString, true);

foreach ($geojson['features'] as $feature) {
    $properties = $feature['properties'];
    $geometry = $feature['geometry'];

    $stmt = $pdo->prepare("INSERT INTO municipalities_geojson (nisCode, nameDutch, nameFrench, geoJSON) VALUES (?, ?, ?, ?)");
    $stmt->execute([
        $properties['niscode'],
        $properties['namedut'],
        $properties['namefre'],
        json_encode($geometry)
    ]);
}

echo "GeoJSON data is succesvol toegevoegd aan de database.";
?>