// main.cjs

const { app, BrowserWindow } = require('electron');
const http = require('http-server');
const path = require('node:path');


const getRandomPort = () => {
  const min = 1024;
  const max = 65535;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const startServer = (port, rootPath, count) => {
  let server;
  while (count < 1000) {
    try {
        server = http.createServer({ root: rootPath });
        server.listen(port);
        console.log(`Server is running at http://localhost:${port}`);
        return port;
    } catch (e) {
        console.error(`Port ${port} is in use. Trying another...`);
        port = getRandomPort();
    }
  }

  return 0;
}


function createWindow () {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // Different paths to adapt development mode and run mode
  if (!app.isPackaged) {
    const port = 3000;
    win.loadURL(`http://localhost:${port}`);
  } else {
    const port = startServer(getRandomPort(), path.join(process.resourcesPath, 'client'), 0);
    win.loadURL(`http://localhost:${port}`);
  }

  win.once('ready-to-show', (event) => {
      win.show();
  })
  // Exit the application when the window closes
  win.on('close', (event) => {
    app.quit(); 
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

