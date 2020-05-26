function takeAndBuild() {
  build_county_combo();
  setTimeout(function () {
    element1 = document.getElementById(button1);
    county = element1.options.item(0).value;
    var url = "http://localhost/api/masina/count_cars_county.php?county=";
    theUrl = url.concat(county);
    console.log(theUrl);
    var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open("GET", theUrl, true);
    req.onload = function () {
      var jsonResponse = JSON.parse(req.responseText);
      buildAll(jsonResponse.records, button1, button2, url);
    };

    req.send();
  }, 1800);
}

var button1 = "selectCountyButton";
var button2 = "notAvailable"
takeAndBuild();
