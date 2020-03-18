import * as d3 from "d3"
import colors from "./../data/scattercolors.json"

export default class RadarChart {
    constructor(selector, onClick, features) {
        this.selector = selector;
        this.onClick = onClick;
        this.features= features;
    }
    
    init() {
        // init the chart here
        this.width = 300;
        this.height = 300;
        this.size = 1
        this.basicSize = this.width / 2;

        this.chart = d3.select(this.selector)
            .append("svg")
            .attr("width", this.size * this.width)
            .attr("height", this.size * this.height);

        this.radialScale = d3.scaleLinear()
            .domain([0, 1])
            .range([0, this.size * 100]);

        const ticks = [0.2,0.4,0.6,0.8,1.0];

        ticks.forEach(t =>
            this.chart.append("circle")
            .attr("cx", this.size * this.basicSize)
            .attr("cy", this.size * this.basicSize)
            .attr("fill", "none")
            .attr("stroke", "gray")
            .attr("opacity", 0.5)
            .attr("r", this.radialScale(t))
        );

        // Adding the text labels with a small offset
        ticks.forEach(t =>
            this.chart.append("text")
            .attr("x", this.size * (this.basicSize + 5))
            .attr("y", this.size * (this.basicSize - 2) - this.radialScale(t))
            .text(t)
            .attr("font-size", this.size * 10)
        );

        // Draw the straight lines, each representing a feature
        for (var i = 0; i < this.features.length; i++) {
            let ft_name = this.features[i];
            let angle = (Math.PI / 2) + (2 * Math.PI * i / this.features.length);
            let line_coordinate = this.angleToCoordinate(angle, 1);
            let label_coordinate = this.angleToCoordinate(angle, 1.2);

            //draw axis line
            this.chart.append("line")
            .attr("x1", this.size * this.basicSize)
            .attr("y1", this.size * this.basicSize)
            .attr("x2", line_coordinate.x)
            .attr("y2", line_coordinate.y)
            .attr("stroke","black")
            .attr("opacity", 0.5);

            //draw axis label
            this.chart.append("text")
            .attr("x", label_coordinate.x - 25)
            .attr("y", label_coordinate.y + 4)
            .text(ft_name)
            .attr("font-size", this.size * 12);
        }
    }

    angleToCoordinate(angle, value) {
        let x = Math.cos(angle) * this.radialScale(value);
        let y = Math.sin(angle) * this.radialScale(value);
        return {"x": this.basicSize * this.size + x, "y": this.basicSize * this.size - y};
    }

    getPathCoordinates(data_point) {
        let coordinates = [];
        for (var i = 0; i < this.features.length; i++){
            let ft_name = this.features[i];
            let angle = (Math.PI / 2) + (2 * Math.PI * i / this.features.length);
            coordinates.push(this.angleToCoordinate(angle, data_point[ft_name]));
        }
        return coordinates;
    }

    update(data) {
        // Data is a list containing dictionaries

        // Parsing the features
        if (this.features.length === 0) {
            this.features.push(Object.keys(data[0]))
            this.features = this.features[0]
        }

        let dataCoordinates = [];
        for (let i=0; i<data.length; i++) {
            dataCoordinates.push(this.getPathCoordinates(data[i]))
        }

        // update the chart
        const line = d3.line()
        .x(d => d.x)
        .y(d => d.y);

        const startLine = d3.line()
            .x(d => d.x / 10)
            .y(d => d.y / 10);

        const stopLine = d3.line()
            .x(d => this.width / 2)
            .y(d => this.width / 2);

        // Get all the paths:
        const paths = this.chart.selectAll('path').data(dataCoordinates);

        // Add all paths to svg
        paths.enter()
            .append("path")
            //.attr("opacity", 0.5)
            .attr('d', function(d) {return stopLine(d) + 'Z'})
            .style("fill", function(d, i) { 
                let genre = data[i]["genre"]
                let color = colors[data[i]["genre"]]
                if (i === 1 && data.length > 1) { return color.substring(0, color.length - 1) + ",0.6)"}
                return color.substring(0, color.length - 1) + ",0.4)"
            })

            // Causes the new data to merge with the old data
            .merge(paths)
            .transition().duration(1000)
            .attr('d', function(d) {return line(d) + 'Z'})
            .style("fill", function(d, i) { 
                let genre = data[i]["genre"]
                let color = colors[data[i]["genre"]]
                if (i === 1 && data.length > 1) { return color.substring(0, color.length - 1) + ",0.6)"}
                return color.substring(0, color.length - 1) + ",0.4)"
            });

        // Remove paths that are no longer in the data.
        paths.exit()
            .transition().duration(1000)
                .attr('d', function(d) {return stopLine(d) + 'Z'})
                .style("fill", function(d, i) {
                    let genre = data[i]["genre"]
                    let color = colors[data[i]["genre"]]
                    if (i === 1 && data.length > 1) { return color.substring(0, color.length - 1) + ",0.6)"}
                    return color.substring(0, color.length - 1) + ",0.4)"
                })
            .remove()
    }   
}