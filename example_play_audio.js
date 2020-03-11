
const x = document.getElementById("myAudio"); 
// At start, do not play music
let playing = false;

// Billie Jean,Michael Jackson,1983,5ChkMS8OtdzJeqyybCc9R5,173,422,310,313,315,222,239,260,370,266,27,64,96,83,132,128,126,123,113,82,130,spotify:artist:3fMbdgg4jU18AjLCKBhRSm,spotify:album:1C2h7mLntPSeVYciMRTF4a,https://i.scdn.co/image/ab67616d0000b2734121faee8df82c526cbab2be,https://i.scdn.co/image/ab67616d000048514121faee8df82c526cbab2be,80,293826,https://p.scdn.co/mp3-preview/f504e6b8e037771318656394f532dede4f9bcaea?cid=1a316693f32b4bd4acee870703d5338b,0.0236,0.92,0.654,0.0158,0.0359,-3.051,0.0401,117.046,0.847,Pop
let title = "Billie Jean";
let artist = "Michael Jackson";
let release_year = 1983;
let top_year = "1999"
let chart_position = 173;
let genre = "Pop";
let duration = 293826;
let albumlink = "https://i.scdn.co/image/ab67616d0000b2734121faee8df82c526cbab2be";
let audiolink = "https://p.scdn.co/mp3-preview/f504e6b8e037771318656394f532dede4f9bcaea?cid=1a316693f32b4bd4acee870703d5338b";




// Update song data
document.getElementById("titlesong").innerHTML = title;
document.getElementById("artistsong").innerHTML = artist;
document.getElementById("release_year").innerHTML = release_year;
document.getElementById("top_year").innerHTML = top_year
document.getElementById("chart_position").innerHTML = chart_position;
document.getElementById("genre").innerHTML = genre;
document.getElementById("duration").innerHTML = (Math.floor((duration/1000)/60)+":"+Math.round(duration/1000%60));

document.getElementById("albumlink").src= albumlink;
// Check if preview url is truthy
if (audiolink){
    document.getElementById("audiolink").src= audiolink;
} else {
    document.getElementById("audiolink").src= "";
    // Future: hide play button
}

function playAudio() {
if (!playing){
  x.play();
  playing = true;
  document.getElementById("buttontext").src="pause-button.svg";
  }

else if (playing){
	x.pause();
    playing = false;
    document.getElementById("buttontext").src= "play-button.svg";
};
} 

/* global d3, document */
var playButton = {
  el: document.querySelector(".js-button"),

  states: {
      playing: {
          nextState: "paused",
          iconEl: document.querySelector("#pause-icon")
      },
      paused:  {
          nextState: "playing",
          iconEl: document.querySelector("#play-icon")
      }
  },

  animationDuration: 350,

  init: function () {
      this.setInitialState();
      this.replaceUseEl();
      this.el.addEventListener("click", this.goToNextState.bind(this));
  },

  setInitialState: function () {
    var initialIconRef = this.el.querySelector("use").getAttribute("xlink:href");
    var stateName = this.el.querySelector(initialIconRef).getAttribute("data-state");
    this.setState(stateName);
  },

  replaceUseEl: function () {
      d3.select(this.el.querySelector("use")).remove();
      d3.select(this.el.querySelector("svg")).append("path")
          .attr("class", "js-icon")
          .attr("d", this.stateIconPath());
  },

  goToNextState: function () {
      this.setState(this.state.nextState);

      d3.select(this.el.querySelector(".js-icon")).transition()
          .duration(this.animationDuration)
          .attr("d", this.stateIconPath());
  },

  setState: function (stateName) {
      this.state = this.states[stateName];
  },

  stateIconPath: function () {
      return this.state.iconEl.getAttribute("d");
  }
};

playButton.init();