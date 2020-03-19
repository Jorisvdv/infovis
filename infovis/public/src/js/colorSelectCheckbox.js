import colors from "./../data/scattercolors.json"

export default class ColorSelectCheckbox {
    constructor(scatter, onClick) {
        this.onClick = onClick
        this.scatter = scatter
    }

    init() {
        Object.keys(colors).forEach(d => {
            const legenda = document.getElementById("genreSelectCheckboxes")
            const selectSquare = document.createElement("div")

            selectSquare.innerHTML = '<input type="checkbox" class="genreSelect" id=' + 
            d.replace(/\s/g, '').replace("/", "") + '-checkbox name="genreSelect">' + d + 
            '<span id="' + `${d}-value` + '" style="float:right">0<span>'

            selectSquare.className = "checkboxSquare selectSquare active"
            selectSquare.style.background = colors[d];
            selectSquare.children[0].checked = true
            selectSquare.style.textDecoration = "overline"
            selectSquare.style.border = "solid 1px " + colors[d]
            selectSquare.style.opacity = "1"
            //selectSquare.style.color = this.genre === d ? "rgba(256, 256, 256, 1)" : "rgba(256, 256, 256, 0)";
            selectSquare.addEventListener("click", (e) => this._onClickLegenda(e, d))
            selectSquare.addEventListener('mouseenter', (e) => this._onHoverLegenda(e, d))
            selectSquare.addEventListener('mouseleave', (e) => this._onMouseLeaveLegenda(e, d))
            legenda.appendChild(selectSquare)
        })
    }

    _updateOpacity() {
        const selects = Array.from(document.getElementsByClassName("genreSelect"))
        selects.forEach(d => {
            if (d.checked) {
                d.parentElement.style.opacity = 1
                d.parentElement.style.textDecoration = "overline"
                // d.parentElement.style.border = "solid 1px black"
            } else {
                d.parentElement.style.opacity = 0.25
                d.parentElement.style.textDecoration = "none"
                d.parentElement.style.border = "solid 1px " + d.parentElement.style.background
            }
        })
    }


    setGenre(genre) {
        const radioButton = document.getElementById("check-" + genre.replace(/\s/g, '').replace("/", ""))
        radioButton.checked = true
        this._updateOpacity()
    }

    _onClickLegenda(event, d) {
        // This is to remove dots from the scatter
        let id = event.target.children[0].id
        let comingIn = event.target.children[0].checked
        console.log("LEgenda", id, comingIn)
        this.scatter.setVisibilityOfCircle(id, !comingIn)


        if (event.target.children[0].checked) {
            event.target.children[0].checked = false
        } else { 
            event.target.children[0].checked = true
        }
        this.onClick()
        console.log("click", d)
        this._updateOpacity()
        //const pageTitle = document.getElementsByClassName("seating-chart-genre")[0].innerHTML = d;
    }

//     function updateScatterPlotVisibility(element) {
//     const id = element.children[0].children[0].id
//     const comingIn = element.children[0].children[0].checked

//     scatter.setVisibilityOfCircle(id, comingIn)
// }

    _onHoverLegenda(event, d) {
        event.target.style.opacity = 1
        event.target.style.border = "solid 1px black"
    }

     _onMouseLeaveLegenda(event, d) {
        event.target.style.opacity = 0.25
        event.target.style.border = "solid 1px " + colors[d]
        if (event.target.children[0].checked) {
            event.target.style.opacity = 1
            event.target.style.textDecoration = "overline"
        }
    }
}