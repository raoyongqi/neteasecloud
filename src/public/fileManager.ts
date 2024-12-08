import { app } from 'electron';
import fs from 'fs';
import path from 'path';

// 获取用户数据路径
const userDataPath = app.getPath('userData'); // 获取用户数据路径，通常是 AppData 路径

// 检查并确保文件夹存在
export const ensureDirectoryExists = (directoryPath: string) => {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
};

// 保存文件
export const saveFile = (content: string) => {
  const filePath = path.join(userDataPath, 'neteasecloud', 'cookie.txt'); // 文件保存路径

  // 确保文件夹存在
  const dirPath = path.dirname(filePath);
  ensureDirectoryExists(dirPath);

  // 如果文件已存在，就不保存
  if (fs.existsSync(filePath)) {
    return '文件已存在，未进行保存。';
  }

  // 保存文件内容
  fs.writeFileSync(filePath, content, 'utf8');
  return `文件已保存到 ${filePath}`;
};
