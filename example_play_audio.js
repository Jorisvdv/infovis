
const x = document.getElementById("myAudio"); 
// At start, do not play music
let playing = false;


// Example song data
let title = "Heartbreak Hotel";
let artist = "Elvis Presley";
let albumlink = "https://i.scdn.co/image/ab67616d0000b27320ee3e86e17f17239bef1f76";
let audiolink = "https://p.scdn.co/mp3-preview/f57b3ba45451dabdf48d825a21880525a1c06b30?cid=1a316693f32b4bd4acee870703d5338b";




// Update song data
document.getElementById("titlesong").innerHTML = title;
document.getElementById("artistsong").innerHTML = artist;
document.getElementById("albumlink").src= albumlink
document.getElementById("audiolink").src= audiolink;

function playAudio() {
if (!playing){
  x.play();
  playing = true;
  document.getElementById("buttontext").innerHTML = 'Pauze';
  }

else if (playing){
	x.pause();
    playing = false;
    document.getElementById("buttontext").innerHTML = 'Play';
};
} 
