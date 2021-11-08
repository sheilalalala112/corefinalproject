<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT 
  firstname,
  field,
  gamedate, 
  refereestatus
FROM referee, game, assignment
WHERE referee.refereeid = assignment.refereeid and game.gameid = assignment.gameid
GROUP BY firstname';
$vars = [];
//code copied from https://www.geeksforgeeks.org/joining-three-tables-sql/

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$assignments = $stmt->fetchAll();


if (isset($_GET['format']) && $_GET['format']=='csv') {
  header('Content-Type: text/csv');
  echo "firstname,field,gamedate,refereestatus\r\n";

  foreach($assignments as $a) {
    echo "\"".$a['firstname'] . "\","
        .$a['field'] . ","
        .$a['gamedate'] . ","
        .$a['refereestatus'] . "\r\n";
  }

} else {
  // Step 3: Convert to JSON
  $json = json_encode($assignments, JSON_PRETTY_PRINT);

  // Step 4: Output
  header('Content-Type: application/json');
  echo $json;
}