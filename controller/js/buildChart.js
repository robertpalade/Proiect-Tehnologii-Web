function buildChart(button1, button2, url, county, valueTwo, stringToConcat) {
  theUrl = url.concat(county);
  theUrl = theUrl.concat(stringToConcat);
  theUrl = theUrl.concat(valueTwo);
  console.log(theUrl);
  var req = new XMLHttpRequest();
  req.overrideMimeType("application/json");
  req.open("GET", theUrl, true);
  req.onload = function () {
    var jsonResponse = JSON.parse(req.responseText);
    buildAll(jsonResponse.records, button1, button2, url);
  };

  req.send();
}

function buildInitialChartCombo(
  button1,
  button2,
  url,
  buildCombo,
  county,
  year,
  stringToConcat
) {
  var theUrl;
  if (stringToConcat.includes("brand"))
    theUrl = "http://localhost/api/masina/read_brands.php";
  else if (stringToConcat.includes("com_categ"))
    theUrl = "http://localhost/api/masina/read_com_categ.php";
  else if (stringToConcat.includes("nat_categ"))
    theUrl = "http://localhost/api/masina/read_nat_categ.php";

  if (theUrl != null) {
    theUrl = theUrl.concat("?county=");
    theUrl = theUrl.concat(county);
    theUrl = theUrl.concat("&year=");
    theUrl = theUrl.concat(year);
    console.log(theUrl);
    var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open("GET", theUrl, true);
    req.onload = function () {
      var jsonResponse = JSON.parse(req.responseText);
      var data = jsonResponse.records;
      buildCombo(data);
      var valueTwo;
      if (stringToConcat.includes("brand")) valueTwo = data[0].brand;
      else if (stringToConcat.includes("com_categ"))
        valueTwo = data[0].com_categ;
      else if (stringToConcat.includes("nat_categ"))
        valueTwo = data[0].nat_categ;
      if (county != "All")
        buildChart(button1, button2, url, county, valueTwo, stringToConcat);
      else if (year != "All")
        buildChart(button1, button2, url, year, valueTwo, stringToConcat);
    };
    req.send();
  } else {
    var valueTwo = "";
    if (county != "All")
      buildChart(button1, button2, url, county, valueTwo, stringToConcat);
    else if (year != "All")
      buildChart(button1, button2, url, year, valueTwo, stringToConcat);
  }
}
