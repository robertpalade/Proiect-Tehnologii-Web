function buildAll(data, button1, button2, theUrl) {
  // set the dimensions and margins of the graph
  var margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var tooltip = d3
    .select("body")
    .append("path")
    .attr("class", "tip")
    .style("opacity", 0);

  // append the svg object to the body of the page
  var svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("id", "svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  function mouseOutHandler(d, i) {
    tooltip.transition().duration(500).style("opacity", 0);
  }

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

  document.getElementById("submitButton").addEventListener("click", updateBar);

  function updateBar() {
    var county = document.getElementById(button1).value;
    if (button2 != "notAvailable")
      var valueTwo = document.getElementById(button2).value;
    auxUrl = theUrl;
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
      var jsonResponse = JSON.parse(req.responseText);
      console.log(jsonResponse.records);
      var data1 = jsonResponse.records;
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.year;
          })
        )
        .padding(0.2);
      var y = d3.scaleLinear().domain([0, 320000]).range([height, 0]);

      d3.selectAll(".bar")
        .data(data1)
        .transition()
        .duration(1000)
        .attr("x", function (d) {
          return x(d.year);
        })
        .attr("y", function (d) {
          return y(d.number_of_cars);
        })
        .attr("height", function (d) {
          return height - y(d.number_of_cars);
        });
    };
    req.send();
  }

  function buildBar(svg, data) {
    // X axis
    console.log(data);
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        data.map(function (d) {
          return d.year;
        })
      )
      .padding(0.2);

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(0,0)rotate(-30)")
      .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear().domain([0, 320000]).range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return x(d.year);
      })
      .attr("y", function (d) {
        return y(d.number_of_cars);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height - y(d.number_of_cars);
      })
      .attr("fill", "#69b3a2")
      .on("mouseover", function (d) {
        d3.select(this).transition().duration("100").attr("r", 7);
        var name = d.number_of_cars;
        tooltip.transition().duration(400).style("opacity", 1);
        tooltip
          .html(name)
          .style("left", x(d.year) + margin.left + "px")
          .style("top", y(d.number_of_cars) + margin.bottom + 20 + "px");
      })
      .on("mouseout", mouseOutHandler);
  }

  buildBar(svg, data);
}

document
  .getElementById("downloadSVGButton")
  .addEventListener("click", () =>
    saveSvg(document.getElementById("svg"), "image.svg")
  );

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
