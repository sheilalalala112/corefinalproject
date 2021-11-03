<?php
// require 'common.php';
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT a.gameid, a.refereeid, r.firstname, r.lastname, 
FROM assignment AS a, referee AS r, game AS g
WHERE a.refereeid = r.refereeid
AND a.gameid = g.gameid
AND a.refereestatus = "Assigned";';
$vars = [];


// if (isset($_GET['student'])) {
// //   // This is an example of a parameterized query
//   $sql = 'SELECT * FROM student WHERE studentid = ?';
//   $vars = [ $_GET['student'] ];
// }

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$assigned = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($assigned, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;