; (function () {
    // set the dimensions and margins of the graph
    var width = 700
    height = 450
    margin = 40

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    var svg = d3
        .select('#my_dataviz')
        .append('svg')
        .attr('id', 'svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 3 + ',' + height / 2 + ')')
    // Create dummy data
    // this is the model data that will be changed to data from the database

    var data = [
        {
            number: 232717,
            year: 'Vehicles in 2015',
            Alba: 10000,
            Bucuresti: 15342,
            Iasi: 13343,
            Vaslui: 35000
        },
        {
            number: 232714,
            year: 'Vehicles in 2016',
            Alba: 15000,
            Bucuresti: 32000,
            Iasi: 25313,
            Vaslui: 20000
        },
        {
            number: 269284,
            year: 'Vehicles in 2017',
            Alba: 20000,
            Bucuresti: 14000,
            Iasi: 10000,
            Vaslui: 50000
        },
        {
            number: 289927,
            year: 'Vehicles in 2018',
            Alba: 30000,
            Bucuresti: 50000,
            Iasi: 151230,
            Vaslui: 15000
        },
        {
            number: 311523,
            year: 'Vehicles in 2019',
            Alba: 35000,
            Bucuresti: 20122,
            Iasi: 14521,
            Vaslui: 100000
        },

    ]



    // set the color scale
    var color = d3.scaleOrdinal().domain(data).range(['red', 'yellow', 'orange', 'brown', 'pink'])

    document.getElementById('selectButton').addEventListener('change', updatePie)

    function updatePie() {
        var parent = d3.select('#my_dataviz')
        parent.selectAll('svg').remove()

        var svg = d3
            .select('#my_dataviz')
            .append('svg')
            .attr('id', 'svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width / 3 + ',' + height / 2 + ')')

        buildPie(svg)
    }

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    function buildPie(svg) {
        // Compute the position of each group on the pie:
        var pie = d3.pie().value(function (d) {
            var city = document.getElementById('selectButton').value
            return d[city]
        })

        console.log(data[0][0])
        var data_ready = pie(data)

        svg.selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            .transition()
            .delay(function (d, i) {
                return i * 100;
            })
            .duration(1000)
            .attr('d', d3.arc().innerRadius(0).outerRadius(radius))
            .attr('fill', function (d) {
                return color(d.data.year)
            })
            .attr('stroke', 'black')
            .style('stroke-width', '1px')
            .style('opacity', 0.7)

        var size = 20
        svg.selectAll('mydots')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', 220)
            .transition()
            .duration(1000)
            .attr('y', function (d, i) {
                return 100 + i * (size + 5)
            }) // 100 is where the first dot appears. 25 is the distance between dots
            .attr('width', size)
            .attr('height', size)
            .style('fill', function (d) {
                return color(d.year)
            })

        // Add one dot in the legend for each name.
        svg.selectAll('mylabels')
            .data(data)
            .enter()
            .append('text')
            .attr('x', 220 + size * 1.2)
            .transition()
            .duration(1000)
            .attr('y', function (d, i) {
                return 100 + i * (size + 5) + size / 2
            }) // 100 is where the first dot appears. 25 is the distance between dots
            .text(function (d) {
                return d.year
            })
            .attr('text-anchor', 'left')
            .style('alignment-baseline', 'middle')

    }

    buildPie(svg)

    document.getElementById('downloadButton').addEventListener('click', () => saveSvg(document.getElementById('svg'), 'image.svg'))

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


})()
