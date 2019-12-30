import router from '@system.router'
import fetch from '@system.fetch'
import util from '../../util'

let page
function pass_this(_this) { page = _this }


//获取病情信息
function get_mr_by_date() {
  fetch.fetch({
    //url: 'http://47.101.159.58:9001/api/mr/category',
    //debug
    url: 'http://192.168.1.101/api/mr/category',
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
  util.illness = item.illness
  router.push({ uri: '/pages/search_by_time' })
}

//返回
function route_page_back() { router.back() }


export default {
  private: {
    list: [
      { illness: '糖尿病', number: 12, type: true },
      { illness: '发烧', number: 11, type: false },
      { illness: '咳嗽', number: 6, type: false },
      { illness: '颈椎病', number: 4, type: true },
      { illness: '感冒', number: 3, type: false },
      { illness: '哮喘', number: 3, type: true },
      { illness: '发烧', number: 2, type: false },
      { illness: '咳嗽', number: 1, type: false },
    ]
  },
  pass_this, get_mr_by_date, route_mr_detail, route_page_back
}