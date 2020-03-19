import genreData from "../../../../data/data/scatterplot.json";
import RadarChart from "./radarChart";
import ScatterPlot from "./scatterPlot";
import LineChart from "./line_chart";
import lineChartData from "../../../../data/data/lineplot_genre_object.json"
import SeatingChart from "./seatingChart";
import seatingData from "../../../../data/song_data_20200304.json"
import ColorSelect from "./colorSelect.js"
import ColorSelectCheckbox from "./colorSelectCheckbox.js"

import "normalize.css"
import "../style.css"

let _year = "1999"
let _genre = "Rock"
let _mute = true;

const mute = document.getElementById("mute")
    mute.addEventListener("click", () => {
    _mute = !_mute;
    mute.childNodes[0].className = _mute ? "fas fa-volume-mute" : "fas fa-volume-up";
    if (_mute) {
        const audio = document.getElementById("audio")
        audio.pause()
    }
})

const play = document.getElementById("play")
play.addEventListener("click", () => {
    play.disabled = true;
    let counter = 0
    const startYear = 1999;
    const callback = () => {
        const year = "" + (startYear + counter)
        counter++;
        onClick(year, _genre)
        lineChart.updateToolTip(lineChartData, new Date(year))
        if (counter < 21) {
            setTimeout(callback, 1000)
        } else {
            play.disabled = false
        }
    }
    setTimeout(callback, 1000)
})

// scatter plot
const showSeatingChart = () => {
    // Show the seating chart
    const seatingChartElement = document.getElementsByClassName("seating-chart-container")[0]
    seatingChartElement.style.display = "flex"
    // hide the scatter plot
    const scatterPlotElement = document.getElementById("scatterplot")
    scatterPlotElement.style.display = "none";

    const seatingChartLegenda = document.getElementsByClassName("genre-select-container")[0]
    seatingChartLegenda.style.display = "flex"

    const genreSelect = document.getElementById("genreSelectCheckboxes")
    genreSelect.style.display = "none"

    // show seating chart title
    const seatingChartTitle = document.getElementsByClassName("seating-chart-title")[0]
    seatingChartTitle.style.display = "flex"
    seatingChartTitle.children[1].innerHTML = _genre;

    // hide scatter plot title
    const leftTitle = document.getElementsByClassName("left-title")[0]
    leftTitle.style.display = "none";

    document.getElementsByClassName("song-details")[0].style.display = "initial"
    document.getElementById("right-title").innerHTML = "Song Details"
    animateLeave()

}

const hideSeatingChart = () => {
    // hide the seating chart
    const seatingChartElement = document.getElementsByClassName("seating-chart-container")[0]
    seatingChartElement.style.display = "none"
    // show the scatter plot
    const scatterPlotElement = document.getElementById("scatterplot")
    scatterPlotElement.style.display = "flex";

    const seatingChartLegenda = document.getElementsByClassName("genre-select-container")[0]
    seatingChartLegenda.style.display = "none"

    // hide seating chart title
    const seatingChartTitle = document.getElementsByClassName("seating-chart-title")[0]
    seatingChartTitle.style.display = "none"

    const genreSelect = document.getElementById("genreSelectCheckboxes")
    genreSelect.style.display = "flex"

    // show scatter plot title
    const leftTitle = document.getElementsByClassName("left-title")[0]
    leftTitle.style.display = "flex";

    document.getElementsByClassName("song-details")[0].style.display = "none"
    document.getElementById("right-title").innerHTML = "Genre Details"

    document.getElementById("audio").pause()
    animateLeave()
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
    genreDetails[1].children[2].innerHTML = ""+ Math.floor(data.tempo);

    // times in list
    genreDetails[2].children[2].innerHTML = "" + data.size

    // mean release yer
    genreDetails[3].children[2].innerHTML = "" + data.release_year.toFixed(1)

    // Mean Length
    genreDetails[4].children[2].innerHTML = "" + data.duration.toFixed(2)
}

