var button1 = "selectYearButton";
var button2 = "selectBrandButton";
var url = "http://localhost/api/masina/count_cars_year_brand.php?year=";

takeAndBuildMap(button1, button2, url, build_brands_combo, "&brand=");
