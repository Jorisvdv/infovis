import * as d3 from "d3"
import genreData from "./../data/scatterplot.json"
import RadarChart from "./radarChart"
import ScatterPlot from "./scatterPlot"
import LineChart from "./line_chart";
import lineChartData from "../../../../data/data/lineplot_object"

// scatter plot
const scatterOnClick = () => {
    console.log("scatter")
}

const scatter = new ScatterPlot("div#scatterplot", scatterOnClick)
scatter.init()

function dropdownUpdate() {
    let year = d3.select("#year").property('value')
    let xFeature = d3.select("#xFeature").property('value')
    let yFeature = d3.select("#yFeature").property('value')
    scatter.update(genreData, year, xFeature, yFeature)
}

scatter.addDropdowns(genreData, dropdownUpdate)
scatter.update(genreData, 1999,
    d3.select("#xFeature").property('value'),
    d3.select("#yFeature").property('value'))


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
    console.log(year);
}

const lineChart = new LineChart("#line-chart", onClick);
lineChart.init()
updateLineChart()

