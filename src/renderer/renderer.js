document.getElementById('upload-button').addEventListener('click', () => {
    const fileInput = document.getElementById('file-input');
    
    // 确保用户选择了文件
    if (fileInput.files.length === 0) {
      alert('请先选择一个文件！');
      return;
    }
    
    const file = fileInput.files[0];
    
    // 确保上传的是文本文件
    if (file.type !== 'text/plain') {
      alert('只能上传文本文件！');
      return;
    }
  
    // 创建 FileReader 实例来读取文件内容
    const reader = new FileReader();
    
    // 当文件读取完成时执行的函数
    reader.onload = function(event) {
      const cookieContent = event.target.result;
      document.getElementById('cookie-display').textContent = cookieContent; // 显示文件内容
    };
  
    // 读取文件内容为文本
    reader.readAsText(file);
  });
  