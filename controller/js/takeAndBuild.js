function takeAndBuild(button1, button2, url, buildCombo, stringToConcat) {
    build_county_combo();
    setTimeout(function () {
      element1 = document.getElementById(button1);
      county = element1.options.item(0).value;
      buildCombo(county, "All");
    }, 900);
    setTimeout(function () {
      element2 = document.getElementById(button2);
      valueTwo = element2.options.item(0).value;
      console.log(county);
      console.log(valueTwo);
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
    }, 1800);
  }