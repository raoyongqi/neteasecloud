declare global {
    interface Window {
      electronAPI: {
        saveFile: (content: string) => Promise<string>;
      };
    }
  }
  
  export {};
  