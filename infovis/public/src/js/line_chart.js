import * as d3 from "d3"

const body = d3.select("body");

var margin = {top:50, right:50, bottom:50, left:50},
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;

//number of datapoints
const n = 21;

var line = d3.line()
    .x(function(d, i) {return xScale(i); })
    .y(function(d) {return yScale(d.y); })
    .curve(d3.curveMonotoneX);

var line2 = d3.line()
    .x(function(d, i) {return xScale(i); })
    .y(function(d) {return yScale(d.y); })
    .curve(d3.curveMonotoneX);

var dataset = d3.range(n).map(function(d) {return {"y": d3.randomUniform(1)()}; });

var xScale = d3.scaleLinear()
    .domain([0, n-1])
    .range([0, width]);

var yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([height, 0]);

var svg = body.append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.right + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale));

svg.append("path")
    .datum(dataset)
    .attr("class", "line")
    .attr("d", line);

svg.append("path")
    .datum(dataset)
    .attr("class", "line")
    .style("stroke", "red")
    .attr("d", line2);

svg.selectAll(".dot")
    .data(dataset)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("cx", function(d, i) {return xScale(i); })
    .attr("cy", function(d) {return yScale(d.y); })
    .attr("r", 5)
        .on("mouseover", function(a, b, d) {
            console.log(a);
            this.attr("class", "focus")
        })
        .on("mouseout", function() { });