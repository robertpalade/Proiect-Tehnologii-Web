function takeAndBuildMap(button1, button2, url, buildCombo, stringToConcat) {
    build_years_combo();
    var element1 = document.getElementById(button1);
    var year = element1.options.item(0).value;
    buildCombo("All", year);
    setTimeout(function () {
      var element2 = document.getElementById(button2);
      var valueTwo = element2.options.item(0).value;
      var theUrl = url.concat(year);
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
    }, 2000);
  }