var button1 = "selectYearButton";
var button2 = "selectNationalButton";
var url = "http://localhost/api/masina/count_cars_year_nat.php?year=";

takeAndBuildMap(button1, button2, url, build_nat_combo, "&nat_categ=" );
