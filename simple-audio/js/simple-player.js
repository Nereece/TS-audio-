console.log("hogwarts is real")
const currentTime = document.getElementById('current-time');
const totalTime = document.getElementById('total-time');
const playPauseButton = document.getElementById('play-pause-button');
const seekBar = document.getElementById('seek-bar');
const purpleRecord = document.getElementById('purple-record');
const trackNameText = document.getElementById('track-name')
const whiteRecord = document.getElementById('white-record');
const blueRecord = document.getElementById('blue-record');
const volumeSlider = document.getElementById('volume-slider');
const outputContainer = document.getElementById('volume-output');
const audio = new Audio();
let isSeeking = false;
// BUTTON LISTENERS
playPauseButton.onclick = function(){
    if(audio.paused){
    audio.play();
    }else{
       audio.pause(); 
    }
}
purpleRecord.onclick = function(){
    audio.src = "audio/snow.webm"
    console.log("purple-record")
    trackNameText.innerHTML = 'Snow on the beach'
}
whiteRecord.onclick = function(){
    audio.src = "audio/hero.webm"
    console.log("-record")
    trackNameText.innerHTML = 'Anti-hero'
}
blueRecord.onclick = function(){
    audio.src = "audio/vigilate.webm"
    console.log("-record")
    trackNameText.innerHTML = 'Vigilate shit'
}
// AUDIO LISTENERS
// event triggured once audio loaded
audio.oncanplaythrough = function(){
    seekBar.disabled = false;
}
// event triggured when audio plays
audio.onplay = function(){
    playPauseButton.src = "images/pausewhite.png"
}
audio.onpause = function(){
    playPauseButton.src = "images/playwhite.png"
}
// event triggured by meta deta load
audio.onloadedmetadata = function(){
    totalTime.innerHTML = formatTime(audio.duration);
    currentTime.innerHTML = formatTime(0);
    seekBar.max = Math.floor (audio.duration);
}
// event triggured when playback time updates
audio.ontimeupdate = function(){
    currentTime.innerHTML = formatTime(audio.currentTime)
if(!isSeeking){
    seekBar.value = Math.floor(audio.currentTime)
}
} 
// event triggured when audio ends
audio.onended = function(){
    currentTime.innerHTML = formatTime(0);
    seekBar.value = 0;
    playPauseButton.src = "images/playwhite.png";
}
// SEEK BAR LISTENERS
//  event triggured on interation ith seek bar 
seekBar.oninput = function(){
    isSeeking = true;
}
// Event triggured when seek bar is changed manually 
seekBar.onchange = function(){
    audio.currentTime = seekBar.value;
    isSeeking = false;
}
// VOLUME SLIDER LISTENERS
// event triggered
volumeSlider.addEventListener('input', (e) => {
  const value = e.target.value;

  outputContainer.textContent = value;
  audio.volume = value / 100;
});

// UTILITY FUNCTIONS
// takes total seconds (number) and returns a formatted string 
function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}





