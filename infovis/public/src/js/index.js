import * as d3 from "d3"
import songData from "./../data/song_data_20200304.json"
import radar from "./radarchart"
import RadarChart from "./radarChart2"

const features = ["acousticness", "danceability", "energy",
	 "instrumentalness", "liveness", "valence", "speechiness"];

function test() {
	return
}


//radar("div#radarchart", [songData[0]], 1, features)
const chart = new RadarChart("div#radarchart", test())
chart.setFeatures(["acousticness", "danceability", "energy",
	 "instrumentalness", "liveness", "valence", "speechiness"])
chart.init()
chart.update([songData[0]])