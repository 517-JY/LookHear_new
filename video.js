// const { inherits } = require("util");

const videoPlayers = document.querySelectorAll(".video-player");

// the videoPlayer will be changed according to the tag clicked
let videoPlayer = document.querySelector(".video-player");
let video = videoPlayer.querySelector(".video");
let playButton = videoPlayer.querySelector(".play-button");
let volume = videoPlayer.querySelector(".volume");

let currentTimeElement = videoPlayer.querySelector(".current");
let durationTimeElement = videoPlayer.querySelector(".duration");

let progress = videoPlayer.querySelector(".video-progress");
let progresses = videoPlayer.querySelectorAll(".video-progress");
let progressBar = videoPlayer.querySelector(".video-progress-filled");

// console.log(currentTimeElement);
// console.log(durationTimeElement);

// console.log(videoPlayer);
// console.log(playButton);

const partTabs = document.querySelectorAll(".piece__partTab");
// console.log(partTabs);

const partTabsContainer = document.querySelector(".piece__partTab-container");
// console.log(partTabsContainer);

const partsContent = document.querySelectorAll(".piece__partContent");
// console.log(partsContent);

// TODO: get the video work back and forth between different parts
partTabsContainer.addEventListener("click", function (event) {
  const clicked = event.target.closest(".piece__partTab");
  console.log(clicked);
  if (!clicked) return;

  video.pause();

  // Active tab
  // 1. remove 'piece__partTab--active' for every partTab
  // 2. add 'piece__partTab--active' to the clicked partTab
  partTabs.forEach((tab) => tab.classList.remove("piece__partTab--active"));
  clicked.classList.add("piece__partTab--active");

  // Active piece__partContent area
  partsContent.forEach((partContent) =>
    partContent.classList.remove("piece__partContent--active")
  );

  //   console.log(`click.dataset.tab is :${clicked.dataset.tab}`);

  document
    .querySelector(`.piece__partContent--${clicked.dataset.tab}`)
    .classList.add("piece__partContent--active");

  const partIdx = clicked.dataset.tab;
  videoPlayer = document.querySelector(`.video-player--${partIdx}`);
  console.log("Current Video Player: ");
  console.log(videoPlayer);

  playPart(videoPlayer, partIdx);
});

/**
 * Play music given the current part
 * @param {} videoPlayer the given current part
 */
function playPart(videoPlayer) {
  video = videoPlayer.querySelector(".video");

  // playButton
  playButton = videoPlayer.querySelector(".play-button");
  playButton.addEventListener("click", (event) => {
    if (video.paused) {
      video.play();
      event.target.textContent = "⏸";
    } else {
      video.pause();
      event.target.textContent = "▶️";
    }
  });

  // volume
  volume = videoPlayer.querySelector(".volume");
  volume.addEventListener("mousemove", (event) => {
    //console.log(event);
    //console.log(event.target.value);
    // the volume of the video is whatever we put in the range
    video.volume = event.target.value;
  });

  currentTimeElement = videoPlayer.querySelector(".current");
  durationTimeElement = videoPlayer.querySelector(".duration");
  video.addEventListener("timeupdate", currentTime);

  progress = videoPlayer.querySelector(".video-progress");
  progresses = videoPlayer.querySelectorAll(".video-progress");
  progressBar = videoPlayer.querySelector(".video-progress-filled");

  // ProgressBar
  // timeupdate is running every time the time is updated
  video.addEventListener("timeupdate", () => {
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percentage}%`;
  });

  // change progress bar on click
  progress.addEventListener("click", (event) => {
    const progressTime =
      (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = progressTime;
  });
}

// current time and duration
const currentTime = () => {
  let currentMinutes = Math.floor(video.currentTime / 60);
  let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
  let durationMinutes = Math.floor(video.duration / 60);
  let durationSeconds = Math.floor(video.duration - durationMinutes * 60);

  currentTimeElement.innerHTML = `${currentMinutes}:${
    currentSeconds < 10 ? "0" + currentSeconds : currentSeconds
  }`;
  durationTimeElement.innerHTML = `${durationMinutes}:${durationSeconds}`;
};

/**
 * Initialize the web
 */
function init() {
  playPart(videoPlayer);
}

init();
