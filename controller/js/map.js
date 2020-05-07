const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const OVERLAY_MULTIPLIER = 10;
const OVERLAY_OFFSET = OVERLAY_MULTIPLIER / 2 - 0.5;

var tooltip = d3.select("body").append("path")
  .attr("class", "tooltip")
  .style("opacity", 0);
// this is the model data that will be changed to data from the database
let data =
  [
    {
      nume: "Alba",
      number: 362278
    },
    {
      nume: "Arad",
      number: 467693
    },
    {
      nume: "Arges",
      number: 23787,
    },
    {
      nume: "Bacau",
      number: 24762
    },
    {
      nume: "Bihor",
      number: 29486
    },
    {
      nume: "Bistrita-Nasaud",
      number: 37943,
    },
    {
      nume: "Botosani",
      number: 4729857
    },
    {
      nume: "Brasov",
      number: 95874
    },
    {
      nume: "Braila",
      number: 28746
    },
    {
      nume: "Bucuresti",
      number: 32479
    },
    {
      nume: "Buzau",
      number: 29857
    },
    {
      nume: "Calarasi",
      number: 4732084
    },
    {
      nume: "Caras-Severin",
      number: 32463
    },
    {
      nume: "Cluj",
      number: 407202
    },
    {
      nume: "Constanta",
      number: 3047207
    },
    {
      nume: "Covasna",
      number: 248728
    },
    {
      nume: "Dambovita",
      number: 23487
    },
    {
      nume: "Dolj",
      number: 7230497
    },
    {
      nume: "Galati",
      number: 8529874
    },
    {
      nume: "Giurgiu",
      number: 44870
    },
    {
      nume: "Gorj",
      number: 75053
    },
    {
      nume: "Hargita",
      number: 94872
    },
    {
      nume: "Hunedoara",
      number: 24987
    },
    {
      nume: "Iasi",
      number: 2098290
    },
    {
      nume: "Ialomita",
      number: 42980
    },
    {
      nume: "Ilfov",
      number: 4207420
    },
    {
      nume: "Maramures",
      number: 2480298
    },
    {
      nume: "Mehedinti",
      number: 40287
    },
    {
      nume: "Mures",
      number: 248720
    },
    {
      nume: "Neamt",
      number: 428042
    },
    {
      nume: "Olt",
      number: 2304
    },
    {
      nume: "Prahova",
      number: 24089
    },
    {
      nume: "Salaj",
      number: 247082
    },
    {
      nume: "Satu-Mare",
      number: 8742987
    },
    {
      nume: "Sibiu",
      number: 247292
    },
    {
      nume: "Suceava",
      number: 472087
    },
    {
      nume: "Teleorman",
      number: 40720,
    },
    {
      nume: "Timis",
      number: 40720
    },
    {
      nume: "Tulcea",
      number: 18403,
    },
    {
      nume: "Valcea",
      number: 31082
    },
    {
      nume: "Vaslui",
      number: 234872
    },
    {
      nume: "Vrancea",
      number: 238272
    }
  ]

console.log(data.length);
console.log(data[41]);



function getNumber(d, id) {
  return d[id].number;
}

function mouseOverHandler(d, i) {
  var quantity = getNumber(data, i);
  var name = d.properties.VARNAME_1 + "</br>" + quantity;
  // var name = d.properties.VARNAME_1+ "</br>"  + d.properties.ID_1;
  tooltip.transition()
    .duration(400)
    .style("opacity", .9);
  tooltip.html(name)
    .style("left", (d3.event.pageX + 20) + "px")
    .style("top", (d3.event.pageY - 28) + "px");
}

function mouseOutHandler(d, i) {
  // d3.select(this).attr("fill", color(i))
  tooltip.transition()
    .duration(500)
    .style("opacity", 0);
}

function mouseMoveHandler(d, i) {
  tooltip
    .style('left', (d3.event.pageX + 10) + 'px')
    .style('top', (d3.event.pageY + 10) + 'px')
}



const svg = d3
  .select("#map__container")
  .append("svg")
  .attr('id', 'svg')
  .attr("width", "100%")
  .attr("height", "100%");

const g = svg.append("g");

/*g
.append("rect")
.attr("width", WIDTH)
.attr("height", HEIGHT)
.attr(
  "transform",
  `translate(-${WIDTH * OVERLAY_OFFSET},-${HEIGHT * OVERLAY_OFFSET})`
)
.style("fill", "none")
.style("pointer-events", "all");*/


const projection = d3
  .geoMercator()
  .center([23, 46])
  .scale(4000)
  .translate([WIDTH / 2, HEIGHT / 2]);

// --------------- Step 3 ---------------
// Prepare SVG path and color, import the
// effect from above projection.
const path = d3.geoPath().projection(projection);
const color = d3.scaleOrdinal(d3.schemeCategory20c.slice(1, 4));




renderMap(romania);

function renderMap(root) {
  // Draw districts and register event listeners
  g
    .append("g")
    .selectAll("path")
    .data(topojson.feature(root, root.objects.ROU_adm1).features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", (d, i) => color(i))
    .attr("stroke", "#FFF")
    .attr("stroke-width", 0.5)
    .attr("class", function () { return 'tooltip'; })
    .attr("name", function (d) { return d.properties.VARNAME_1; })
    .attr("id", function (d) { return d.properties.ID_1; })
    .on("mouseover", mouseOverHandler)
    .on("mouseout", mouseOutHandler)
    .on("mousemove", mouseMoveHandler);
  /*g
  .selectAll("path")
  .data(data)
  .on("mouseover", function(d) {
              div.transition()
                  .duration(200)
                  .style("opacity", .9);
              div	.html("sunt" + "<br/>" + "smecher")
                  .style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY - 28) + "px");
              })
          .on("mouseout", function(d) {
              div.transition()
                  .duration(500)
                  .style("opacity", 0);
          });*/

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
