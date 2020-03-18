import colors from "./../data/scattercolors.json"

export default class lineChartSelect {
    constructor(onClick) {
        this.onClick = onClick
    }

    init() {
        Object.keys(colors).forEach(d => {
            const legenda = document.getElementsByClassName("line-chart-inputs")[0]
            const selectRect = document.createElement("rect")
            selectRect.innerHTML = '<label style="stroke:black"><input type="checkbox" checked="checked" class="genreCheckbox" id="' + d + '-checkbox" name="genreCheckbox">' + d.replace(/\s/g, '') + '</label>' 
            selectRect.className = "rectange selectRect"
            selectRect.style.background = colors[d];
            legenda.appendChild(selectRect)
        })
    }
}