const animateEnter = () => {
        const genreDetails = Array.from(document.getElementsByClassName("genre-detail"))
        genreDetails[1].children[1].setAttribute("id", "movable-detail-forward")
        genreDetails[2].children[1].setAttribute("id", "movable-detail-forward")
        genreDetails[3].children[1].setAttribute("id", "movable-detail-forward")
        genreDetails[4].children[1].setAttribute("id", "movable-detail-forward")

        setTimeout(function() {
            genreDetails[0].children[0].style.display = "flex"
            genreDetails[1].children[0].style.display = "flex"
            genreDetails[2].children[0].style.display = "flex"
            genreDetails[3].children[0].style.display = "flex"
            genreDetails[4].children[0].style.display = "flex"
            genreDetails[1].children[1].setAttribute("id", "movable-detail-enter-correct")
            genreDetails[2].children[1].setAttribute("id", "movable-detail-enter-correct")
            genreDetails[3].children[1].setAttribute("id", "movable-detail-enter-correct")
            genreDetails[4].children[1].setAttribute("id", "movable-detail-enter-correct")
            }, 600)

        setTimeout(function(){
            genreDetails[0].children[0].setAttribute("id", "detail-become-visible")
            genreDetails[1].children[0].setAttribute("id", "detail-become-visible")
            genreDetails[2].children[0].setAttribute("id", "detail-become-visible")
            genreDetails[3].children[0].setAttribute("id", "detail-become-visible")
            genreDetails[4].children[0].setAttribute("id", "detail-become-visible")
        }, 1100)
    }

const animateLeave = () => {
        const genreDetails = Array.from(document.getElementsByClassName("genre-detail"))
        genreDetails[0].children[0].setAttribute("id", "detail-become-invisible")
        genreDetails[1].children[0].setAttribute("id", "detail-become-invisible")
        genreDetails[2].children[0].setAttribute("id", "detail-become-invisible")
        genreDetails[3].children[0].setAttribute("id", "detail-become-invisible")
        genreDetails[4].children[0].setAttribute("id", "detail-become-invisible")
        document.getElementById("radarchart").setAttribute("class", "moveable-backward-radarchart")

        setTimeout(function(){
            genreDetails[0].children[0].style.display = "none"
            genreDetails[1].children[0].style.display = "none"
            genreDetails[2].children[0].style.display = "none"
            genreDetails[3].children[0].style.display = "none"
            genreDetails[4].children[0].style.display = "none"
            genreDetails[1].children[1].setAttribute("id", "movable-detail-leave-correct")
            genreDetails[2].children[1].setAttribute("id", "movable-detail-leave-correct")
            genreDetails[3].children[1].setAttribute("id", "movable-detail-leave-correct")
            genreDetails[4].children[1].setAttribute("id", "movable-detail-leave-correct")
        }, 600)

        setTimeout(function() {
                genreDetails[1].children[1].setAttribute("id", "movable-detail-backward")
                genreDetails[2].children[1].setAttribute("id", "movable-detail-backward")
                genreDetails[3].children[1].setAttribute("id", "movable-detail-backward")
                genreDetails[4].children[1].setAttribute("id", "movable-detail-backward")
            }, 1100)
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
    document.getElementsByClassName("year-title")[0].innerHTML = `&nbsp&nbsp-&nbsp&nbsp${_year}`
    colorSelect.setGenre(genre)
    updateGenreDetails()
    animateEnter()
}


const scatter = new ScatterPlot("div#scatterplot", scatterOnClick, radarChart)
scatter.init()
scatter.addDropdowns(genreData)
scatter.update(genreData[_year], _year)

// Line chart
// only show the features selected
function updateLineChart() {
    const data = Array.from(lineChartData)
    
    data.forEach(item => {
        const checkbox = document.getElementById(item.key.replace(/\s/g, '').replace("/", "") + "-checkbox")
        item.checked = checkbox ? checkbox.checked : false;
    })

    lineChart.update(data, 1000)
}

const onClick = (year, genre) => {
    if (year !== undefined) { 
        _year = year;
        const data = genreData[year]
        scatter.update(data, _year)
    }
    if (genre !== undefined) {_genre = genre;}
    seatingChart.update(_year, _genre)
}


const lineChart = new LineChart("#line-chart", onClick);
lineChart.init()
updateLineChart()

const colorSelectCheckbox = new ColorSelectCheckbox(scatter, updateLineChart)
colorSelectCheckbox.init()

// seating chart
const seatingChartOnclick = (entry) => {
    for (let i=0; i<genreData[_year].length;i++) {
        if (genreData[_year][i]["genre"] === entry.genre) {
            radarChart.update([genreData[_year][i], entry])
        }
    }
    
    const albumArt = document.getElementsByClassName("song-details-album-art")[0]
    const songInfo = Array.from(document.getElementsByClassName("song-detail"))
    const songDetail = Array.from(document.getElementsByClassName("genre-detail"))

    songDetail[1].children[0].innerHTML = entry.tempo.toFixed(2);
    songDetail[2].children[0].innerHTML = 1;
    songDetail[3].children[0].innerHTML = entry.release_year;
    songDetail[4].children[0].innerHTML = Math.round((parseInt(entry.duration) / 60000) * 100)/100;

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

const colorSelect = new ColorSelect(seatingChart, onClick)
colorSelect.init()
updateLineChart()