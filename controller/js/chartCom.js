var button1 = "selectCountyButton";
var button2 = "selectCommunityButton";
var url = "http://localhost/api/masina/count_cars_county_com.php?county=";

takeAndBuild(button1, button2, url, build_com_combo, "&com_categ=");
