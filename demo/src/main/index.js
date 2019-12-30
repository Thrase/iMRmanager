import router from '@system.router'

let page
function pass_this(_this) { page = _this }


//用户登录
function login() {
  router.push({ uri: '/pages' })
}

//用户注册
function register() {
  router.push({ uri: '/pages/register' })
}


export default {
  pass_this, login, register
}