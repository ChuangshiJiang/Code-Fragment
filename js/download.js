export default function Download (url, isBlob, blobData, name) {
  let link = document.createElement('a');
  link.style.display = 'none';
  let blobUrl;
  if (isBlob) {
    blobUrl = window.URL.createObjectURL(url);
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blobData, name);// 自定义下载文件名（如exemple.txt）
    } else {
      link.href = blobUrl;
      link.setAttribute('download', name);
    }
  } else {
    link.href = url;
  }
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);//移除DOM Element
  if (isBlob) {
    window.URL.revokeObjectURL(blobUrl);// 释放 URL对象
  }
}