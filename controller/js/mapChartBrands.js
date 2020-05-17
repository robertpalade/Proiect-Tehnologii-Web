build_years_combo();
build_brands_combo("All");

var button1 = "selectYearButton";
var button2 = "selectBrandButton";

var theUrl = "http://localhost/api/masina/count_cars_year_brand.php?year=2015&brand=Toate"; 
var req = new XMLHttpRequest();
req.overrideMimeType("application/json");
req.open("GET", theUrl, true);
req.onload = function () {
    var jsonResponse = JSON.parse(req.responseText);
    var url = "http://localhost/api/masina/count_cars_year_brand.php?year=";
    buildAll(jsonResponse.records, button1, button2,url);
};

req.send();