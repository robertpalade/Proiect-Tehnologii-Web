; (function () {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
        .select("#my_dataviz")
        .append("svg")
        .attr('id', 'svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    // this is the model data that will be changed to data from the database
    var data = [
        {
            number: 232717,
            year: 'Vehicles in 2015',
            Alba: 40000,
            Bucuresti: 15342,
            Iasi: 13343
        },
        {
            number: 232714,
            year: 'Vehicles in 2016',
            Alba: 13000,
            Bucuresti: 32000,
            Iasi: 25313,
            Vaslui: 20000
        },
        {
            number: 269284,
            year: 'Vehicles in 2017',
            Alba: 25000,
            Bucuresti: 14000,
            Iasi: 10000,
            Vaslui: 50000
        },
        {
            number: 289927,
            year: 'Vehicles in 2018',
            Alba: 22000,
            Bucuresti: 50000,
            Iasi: 151230,
            Vaslui: 15000
        },
        {
            number: 311523,
            year: 'Vehicles in 2019',
            Alba: 15000,
            Bucuresti: 20122,
            Iasi: 14521,
            Vaslui: 100000
        },
    ]

    document.getElementById('selectCountyButton').addEventListener('change', updateBar)

    function updateBar() {

        var parent = d3.select('#my_dataviz')
        parent.selectAll('svg').remove()

        var svg = d3
            .select("#my_dataviz")
            .append("svg")
            .attr('id', 'svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        buildBar(svg)
    }

    function buildBar(svg) {

        var bar = function (d) {
            var city = document.getElementById('selectCountyButton').value
            return d[city]
        }
        // X axis
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
        svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function (d) { return x(d.year); })
            .attr("y", function (d) { return y(d.number); })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return height - y(d.number); })
            .attr("fill", "#69b3a2")
    }

    buildBar(svg)

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
})()