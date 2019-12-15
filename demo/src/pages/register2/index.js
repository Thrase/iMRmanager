
import prompt from '@system.prompt'
import fetch from '@system.fetch'
import router from '@system.router'

export default {
  private: {
    phoneNum: '',//手机号
    captcha: '', //验证码
    captchaBtnVal: '获取验证码',
    btnDisabled: false,
    captchacode:''
  },
  onInit() {
    this.$page.setTitleBar({text: '小康-智能病历管家'})
  },
  login() {
    router.push({
      uri: '/main'
    })
  },
  ocrtest() {
    router.push({
      uri: '/ocr'
    })
  },
  routePageBack(){
    router.back()
  },
  routePage(){
    router.push({uri:'/pages'})
  },
  changePhoneNum (e) {
    this.phoneNum = e.value
  },
  changeCaptcha (e) {
    this.captcha = e.value
  },
  getCode () {
    var that = this
    var capcode=Math.floor(Math.random()*10000)
    that.captchacode=capcode.toString()
    var mes='您的验证码:'
    mes=mes+that.captchacode
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
        number: that.phoneNum,
        messageId: ''
      },
      complete: function (ret) {
        if(ret.data.code == 0){
          that.timer();
        }
      }
    })
  },
  sub () {
    var that = this;
    var mes;
    if(that.captcha==that.captchacode){
      mes='手机号:'+that.phoneNum + ',验证码:' +  that.captcha
      prompt.showToast({
        message: mes
      })
      router.push({
        uri :'/pages'
      })
    }
    else{
      mes='wrong code!'
      prompt.showToast({
        message: mes
      })
    }
   
  },
  //60秒倒计时
  timer: function () {
    var that = this;
    var second = 60;
    that.btnDisabled = true;
    var setTimer = setInterval(function(){
      that.captchaBtnVal = second+'秒';
      second--;
      if(second <= 0){
        that.captchaBtnVal = '获取验证码';
        that.btnDisabled = false;
        clearInterval(setTimer);
      }
    }, 1000);
  }
}