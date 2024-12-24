// main.cjs

const { app, BrowserWindow } = require('electron');
const http = require('http-server');
const path = require('node:path');


// ? route to index
const creatHomeURL = (port) => `http://localhost:${port}?`;

const getRandomPort = () => {
  const min = 1024;
  const max = 65535;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const startServer = (port, rootPath, count) => {
  let server;
  while (count < 1000) {
    try {
      server = http.createServer({ root: rootPath, proxy: creatHomeURL(port) });
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

function checkURLToShow(win, url, retries = 10) {
  let attempts = 0;

  const interval = setInterval(() => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          clearInterval(interval); // Stop checking once URL is accessible
          win.show();  // Show the window
          console.log('URL is accessible. Window shown.');
        }
      })
      .catch(() => {
        attempts++;
        console.log(`Attempt ${attempts}: URL is not accessible.`);
        if (attempts >= retries) {
          win.show();  // Show the window
          clearInterval(interval); // Stop after 10 attempts
          console.log('Max retries reached. URL is still not accessible.');
        }
      });
  }, 1000);  // Check every second
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  let port = 3000;
  let homeURL = creatHomeURL(port);

  // Different paths to adapt development mode and run mode
  if (app.isPackaged) { // pack
    port = startServer(getRandomPort(), path.join(process.resourcesPath, 'client'), 0);
    homeURL = creatHomeURL(port);
  }

  win.loadURL(homeURL);

  if (app.isPackaged) {
    win.once('ready-to-show', (event) => {
      win.show();
    })
  } else {
    checkURLToShow(win, homeURL)
  }

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
