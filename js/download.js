/**
* 下载方法
* @author Jiang_Chuangshi
* @date 2020/11/19 16:12
* @param {String} url 链接地址
* @param {Boolean} isBlob 是否blob类型
* @param {String} blobData 如果是blob类型，传递blob数据
* @param {String} name 下载之后的文件名
* @returns {Void}
*/
export default function Download (url, isBlob, blobData, name) {
  let link = document.createElement('a');
  let blobUrl;
  link.style.display = 'none';
  if (isBlob) {
    blobUrl = window.URL.createObjectURL(url);
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blobData, name);// 自定义下载文件名（如exemple.txt）
    } else {
      link.href = blobUrl;
    }
  } else {
    link.href = url;
  }
  if(name){
    link.setAttribute('download', name);
  }
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);//移除DOM Element
  if (isBlob) {
    window.URL.revokeObjectURL(blobUrl);// 释放 URL对象
  }
}