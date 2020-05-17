build_county_combo();
build_brands_combo("ALBA");

var button1 = "selectCountyButton";
var button2 = "selectBrandButton";
var theUrl = "http://localhost/api/masina/count_cars_county_brand.php?county=ALBA&brand=Toate";
console.log(theUrl);
var req = new XMLHttpRequest();
req.overrideMimeType("application/json");
req.open("GET", theUrl, true);
req.onload = function () {
  var jsonResponse = JSON.parse(req.responseText);
  var url = "http://localhost/api/masina/count_cars_county_brand.php?county=";
  buildAll(jsonResponse.records, button1, button2, url);
};

req.send();