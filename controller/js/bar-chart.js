var county = document.getElementById("selectCountyButton").value.toUpperCase();
var theUrl = "http://localhost/api/masina/count_cars.php?county=";
var responseData;
theUrl = theUrl.concat(county);
var req = new XMLHttpRequest();
req.overrideMimeType("application/json");
req.open("GET", theUrl, true);
req.onload = function () {
    responseData = JSON.parse(req.responseText);
    //console.log("responseData", responseData);
    buildAll(responseData.records);
};

req.send();

//console.log("responseData", responseData);

function buildAll(data) {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
        .select("#my_dataviz")
        .append("svg")
        .attr("id", "svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    document
        .getElementById("selectCountyButton")
        .addEventListener("change", updateBar);

    function updateBar() {
        var county = document
            .getElementById("selectCountyButton")
            .value.toUpperCase();
        var theUrl = "http://localhost/api/masina/count_cars.php?county=";
        theUrl = theUrl.concat(county);
        console.log(theUrl);
        var req = new XMLHttpRequest();
        req.overrideMimeType("application/json");
        req.open("GET", theUrl, true);
        req.onload = function () {
            responseData = JSON.parse(req.responseText);
            console.log(responseData.records);
            var data1 = responseData.records;
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

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(0,0)rotate(-30)")
            .style("text-anchor", "end");

        // Add Y axis
        var y = d3.scaleLinear().domain([0, 320000]).range([height, 0]);

        svg.append("g").call(d3.axisLeft(y));

        // Bars
        svg.selectAll(".bar")
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
            .attr("fill", "#69b3a2");
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


document
    .getElementById("csvDownloadButton")
    .addEventListener("click", () => saveCsv(responseData));

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
