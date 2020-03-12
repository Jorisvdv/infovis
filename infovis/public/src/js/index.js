import * as d3 from "d3"
import songData from "./../data/song_data_20200304.json"
import genreData from "./../data/scatterplot2.json"
import RadarChart from "./radarChart"
import ScatterPlot from "./scatterPlot"

const features = ["acousticness", "danceability", "energy",
	 "instrumentalness", "liveness", "valence", "speechiness"];

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
console.log(scatter.width)
scatter.update(genreData, 1999, "acousticness", "danceability")

function dropdownUpdate() {
	let year = d3.select("#year").property('value')
	let xFeature = d3.select("#xFeature").property('value')
	let yFeature = d3.select("#yFeature").property('value')
	console.log(year, xFeature, yFeature)
	scatter.update(genreData, year, xFeature, yFeature)
}

scatter.addDropdowns(genreData, dropdownUpdate)

function getRandomData() {
	let number = Math.ceil(Math.random() * 1000)
	chart.update([songData[number]])
}

document.getElementById("testbutton").addEventListener("click", getRandomData);