import * as d3 from "d3"
import colors from "./../data/scattercolors.json"

export default class ScatterPlot {
    constructor(selector, onClick) {
        this.selector = selector;
        this.onClick = onClick;
    }
    
    init() {
    	this.margin = {top: 10, right: 30, bottom: 30, left: 60},
    	this.width = 460 - this.margin.left - this.margin.right,
    	this.height = 400 - this.margin.top - this.margin.bottom;

    	// append the svg object to the body of the page
		this.chart = d3.select(this.selector)
		  .append("svg")
		    .attr("width", this.width + this.margin.left + this.margin.right)
		    .attr("height", this.height + this.margin.top + this.margin.bottom)
		  .append("g")
		    .attr("transform",
		          "translate(" + this.margin.left + "," + this.margin.top + ")");

			this.x = d3.scaleLinear()
		    .domain([0, 1]) // Min and max value data.
		    .range([ 0, this.width ]);
		this.xAxis = this.chart.append("g")
		    .attr("transform", "translate(0," + this.height + ")")
		    .transition().duration(1000)
		    .call(d3.axisBottom(this.x));

		  // Add Y axis
		 this.y = d3.scaleLinear()
		    .domain([0, 1])
		    .range([ this.height, 0]);
		 this.yAxis = this.chart.append("g")
		  	.transition().duration(1000)
		    .call(d3.axisLeft(this.y));
    }

    valuesToList(feature) {
    	let result = [];
    	for (let i=0; i < this.yearData.length; i++)
    		result.push(this.yearData[i][feature])
    	return result
    }

    addDropdown(data, dropdownChange, id) {
    	let newDropdown = d3.select(this.selector)
            .insert("select", "svg")
            .attr("id", id)
            .on("change", dropdownChange,);

        newDropdown.selectAll("option")
        .data(data)
      	.enter().append("option")
        .attr("value", function (d) { return d; })
        .text(function (d) {
            return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
        });
    }

    addDropdowns(data, dropdownChange) {
    	// Year
    	this.addDropdown(Object.keys(data), dropdownChange, "year")

    	let year = Object.keys(data)[0]
    	let genreStats = Object.keys(data[year][0])

        // X axis
        this.addDropdown(genreStats, dropdownChange, "xFeature")

        // Y axis
        this.addDropdown(genreStats, dropdownChange, "yFeature")
    }

    update(data, year, xFeature, yFeature) {

    	// Set dropdown values for year, x and y.

    	// On select, update plot

    	this.yearData = data[year] 
    	this.data = data

    	let xValue = this.valuesToList(xFeature)
    	let yValue = this.valuesToList(yFeature)
    	let xMin = d3.min(xValue)
    	let yMin = d3.min(yValue)
    	let xMax = d3.max(xValue)
    	let yMax = d3.max(yValue)

		 // Add X axis
		let x = d3.scaleLinear()
		    .domain([xMin, xMax]) // Min and max value data.
		    .range([ 0, this.width ]);
		this.xAxis.call(x)
		  // Add Y axis
		 let y = d3.scaleLinear()
		    .domain([yMin, yMax])
		    .range([ this.height, 0]);
		 this.yAxis.call(y)

		 // Get all the paths:
        const dots = this.chart.selectAll('circle').data(this.yearData);

        // Add all paths to svg
        dots.enter()
          .append("circle")
          .attr("cx", function (d) { return x(d[xFeature]); } )
		  .attr("cy", function (d) { return y(d[yFeature]); } )
          .on("mouseover", function(d) { return console.log(d)})

            // Causes the new data to merge with the old data
            .merge(dots)
            .transition().duration(1000)
              .attr("cx", function (d) { return x(d[xFeature]); } )
		      .attr("cy", function (d) { return y(d[yFeature]); } )
		      .attr("r", function (d) { return Math.log(d.size) ** 1.5;})
		      .style("fill", function (d) { return colors[d.genre] } )
		      .attr("opacity", 0.5)

        // Remove paths that are no longer in the data.
        dots.exit()
        	.transition().duration(1000)
        	.attr("cx", function (d) { return 0; } )
		    .attr("cy", function (d) { return 0; } )
        	.attr("r", function (d) { return 0;})
        	.attr("opacity", 0)
        	.attr('d', function(d) {return d})
            .remove()


	    }   
}

