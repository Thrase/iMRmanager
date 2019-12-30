import router from '@system.router'
import fetch from '@system.fetch'
import util from '../../util'

let page
function pass_this(_this) { page = _this }

//获取病情信息
function get_mr_by_date() {
  fetch.fetch({
    //url: 'http://47.101.159.58:9001/api/mr/time',
    //debug
    url: 'http://192.168.1.101/api/mr/time',
    data: { 'user_id': util.user_id, 'illness': util.illness },
    method: 'GET',
    success: function (data) {
      page.list = JSON.parse(data.data)
      for (let i = 0; i < page.list.length; i++)
        if (page.list[i].type == 'long')
          page.list[i].type = true
        else
          page.list[i].type = false
    }
  })
}

//转到病历详情
function route_mr_detail(item) {
  util.record_id = item.record_id
  router.push({ uri: '/pages/viewmr' })
}

//返回
function route_page_back() { router.back() }


export default {
  private: {
    list: [
      { illness: '糖尿病', time: '2019-12-10', type: true, 'record_id': 123123 },
      { illness: '发烧', time: '2019-12-01', type: false, 'record_id': 123123 },
      { illness: '咳嗽', time: '2019-11-30', type: false, 'record_id': 123123 },
      { illness: '颈椎病', time: '2019-10-05', type: true, 'record_id': 123123 },
      { illness: '感冒', time: '2019-9-7', type: false, 'record_id': 123123 },
      { illness: '哮喘', time: '2018-11-30', type: true, 'record_id': 123123 },
      { illness: '发烧', time: '2017-12-01', type: false, 'record_id': 123123 },
      { illness: '咳嗽', time: '2017-11-30', type: false, 'record_id': 123123 },
    ]
  },
  pass_this, get_mr_by_date, route_mr_detail, route_page_back
}