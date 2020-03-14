import * as d3 from "d3"
import songData from "./../data/song_data_20200304.json"
import genreData from "./../data/scatterplot.json"
import RadarChart from "./radarChart"
import ScatterPlot from "./scatterPlot"
import LineChart from "./line_chart";

import lineChartData from "../../../../data/data/lineplot_object"

function onClickTest() {
	return
}

const chart = new RadarChart("div#radarchart", onClickTest)
chart.setFeatures(["acousticness", "danceability", "energy",
	 "instrumentalness", "liveness", "valence", "speechiness"])
chart.init()
chart.update([songData[10]])

var scatter = new ScatterPlot("div#scatterplot", onClickTest)
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

