import router from '@system.router'
import fetch from '@system.fetch'
import prompt from '@system.prompt'
import util from '../../util'

let page
function pass_this(_this) { page = _this }


//获取验证码
function get_checkcode() {
  page.ontimecount = true
  timer(60)
  generate_checkcode()
  let mes = '您的验证码:' + correct_checkcode
  //debug
  prompt.showDialog({title: correct_checkcode})
  /*
  fetch.fetch({
    url: 'http://sms_developer.zhenzikj.com/sms/send.do',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    responseType: 'json',
    data: {
      appId: '103865',
      appSecret: 'a4add34d-79aa-4388-9d58-86b6ddc87723',
      message: mes,
      number: phone,
      messageId: ''
    }
  })*/
}

//用户注册
function register() {
  if (!phone_reg.test(phone)) {
    prompt.showDialog({
      title: '手机号码格式错误',
      message: '请输入正确的手机号码 (仅支持大陆地区)',
      buttons: [{ text: '返回' }]
    })
    return
  }
  if (!passwd_reg.test(passwd)) {
    prompt.showDialog({
      title: '密码格式错误',
      message: '请输入8-30位密码，并且包括数字、大写字母、小写字母、特殊符号中的其中三种',
      buttons: [{ text: '返回' }]
    })
    return
  }
  if (checkcode != correct_checkcode) {
    prompt.showDialog({
      title: '验证码错误',
      message: '请输入正确的验证码',
      buttons: [{ text: '返回' }]
    })
    return
  }
  fetch.fetch({
    url: 'http://192.168.1.101',
    //debug
    //url: 'http://47.101.159.58:9001/api/user/register',
    data: {
      'phone': phone,
      'passwd': passwd,
    },
    method: 'POST',
    success: function (data) {
      util.user_id = JSON.parse(data.data).user_id
      router.push({ uri: '/pages' })
    }
  })
}

/*其他辅助函数*/

//获取和判断文本框内容

let phone_reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
let passwd_reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$/
let phone, passwd, checkcode, correct_checkcode

function update_phone(e) { phone = e.value }

function update_passwd(e) { passwd = e.value }

function update_checkcode(e) { checkcode = e.value }

//生成随机验证码
function generate_checkcode() {
  correct_checkcode = ''
  let rand = Math.floor(Math.random() * 10000)
  while (rand) {
    correct_checkcode += (rand % 10).toString()
    rand = Math.floor(rand / 10)
  }
}

//获取验证码按钮的冷却计时
function timer(time) {
  if (time > 0) {
    page.checkstatus = '重新发送(' + time + 's)'
    setTimeout(function () {
      timer(time - 1)
    }, 1000)
  }
  else {
    page.ontimecount = false
  }
}


export default {
  private: {
    checkstatus: '',
    ontimecount: false,
  },
  pass_this, get_checkcode, register, update_phone, update_passwd, update_checkcode
}