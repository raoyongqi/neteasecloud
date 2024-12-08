import { ipcMain } from 'electron';
import { saveFile } from './fileManager';  // 引入保存文件的功能

// 初始化与渲染进程的通信
export const initBridge = () => {
  ipcMain.handle('save-file', (event, content) => {
    return saveFile(content);  // 调用文件保存功能并返回保存结果
  });
};
