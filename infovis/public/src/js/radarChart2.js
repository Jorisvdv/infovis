import * as d3 from "d3"

export default class RadarChart {
    constructor(selector, onClick) {
        this.selector = selector;
        this.onClick = onClick;
        this.features=[];
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

        const radialScale = d3.scaleLinear()
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
            .attr("r", radialScale(t))
        );

        // Adding the text labels with a small offset
        ticks.forEach(t =>
            this.chart.append("text")
            .attr("x", this.size * (this.basicSize + 5))
            .attr("y", this.size * (this.basicSize - 2) - radialScale(t))
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
            .attr("x", label_coordinate.x - 3)
            .attr("y", label_coordinate.y + 4)
            .text(ft_name)
            .attr("font-size", this.size * 12);
        }






        //this.chart = chart // Save the chart svg here
    }

    angleToCoordinate(angle, value) {
        let x = Math.cos(angle) * radialScale(value);
        let y = Math.sin(angle) * radialScale(value);
        return {"x": this.basicSize * size + x, "y": this.basicSize * size - y};
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

    setFeatures(features) {
        this.features = features
    }

    update(data) {
        // Parsing the features
        if (this.features.length === 0) {
            this.features.push(Object.keys(data))
            this.features = this.features[0]
        }

        // update the chart
    }   
}