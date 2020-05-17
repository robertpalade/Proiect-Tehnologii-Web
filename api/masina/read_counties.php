<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once '../config/database.php';
include_once '../objects/masina.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$masina = new Masina($db);

$id = 0;
$counties_arr = array();
$counties_arr["records"] = array();
/*$county_item = array(
    "id" => $id,
    "county" => "Toate"
);

array_push($counties_arr["records"], $county_item);*/

$stmt = $masina->counties();
$num = $stmt->rowCount();

if($num>0){
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    // extract row
    // this will make $row['name'] to
    // just $name only
    extract($row);
    $id++;
    $county_item=array(
        "id" => $id,
        "county" => $county_name
    );
    array_push($counties_arr["records"], $county_item);
}

// set response code - 200 OK
http_response_code(200);

// show products data in json format
echo json_encode($counties_arr);
}
else
{
        // set response code - 404 Not found
        http_response_code(404);
      
        // tell the user no products found
        echo json_encode(
            array("message" => "No products found.")
        );
}