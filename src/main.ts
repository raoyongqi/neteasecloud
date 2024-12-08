import { app, BrowserWindow } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';
import { initBridge } from './public/bridge';  // 引入 bridge.ts 中的 initBridge 函数

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

  initBridge();  // 调用 bridge.ts 中的 initBridge 函数
  // 事件注册
  mainWindow.once('ready-to-show', () => mainWindow.show());


  if (process.env.NODE_ENV === 'development') {
    await installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS]);
    mainWindow.once('show', () => mainWindow.webContents.openDevTools()); 
  }


  await mainWindow.loadFile('./dist/renderer/index.html');
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
