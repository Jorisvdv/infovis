import genreData from "./../data/scatterplot.json"
import RadarChart from "./radarChart"
import ScatterPlot from "./scatterPlot"
import LineChart from "./line_chart";
import lineChartData from "../../../../data/data/lineplot_object"
import SeatingChart from "./seatingChart";
import seatingData from "../../../../data/song_data_20200304.json"

import "../style.css"

let _year = "1999"
let _genre = "Rock"
// scatter plot
const scatterOnClick = (genre) => {
    _genre = genre;
    seatingChart.update(_year, genre)
}

const scatter = new ScatterPlot("div#scatterplot", scatterOnClick)
scatter.init()
scatter.addDropdowns(genreData)
scatter.update(genreData[_year])


// Radar Chart


const radarOnClick = () => {
    console.log("radr")
}

const radarChart = new RadarChart(
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
radarChart.init()

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
    _year = year;
    const data = genreData[year]
    scatter.update(data)
    seatingChart.update(_year, _genre)
}

const lineChart = new LineChart("#line-chart", onClick);
lineChart.init()
updateLineChart()

// seating chart
const seatingChartOnclick = (entry) => {
    console.log(entry)
    radarChart.update([entry])
}
const seatingChart = new SeatingChart("seating-chart", seatingChartOnclick, seatingData)
seatingChart.init()

seatingChart.update(_year, "Rock")