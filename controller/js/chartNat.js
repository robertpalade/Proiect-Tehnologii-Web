var button1 = "selectCountyButton";
var button2 = "selectNationalButton";
var url = "http://localhost/api/masina/count_cars_county_nat.php?county=";

takeAndBuild(button1, button2, url, build_nat_combo, "&nat_categ=");
