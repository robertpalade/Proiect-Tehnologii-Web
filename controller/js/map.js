var dataForCsv;
function buildAll(data, button1, button2, theUrl) {
  var margin = {
    top: 20,
    right: 30,
    bottom: 30,
    left: 30,
  };

  //   //making graph responsive
  default_width = 750;
  default_height = 600;
  default_ratio = default_width / default_height;
  // Determine current size, which determines vars
  function set_size() {
    current_width = window.innerWidth;
    current_height = window.innerHeight;
    current_ratio = current_width / current_height;
    // desktop

    h = default_height;
    w = default_width;
    // mobile

    // Set new width and height based on graph dimensions
    width = w - margin.left - margin.right;
    height = h - margin.top - margin.bottom;
  }
  set_size();
  //end responsive graph code
  var tooltip = d3
    .select("body")
    .append("path")
    .attr("class", "tooltip")
    .style("opacity", 0);
  // this is the model data that will be changed to data from the database

  function getNumber(d, id) {
    return d[id].number_of_cars;
  }

  function mouseOverHandler(d, i) {
    var quantity = getNumber(data, d.properties.ID_1 - 1);
    var name = d.properties.VARNAME_1 + "</br>" + quantity;
    // var name = d.properties.VARNAME_1+ "</br>"  + d.properties.ID_1;
    tooltip.transition().duration(400).style("opacity", 0.9);
    tooltip
      .html(name)
      .style("left", d3.event.pageX + 20 + "px")
      .style("top", d3.event.pageY - 28 + "px");
  }

  function mouseOutHandler(d, i) {
    tooltip.transition().duration(500).style("opacity", 0);
  }

  function mouseMoveHandler(d, i) {
    tooltip
      .style("left", d3.event.pageX + 10 + "px")
      .style("top", d3.event.pageY + 10 + "px");
  }

  const svg = d3
    .select("#map_container")
    .append("svg")
    .attr("id", "svg")
    .attr("width", width)
    .attr("height", height);

  const projection = d3
    .geoMercator()
    .center([23, 46])
    .scale(4000)
    .translate([width / 2 - width / 5, height / 2]);

  // --------------- Step 3 ---------------
  // Prepare SVG path and color, import the
  // effect from above projection.
  const path = d3.geoPath().projection(projection);
  var first_domain = domainSplit(data);
  var colorScale = d3
    .scaleThreshold()
    .domain(first_domain)
    .range(d3.schemeBlues[9]);

  renderMap(romania);

  function renderMap(root) {
    // Draw districts and register event listeners
    svg
      .selectAll("path")
      .data(topojson.feature(root, root.objects.ROU_adm1).features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", function (d) {
        return colorScale(data[d.properties.ID_1 - 1].number_of_cars);
      })
      .attr("stroke", "#FFF")
      .attr("stroke-width", 0.5)
      .attr("class", function () {
        return "tooltip";
      })
      .attr("name", function (d) {
        return d.properties.VARNAME_1;
      })
      .attr("id", function (d) {
        return d.properties.ID_1;
      })
      .on("mouseover", mouseOverHandler)
      .on("mouseout", mouseOutHandler)
      .on("mousemove", mouseMoveHandler);

    dataForCsv = data;
  }

  document
    .getElementById(button1)
    .addEventListener("change", updateButton2Combo);

  function updateButton2Combo() {
    var year = document.getElementById(button1).value;
    if (button2 == "selectBrandButton") build_brands_combo("All", year);
    else if (button2 == "selectCommunityButton") build_com_combo("All", year);
    else if (button2 == "selectNationalButton") build_nat_combo("All", year);
  }

  document.getElementById("submitButton").addEventListener("click", updateMap);

  function updateMap() {
    var year = document.getElementById(button1).value;
    var valueTwo = document.getElementById(button2).value;
    auxUrl = theUrl;
    auxUrl = auxUrl.concat(year);
    if (button2 == "selectBrandButton") auxUrl = auxUrl.concat("&brand=");
    else if (button2 == "selectCommunityButton")
      auxUrl = auxUrl.concat("&com_categ=");
    else if (button2 == "selectNationalButton")
      auxUrl = auxUrl.concat("&nat_categ=");
    auxUrl = auxUrl.concat(valueTwo);
    console.log(auxUrl);
    var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open("GET", auxUrl, true);
    req.onload = function () {
      var jsonResponse = JSON.parse(req.responseText);
      dataForCsv = jsonResponse.records;
      var data1 = jsonResponse.records;
      console.log(data1);
      var new_domain = domainSplit(data1);
      var colorScale = d3
        .scaleThreshold()
        .domain(new_domain)
        .range(d3.schemeBlues[9]);
      var paths = svg.selectAll("path");
      paths.on("mouseover", function (d, i) {
        var quantity = getNumber(data1, d.properties.ID_1 - 1);
        var name = d.properties.VARNAME_1 + "</br>" + quantity;
        // var name = d.properties.VARNAME_1+ "</br>"  + d.properties.ID_1;
        tooltip.transition().duration(400).style("opacity", 0.9);
        tooltip
          .html(name)
          .style("left", d3.event.pageX + 20 + "px")
          .style("top", d3.event.pageY - 28 + "px");
      });
      paths
        .transition()
        .duration(750)
        .attr("fill", function (d) {
          return colorScale(data1[d.properties.ID_1 - 1].number_of_cars);
        });
    };

    req.send();
    console.log("Am iesit din updateMap");
  }

  document
    .getElementById("downloadSVGButton")
    .addEventListener("click", () =>
      saveSvg(document.getElementById("svg"), "image.svg")
    );

  document
    .getElementById("csvDownloadButton")
    .addEventListener("click", () => saveCsv(dataForCsv));

  function saveSvg(svgEl, name) {
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  document
    .getElementById("webpDownloadButton")
    .addEventListener("click", () => saveWebp());

  function saveWebp() {
    // the canvg call that takes the svg xml and converts it to a canvas
    var svgData = document.getElementById("svg").outerHTML;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "svg-canvas");
    canvg(canvas, svgData);

    // the canvas calls to output a png
    var img = canvas.toDataURL("image/webp");
    // do what you want with the base64, write to screen, post to server, etc...

    var downloadLink = document.createElement("a");
    downloadLink.href = img;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  function saveCsv(data) {
    var csvContent = "data:text/csv;charset=utf-8,";

    csvContent += data
      .map((it) => {
        return Object.values(it).toString();
      })
      .join("\n");

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".
  }
}
