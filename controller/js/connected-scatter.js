var county = document.getElementById("selectCountyButton").value.toUpperCase();
var theUrl = "http://localhost/api/masina/count_cars.php?county=";
theUrl = theUrl.concat(county);
console.log(theUrl);
var req = new XMLHttpRequest();
req.overrideMimeType("application/json");
req.open("GET", theUrl, true);
req.onload = function () {
  var jsonResponse = JSON.parse(req.responseText);
  buildAll(jsonResponse.records);
};

req.send();

function buildAll(data) {
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
  default_width = 700 - margin.left - margin.right;
  default_height = 500 - margin.top - margin.bottom;
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
      // mobile
    } else {
      margin.left = 40;
      w = current_width - 40;
      h = w / default_ratio;
    }
    // Set new width and height based on graph dimensions
    width = w - 50 - margin.right;
    height = h - margin.top - margin.bottom;
  }
  set_size();
  //end responsive graph code

  function mouseOverHandler(d, i, left, top) {
    d3.select(this).transition().duration("100").attr("r", 7);
    var name = d.number_of_cars;
    tooltip.transition()
      .duration(400)
      .style("opacity", 1);
    tooltip.html(name)
      .style("left", left + "px")
      .style("top", top + "px");
  }

  function mouseOutHandler(d, i) {
    d3.select(this).transition().duration("200").attr("r", 5);
    tooltip.transition()
      .duration(500)
      .style("opacity", 0);
  }

  // format the data
  data.forEach(function (d) {
    parseDate = d3.timeParse("%Y");
    d.year = parseDate(d.year);
    d.number_of_cars = +d.number_of_cars;
  });
  //sort the data by date so the trend line makes sense
  /*data.sort(function (a, b) {
    return a.date - b.date;
});*/

  // set the ranges
  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  // Scale the range of the data
  x.domain(
    d3.extent(data, function (d) {
      return d.year;
    })
  );
  y.domain([
    0,
    1457889]);

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
    .attr('id', 'svg')
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
      tooltip.transition()
        .duration(400)
        .style("opacity", 1);
      tooltip.html(name)
        .style("left", x(d.year) + margin.top + "px")
        .style("top", y(d.number_of_cars) + margin.left - 10 + "px");
    })
    .on("mouseout", mouseOutHandler);

  // Add the axis
  if (width < 500) {
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5));
  } else {
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5));
  }

  svg.append("g").call(d3.axisLeft(y));

  document.getElementById('selectCountyButton').addEventListener('change', updateScatter);

  function updateScatter() {
    var county = document.getElementById("selectCountyButton").value.toUpperCase();
    var theUrl = "http://localhost/api/masina/count_cars.php?county=";
    theUrl = theUrl.concat(county);
    console.log(theUrl);
    var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open("GET", theUrl, true);
    req.onload = function () {
      var jsonResponse = JSON.parse(req.responseText);
      var data1 = jsonResponse.records;
      data1.forEach(function (d) {
        parseDate = d3.timeParse("%Y");
        d.year = parseDate(d.year);
        d.number_of_cars = +d.number_of_cars;
      });
      line
        .data([data1])
        .transition()
        .duration(1000)
        .attr("d", d3.line()
          .x(function (d) { return x(+d.year) })
          .y(function (d) { return y(+d.number_of_cars) })
        )
      // Add the data points
      dots
        .data(data1)
        .transition()
        .duration(1000)
        .attr("cx", function (d) {
          return x(d.year);
        })
        .attr("cy", function (d) {
          return y(d.number_of_cars);
        });
    }
    req.send();
  }

  document.getElementById('downloadSVGButton').addEventListener('click', () => saveSvg(document.getElementById('svg'), 'image.svg'))

  function saveSvg(svgEl, name) {
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], { type: "image/svg+xml;charset=utf-8" });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  document.getElementById('webpDownloadButton').addEventListener('click', () => saveWebp())

  function saveWebp() {
    // the canvg call that takes the svg xml and converts it to a canvas
    var svgData = document.getElementById("svg").outerHTML;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'svg-canvas')
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
    document.body.removeChild(canvas)
  }


}
