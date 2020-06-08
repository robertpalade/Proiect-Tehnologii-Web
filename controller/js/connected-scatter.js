var dataForCsv;
function buildAll(data, button1, button2, theUrl) {
  var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 60,
  };

  var tooltip = d3
    .select("body")
    .append("path")
    .attr("class", "tip")
    .style("opacity", 0);

  //making graph responsive
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
  //end responsive graph code

  function mouseOutHandler(d, i) {
    d3.select(this).transition().duration("200").attr("r", 5);
    tooltip.transition().duration(500).style("opacity", 0);
  }

  // format the data
  data.forEach(function (d) {
    parseDate = d3.timeParse("%Y");
    d.year = parseDate(d.year);
    d.number_of_cars = +d.number_of_cars;
  });

  // set the ranges
  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);
  var minValue = customMinimize(d3.min(data, (d) => d.number_of_cars));
  var maxValue = customRound(d3.max(data, (d) => d.number_of_cars));

  // Scale the range of the data
  x.domain(
    d3.extent(data, function (d) {
      return d.year;
    })
  );
  y.domain([minValue, maxValue]);

  // define the line
  var valueline = d3
    .line()
    .x(function (d) {
      return x(d.year);
    })
    .y(function (d) {
      return y(d.number_of_cars);
    });

  // append the svg object to the body of the page
  var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("id", "svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Add the trendline
  var line = svg
    .append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", valueline)
    .attr("stroke", "#32CD32")
    .attr("stroke-width", 2)
    .attr("fill", "#f2f2f2");

  // Add the data points
  var dots = svg
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", function (d) {
      return x(d.year);
    })
    .attr("cy", function (d) {
      return y(d.number_of_cars);
    })
    .attr("stroke", "#32CD32")
    .attr("stroke-width", 1.5)
    .attr("fill", "#FFFFFF")
    .on("mouseover", function (d) {
      d3.select(this).transition().duration("100").attr("r", 7);
      var name = d.number_of_cars;
      tooltip.transition().duration(400).style("opacity", 1);
      tooltip
        .html(name)
        .style("left", x(d.year) + margin.left / 3 + "px")
        .style(
          "top",
          y(d.number_of_cars) + margin.bottom + margin.top * 2 + "px"
        );
    })
    .on("mouseout", mouseOutHandler);

  dataForCsv = data;
  // Add the axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5));

  var g = svg.append("g");
  g.call(d3.axisLeft(y));

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

  document
    .getElementById("submitButton")
    .addEventListener("click", updateScatter);

  function updateScatter() {
    console.log("Am intrat in functie");
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
      data1.forEach(function (d) {
        parseDate = d3.timeParse("%Y");
        d.year = parseDate(d.year);
      });
      var y = d3.scaleLinear().range([height, 0]);
      var minValue = customMinimize(d3.min(data1, (d) => d.number_of_cars));
      var maxValue = customRound(d3.max(data1, (d) => d.number_of_cars));
      y.domain([minValue, maxValue]);
      g.call(d3.axisLeft(y));
      line
        .data([data1])
        .transition()
        .duration(1000)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(+d.year);
            })
            .y(function (d) {
              return y(+d.number_of_cars);
            })
        );
      // Add the data points
      dots
        .data(data1)
        .on("mouseover", function (d) {
          d3.select(this).transition().duration("100").attr("r", 7);
          var name = d.number_of_cars;
          tooltip.transition().duration(400).style("opacity", 1);
          tooltip
            .html(name)
            .style("left", x(d.year) + margin.left / 3 + "px")
            .style(
              "top",
              y(d.number_of_cars) + margin.bottom + margin.top * 2 + "px"
            );
        })
        .on("mouseout", mouseOutHandler)
        .transition()
        .duration(1000)
        .attr("cx", function (d) {
          return x(d.year);
        })
        .attr("cy", function (d) {
          return y(d.number_of_cars);
        });
    };
    req.send();
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
}
