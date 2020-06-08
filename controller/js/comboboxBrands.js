function build_brands_combo(county, year) {
  var theUrl = "../api/masina/read_brands.php";
  theUrl = theUrl.concat("?county=");
  theUrl = theUrl.concat(county);
  theUrl = theUrl.concat("&year=");
  theUrl = theUrl.concat(year);
  console.log(theUrl);
  var reqBrands = new XMLHttpRequest();
  reqBrands.overrideMimeType("application/json");
  reqBrands.open("GET", theUrl, true);
  reqBrands.onload = function () {
    var jsonResponseBrands = JSON.parse(reqBrands.responseText);
    combobox_brands(jsonResponseBrands.records);
  };

  reqBrands.send();
}
function combobox_brands(data) {
  const selectBrandButton = document.getElementById("selectBrandButton");
  while (selectBrandButton.firstChild) {
    selectBrandButton.removeChild(selectBrandButton.firstChild);
  }
  for (let i = 0; i < data.length; i++) {
    let option = document.createElement("option");
    option.text = data[i].brand;
    option.value = data[i].brand;
    selectBrandButton.add(option);
  }
}
