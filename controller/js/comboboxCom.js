function build_com_combo(county, year) {
  var theUrl = "http://localhost/Proiect-Tehnologii-Web/api/masina/read_com_categ.php";
  theUrl = theUrl.concat("?county=");
  theUrl = theUrl.concat(county);
  theUrl = theUrl.concat("&year=");
  theUrl = theUrl.concat(year);
  console.log(theUrl);
  var reqCom = new XMLHttpRequest();
  reqCom.overrideMimeType("application/json");
  reqCom.open("GET", theUrl, true);
  reqCom.onload = function () {
    var jsonResponseCom = JSON.parse(reqCom.responseText);
    combobox_com(jsonResponseCom.records);
  };
  reqCom.send();
}
function combobox_com(data) {
  const selectCommunityButton = document.getElementById(
    "selectCommunityButton"
  );
  while (selectCommunityButton.firstChild) {
    selectCommunityButton.removeChild(selectCommunityButton.firstChild);
  }
  for (let i = 0; i < data.length; i++) {
    let option = document.createElement("option");
    option.text = data[i].com_categ;
    option.value = data[i].com_categ;
    selectCommunityButton.add(option);
  }
}
