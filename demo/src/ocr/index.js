import media from '@system.media'
import fetch from '@system.fetch'
import file from '@system.file'

//垃圾Quick App IDE，采用严格模式，函数里不能用this，只能这样传
let page
function pass_this(_this) { page = _this }

//垃圾Quick App IDE，手机调试时不能用console.log，太假了，还要自己写个函数
function consolelog(text, id) { page.$element(id).textContent = text }

function image_to_base64(image) {
  let base64 = ''
  for (let i = 0; i < image.length; i++) {
    base64 += String.fromCharCode(image[i])
  }
  consolelog(base64[0]+base64[1]+base64[2], 'test3')
  return base64
}

//获取百度OCR的识别信息
function request_ocr(image_base64) {
  consolelog('正在进行OCR识别', 'test1')
  //获取百度OCR的token
  fetch.fetch({
    url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=yCffU9iNxneXAN3vfuUM2eVC&client_secret=4Go0y8s1ZUOu4ylysmGKgAt0vixaT2fY',
    //成功回调请求OCR识别结果函数，JS的回调函数令人窒息
    success: function (token_data) {
      let token = JSON.parse(token_data.data).access_token
      fetch.fetch({
        //url: 'http://192.168.1.101?access_token=' + token,
        url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=' + token,
        method: 'POST',
        data: {
          //'image': image_base64
          'url': 'http://n.sinaimg.cn/gx/crawl/151/w550h401/20190412/xIlY-hvntnkr1690229.jpg'
        },
        success: function (result_data) {
          let result = JSON.parse(result_data.data)
          if (result.words_result) {
            let list = result.words_result
            var text = ''
            for (let i = 0; i < list.length; i++) {
              text += list[i].words
            }
          }
          consolelog(text, 'test2')
          consolelog(result.error_code, 'test3')
        }
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
        success: function (file_data) { request_ocr(file_data.buffer) }
      })
    }
  })
}

function test()
{
  file.readArrayBuffer({
    uri: '/ocr/test_image.jpg',
    success: function (file_data) { request_ocr(file_data.buffer) }
  })
}

export { pass_this, take_photo, test }