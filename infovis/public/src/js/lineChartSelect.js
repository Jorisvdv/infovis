import * as d3 from "d3"
import colors from "./../data/scattercolors.json"

export default class lineChartSelect {
    constructor(onClick) {
        this.onClick = onClick
    }

    init() {
        Object.keys(colors).forEach(d => {
            const legenda = document.getElementsByClassName("line-chart-inputs")[0]
            const gridItem = document.createElement("div")
            gridItem.innerHTML = `<label><input type="checkbox" checked="checked" class="genreCheckbox" id="${d}-checkbox" name="genreCheckbox">${d}</label>` 
            gridItem.className = "gridItem"
            gridItem.style.border = "1px solid rgb(255, 255, 255)"
            gridItem.style.background = colors[d];
            gridItem.style.padding = "10px"

            const valueOfGenre = document.createElement("div")
            valueOfGenre.id = `${d}-value`
            valueOfGenre.className = "valueOfGenre"
            valueOfGenre.style.textAlign = "right"
            
            gridItem.appendChild(valueOfGenre)
            
            legenda.appendChild(gridItem)
        })
    }
}