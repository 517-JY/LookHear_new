const videoPlayer = document.querySelector('.video-player');
const video = videoPlayer.querySelector('.video');
const playButton = videoPlayer.querySelector('.play-button');
const volume = videoPlayer.querySelector('.volume');

const currentTimeElement = videoPlayer.querySelector('.current');
const durationTimeElement = videoPlayer.querySelector('.duration');


const progress = videoPlayer.querySelector('.video-progress');
const progressBar = videoPlayer.querySelector('.video-progress-filled');


playButton.addEventListener('click', (event) => {
    if (video.paused) {
        video.play();
        event.target.textContent = '⏸';
    } else {
        video.pause();
        event.target.textContent = '▶️';

    }
})

// volume
volume.addEventListener('mousemove', (event) => {
    //console.log(event);
    //console.log(event.target.value);
    // the volume of the video is whatever we put in the range
    video.volume = event.target.value;
})

// current time and duration
const currentTime = () => {
    let currentMinutes = Math.floor(video.currentTime / 60);
    let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(video.duration / 60);
    let durationSeconds = Math.floor(video.duration - durationMinutes * 60);

    currentTimeElement.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`
    durationTimeElement.innerHTML = `${durationMinutes}:${durationSeconds}`
}


video.addEventListener('timeupdate', currentTime);



// ProgressBar
// timeupdate is running every time the time is updated
video.addEventListener('timeupdate', () => {
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percentage}%`;
})



// change progress bar on click
progress.addEventListener('click', (event) => {
    const progressTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = progressTime;


})

