import router from '@system.router'
import fetch from '@system.fetch'
import util from '../../util'
let page

function pass_this(_this) { page = _this }

function send_register_info() {
  fetch.fetch({
    url: 'http://192.168.0.101',
    //url: 'http://47.101.159.58:9001/api/user/register',
    data: {
      'phone': page.phone,
      'passwd': page.passwd,
    },
    success: function (data) {
      util.userid = JSON.parse(data).user_id
      router.push('/pages')
    }
  })
}

export default {
  pass_this, send_register_info
}