import genreData from "./../../../../data/data/scatterplot.json"
import RadarChart from "./radarChart"
import ScatterPlot from "./scatterPlot"
import LineChart from "./line_chart";
import lineChartData from "../../../../data/data/lineplot_object"
import SeatingChart from "./seatingChart";
import seatingData from "../../../../data/song_data_20200304.json"

import "normalize.css"
import "../style.css"

let _year = "1999"
let _genre = "Rock"
let _mute = true;

const mute = document.getElementById("mute")
    mute.addEventListener("click", () => {
    _mute = !_mute
    mute.innerHTML = _mute ? "unmute" : "mute";
    if (_mute) {
        const audio = document.getElementById("audio")
        audio.pause()
    }
})

// scatter plot
const showSeatingChart = () => {
    // Show the seating chart
    const seatingChartElement = document.getElementsByClassName("seating-chart-container")[0]
    seatingChartElement.style.display = "flex"
    // hide the scatter plot
    const scatterPlotElement = document.getElementById("scatterplot")
    scatterPlotElement.style.display = "none";

    // show seating chart title
    const seatingChartTitle = document.getElementsByClassName("seating-chart-title")[0]
    seatingChartTitle.style.display = "flex"
    seatingChartTitle.children[1].innerHTML = _genre;

    // hide scatter plot title
    const leftTitle = document.getElementsByClassName("left-title")[0]
    leftTitle.style.display = "none";

        document.getElementsByClassName("song-details")[0].style.display = "initial"

}

const hideSeatingChart = () => {
    // hide the seating chart
    const seatingChartElement = document.getElementsByClassName("seating-chart-container")[0]
    seatingChartElement.style.display = "none"
    // show the scatter plot
    const scatterPlotElement = document.getElementById("scatterplot")
    scatterPlotElement.style.display = "initial";

    // hide seating chart title
    const seatingChartTitle = document.getElementsByClassName("seating-chart-title")[0]
    seatingChartTitle.style.display = "none"

    // show scatter plot title
    const leftTitle = document.getElementsByClassName("left-title")[0]
    leftTitle.style.display = "initial";

    document.getElementsByClassName("song-details")[0].style.display = "none"

    document.getElementById("audio").pause()
}

document.getElementsByClassName("seating-chart-back")[0].addEventListener("click", hideSeatingChart)


const updateGenreDetails = () => {
    let data = undefined;
    genreData[_year].forEach(genre => {
        if (genre.genre === _genre) {
            data = genre
        }
    })

    const genreDetails = Array.from(document.getElementsByClassName("genre-detail"))
    // Mean tempo
    genreDetails[0].children[1].innerHTML = ""+ Math.floor(data.tempo);

    // times in list
    genreDetails[1].children[1].innerHTML = "" + data.size

    // mean release yer
    genreDetails[2].children[1].innerHTML = "" + data.release_year.toFixed(1)

    // Mean Length
    genreDetails[3].children[1].innerHTML = "" + data.duration.toFixed(2)
}

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

const scatterOnClick = (genre) => {
    _genre = genre;
    seatingChart.update(_year, genre)
    showSeatingChart()
    updateGenreDetails()
}

const scatter = new ScatterPlot("div#scatterplot", scatterOnClick, radarChart)
scatter.init()
scatter.addDropdowns(genreData)
scatter.update(genreData[_year], _year)

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
    scatter.update(data, _year)
    seatingChart.update(_year, _genre)
}

const lineChart = new LineChart("#line-chart", onClick);
lineChart.init()
updateLineChart()

// seating chart
const seatingChartOnclick = (entry) => {
    for (let i=0; i<genreData[_year].length;i++) {
        if (genreData[_year][i]["genre"] === entry.genre) {
            radarChart.update([genreData[_year][i], entry])
        }
    }

    //radarChart.update([entry])

    const albumArt = document.getElementsByClassName("song-details-album-art")[0]
    const songInfo = Array.from(document.getElementsByClassName("song-detail"))

    songInfo[0].children[1].innerHTML = entry.artist;
    songInfo[1].children[1].innerHTML = entry.title;
    albumArt.src = entry.image_640;
    const audio = document.getElementById("audio")

    if (entry.preview_url && !_mute) {
        audio.src = entry.preview_url
    } else {
        audio.pause();
    }

}
const seatingChart = new SeatingChart("seating-chart", seatingChartOnclick, seatingData)
seatingChart.init()

seatingChart.update(_year, "Rock")