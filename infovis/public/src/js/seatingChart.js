import * as d3 from "d3";

export default class SeatingChart {
    constructor(selector, onClick, data) {
        this.selector = selector;
        this.onClick = onClick;
        this.data = data
        this.year = "1999"
    }

    init() {
        // init the chart here
        this.color = d3.scaleOrdinal(d3.schemeTableau10)

        const chart = document.getElementsByClassName(this.selector)[0]
        this.data.forEach(d => {
            const square = document.createElement("div")
            square.innerHTML = d[this.year];
            square.className = "square"
            square.style.background = this.color(d["genre"]);
            chart.appendChild(square)
        })

    }

    update(year) {
        // update the chart
    }
}