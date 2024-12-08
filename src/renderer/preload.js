import { contextBridge, ipcRenderer } from 'electron';

// 暴露给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  saveFile: (content) => ipcRenderer.invoke('save-file', content),
});
