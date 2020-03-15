import * as d3 from "d3"


export default class LineChart {
    constructor(selector, onClick) {
        this.selector = selector;
        this.onClick = onClick;
    }

    init() {
        this.margin = {top: 15, right: 35, bottom: 15, left: 35};
        this.width = 600;
        this.height = 200;
        this.formatValue = d3.format(",.2f");

        this.colorScale = {
            "valence": "#e91e63",
            "speechiness": "#673ab7",
            "liveness": "#795548",
            "instrumentalness": "#009688",
            "energy": "#cddc39",
            "danceability": "#ffc107",
            "acousticness": "#ff5722",
        };

        this.chart = d3
            .select(this.selector)
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)

        this.line = d3.line()
            .x(d => {
                return this.x(new Date(d.year));
            })
            .y(d => this.y(d.data));

        // X Axis
        this.chart
            .append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${this.height-this.margin.top-this.margin.bottom})`);

        // Y Axis
        this.chart
            .append("g")
            .attr("class", "y-axis")
    
        // focus for tooltip
        this.focus = this.chart.append("g")
            .attr("id", "tooltip-focus")
            .attr("class", "focus")
            .style("display", "none");

        this.focus.append("line").attr("class", "lineHover")
            .style("stroke", "#999")
            .attr("stroke-width", 1)
            .style("shape-rendering", "crispEdges")
            .style("opacity", 0.5)
            .attr("y1", -this.height)
            .attr("y2", 0);

        this.focus.append("text").attr("class", "lineHoverDate")
            .attr("text-anchor", "middle")
            .attr("font-size", 12);

    }

    update(data) {

        // overlay has to be drawn on top of the visualistation. 
        // Remove it here, replace it at the end of the update function.
        this.chart.selectAll(".overlay").remove();

        // update x- and y-axis
        this.x = d3
            .scaleTime()
            .domain([new Date("1999"), new Date("2019")])
            .range([0, this.width]);

        this.y = d3
            .scaleLinear()
            .domain([0, 1])
            .range([this.height - this.margin.top - this.margin.bottom, 0]);

        d3.select(".x-axis")
            .call(d3.axisBottom(this.x));

        d3.select(".y-axis")
            .call(d3.axisLeft(this.y));

        const lines = this.chart
            .selectAll(".line")
            .data(Object.values(data));

        lines
            .enter()
            .append("path")
            .merge(lines)
            .attr("class", "line")
            .style("stroke", d => {
                return this.colorScale[d.key];
            })
            .style("fill", "none")
            .style("stroke-width", 2)
            .attr("d", d => this.line(d.data))      

        // Put in the overlay for tooltip
        this.chart.append("rect")
            .attr("class", "overlay")
            .attr("id", "tooltip-overlay")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("opacity", 0)

        this.tooltip(data)
        lines.exit().remove()
    }

    tooltip(data) {
        const audioFeatures = this._getAudioFeatures(data)
        
        const labels = this.focus.selectAll(".lineHoverText")
            .data(audioFeatures)
        
        const circles = this.focus.selectAll(".hoverCircle")
            .data(audioFeatures)

        labels.enter().append("text")
            .attr("class", "lineHoverText")
            .style("fill", d => this.colorScale[d.key])
            .attr("text-anchor", "start")
            .attr("font", 12)
            .attr("dy", (_, i) => 1 + i * 2 + "em")
            .merge(labels)

        circles.enter().append("circle")
            .attr("class", "hoverCircle")
            .style("fill", d => this.colorScale[d.key])
            .attr("r", 3)
            .merge(circles);

        this.chart.select("#tooltip-overlay")
            .on("mouseover", () => {
                this.focus.style("display", null);
            })
            .on("mouseout", () => {
                this.focus.style("display", "none");
            })
            .on("mousemove", () => {
                // get data of the closest year to the corresponding x value of mouse
                const years = this._getYears(data)
                const selectedYear = this._getClosestYearToMouse(years)
                const dataOfYear = this._getDataOfYear(data, selectedYear)

                this.focus.select(".lineHover")
                    .attr("transform", "translate(" + this.x(selectedYear) + "," + this.height + ")");

                this.focus.select(".lineHoverDate")
                    .attr("transform",
                        "translate(" + this.x(selectedYear) + "," + (this.height + this.margin.bottom) + ")")
                    .text(selectedYear.getFullYear().toString());

                this.focus.selectAll(".hoverCircle")
                    .attr("cy", e => this.y(dataOfYear[e]))
                    .attr("cx", this.x(selectedYear))
                    .style("stroke", e => this.colorScale[e])
                    .style("fill", "none");

                this.focus.selectAll(".lineHoverText")
                    .attr("transform",
                        "translate(" + this.x(selectedYear) + "," + this.height / 2.5 + ")")
                    .text(e => e + " " + this.formatValue(dataOfYear[e]))
                    .style("stroke", e => this.colorScale[e])

                this.x(selectedYear) > (this.width - this.width / 4)
                    ? this.focus.selectAll("text.lineHoverText")
                        .attr("text-anchor", "end")
                        .attr("dx", -10)
                    : this.focus.selectAll("text.lineHoverText")
                        .attr("text-anchor", "start")
                        .attr("dx", 10)
            })
            .on("click", () => {
                const years = this._getYears(data)
                this.onClick(this._getClosestYearToMouse(years).getFullYear().toString())
            });
    }

    _getAudioFeatures(data) {
        return data.map(d => d.key)
    }

    _getYears(data) {
        return data[0].data.map(d => new Date(d.year))
    }

    _getClosestYearToMouse(years) {
        const mouseOverDate = this.x.invert(d3.mouse(this.chart.select("#tooltip-overlay").node())[0]);
        const             i = d3.bisectLeft(years, mouseOverDate);
        const      yearLeft = years[i - 1];
        const     yearRight = years[i];

        return mouseOverDate - yearLeft < yearRight - mouseOverDate ? yearLeft : yearRight;
    }

    _getDataOfYear(data, selectedYear) {
        const features = data.map(d => d.key);
        const years = data.map(d => d.data.map(e => e.year))[0];
        const values = data.map(d => d.data.map(e => e.data));

        const dataOfYear = {};
        for (let i in features) {
            dataOfYear[features[i]] = values[i][d3.bisectLeft(years.map(d => parseInt(d)), selectedYear.getFullYear())];
        };
        return dataOfYear
    }
}