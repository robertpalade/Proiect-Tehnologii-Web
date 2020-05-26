var button1 = "selectCountyButton";
var button2 = "selectBrandButton";
var url ="http://localhost/api/masina/count_cars_county_brand.php?county=";

takeAndBuild(button1, button2, url, build_brands_combo, "&brand=");
