import Music from 'NeteaseCloudMusicApi';
import { app, BrowserWindow } from 'electron';

async function main() {
  await app.whenReady();

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 494,
    resizable: false,
    show: false,
    title: 'MusicDownload',
    fullscreenable: false,
    frame: false,
  });

  mainWindow.removeMenu();

  // 上单实例锁
  if (app.requestSingleInstanceLock()) {
    app.on('second-instance', () => {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    });
  } else {
    // 第二个实例，退出。
    app.quit();
    return;
  }

  // 加载主页面内容
  await mainWindow.loadFile('./dist/renderer/index.html', {
    hash: '#/main',
  });
  
  // 仅在需要调试生产环境时打开 DevTools
  if (process.env.DEBUG_PROD === 'true') {
    mainWindow.once('show', () => mainWindow.webContents.openDevTools());
  }

  // 事件注册
  mainWindow.once('ready-to-show', () => mainWindow.show());

  app.on('browser-window-created', (ev, window) => {
    window.removeMenu();

    if (process.env.NODE_ENV === 'development') {
      window.once('show', () => window.webContents.openDevTools());
    }
  });

  app.on('window-all-closed', () => app.quit());
}

main().catch((error) => {
  console.error('Failed to start the application:', error);
});
