build_county_combo();
build_nat_combo("ALBA");

var button1 = "selectCountyButton";
var button2 = "selectNationalButton";
var theUrl = "http://localhost/api/masina/count_cars_county_nat.php?county=ALBA&nat_categ=Toate";
console.log(theUrl);
var req = new XMLHttpRequest();
req.overrideMimeType("application/json");
req.open("GET", theUrl, true);
req.onload = function () {
  var jsonResponse = JSON.parse(req.responseText);
  var url = "http://localhost/api/masina/count_cars_county_nat.php?nat_categ=";
  buildAll(jsonResponse.records, button1, button2, url);
};

req.send();