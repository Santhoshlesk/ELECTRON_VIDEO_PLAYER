const videoPlayer = document.getElementById("videoPlayer");

// Open file from menu
window.electron.onOpenFile(async () => {
  const filePath = await window.electron.openFile();
  if (filePath) {
    videoPlayer.src = `file://${filePath}`;
    videoPlayer.play();
  }
});

// Keyboard controls
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case " ":
      if (videoPlayer.paused) {
        videoPlayer.play();
      } else {
        videoPlayer.pause();
      }
      break;
    case "ArrowRight":
      videoPlayer.currentTime += 5;
      break;
    case "ArrowLeft":
      videoPlayer.currentTime -= 5;
      break;
    case "ArrowUp":
      videoPlayer.volume = Math.min(videoPlayer.volume + 0.1, 1);
      break;
    case "ArrowDown":
      videoPlayer.volume = Math.max(videoPlayer.volume - 0.1, 0);
      break;
    case "o":
      window.electron.onOpenFile();
      break;
    case "f":
      videoPlayer.requestFullscreen()
      break;
  }
});
