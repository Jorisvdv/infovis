import colors from "./../data/scattercolors.json"

export default class ColorSelect {
    constructor(seatingChart, onClick) {
        this.seatingChart = seatingChart
        this.onClick = onClick
    }

    init() {
        Object.keys(colors).forEach(d => {
            const legenda = document.getElementsByClassName("genre-select-container")[0]
            const selectSquare = document.createElement("div")
            selectSquare.innerHTML = '<input type="radio" class="genreSelect" id=radio-' + d.replace(/\s/g, '').replace("/", "") + ' name="genreSelect">' + d
            selectSquare.className = "radio-square selectSquare"
            selectSquare.style.background = colors[d];
            selectSquare.style.border = "solid 1px " + colors[d]
            selectSquare.style.opacity = this.genre === d ? "1" : "0.25";
            // selectSquare.style.color = this.genre === d ? "rgba(256, 256, 256, 1)" : "rgba(256, 256, 256, 0)";
            selectSquare.addEventListener("click", (e) => this._onClickLegenda(e, d))
            // selectSquare.addEventListener('mouseenter', (e) => this._onHoverLegenda(e, d))
            // selectSquare.addEventListener('mouseleave', () => this._onMouseLeaveLegenda())
            legenda.appendChild(selectSquare)
        })
    }

    _updateOpacity() {
        const selects = Array.from(document.getElementsByClassName("genreSelect"))
        selects.forEach(d => {
            if (d.checked) {
                d.parentElement.style.opacity = 1
                d.parentElement.style.border = "solid 1px black"
            } else {
                d.parentElement.style.opacity = 0.25
                d.parentElement.style.border = "solid 1px " + d.parentElement.style.background
            }
        })
    }

    setGenre(genre) {
        const radioButton = document.getElementById("radio-" + genre.replace(/\s/g, '').replace("/", ""))
        radioButton.checked = true
        this._updateOpacity()
    }

    _onClickLegenda(event, d) {
        event.target.children[0].checked = true
        this.onClick(undefined, d)
        this._updateOpacity()
        const pageTitle = document.getElementsByClassName("seating-chart-genre")[0].innerHTML = d;
    }

    _onHoverLegenda(event, d) {
        const tooltip = document.getElementById("genre-select-tooltip")
        tooltip.style.left = `${event.pageX-90}px`
        tooltip.style.top = `${event.pageY-50}px`
        tooltip.style.display = "flex";
        tooltip.style.position = "absolute";
        tooltip.children[0].innerHTML = d
    }

     _onMouseLeaveLegenda() {
        const tooltip = document.getElementById("genre-select-tooltip")
        tooltip.style.display = "none"
    }
}