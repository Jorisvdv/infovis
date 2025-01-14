import * as d3 from "d3"
import colors from "./../data/scattercolors.json"


export default class LineChart {
    constructor(selector, onClick) {
        this.selector = selector;
        this.onClick = onClick;
    }

    init() {
        this.margin = {top: 15, right: 35, bottom: 5, left: 60};
        this.width = 800;
        this.height = 200;

        this.year = "1999"

        this.infoPanelMargin = {top: this.margin.top, right: 10, bottom: this.margin.bottom, left: 35};
        this.infoPanelWidth = 150;
        this.infoPanelHeight = this.height;

        this.colorScale = colors;

        this.allFeatures = Object.keys(this.colorScale)

        this.chart = d3
            .select(this.selector)
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .style("float", "left")
            .append("g")
            .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)

        // this.infoPanel = d3
        //     .select(this.selector)
        //     .append("svg")
        //     .attr("class", "infoPanel")
        //     .attr("width", this.infoPanelWidth + this.infoPanelMargin.left + this.infoPanelMargin.right)
        //     .attr("height", this.infoPanelHeight + this.infoPanelMargin.top + this.infoPanelMargin.bottom)
        //     .style("float", "left")

        this.line = d3.line()
            .x(d => {
                return this.x(new Date(d.year));
            })
            .y(d => this.y(d.data));

