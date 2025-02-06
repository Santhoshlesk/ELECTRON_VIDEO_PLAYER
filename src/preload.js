const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  openFile: () => ipcRenderer.invoke("open-file"),
  onOpenFile: (callback) => ipcRenderer.on("trigger-open-file", callback),
  setVideoSize: (width, height) => ipcRenderer.send("set-video-size", width, height),
});
