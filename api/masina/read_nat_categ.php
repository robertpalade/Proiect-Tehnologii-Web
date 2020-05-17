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

$masina = new Masina($db);
$id = 1;
$nat_cat_arr = array();
$nat_cat_arr["records"] = array();
$nat_cat_item = array(
    "id" => $id,
    "nat_categ" => "Toate"
);

array_push($nat_cat_arr["records"], $nat_cat_item);

$county = isset($_GET['county']) ? $_GET['county'] : die();
$stmt = $masina->nat_cat($county);
$num = $stmt->rowCount();

if ($num > 0) {
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
        if ($nat_categ != "") {
            $id++;
            $nat_cat_item = array(
                "id" => $id,
                "nat_categ" => $nat_categ
            );
            array_push($nat_cat_arr["records"], $nat_cat_item);
        }
    }

    // set response code - 200 OK
    http_response_code(200);

    // show products data in json format
    echo json_encode($nat_cat_arr);
} else {
    // set response code - 404 Not found
    http_response_code(404);

    // tell the user no products found
    echo json_encode(
        array("message" => "No products found.")
    );
}
