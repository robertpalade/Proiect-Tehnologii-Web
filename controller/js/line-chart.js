// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
//Read the data
// this is the model data that will be changed to data from the database
var data = [{
    number: 232717,
    year: 2015
},
{
    number: 232714,
    year: 2016
},
{
    number: 269284,
    year: 2017
},
{
    number: 289927,
    year: 2018
},
{
    number: 311523,
    year: 2019
}];
// Now I can use this dataset:

data.forEach(function (d) {
    parseDate = d3.timeParse("%Y");
    d.year = parseDate(d.year);
    d.number = +d.number;
});

var x = d3.scaleTime()
    .domain(d3.extent(data, function (d) {
        return d.year;
    }))
    .range([0, width]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
    .domain([200000, 320000])
    .range([height, 0]);
svg.append("g")
    .call(d3.axisLeft(y));
// Add the line
svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#69b3a2")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function (d) { return x(d.year) })
        .y(function (d) { return y(d.number) })
    );
// Add the points
svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d.year) })
    .attr("cy", function (d) { return y(d.number) })
    .attr("r", 5)
    .attr("fill", "#69b3a2");
