import media from '@system.media'
import fetch from '@system.fetch'
import file from '@system.file'

//垃圾Quick App IDE，采用严格模式，函数里不能用this，只能这样传
let page
function pass_this(_this) { page = _this }

//垃圾Quick App IDE，手机调试时不能用console.log，太假了，还要自己写个函数
function consolelog(text, id) { page.$element(id).textContent = text }

//将二进制的图片数据转换成base64编码的辅助数组
/*
const base64abc = (() => {
  let abc = [],
    A = 'A'.charCodeAt(0),
    a = 'a'.charCodeAt(0),
    n = '0'.charCodeAt(0)
  for (let i = 0; i < 26; ++i) {abc.push(String.fromCharCode(A + i))}
  for (let i = 0; i < 26; ++i) {abc.push(String.fromCharCode(a + i))}
  for (let i = 0; i < 10; ++i) {abc.push(String.fromCharCode(n + i))}
  abc.push('+')
  abc.push('/')
  return abc
})()*/

//将二进制的图片数据转换成base64编码
function bytesToBase64(bytes) {
  let base64abc = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
  ]
  let result = '', i, l = bytes.length;
  for (i = 2; i < l; i += 3) {
    result += base64abc[bytes[i - 2] >> 2];
    result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
    result += base64abc[((bytes[i - 1] & 0x0F) << 2) | (bytes[i] >> 6)];
    result += base64abc[bytes[i] & 0x3F];
  }
  if (i === l + 1) { // 1 octet missing
    result += base64abc[bytes[i - 2] >> 2];
    result += base64abc[(bytes[i - 2] & 0x03) << 4];
    result += "==";
  }
  if (i === l) { // 2 octets missing
    result += base64abc[bytes[i - 2] >> 2];
    result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
    result += base64abc[(bytes[i - 1] & 0x0F) << 2];
    result += "=";
  }
  return result;
}

//获取百度OCR的识别信息
function request_ocr(image_base64) {
  consolelog('token accessing', 'test1')
  //获取百度OCR的token
  fetch.fetch({
    url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=yCffU9iNxneXAN3vfuUM2eVC&client_secret=4Go0y8s1ZUOu4ylysmGKgAt0vixaT2fY',
    //成功回调请求OCR识别结果函数，JS的回调函数令人窒息
    success: function (token_data) {
      consolelog('ocr processing', 'test1')
      let token = JSON.parse(token_data.data).access_token
      fetch.fetch({
        //url: 'http://192.168.1.101?access_token=' + token,
        url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=' + token,
        method: 'POST',
        data: {
          'image': image_base64
          //'url': 'http://n.sinaimg.cn/gx/crawl/151/w550h401/20190412/xIlY-hvntnkr1690229.jpg'
        },
        success: function (result_data) {
          consolelog('ocr success', 'test1')
          let result = JSON.parse(result_data.data)
          if (result.words_result) {
            let list = result.words_result
            var text = ''
            for (let i = 0; i < list.length; i++) { text += list[i].words }
          }
          consolelog(text, 'test2')
          consolelog(result.error_code, 'test3')
        },
        fail: function () { consolelog('ocr fail', 'test1') }
      })
    }
  })
}

//拍照，返回uri
function take_photo() {
  media.takePhoto({
    success: function (photo_data) {
      file.readArrayBuffer({
        uri: photo_data.uri,
        success: function (file_data) { request_ocr(bytesToBase64(file_data.buffer)) }
      })
    }
  })
}

function test() {
  file.readArrayBuffer({
    uri: '/ocr/test_image.jpg',
    success: function (file_data) { request_ocr(bytesToBase64(file_data.buffer)) },
    fail: function () { consolelog('File not found', 'test1') }
  })
}

export { pass_this, take_photo, test }