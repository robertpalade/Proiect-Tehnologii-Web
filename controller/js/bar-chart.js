var county = document.getElementById('selectButton').value.toUpperCase()
        var theUrl = "http://localhost/api/masina/count_cars.php?county="
        theUrl = theUrl.concat(county)
        console.log(theUrl);
        var req = new XMLHttpRequest();
        req.overrideMimeType("application/json");
        req.open("GET", theUrl, true);
        req.onload  = function() {
           var jsonResponse = JSON.parse(req.responseText);
           buildAll(jsonResponse.records);
        };
    
        req.send();

function buildAll(data){

// set the dimensions and margins of the graph
var margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
// this is the model data that will be changed to data from the database
/*var data = [
    {
        number: 232717,
        year: 'Vehicles in 2015',
        Bucuresti: 15342,
        Iasi: 13343
    },
    {
        number: 232714,
        year: 'Vehicles in 2016',
        Bucuresti: 32000,
        Iasi: 25313,
        Vaslui: 20000
    },
    {
        number: 269284,
        year: 'Vehicles in 2017',
        Bucuresti: 14000,
        Iasi: 10000,
        Vaslui: 50000
    },
    {
        number: 289927,
        year: 'Vehicles in 2018',
        Bucuresti: 50000,
        Iasi: 151230,
        Vaslui: 15000
    },
    {
        number: 311523,
        year: 'Vehicles in 2019',
        Bucuresti: 20122,
        Iasi: 14521,
        Vaslui: 100000
    },
]*/

document.getElementById('selectButton').addEventListener('change', updateBar)

function updateBar() {
        var county = document.getElementById('selectButton').value.toUpperCase()
        var theUrl = "http://localhost/api/masina/count_cars.php?county="
        theUrl = theUrl.concat(county)
        console.log(theUrl);
        var req = new XMLHttpRequest();
        req.overrideMimeType("application/json");
        req.open("GET", theUrl, true);
        req.onload  = function() {
           var jsonResponse = JSON.parse(req.responseText);
           console.log(jsonResponse.records);
           var data1 = jsonResponse.records;
           var x = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map(function (d) { return d.year; }))
        .padding(0.2);
        var y = d3.scaleLinear()
        .domain([0, 320000])
        .range([height, 0]);

           d3.selectAll(".bar")
           .data(data1)
           .transition().duration(1000)
           .attr("x", function(d) { return x(d.year); })
           .attr("y", function(d) { return y(d.number_of_cars); })
           .attr("height", function(d) { return height - y(d.number_of_cars); });
     
        };
        req.send();
}

function buildBar(svg,data) {

    // X axis
    console.log(data);
    var x = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map(function (d) { return d.year; }))
        .padding(0.2);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(0,0)rotate(-30)")
        .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 320000])
        .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y));

    // Bars
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.year); })
        .attr("y", function (d) { return y(d.number_of_cars); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.number_of_cars); })
        .attr("fill", "#69b3a2")
}

buildBar(svg,data)
}