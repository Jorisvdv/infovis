import * as d3 from "d3";
import debounce from "lodash.debounce"
import colors from "./../data/scattercolors.json"

export default class SeatingChart {
    constructor(selector, onClick, data) {
        this.selector = selector;
        this.onClick = onClick;
        this.data = data;
        this.year = "1999"
    }

    init() {
        // init the chart here
        const chart = document.getElementsByClassName(this.selector)[0]
        const data = this.data.sort((a, b) => {
            return a[this.year] - b[this.year]
        }).filter(a => Number.isInteger(a[this.year]))
        data.forEach(d => {
            const square = document.createElement("div")
            square.innerHTML = d[this.year];
            square.className = "square"
            square.style.background = colors[d["genre"]];
            square.style.opacity = this.genre === d["genre"] ? "1" : "0.25";
            square.style.color = this.genre === d["genre"] ? "rgba(256, 256, 256, 1)" : "rgba(256, 256, 256, 0)";
            chart.appendChild(square)
        })
    }

    _onMouseMove(event) {
                const tooltip = document.getElementById("seating-chart-tooltip")

        tooltip.style.left = `${event.pageX}px`;
        tooltip.style.top = `${event.pageY}px`;
    }

    _onHover(event, entry, year) {
        const tooltip = document.getElementById("seating-chart-tooltip")
        tooltip.children[0].children[0].src = entry.image_640
        tooltip.children[1].innerHTML = '<i class="fas fa-lg fa-music"></i>'+ entry.title;
        tooltip.children[2].innerHTML = '<i class="fas fa-lg fa-user"></i>' + entry.artist;
        tooltip.children[3].innerHTML = '<i class="fas fa-lg fa-hashtag"></i>' + entry[year];
        console.log(tooltip.children[2]);
        tooltip.style.display = "flex";
        tooltip.style.position = "absolute";
        tooltip.style.left = `${event.pageX+20}px`;
        tooltip.style.top = `${event.pageY}px`;
    }

    _onMouseLeave() {
        const tooltip = document.getElementById("seating-chart-tooltip")
        tooltip.style.display = "none"
    }


    update(year, genre) {
        if (year !== undefined) {
            this.year = year;
        }
        this.genre = genre;
        const chart = document.getElementsByClassName(this.selector)[0]
        chart.innerHTML = ''
        let data = this.data
            .filter(a => {
                return Number.isInteger(a[this.year])
            }).sort((a, b) => {
                return a[this.year] - b[this.year]
        })
        data.forEach(d => {
            const square = document.createElement("div")
            square.innerHTML = d[this.year];
            square.style.background = colors[d["genre"]];
            square.style.opacity = this.genre === d["genre"] ? "1" : "0.25";
            square.style.color = this.genre === d["genre"] ? "rgba(256, 256, 256, 1)" : "rgba(256, 256, 256, 0)";
            if (this.genre === d["genre"]) {
                square.addEventListener('mouseenter', (e) => this._onHover(e, d, this.year))
                square.addEventListener('mouseleave', () => this._onMouseLeave())
                square.addEventListener("click", () => this.onClick(d))
                square.className = "square active"
            } else {
                square.className = "square"
            }
            chart.appendChild(square)
        })
    }
}