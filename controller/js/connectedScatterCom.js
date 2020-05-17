build_county_combo();
build_com_combo("ALBA");

var button1 = "selectCountyButton";
var button2 = "selectCommunityButton";
var theUrl = "http://localhost/api/masina/count_cars_county_com.php?county=ALBA&com_categ=Toate";
console.log(theUrl);
var req = new XMLHttpRequest();
req.overrideMimeType("application/json");
req.open("GET", theUrl, true);
req.onload = function () {
  var jsonResponse = JSON.parse(req.responseText);
  var url = "http://localhost/api/masina/count_cars_county_com.php?county="
  buildAll(jsonResponse.records, button1, button2,url);
};

req.send();