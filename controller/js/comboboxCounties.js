function build_county_combo() {
  var theUrl = "http://localhost/api/masina/read_counties.php";
  console.log(theUrl);
  var reqCounties = new XMLHttpRequest();
  reqCounties.overrideMimeType("application/json");
  reqCounties.open("GET", theUrl, true);
  reqCounties.onload = function () {
    var jsonResponseCounties = JSON.parse(reqCounties.responseText);
    combobox_counties(jsonResponseCounties.records);
  };
  reqCounties.send();

  function combobox_counties(data) {
    const selectCountyButton = document.getElementById("selectCountyButton");
    for (let i = 0; i < data.length; i++) {
      let option = document.createElement("option");
      option.text = data[i].county;
      option.value = data[i].county;
      selectCountyButton.add(option);
    }
  }
}
