import * as d3 from "d3"
import colors from "./../data/scattercolors.json"
import axis from "./../data/axisMapping.json"

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

        // Add text on the X-axis and Y-axis
        this.chart.append("text")
          .attr("class", "xtext")             
          .attr("transform",
                "translate(" + (this.width/2) + " ," + 
                (this.height + this.margin.top + 20) + ")")
          .style("text-anchor", "middle")
          .text("x");

        this.chart.append("text")
          .attr("class", "ytext") 
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - this.margin.left)
          .attr("x",0 - (this.height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("y");

        // Add year text
        this.chart.append("text")
          .attr("class", "yearText")
          .attr("y", 40)
          .attr("x", 280)
          .style("font-size", "30px")
          .text("2000")

        // Initial axis drawing
        this.x = d3.scaleLinear()
            .domain([0, 1]) // Min and max value data.
            .range([ 0, this.width ]);
        this.xAxis = this.chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + this.height + ")")
            .transition().duration(1000)
            .call(d3.axisBottom(this.x));

          // Add Y axis
        this.y = d3.scaleLinear()
            .domain([0, 1])
            .range([ this.height, 0]);
        this.yAxis = this.chart.append("g")
            .attr("class", "y axis")
            .transition().duration(1000)
            .call(d3.axisLeft(this.y));


            // Tooltip
        let tooltip = d3.select(this.selector).append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("background-color", "rgba(0, 0, 0, 0.7)")
            .style("color", "white")
            .style("padding", "5px")
            .style("font", "sans-serif")
            .style("opacity", 0);
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
            .on("change", dropdownChange);

        newDropdown.selectAll("option")
        .data(data)
        .enter().append("option")
        .attr("value", function (d) { return d; })
        .text(function (d) {
            return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
        });
    }
    //https://bl.ocks.org/shimizu/914c769f05f1b2e1d09428c7eedd7f8a

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

        // Source Updating axis
        // https://bl.ocks.org/shimizu/914c769f05f1b2e1d09428c7eedd7f8a
        // 

        this.yearData = data[year] 

        let xValue = this.valuesToList(xFeature)
        let yValue = this.valuesToList(yFeature)
        let xMin = axis[xFeature]["low"]
        let yMin = axis[yFeature]["low"]
        let xMax = axis[xFeature]["high"]
        let yMax = axis[yFeature]["high"]
        this.xFeature = xFeature
        this.yFeature = yFeature

        // Setting both axis
        // Can't have its own function :/
        let xScale = d3.scaleLinear()
        let yScale = d3.scaleLinear()
            
        let xAxisCall = d3.axisBottom()
        let yAxisCall = d3.axisLeft()

        // Setting
        xScale.domain([xMin, xMax]).range([ 0, this.width ]);
        yScale.domain([yMin, yMax]).range([ this.height, 0]);
        xAxisCall.scale(xScale)
        yAxisCall.scale(yScale) 

        // Drawing
        let t = d3.transition()
            .duration(500)
        
        let x = this.chart.selectAll(".x")
            .data(["dummy"])
            
        let newX = x.enter().append("g")
            .attr("class", "x axis")
            .attr("transform", "translate("+[this.margin.left, this.height-this.margin.top]+")")

        // Update text on the X-axis and Y-axis
        this.chart.selectAll(".xtext").text(xFeature)
        this.chart.selectAll(".ytext").text(yFeature)
        this.chart.selectAll(".yearText").text(year).style("opacity", 0.7)

        x.merge(newX).transition(t).call(xAxisCall)

        let y = this.chart.selectAll(".y")
            .data(["dummy"])
            
        let newY = y.enter().append("g")
            .attr("class", "y axis")
            .attr("transform", "translate("+[this.margin.left, this.margin.top]+")")

        y.merge(newY).transition(t).call(yAxisCall)
        ////////////////////////////////////

        // Selecting and updating the data.
        const dots = this.chart.selectAll('circle').data(this.yearData);

        // Add all paths to svg
        dots.enter()
          .append("circle")
          .attr("cx", function (d) { return xScale(d[xFeature]); } )
          .attr("cy", function (d) { return yScale(d[yFeature]); } )
          .on("mouseover", function(d) { 
            // Retrieve values.
            let tooltip = d3.select(".tooltip")
            let xFeature = d3.select(".xtext").text();
            let yFeature = d3.select(".ytext").text();

            d3.select(this)
                .style("stroke", "black")
                .style("stroke-width", "3px");

            // Capitalize first letter
            let xFeatureText = xFeature.substring(0, 1).toUpperCase() + xFeature.substring(1, xFeature.length)
            let yFeatureText = yFeature.substring(0, 1).toUpperCase() + yFeature.substring(1, yFeature.length)

            // Build tooltip
            var html  = "Genre: " + d.genre + "<br/>" +
                        xFeatureText + ": " + Math.round((d[xFeature] + Number.EPSILON) * 100) / 100 + "<br/>" +
                        yFeatureText + ": " + Math.round((d[yFeature] + Number.EPSILON) * 100) / 100;

            tooltip.html(html)
                .style("left", (d3.event.pageX + 15) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
            .transition()
                .duration(200) // ms
                .style("opacity", .9)
                .style("display", "initial")     
            })
           .on("mouseout", function(d) { 
                d3.select(this)
                .style("stroke", "none");

                let tooltip = d3.select(".tooltip")      
                tooltip.transition()        
                .duration(500)      
                .style("opacity", 0)
                .style("display", "none");   
            })

            // Causes the new data to merge with the old data
            .merge(dots)
            .transition().duration(1000)
              .attr("cx", function (d) { return xScale(d[xFeature]); } )
              .attr("cy", function (d) { return yScale(d[yFeature]); } )
              .attr("r", function (d) { if (d.size === 0 ) {return 0} else {return Math.log(d.size) ** 1.5;}})
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