        // X Axis
        this.chart
            .append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${this.height - this.margin.top - this.margin.bottom})`);

        // Y Axis
        this.chart
            .append("g")
            .attr("class", "y-axis")

        // focus for tooltip
        this.focus = this.chart.append("g")
            .attr("id", "tooltip-focus")
            .attr("class", "focus")
        // .style("display", "none");

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

        // const labels = this.infoPanel.selectAll(".infoText")
        //     .data(this.allFeatures);

        // labels.enter().append("text")
        //     .attr("class", "infoText")
        //     .attr("fill", d => this.colorScale[d])
        //     .attr("text-anchor", "start")
        //     .attr("font", 12)
        //     .attr("dy", (_, i) => 1 + i * 2 + "em")
        //     .text(e => e)
        //     .merge(labels);

    }

    updateToolTip(data, year) {
        const yearData = this._getDataOfYear(data, year)
        this.moveTooltip(year, yearData, 500)
    }

    update(data, speed) {
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
            .domain(this._getYDomain(data, 10))
            .range([this.height - this.margin.top - this.margin.bottom, 0]);

        d3.select(".x-axis")
            .call(d3.axisBottom(this.x));

        d3.select(".y-axis")
            .transition().duration(speed)
            .call(d3.axisLeft(this.y));

        const lines = this.chart
            .selectAll(".line")
            .data(Object.values(data));

        lines
            .enter()
            .append("path")
            .merge(lines)
            .attr("class", "line")
            .attr("id", d => d.key.replace(/\s/g, '').replace("/", ""))
            .style("stroke", d => {
                return this.colorScale[d.key];
            })
            .style("fill", "none")
            .style("stroke-width", 2)
            .transition().duration(speed)
            .style("opacity", d => d.checked ? 1 : 0.2)
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
        // const infoValues = this.infoPanel.selectAll(".infoTextValues")
        //     .data(this.allFeatures)

        const circles = this.focus.selectAll(".hoverCircle")
            .data(this._getActiveFeatures(data))

        // infoValues.enter().append("text")
        //     .attr("class", "infoTextValues")
        //     .attr("fill", d => this.colorScale[d])
        //     .attr("text-anchor", "end")
        //     .attr("fond", 12)
        //     .attr("dy", (_, i) => 1 + i * 2 + "em")
        //     .attr("transform", `translate(${this.infoPanelWidth + this.infoPanelMargin.left + this.infoPanelMargin.right},0)`)
        //     .merge(infoValues);

        circles.enter().append("circle")
            .attr("class", "hoverCircle")
            .style("fill", d => this.colorScale[d.key])
            .attr("r", 3)
            .merge(circles);

        this.chart.select("#tooltip-overlay")
            // .on("mouseover", () => {
            //     this.focus.style("display", null);
            // })
            .on("mouseout", () => {
                const dataOfYear = this._getDataOfYear(data, new Date(this.year))
                this.moveTooltip(new Date(this.year), dataOfYear)
            })
            .on("mousemove", () => {
                const play = document.getElementById("play")
                if (!play.disabled) {
                    // get data of the closest year to the corresponding x value of mouse
                    const years = this._getYears(data)
                    const selectedYear = this._getClosestYearToMouse(years)
                    const dataOfYear = this._getDataOfYear(data, selectedYear)
                    this.moveTooltip(selectedYear, dataOfYear, 80)
                }
            })
            .on("click", () => {
                const years = this._getYears(data)
                const closestYear = this._getClosestYearToMouse(years).getFullYear().toString()
                this.year = closestYear;
                document.getElementsByClassName("year-title")[0].innerHTML = `&nbsp&nbsp-&nbsp&nbsp${closestYear}`
                this.onClick(closestYear, undefined)
            });
    }

    moveTooltip(selectedYear, dataOfYear, duration) {

        this.focus.select(".lineHover")
            .transition().duration(duration)
            .attr("transform", "translate(" + this.x(selectedYear) + "," + this.height + ")");

        this.focus.select(".lineHoverDate")
            .transition().duration(duration)
            .attr("transform",
                "translate(" + this.x(selectedYear) + "," + (this.height + this.margin.bottom) + ")")
            .text(selectedYear.getFullYear().toString());

        this.focus.selectAll(".hoverCircle")
            .transition().duration(duration)
            .attr("cy", e => this.y(dataOfYear[e]))
            .attr("cx", this.x(selectedYear))
            .style("stroke", e => this.colorScale[e])
            .style("fill", "none");

        // this.infoPanel.selectAll(".infoTextValues")
        //     .text(e =>dataOfYear[e])

        d3.selectAll(".valueOfGenre").text(e => dataOfYear[e])

        Object.keys(dataOfYear).forEach(d =>
            document.getElementById(`${d}-value`).innerHTML = Math.round(dataOfYear[d]));
    }

    _getActiveFeatures(data) {
        const activeData = data.filter(d => {
            return d.checked
        })
        return activeData.map(d => d.key)
    }

    _getYears(data) {
        return data[0].data.map(d => new Date(d.year))
    }

    _getClosestYearToMouse(years) {
        const mouseOverDate = this.x.invert(d3.mouse(this.chart.select("#tooltip-overlay").node())[0]);
        const i = d3.bisectLeft(years, mouseOverDate);
        const yearLeft = years[i - 1];
        const yearRight = years[i];
        return mouseOverDate - yearLeft < yearRight - mouseOverDate ? yearLeft : yearRight;
    }

    _getDataOfYear(data, selectedYear) {
        const features = data.map(d => d.key);
        const years = data.map(d => d.data.map(e => e.year))[0];
        const values = data.map(d => d.data.map(e => e.data));
        const formatValue = d3.format(",.2f");

        const dataOfYear = {};
        for (let i in features) {
            dataOfYear[features[i]] = formatValue(values[i][d3.bisectLeft(years.map(d => parseInt(d)), selectedYear.getFullYear())]);
        }
        ;

        for (let i in this.allFeatures) {
            if (!(this.allFeatures[i] in dataOfYear)) {
                dataOfYear[this.allFeatures[i]] = " "
            }
        }
        return dataOfYear
    }

    _getYDomain(data, domainPadding) {
        let max = data.map(genre =>
            genre.checked ? genre.data.map(e => e.data)
                .reduce(function (a, b) {
                    return Math.max(a, b);
                }) : 0)
            .reduce(function (a, b) {
                return Math.max(a, b);
            });

        let min = data.map(genre =>
            genre.checked ? genre.data.map(e => e.data)
                .reduce(function (a, b) {
                    return Math.min(a, b);
                }) : 1000)
            .reduce(function (a, b) {
                return Math.min(a, b);
            });

        max = max + domainPadding
        min = min >= domainPadding ? min - domainPadding : min;

        return [min, max]
    }
}