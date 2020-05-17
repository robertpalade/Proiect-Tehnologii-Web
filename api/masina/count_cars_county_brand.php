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

$year = 2015;
$county = isset($_GET['county']) ? $_GET['county'] : die();
$brand = isset($_GET['brand']) ? $_GET['brand'] : die();
// create array
$years_arr = array();
$years_arr["records"] = array();
$check_state = true;
for ($i = 1; $i <= 5; $i++) {
    $cars_per_year = intval($masina->count_cars_county_brand($year, $county, $brand));

    if ($cars_per_year != null) {

        $year_item = array(
            "year" =>  $year,
            "county" => $county,
            "number_of_cars" => $cars_per_year,
        );

        array_push($years_arr["records"], $year_item);

        // set response code - 200 OK
        http_response_code(200);
    } else {
        // set response code - 404 Not found
        http_response_code(404);
        $check_state = false;
        // tell the user product does not exist
        echo json_encode(array("message" => "Car does not exist."));
    }
    $year++;
}

        if($check_state == true)
        // make it json format
        echo json_encode($years_arr);
