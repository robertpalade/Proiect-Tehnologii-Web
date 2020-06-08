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

$stmt = $masina->counties();
$year = isset($_GET['year']) ? $_GET['year'] : die();
$nat_categ = isset($_GET['nat_categ']) ? $_GET['nat_categ'] : die();
// create array
$years_arr = array();
$years_arr["records"] = array();
$check_state = false;
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $cars_per_year_county = intval($masina->count_cars_county_nat_categ($year, $county, $nat_categ));
    if ($cars_per_year_county != 0) {
        $check_state = true;
    }
    $year_item = array(
        "year" =>  intval($year),
        "county" => $county,
        "number_of_cars" => $cars_per_year_county,
    );

    array_push($years_arr["records"], $year_item);
}

if ($check_state == true) {
    // set response code - 200 OK
    http_response_code(200);
    $years_arr["message"] = "Cars found successfully";
    // make it json format
    echo json_encode($years_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No car found"));
}
