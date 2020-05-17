build_years_combo();
build_com_combo("All");

var button1 = "selectYearButton";
var button2 = "selectCommunitaryButton";

var theUrl = "http://localhost/api/masina/count_cars_year_com_categ.php?year=2015&com_categ=Toate"; 
var req = new XMLHttpRequest();
req.overrideMimeType("application/json");
req.open("GET", theUrl, true);
req.onload = function () {
    var jsonResponse = JSON.parse(req.responseText);
    var url = "http://localhost/api/masina/count_cars_year_com_categ.php?year=";
    buildAll(jsonResponse.records, button1, button2,url);
};

req.send();