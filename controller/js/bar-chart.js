var dataForCsv;
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
      h = default_height;
      w = default_width;
      console.log("desktop");
      // mobile
    } else {
      margin.left = 40;
      w = current_width - 40;
      h = w / default_ratio;
      console.log("mobile");
    }
    // Set new width and height based on graph dimensions
    width = w - margin.left - margin.right;
    console.log(width);
    height = h - margin.top - margin.bottom;
    console.log(height);
  }
  set_size();
  // append the svg object to the body of the page
  var svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("id", "svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var g = svg.append("g");

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
      dataForCsv = jsonResponse.records;
      var data1 = jsonResponse.records;

      var minValue = customMinimize(d3.min(data1, (d) => d.number_of_cars));
      var maxValue = customRound(d3.max(data1, (d) => d.number_of_cars));
      var countTicks = height / 50;
      var y = d3.scaleLinear().domain([minValue, maxValue]).range([height, 0]);

      // Add Y axis
      g.call(d3.axisLeft(y).ticks(countTicks));
      d3.selectAll(".bar")
        .data(data1)
        .on("mouseover", function (d) {
          d3.select(this).transition().duration("100").attr("r", 7);
          var name = d.number_of_cars;
          tooltip.transition().duration(400).style("opacity", 1);
          tooltip
            .html(name)
            .style("left", x(d.year) + margin.left + "px")
            .style(
              "top",
              y(d.number_of_cars) + margin.bottom + margin.top + "px"
            );
        })
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

    var minValue = customMinimize(d3.min(data, (d) => d.number_of_cars));
    var maxValue = customRound(d3.max(data, (d) => d.number_of_cars));
    var countTicks = height / 50;
    // Add Y axis
    var y = d3.scaleLinear().domain([minValue, maxValue]).range([height, 0]);
    console.log(countTicks);
    g.call(d3.axisLeft(y).ticks(countTicks));

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
          .style(
            "top",
            y(d.number_of_cars) + margin.bottom + margin.top + "px"
          );
      })
      .on("mouseout", mouseOutHandler);
    dataForCsv = data;
  }

  buildBar(svg, data);
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
