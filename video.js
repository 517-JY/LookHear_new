const videoPlayer = document.querySelector('.video-player');

const video = videoPlayer.querySelector('.video');

const playButton = videoPlayer.querySelector('.play-button');

playButton.addEventListener('click', (e) => {
    if (video.paused) {
        video.play();
        e.target.textContent = '⏸';
    } else {
        video.pause();
        e.target.textContent = '▶️';

    }
})