var dataForCsv;
function buildAll(data, button1, button2, theUrl) {
  // set the dimensions and margins of the graph
  var width = 700;
  height = 450;
  height = 450;
  margin = 10;
  // var margin = { top: 30, right: 30, bottom: 70, left: 60 };

  var tooltip2 = d3
    .select("body")
    .append("path")
    .attr("class", "tooltip2")
    .style("opacity", 0);

  default_width = 600;
  default_height = 500;
  default_ratio = default_width / default_height;

  // Determine current size, which determines vars
  function set_size() {
    current_width = window.innerWidth;
    current_height = window.innerHeight;
    current_ratio = current_width / current_height;
    // desktop
    if (current_ratio > default_ratio) {
      margin = 40;
      console.log("desktop");
      // mobile
    } else {
      margin = 100;
      console.log("mobile");
    }
    // Set new width and height based on graph dimensions
  }
  set_size();
  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin;

  // append the svg object to the div called 'my_dataviz'
  var svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("id", "svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 3 + "," + height / 2 + ")");
  // Create dummy data
  // this is the model data that will be changed to data from the database

  // set the color scale
  var color = d3
    .scaleOrdinal()
    .domain(data)
    .range(["red", "yellow", "orange", "brown", "pink"]);

  if (button2 != "notAvailable")
    document
      .getElementById(button1)
      .addEventListener("change", updateButton2Combo);

  function updateButton2Combo() {
    var county = document.getElementById(button1).value;
    if (button2 == "selectBrandButton") build_brands_combo(county, "All");
    else if (button2 == "selectCommunityButton") build_com_combo(county, "All");
    else if (button2 == "selectNationalButton") build_nat_combo(county, "All");
  }
  document.getElementById("submitButton").addEventListener("click", updatePie);

  function updatePie() {
    var parent = d3.select("#my_dataviz");
    parent.selectAll("svg").remove();

    var svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("id", "svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 3 + "," + height / 2 + ")");
    var county = document.getElementById(button1).value;
    if (button2 != "notAvailable")
      var valueTwo = document.getElementById(button2).value;
    var auxUrl = theUrl;
    auxUrl = auxUrl.concat(county);
    if (button2 == "selectBrandButton") {
      auxUrl = auxUrl.concat("&brand=");
      auxUrl = auxUrl.concat(valueTwo);
    } else if (button2 == "selectCommunityButton") {
      auxUrl = auxUrl.concat("&com_categ=");
      auxUrl = auxUrl.concat(valueTwo);
    } else if (button2 == "selectNationalButton") {
      auxUrl = auxUrl.concat("&nat_categ=");
      auxUrl = auxUrl.concat(valueTwo);
    }
    console.log(auxUrl);
    var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open("GET", auxUrl, true);
    req.onload = function () {
      jsonResponse = JSON.parse(req.responseText);
      buildPie(svg, jsonResponse.records);
      dataForCsv = jsonResponse.records;
    };
    req.send();
  }

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  function buildPie(svg, data) {
    // Compute the position of each group on the pie:
    function percentage(data, value) {
      console.log(data[0].number_of_cars);
      var sum = 0;
      for (i = 0; i < data.length; i++) sum = sum + data[i].number_of_cars;
      console.log(sum);
      var percent = (value * 100) / sum;
      percent = percent.toFixed(2);
      console.log(percent);
      return percent;
    }

    function mouseOverHandler(d, i) {
      console.log(data);
      var percent = percentage(data, d.value);
      tooltip2.transition().duration(400).style("opacity", 0.9);
      tooltip2
        .html("Nr of cars:" + d.value + "</br>" + "Percentage:" + percent)
        .style("left", d3.event.pageX + 20 + "px")
        .style("top", d3.event.pageY - 28 + "px");
    }

    function mouseOutHandler(d, i) {
      // d3.select(this).attr("fill", color(i))
      tooltip2.transition().duration(500).style("opacity", 0);
    }

    function mouseMoveHandler(d, i) {
      tooltip2
        .style("left", d3.event.pageX + 10 + "px")
        .style("top", d3.event.pageY + 10 + "px");
    }

    var pie = d3.pie().value(function (d) {
      return d.number_of_cars;
    });
    var data_ready = pie(data);
    console.log(data_ready[0].value);
    var slices = svg.selectAll("path").data(data_ready).enter().append("path");

    slices
      .transition()
      .delay(function (d, i) {
        return i * 100;
      })
      .duration(1000)
      .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
      .attr("fill", function (d) {
        return color(d.data.year);
      })
      .attr("class", function () {
        return "tooltip2";
      })
      .attr("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", 0.7);

    slices
      .on("mouseover", mouseOverHandler)
      .on("mouseout", mouseOutHandler)
      .on("mousemove", mouseMoveHandler);

    var size = 20;
    svg
      .selectAll("mydots")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", 220)
      .transition()
      .duration(1000)
      .attr("y", function (d, i) {
        return 100 + i * (size + 5);
      }) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("width", size)
      .attr("height", size)
      .style("fill", function (d) {
        return color(d.year);
      });

    // Add one dot in the legend for each name.
    svg
      .selectAll("mylabels")
      .data(data)
      .enter()
      .append("text")
      .attr("x", 220 + size * 1.2)
      .transition()
      .duration(1000)
      .attr("y", function (d, i) {
        return 100 + i * (size + 5) + size / 2;
      }) // 100 is where the first dot appears. 25 is the distance between dots
      .text(function (d) {
        return d.year;
      })
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle");
  }

  buildPie(svg, data);

  dataForCsv = data;
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
  document.body.removeChild(canvas);
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
