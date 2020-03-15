export default class PlayButton {


    init() {
        this.el = document.querySelector(".js-button"),
            this.animationDuration = 350;
        this.setInitialState();
        this.replaceUseEl();
        this.el.addEventListener("click", this.goToNextState.bind(this));
        this.states = {
            playing: {
                nextState: "paused",
                iconEl: document.querySelector("#pause-icon")
            },
            paused: {
                nextState: "playing",
                iconEl: document.querySelector("#play-icon")
            }
        }
    }

    setInitialState() {
        const initialIconRef = this.el.querySelector("use").getAttribute("xlink:href");
        const stateName = this.el.querySelector(initialIconRef).getAttribute("data-state");
        this.setState(stateName);
    }

    replaceUseEl() {
        d3.select(this.el.querySelector("use")).remove();
        d3.select(this.el.querySelector("svg")).append("path")
            .attr("class", "js-icon")
            .attr("d", this.stateIconPath());
    }

    goToNextState() {
        this.setState(this.state.nextState);

        d3.select(this.el.querySelector(".js-icon")).transition()
            .duration(this.animationDuration)
            .attr("d", this.stateIconPath());
    }

    setState(stateName) {
        this.state = this.states[stateName];
    }

    stateIconPath() {
        return this.state.iconEl.getAttribute("d");
    }
};