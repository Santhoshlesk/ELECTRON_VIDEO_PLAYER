const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
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
    },
  ]);

  Menu.setApplicationMenu(menu);
});

ipcMain.handle("open-file", async () => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Videos", extensions: ["mp4", "mkv", "avi"] }],
  });

  return filePaths[0];
});
