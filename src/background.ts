"use strict";
import { app, protocol, ipcMain, BrowserWindow, Menu, Tray } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";
import path from 'path';

declare const __static: string;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

let mainWin: BrowserWindow | null = null;

async function createWindow() {
  // Create the browser window.
  mainWin = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    // if (!process.env.IS_TEST) mainWin.webContents.openDevTools();
  } else {
    createProtocol("app");
    // win.setMenu(null);
    // Load the index.html when not in development
    mainWin.loadURL("app://./index.html");
  }

  // mainWin.on('close', (event) => {
  //   event.preventDefault();
  //   mainWin?.hide();
  // });
}

let tray = null;
let iconPath = null;

function createTray() {
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  iconPath = path.join(__static, 'img/icons', iconName);
  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '主页',
      click: function(){
        createWindow();
      }
    }, {
      label: '退出',
      click: function(){
        app.quit();
      }
    }
  ]);
  tray.setToolTip('Photo');
  tray.setContextMenu(contextMenu);
}

function registerLocalResourceProtocol() {
  protocol.registerFileProtocol('local-resource', (request, callback) => {
    const url = request.url.replace(/^local-resource:\/\//, '')
    // Decode URL to prevent errors when loading filenames with UTF-8 chars or chars like "#"
    const decodedUrl = decodeURI(url) // Needed in case URL contains spaces
    try {
      return callback(decodedUrl)
    }
    catch (error) {
      console.error('ERROR: registerLocalResourceProtocol: Could not get file path:', error)
    }
  })
}

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
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }

  registerLocalResourceProtocol();

  createWindow();
  createTray();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

// create the listener
ipcMain.on('load-photo-window', async (event, data) => {
  // create the window
  let photo = new BrowserWindow({ show: true,
    width: 400,
    height: 400,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await photo.loadURL(process.env.WEBPACK_DEV_SERVER_URL + "photo");
    // if (!process.env.IS_TEST) photo.webContents.openDevTools();
  } else {
    createProtocol("app");
    // win.setMenu(null);
    // Load the index.html when not in development
    photo.loadURL("app://./photo.html");
  }

  // photo.on('closed', () => {
  //   photo = null;
  // });

  // // here we can send the data to the new window
  // photo.webContents.on('did-finish-load', () => {
  //   photo.webContents.send('data', data);
  // });
});
