// main.js

const { app, BrowserWindow } = require('electron');
const http = require('http-server');

let mainWindow;

app.whenReady().then(() => {
    const server = http.createServer({ root: './build/client' }); // 指向构建后的静态文件目录
    server.listen(8080);

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

    // 加载 HTTP URL 而不是 file://
    mainWindow.loadURL('http://localhost:8080');
});

