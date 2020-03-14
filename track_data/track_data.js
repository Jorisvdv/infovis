const x = document.getElementById("myAudio"); 
// At start, do not play music
let playing = false;


function update_song(trackobject, year){
    // Update song data

    // Adjust all HTML elements that display track data
    document.getElementById("titlesong").innerHTML = trackobject["title"];
    document.getElementById("artistsong").innerHTML = trackobject["artist"];
    document.getElementById("release_year").innerHTML = trackobject.release_year;
    document.getElementById("top_year").innerHTML = [year];
    document.getElementById("chart_position").innerHTML = trackobject[year];
    document.getElementById("genre").innerHTML = trackobject.genre;
    document.getElementById("duration").innerHTML = (Math.floor((trackobject.duration/1000)/60)+":"+Math.round(trackobject.duration/1000%60));
    // Adjust image source to album art of track.
    document.getElementById("albumlink").src= trackobject.image_640;

    // Add audio preview
    // Check if preview url is truthy
    if (trackobject.preview_url){
        console.log("Has audio link: ", trackobject.preview_url);
        // document.getElementById("audiolink").src =trackobject.preview_url;
        x.src=trackobject.preview_url;
        // Show play button if audio link
        document.getElementsByClassName("btn")[0].style.display = 'initial';
        //load in audio file
         x.load()
        
    } else {
        console.log("No audio link");
        document.getElementById("audiolink").src= "";
        // Hide play button if no audio link
        document.getElementsByClassName("btn")[0].style.display = "none"
    }
    //load in audio file
}


function playAudio() {
// Function to control audio playback
    if (!playing){
    x.play();
    playing = true;
    }

    else if (playing){
        x.pause();
        playing = false;
    };
}

// Control animation of play button
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

// Initialize play button of website load.
playButton.init();

// Hardcoded test track data
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

//  Test hardcoded value, pass track object and selected year to update values.
update_song(micheal_jackson, "1999")