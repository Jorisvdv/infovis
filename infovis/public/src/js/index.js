import genreData from "./../data/scatterplot.json"
import RadarChart from "./radarChart"
import ScatterPlot from "./scatterPlot"
import LineChart from "./line_chart";
import lineChartData from "../../../../data/data/lineplot_object"
import SeatingChart from "./seatingChart";
import seatingData from "../../../../data/song_data_20200304.json"

import "../style.css"
// scatter plot
const scatterOnClick = () => {
    console.log("scatter")
}

const scatter = new ScatterPlot("div#scatterplot", scatterOnClick)
scatter.init()
scatter.addDropdowns(genreData)
scatter.update(genreData["1999"])


// Radar Chart

const radarOnClick = () => {
    console.log("radr")
}

const chart = new RadarChart(
    "div#radarchart",
    radarOnClick,
    [
        "acousticness",
        "danceability",
        "energy",
        "instrumentalness",
        "liveness",
        "valence",
        "speechiness"
    ]
)
chart.init()

// Line chart
// only show the features selected
function updateLineChart() {
    const data = Array.from(lineChartData).filter(item => {
        const checkbox = document.getElementById(item.key)
        return checkbox ? checkbox.checked : false;
    })

    lineChart.update(data)
}

Array.from(document.getElementsByClassName("line-chart-inputs")[0].children).forEach(element => {
    element.children[0].addEventListener("click", updateLineChart)
})

const onClick = (year) => {
    const data = genreData[year]
    scatter.update(data)
}

const lineChart = new LineChart("#line-chart", onClick);
lineChart.init()
updateLineChart()

// seating chart
const seatingChart = new SeatingChart("seating-chart", () => console.log("yeet"), seatingData)
seatingChart.init()
