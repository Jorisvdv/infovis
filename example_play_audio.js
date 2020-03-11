const x = document.getElementById("myAudio"); 
// At start, do not play music
let playing = false;


function update_song(trackobject, year){
// Update song data

document.getElementById("titlesong").innerHTML = trackobject["title"];
document.getElementById("artistsong").innerHTML = trackobject["artist"];
document.getElementById("release_year").innerHTML = trackobject.release_year;
document.getElementById("top_year").innerHTML = [year]
document.getElementById("chart_position").innerHTML = trackobject[year];
document.getElementById("genre").innerHTML = trackobject.genre;
document.getElementById("duration").innerHTML = (Math.floor((trackobject.duration/1000)/60)+":"+Math.round(trackobject.duration/1000%60));


document.getElementById("albumlink").src= trackobject.image_640;
// Check if preview url is truthy
if (trackobject.preview_url){
    document.getElementById("audiolink").src= trackobject.preview_url;
    // Show play button if no audio link
    document.getElementsByClassName("btn").display = "block";
} else {
    document.getElementById("audiolink").src= "";
    // Hide play button if no audio link
    document.getElementsByClassName("btn").display = "none";
}
}
function playAudio() {
if (!playing){
  x.play();
  playing = true;
  }

else if (playing){
	x.pause();
    playing = false;
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

function endAudio(){
    playing = false;
    playButton.goToNextState();
}

playButton.init();



// Hardcoded values
// Billie Jean,Michael Jackson,1983,5ChkMS8OtdzJeqyybCc9R5,173,422,310,313,315,222,239,260,370,266,27,64,96,83,132,128,126,123,113,82,130,spotify:artist:3fMbdgg4jU18AjLCKBhRSm,spotify:album:1C2h7mLntPSeVYciMRTF4a,https://i.scdn.co/image/ab67616d0000b2734121faee8df82c526cbab2be,https://i.scdn.co/image/ab67616d000048514121faee8df82c526cbab2be,80,293826,https://p.scdn.co/mp3-preview/f504e6b8e037771318656394f532dede4f9bcaea?cid=1a316693f32b4bd4acee870703d5338b,0.0236,0.92,0.654,0.0158,0.0359,-3.051,0.0401,117.046,0.847,Pop
// let micheal_jackson = {
//     title : "Billie Jean", artist : "Michael Jackson", release_year : 1983, top_year : "1999",
//     chart_position : 173, genre : "Pop", duration : 293826, 
//     albumlink : "https://i.scdn.co/image/ab67616d0000b2734121faee8df82c526cbab2be",
//     audiolink : "https://p.scdn.co/mp3-preview/f504e6b8e037771318656394f532dede4f9bcaea?cid=1a316693f32b4bd4acee870703d5338b"};

let micheal_jackson = {
    "title":"Billie Jean",
    "artist":"Michael Jackson",
    "release_year":1983,
    "track_id":"5ChkMS8OtdzJeqyybCc9R5",
    "1999":173,
    "2000":422,
    "2001":310,
    "2002":313,
    "2003":315,
    "2004":222,
    "2005":239,
    "2006":260,
    "2007":370,
    "2008":266,
    "2009":27,
    "2010":64,
    "2011":96,
    "2012":83,
    "2013":132,
    "2014":128,
    "2015":126,
    "2016":123,
    "2017":113,
    "2018":82,
    "2019":130,
    "artist_id":"spotify:artist:3fMbdgg4jU18AjLCKBhRSm",
    "album_id":"spotify:album:1C2h7mLntPSeVYciMRTF4a",
    "image_640":"https:\/\/i.scdn.co\/image\/ab67616d0000b2734121faee8df82c526cbab2be",
    "image_64":"https:\/\/i.scdn.co\/image\/ab67616d000048514121faee8df82c526cbab2be",
    "popularity":80,
    "duration":293826,
    "preview_url":"https:\/\/p.scdn.co\/mp3-preview\/f504e6b8e037771318656394f532dede4f9bcaea?cid=1a316693f32b4bd4acee870703d5338b",
    "acousticness":0.0236,
    "danceability":0.92,
    "energy":0.654,
    "instrumentalness":0.0158,
    "liveness":0.0359,
    "loudness":-3.051,
    "speechiness":0.0401,
    "tempo":117.046,
    "valence":0.847,
    "genre":"Pop"
}

//  Test hardcoded value
update_song(micheal_jackson, "1999")