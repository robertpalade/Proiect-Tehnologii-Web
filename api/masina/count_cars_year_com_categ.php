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

$year = isset($_GET['year']) ? $_GET['year'] : die();
$com_categ = isset($_GET['com_categ']) ? $_GET['com_categ'] : die();
// create array
$years_arr = array();
$years_arr["records"] = array();
$check_state = true;
$stmt = $masina->counties();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    // extract row
    // this will make $row['name'] to
    // just $name only
    extract($row);
    $cars_per_year_county = intval($masina->count_cars_county_com_categ($year, $county_name, $com_categ));

    if ($cars_per_year_county != null) {

        $year_item = array(
            "county" => $county_name,
            "number_of_cars" => $cars_per_year_county,
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
}

        if($check_state == true)
        // make it json format
        echo json_encode($years_arr);
