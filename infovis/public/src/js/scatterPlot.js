import * as d3 from "d3"
import colors from "./../data/scattercolors.json"
import axis from "./../data/axisMapping.json"
import genreData from "./../../../../data/data/scatterplot.json"

export default class ScatterPlot {
    constructor(selector, onClick, radarPlot) {
        this.selector = selector;
        this.onClick = onClick;
        this.radarPlot = radarPlot;
    }
    
    init() {
        this.margin = {top: 40, right: 30, bottom: 30, left: 30},
        this.width = 1050 - this.margin.left - this.margin.right,
        this.height = 500 - this.margin.top - this.margin.bottom;

        // append the svg object to the body of the page
        this.chart = d3.select(this.selector)
          .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
          .append("g")
            .attr("transform",
                  "translate(" + this.margin.left + "," + this.margin.top + ")");

        // Add year text
        this.chart.append("text")
          .attr("class", "yearText")
          .attr("y", 120)
          .attr("x", this.width - 360)
          .style("font-size", "150px")
          .style("opacity", 0.2)
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
        for (let i=0; i < this.data.length; i++)
            result.push(this.data[i][feature])
        return result
    }

    addDropdown(data, id) {
        let newDropdown = d3.select(this.selector)
            .insert("select", "svg")
            .attr("id", id)
            .on("change", () => this.update(this.data));

        newDropdown.selectAll("option")
        .data(data)
        .enter().append("option")
        .attr("value", function (d) { return d; })
        .property("selected", function(d){ 
            if (id === "xFeature") {
                return d === "energy"
            } else if (id === "yFeature") {
                return d === "danceability"
            }})
        .text(function (d) {
            return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
        });
        return newDropdown
    }
    //https://bl.ocks.org/shimizu/914c769f05f1b2e1d09428c7eedd7f8a

    addDropdowns(data) {
        // Year

        let year = Object.keys(data)[0]
        let genreStats = Object.keys(data[year][0])

        // X axis
        let xDropdown = this.addDropdown(genreStats, "xFeature")
        xDropdown
            .style("position", "absolute")
            .style("margin-left", this.width + this.margin.left - 150 + "px")
            .style("margin-top", this.height + this.margin.bottom + this.margin.top + "px")

        // Y axis
        let yDropdown = this.addDropdown(genreStats, "yFeature")
        yDropdown
            .style("position", "absolute")
            .style("margin-top", "0px") //this.height / 2 
            .style("margin-left", this.margin.left + "px")
    }
    
    make_x_gridlines(x) {        
        return d3.axisBottom(x)
            .ticks()
    }

    make_y_gridlines(y) {        
        return d3.axisLeft(y)
            .ticks()
    }

    update(data, year) {

        // Source Updating axis
        // https://bl.ocks.org/shimizu/914c769f05f1b2e1d09428c7eedd7f8a
        // 

        this.data = data
        if (year !== undefined) {
            this.year = year
        }

        const xFeature = d3.select("#xFeature").property('value')
        const yFeature = d3.select("#yFeature").property('value')

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


        // Animation
        let t = d3.transition().duration(500)

        // Update Y gridlines
        let gridlinesY = this.chart.selectAll(".gridy").data(["dummy"])
        let newgridlinesY = this.chart.append("g")           
            .attr("class", "gridy")
            .attr("opacity", 0.05)
        gridlinesY.merge(newgridlinesY).transition(t).call(this.make_y_gridlines(yScale)
            .tickSize(-this.width)
            .tickFormat(""))

        // Update X gridlines
        let gridlinesX = this.chart.selectAll(".gridx").data(["dummy"])
        let newgridlinesX = this.chart.append("g")           
            .attr("class", "gridx")
            .attr("opacity", 0.05)
            .attr("transform", "translate(0," + this.height + ")")
        gridlinesX.merge(newgridlinesX).transition(t).call(this.make_x_gridlines(xScale)
            .tickSize(-this.height)
            .tickFormat(""))

        // Update X axis
        let x = this.chart.selectAll(".x").data(["dummy"])   
        let newX = x.enter().append("g")
            .attr("class", "x axis")
            .attr("transform", "translate("+[this.margin.left, this.height-this.margin.top]+")")
        x.merge(newX).transition(t).call(xAxisCall)

        // Update Y axis
        let y = this.chart.selectAll(".y").data(["dummy"])
        let newY = y.enter().append("g")
            .attr("class", "y axis")
            .attr("transform", "translate("+[this.margin.left, this.margin.top]+")")
        y.merge(newY).transition(t).call(yAxisCall)

        // Update year text
        this.chart.selectAll(".yearText").text(this.year).style("opacity", 0.1)
        ////////////////////////////////////

        // Selecting and updating the data.
        const dots = this.chart.selectAll('circle').data(this.data);

        // Call update for radarplot. 
        const radarChartRef = this.radarPlot
        const updateRadarPlot = function (genre) {
            for (let i=0; i<genreData[year].length;i++) {
                if (genreData[year][i]["genre"] === genre) {
                    radarChartRef.update([genreData[year][i]])
                }
            }
        }

        // Add all paths to svg
        dots.enter()
          .append("circle")
          .attr("cx", function (d) { return xScale(d[xFeature]); } )
          .attr("cy", function (d) { return yScale(d[yFeature]); } )
          .on("click", (d) => {this.onClick(d["genre"])})
          .on("mouseover", function(d) { 
            // Retrieve values.
            try {updateRadarPlot(d.genre)} catch(err) {}// Silence error?}
            let tooltip = d3.select(".tooltip")
            let xFeature = d3.select("#xFeature").node().value;
            let yFeature = d3.select("#yFeature").node().value;

            // Everything invisible except the selected one.
            d3.selectAll("#scatterplot circle").attr("opacity", 0.2)
            d3.selectAll("#line-chart path").attr("opacity", 0.2)
            d3.selectAll("#" + d.genre.replace(/\s/g, ''))
                .attr("opacity", 1)
                .style("stroke-width", "4")

            d3.select(this)
                .style("stroke", "black")
                .style("stroke-width", "3px")
                .attr("opacity", 0.7);

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

            // Update genre details 
            const genreDetails = Array.from(document.getElementsByClassName("genre-detail"))
            // Mean tempo
            genreDetails[0].children[2].innerHTML = ""+ Math.floor(d.tempo);
            // times in list
            genreDetails[1].children[2].innerHTML = "" + d.size
            // mean release yer
            genreDetails[2].children[2].innerHTML = "" + d.release_year.toFixed(1)
            // Mean Length
            genreDetails[3].children[2].innerHTML = "" + d.duration.toFixed(2)
            })
            
           .on("mouseout", function(d) { 
                d3.select(this)
                .style("stroke", "none");

                d3.selectAll("circle").attr("opacity", 0.5)
                d3.selectAll("#line-chart path")
                    .attr("opacity", 1)
                    .style("stroke-width", "2")

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

