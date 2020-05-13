var county = document.getElementById("selectCountyButton").value.toUpperCase();
var theUrl = "http://localhost/api/masina/count_cars.php?county=";
var responseData;
theUrl = theUrl.concat(county);
var req = new XMLHttpRequest();
req.overrideMimeType("application/json");
req.open("GET", theUrl, true);
req.onload = function () {
    responseData = JSON.parse(req.responseText);
    console.log("responseData", responseData);
    buildAll(responseData.records);
};

req.send();

//console.log("responseData", responseData);

function buildAll(data) {
    // set the dimensions and margins of the graph
    var width = 700;
    height = 450;
    height = 450;
    margin = 40;

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

    document
        .getElementById("selectCountyButton")
        .addEventListener("change", updatePie);

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
            .attr(
                "transform",
                "translate(" + width / 3 + "," + height / 2 + ")"
            );
        var county = document
            .getElementById("selectCountyButton")
            .value.toUpperCase();
        var theUrl = "http://localhost/api/masina/count_cars.php?county=";
        theUrl = theUrl.concat(county);
        var req = new XMLHttpRequest();
        req.overrideMimeType("application/json");
        req.open("GET", theUrl, true);
        req.onload = function () {
            responseData = JSON.parse(req.responseText);
            buildPie(svg, responseData.records);
        };
        req.send();
    }

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    function buildPie(svg, data) {
        // Compute the position of each group on the pie:
        var pie = d3.pie().value(function (d) {
            return d.number_of_cars;
        });
        var data_ready = pie(data);
        console.log(data);
        svg.selectAll("whatever")
            .data(data_ready)
            .enter()
            .append("path")
            .transition()
            .delay(function (d, i) {
                return i * 100;
            })
            .duration(1000)
            .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
            .attr("fill", function (d) {
                return color(d.data.year);
            })
            .attr("stroke", "black")
            .style("stroke-width", "1px")
            .style("opacity", 0.7);

        var size = 20;
        svg.selectAll("mydots")
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
        svg.selectAll("mylabels")
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
}

document
    .getElementById("downloadSVGButton")
    .addEventListener("click", () =>
        saveSvg(document.getElementById("svg"), "image.svg")
    );

document
    .getElementById("csvDownloadButton")
    .addEventListener("click", () => saveCsv(responseData));

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

    csvContent += data.records
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
