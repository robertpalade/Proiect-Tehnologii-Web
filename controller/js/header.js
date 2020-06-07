document.write(`
    <header>
        <div class="topnav">
            <a href="index.html"> Home </a>
            <div class="dropdown">
                <button class="dropbtn"> Pie Charts <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content charts-dropdown">
                    <div class="row">
                        <div class="menu-column">
                            <a href="pie-chart-cars-by-county-and-brand.html" id="CountyAndBrandPie"> Cars by county and brand </a>
                            <a href="pie-chart-cars-by-county-and-national-category.html" id="CountyAndNationalCategoryPie"> Cars by county and national
                                category </a>
                            <a href="pie-chart-cars-by-county-and-communitary-category.html" id="CountyAndCommunityCategoryPie"> Cars by county and
                                communitary category </a>
                            <a href="pie-chart-total-cars-by-county.html" id="totalByCountyPie"> Total cars by county </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dropdown">
                <button class="dropbtn"> Bar Charts <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content charts-dropdown">
                    <div class="row">
                        <div class="menu-column">
                            <a href="bar-chart-cars-by-county-and-brand.html" id="CountyAndBrandBar"> Cars by county and brand </a>
                            <a href="bar-chart-cars-by-county-and-national-category.html" id="CountyAndNationalCategoryBar"> Cars by county and national
                                category </a>
                            <a href="bar-chart-cars-by-county-and-communitary-category.html" id="CountyAndCommunitaryCategoryBar"> Cars by county and
                                communitary category </a>
                            <a href="bar-chart-total-cars-by-county.html" id="totalByCountyBar"> Total cars by county </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dropdown">
                <button class="dropbtn">
                    Line Charts <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content charts-dropdown">
                    <div class="row">
                        <div class="menu-column">
                            <a href="line-chart-cars-by-county-and-brand.html" id="CountyAndBrandLine"> Cars by county and brand </a>
                            <a href="line-chart-cars-by-county-and-national-category.html" id="CountyAndNationalCategoryLine"> Cars by county and
                                national category </a>
                            <a href="line-chart-cars-by-county-and-communitary-category.html" id="CountyAndCommunitaryCategoryLine"> Cars by county and
                                communitary category </a>
                            <a href="line-chart-total-cars-by-county.html" id="totalByCountyLine"> Total cars by county </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dropdown">
                <button class="dropbtn">
                    Map Charts <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content charts-dropdown">
                    <div class="row">
                        <div class="menu-column">
                            <a href="map-chart-cars-by-year-and-brand.html" id="YearAndBrandMap"> Cars by year and brand </a>
                            <a href="map-chart-cars-by-year-and-national-category.html" id="YearAndNationalCategoryMap"> Cars by year and national
                                category </a>
                            <a href="map-chart-cars-by-year-and-communitary-category.html" id="YearAndCommunityCategoryMap"> Cars by year and
                                communitary category </a>
                        </div>
                    </div>
                </div>
            </div>

            <a href="admin-page.html" id="admin-page">Admin Page</a>
            <!-- on click delete delete redirect -->
            <a href="Login.html" id="logout" class="logout">Log out</a>
        </div>
    </header>
`);

function toggleCharts() {
  let chartsToHide = JSON.parse(localStorage.getItem("chartsToHide"));
  console.log(chartsToHide);
  for (let chart in chartsToHide) {
    document.getElementById(chart).style.display =
      chartsToHide[chart] === true ? "block" : "none";
  }
}

function toggleAdmin() {
  let admin = JSON.parse(localStorage.getItem("admin"));
  document.getElementById("admin-page").style.display =
    admin === 1 ? "block" : "none";
}

toggleCharts();
toggleAdmin();
