const { app, BrowserWindow } = require("electron");
const fs = require("fs");
const path = require("path");
const os = require("os");
const dotenv = require("dotenv").config();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: process.env.START_WIDTH ? Number(process.env.START_WIDTH) : 1400,
    height: process.env.START_HEIGHT ? Number(process.env.START_HEIGHT) : 1000,
    center: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: !dotenv.error
    }
  });

  // for production
  if (dotenv.error) {
    // メニュー削除
    win.removeMenu();
  }

  // React Dev Toolsの読み込み
  if (!dotenv.error) {
    if (process.env.REACT_DEV_TOOLS_DIR) {
      const tools_dir = path.join(
        os.homedir(),
        process.env.REACT_DEV_TOOLS_DIR
      );
      const dirs = fs.readdirSync(tools_dir);

      // 最新バージョンを自動で開く
      if (dirs && dirs.length === 1) {
        const fullpath = path.join(tools_dir, dirs[0]);
        const stat = fs.statSync(fullpath);
        if (stat && stat.isDirectory()) {
          BrowserWindow.addDevToolsExtension(fullpath);
        }
      }
    }

    // Open the DevTools.
    win.webContents.openDevTools();
  }

  // and load the index.html of the app.
  win.loadFile(path.join(__dirname, "./build/index.html"));

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
