function build_county_combo(button1, button2, url, buildCombo, stringToConcat) {
  var theUrl = "http://localhost/Proiect-Tehnologii-Web/api/masina/read_counties.php";
  console.log(theUrl);
  var reqCounties = new XMLHttpRequest();
  reqCounties.overrideMimeType("application/json");
  reqCounties.open("GET", theUrl, true);
  reqCounties.onload = function () {
    var jsonResponseCounties = JSON.parse(reqCounties.responseText);
    var data = jsonResponseCounties.records;
    combobox_counties(data);
    buildInitialChartCombo(button1, button2, url, buildCombo, data[0].county, "All", stringToConcat);
  };
  reqCounties.send();
}
function combobox_counties(data) {
  const selectCountyButton = document.getElementById("selectCountyButton");
  for (let i = 0; i < data.length; i++) {
    let option = document.createElement("option");
    option.text = data[i].county;
    option.value = data[i].county;
    selectCountyButton.add(option);
  }
}
