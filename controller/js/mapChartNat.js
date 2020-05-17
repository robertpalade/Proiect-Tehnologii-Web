build_years_combo();
build_nat_combo("All");

var button1 = "selectYearButton";
var button2 = "selectNationalButton";

var theUrl = "http://localhost/api/masina/count_cars_year_nat_categ.php?year=2015&nat_categ=Toate"; 
var req = new XMLHttpRequest();
req.overrideMimeType("application/json");
req.open("GET", theUrl, true);
req.onload = function () {
    var jsonResponse = JSON.parse(req.responseText);
    var url = "http://localhost/api/masina/count_cars_year_nat_categ.php?year=";
    buildAll(jsonResponse.records, button1, button2,url);
};

req.send();