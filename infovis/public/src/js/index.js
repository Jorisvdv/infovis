import * as d3 from "d3"
import songData from "./../data/song_data_20200304.json"
import RadarChart from "./radarChart"

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

function getRandomData() {
	let number = Math.ceil(Math.random() * 1000)
	chart.update([songData[number]])
}

document.getElementById("testbutton").addEventListener("click", getRandomData);