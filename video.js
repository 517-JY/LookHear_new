const videoPlayer = document.querySelector(".video-player");
const videoPlayers = document.querySelectorAll(".video-player");
// console.log(videoPlayer);
// console.log(videoPlayers);

const partTabs = document.querySelectorAll(".piece__partTab");
// console.log(partTabs);

const partTabsContainer = document.querySelector(".piece__partTab-container");
// console.log(partTabsContainer);

const partsContent = document.querySelectorAll(".piece__partContent");
console.log(partsContent);

// const partsImg = document.querySelectorAll(".piece__partContent__img");
// // console.log(partsImg);

partTabsContainer.addEventListener("click", function (event) {
  const clicked = event.target.closest(".piece__partTab");
  console.log(clicked);
  if (!clicked) return;

  // Active tab
  // 1. remove 'piece__partTab--active' for every partTab
  // 2. add 'piece__partTab--active' to the clicked partTab
  partTabs.forEach((tab) => tab.classList.remove("piece__partTab--active"));
  clicked.classList.add("piece__partTab--active");

  // Active piece__partContent area
  partsContent.forEach((partContent) =>
    partContent.classList.remove("piece__partContent--active")
  );

  console.log(`click.dataset.tab is :${clicked.dataset.tab}`);
  document
    .querySelector(`.piece__partContent--${clicked.dataset.tab}`)
    .classList.add("piece__partContent--active");
});

////////
////////
////////
////////
////////
const video = videoPlayer.querySelector(".video");
// const videos = videoPlayers.querySelector(".video");

// const videos = videoPlayer.querySelectorAll(".video"); // not work

const playButton = videoPlayer.querySelector(".play-button");
// const playButtons = videoPlayer.querySelectorAll(".play-button");
const volume = videoPlayer.querySelector(".volume");

// console.log(videoPlayer);
// console.log(videoPlayers);
// console.log(video);
// console.log(playButton);
// console.log(volume);

const currentTimeElement = videoPlayer.querySelector(".current");
const durationTimeElement = videoPlayer.querySelector(".duration");

// console.log(currentTimeElement);
// console.log(durationTimeElement);

const progress = videoPlayer.querySelector(".video-progress");
const progresses = videoPlayer.querySelectorAll(".video-progress");
const progressBar = videoPlayer.querySelector(".video-progress-filled");

// console.log(progress);
// console.log(progresses);

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
volume.addEventListener("mousemove", (event) => {
  //console.log(event);
  //console.log(event.target.value);
  // the volume of the video is whatever we put in the range
  video.volume = event.target.value;
});

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

video.addEventListener("timeupdate", currentTime);

// ProgressBar
// timeupdate is running every time the time is updated
video.addEventListener("timeupdate", () => {
  const percentage = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percentage}%`;
});

// change progress bar on click
progress.addEventListener("click", (event) => {
  const progressTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = progressTime;
});
