const videoPlayer = document.getElementById("videoPlayer");

// Open file from menu
window.electron.onOpenFile(async () => {
  const filePath = await window.electron.openFile();
  if (filePath) {
    videoPlayer.src = `file://${filePath}`;
    videoPlayer.play();
  }
});

// Resize window when video loads
videoPlayer.addEventListener("loadedmetadata", () => {
  const videoWidth = videoPlayer.videoWidth;
  const videoHeight = videoPlayer.videoHeight;
  
  // Send video size to main process
  window.electron.setVideoSize(videoWidth, videoHeight);
});

const ObjectFITVALUES=['contain','cover','fill','none']

// Keyboard controls
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case " ":
      videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();
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
    case "a":
      const index=ObjectFITVALUES.findIndex(e=>e==videoPlayer.style.objectFit)
      console.log(index);
      videoPlayer.style.objectFit=(index!=undefined ? (index==(ObjectFITVALUES.length-1) ? ObjectFITVALUES[0]:ObjectFITVALUES[index+1]):ObjectFITVALUES[0])
      break;
  }
});
