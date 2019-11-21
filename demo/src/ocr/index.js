import media from '@system.media'
import fetch from '@system.fetch'
import file from '@system.file'
import prompt from '@system.prompt'


//垃圾Quick App IDE，采用严格模式，函数里不能用this，只能这样传
let page
function pass_this(_this) { page = _this }

//拍照，返回uri并进行OCR识别
function take_photo() {
  media.takePhoto({
    success: function (photo_data) {
      file.readArrayBuffer({
        //debug
        //uri: '/ocr/test_image.jpg',
        uri: photo_data.uri,
        success: function (file_data) {
          page.image_uri = photo_data.uri
          request_ocr(uint8arr_to_base64(file_data.buffer))
        },
        fail: function () { message('错误', '图片文件不存在') }
      })
    }
  })
}

//获取百度OCR的识别信息
function request_ocr(image_base64) {
  page.button_text = '图片处理中'
  //获取百度OCR的token
  fetch.fetch({
    url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=yCffU9iNxneXAN3vfuUM2eVC&client_secret=4Go0y8s1ZUOu4ylysmGKgAt0vixaT2fY',
    //token获取成功，回调请求OCR识别结果函数，JS的回调函数令人窒息
    success: function (token_data) {
      page.button_text = 'OCR识别中'
      let token = JSON.parse(token_data.data).access_token
      fetch.fetch({
        //url: 'http://192.168.1.101?access_token=' + token,
        url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=' + token,
        method: 'POST',
        data: {
          'image': image_base64
          //debug
          //'url': 'http://n.sinaimg.cn/gx/crawl/151/w550h401/20190412/xIlY-hvntnkr1690229.jpg'
        },
        //OCR识别完成，回调处理识别数据的函数
        success: function (result_data) {
          page.button_text = '重新拍照'
          let result = JSON.parse(result_data.data)
          if (result.error_code) { message('错误', 'OCR识别出错，请重新拍照') }
          else if (result.words_result) { data_process(result.words_result) }
        },
        fail: function () { message('错误', 'OCR识别出错，请检查网络连接') }
      })
    },
    fail: function () { message('错误', 'OCR识别出错，请检查网络连接') }
  })
}

//处理OCR识别结果
function data_process(result) {
  for (let i = 0; i < result.length; i++) {
    if (result[i].words.indexOf('时间') != -1) { page.table[0] += result[i].words }
    if (result[i].words.indexOf('医院') != -1) { page.table[1] += result[i].words }
    if (result[i].words.indexOf('主诉') != -1) { page.table[2] += result[i].words }
    if (result[i].words.indexOf('诊断') != -1) { page.table[3] += result[i].words }
    if (result[i].words.indexOf('意见') != -1) { page.table[4] += result[i].words }
    page.table[5] += result[i].words + '; '
  }
}

/*其他辅助函数*/

//将unit8Array类型转换成base64编码
function uint8arr_to_base64(bytes) {
  let base64abc = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
  ]
  let result = '', i, l = bytes.length
  for (i = 2; i < l; i += 3) {
    result += base64abc[bytes[i - 2] >> 2]
    result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)]
    result += base64abc[((bytes[i - 1] & 0x0F) << 2) | (bytes[i] >> 6)]
    result += base64abc[bytes[i] & 0x3F]
  }
  if (i == l + 1) { // 1 octet missing
    result += base64abc[bytes[i - 2] >> 2]
    result += base64abc[(bytes[i - 2] & 0x03) << 4]
    result += '=='
  }
  if (i == l) { // 2 octets missing
    result += base64abc[bytes[i - 2] >> 2]
    result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)]
    result += base64abc[(bytes[i - 1] & 0x0F) << 2]
    result += '='
  }
  return result
}

//弹窗展示函数
function message(title, content) {
  prompt.showDialog({
    title: title,
    message: content,
    buttons: [{ text: '确认', color: '#000000' }]
  })
}


export default {
  private: {
    button_text: '照片拍摄中',
    image_uri: '../ocr/test_image.jpg',
    table: ['', '', '', '', '', '']
  },
  pass_this, take_photo
}