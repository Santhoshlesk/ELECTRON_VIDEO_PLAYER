const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 450, // Default 16:9 ratio
    icon: path.join(__dirname, "favicon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      devTools:true,
      sandbox: false, // Required for some media playback
  autoplayPolicy: "no-user-gesture-required",
    },
    resizable: true, // Allow resizing while keeping aspect ratio
  });

  mainWindow.loadFile("src/index.html");

  // Create Menu
  const menu = Menu.buildFromTemplate([
    {
      label: "File",
      submenu: [
        {
          label: "Open File",
          accelerator: "O",
          click: () => {
            mainWindow.webContents.send("trigger-open-file");
          },
        },
        { type: "separator" },
        { role: "quit" },
      ],
    }, {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "toggledevtools" }, // Add this to enable DevTools
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);
});

ipcMain.on("set-video-size", (event, width, height) => {
  if (mainWindow) {
    mainWindow.setAspectRatio(width / height);
    mainWindow.setSize(width, height);
  }
});

ipcMain.handle("open-file", async () => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Videos", extensions: ["mp4", "mkv", "avi"] }],
  });

  return filePaths[0];
});
