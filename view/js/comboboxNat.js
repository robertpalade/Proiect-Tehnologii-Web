function build_nat_combo(county, year) {
  var theUrl = "../api/controller/read_nat_categ.php";
  theUrl = theUrl.concat("?county=");
  theUrl = theUrl.concat(county);
  theUrl = theUrl.concat("&year=");
  theUrl = theUrl.concat(year);
  var reqNat = new XMLHttpRequest();
  reqNat.overrideMimeType("application/json");
  reqNat.open("GET", theUrl, true);
  reqNat.onload = function () {
    var jsonResponseNat = JSON.parse(reqNat.responseText);
    combobox_nat(jsonResponseNat.records);
  };
  reqNat.send();
}
function combobox_nat(data) {
  const selectNationalButton = document.getElementById("selectNationalButton");
  while (selectNationalButton.firstChild) {
    selectNationalButton.removeChild(selectNationalButton.firstChild);
  }
  for (let i = 0; i < data.length; i++) {
    let option = document.createElement("option");
    option.text = data[i].nat_categ;
    option.value = data[i].nat_categ;
    selectNationalButton.add(option);
  }
}
