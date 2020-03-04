import * as d3 from "d3"
import songData from "./../data/song_data_20200304.json"
import radar from "./radarchart"

const features = ["acousticness", "danceability", "energy",
	 "instrumentalness", "liveness", "valence", "speechiness"];

radar("div#radarchart", [songData[0]], 1, features)
