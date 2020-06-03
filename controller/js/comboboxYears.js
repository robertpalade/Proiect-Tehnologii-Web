function buildYearCombo(button1, button2, url, buildCombo, stringToConcat) {
  var theUrl = "http://localhost/api/masina/read_years.php";
  console.log(theUrl);
  var reqYears = new XMLHttpRequest();
  reqYears.overrideMimeType("application/json");
  reqYears.open("GET", theUrl, true);
  reqYears.onload = function () {
    var jsonResponseYears = JSON.parse(reqYears.responseText);
    var data = jsonResponseYears.records;
    combobox_years(data);
    buildInitialChartCombo(
      button1,
      button2,
      url,
      buildCombo,
      "All",
      data[0].year,
      stringToConcat
    );
  };
  reqYears.send();
}
function combobox_years(data) {
  const selectYearButton = document.getElementById("selectYearButton");
  while (selectYearButton.firstChild) {
    selectYearButton.removeChild(selectYearButton.firstChild);
  }
  for (let i = 0; i < data.length; i++) {
    let option = document.createElement("option");
    option.text = data[i].year;
    option.value = data[i].year;
    selectYearButton.add(option);
  }
}
