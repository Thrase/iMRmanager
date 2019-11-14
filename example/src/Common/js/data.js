/**
 * 页面目录数据：首页
 */
const pageList = [
  {
    name: '生命周期',
    href: '/Lifecycle'
  },
  {
    name: '页面样式与布局',
    href: '/StyleLayout'
  },
  {
    name: '框架指令',
    href: '/Directive'
  },
  {
    name: '页面切换及参数传递',
    href: '/PageParams'
  },
  {
    name: '事件监听与触发',
    href: '/BindEvents'
  },
  {
    name: '父子组件通信',
    href: '/InterVms'
  },
  {
    name: '使用Async',
    href: '/Async'
  },
  {
    name: '优化技巧',
    href: '/Optimization'
  },
  {
    name: 'list教程',
    href: '/ComponentList'
  },
  {
    name: 'tabs教程',
    href: '/ComponentTabs'
  }
]

/**
 * 框架指令，基础数据
 */
const dataDirective = [
  {
    'name': '北京',
    'showSpots': true,
    'spots': [
      { 'name': '天安门' },
      { 'name': '八达岭' }
    ]
  },
  {
    'name': '上海',
    'showSpots': false,
    'spots': [
      { 'name': '东方明珠' }
    ]
  }
]

/**
 * list教程，基础数据
 */
const dataComponentListBase = [
  {
    img: '/Common/img/demo.png',
    name: '商品1',
    brief: '商品描述信息商品描述信息1',
    price: '￥价格1'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品2',
    brief: '商品描述信息商品描述信息2',
    price: '￥价格2'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品3',
    brief: '商品描述信息商品描述信息3',
    price: '￥价格3'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品4',
    brief: '商品描述信息商品描述信息4',
    price: '￥价格4'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品5',
    brief: '商品描述信息商品描述信息5',
    price: '￥价格5'
  }
]

/**
 * list教程，细粒度划分list-item页面的数据
 */
const dataComponentListFinegrainsize = [
  {
    title: '新品上线',
    bannerImg: '/Common/img/demo_large.png',
    productMini: [
      {
        img: '/Common/img/demo.png',
        name: '商品1',
        brief: '商品描述信息商品描述信息1',
        price: '￥价格1'
      },
      {
        img: '/Common/img/demo.png',
        name: '商品2',
        brief: '商品描述信息商品描述信息2',
        price: '￥价格2'
      }
    ],
    textHint: '更多新品'
  },
  {
    title: '商品列表',
    bannerImg: '/Common/img/demo_large.png',
    productMini: [
      {
        img: '/Common/img/demo.png',
        name: '商品3',
        brief: '商品描述信息商品描述信息3',
        price: '￥价格3'
      },
      {
        img: '/Common/img/demo.png',
        name: '商品4',
        brief: '商品描述信息商品描述信息4',
        price: '￥价格4'
      }
    ],
    textHint: '更多商品'
  }
]

/**
 * list教程，list-item懒加载
 */
const dataComponentListLazyload = [
  {
    img: '/Common/img/demo.png',
    name: '商品1',
    brief: '商品描述信息商品描述信息1',
    price: '￥价格1'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品2',
    brief: '商品描述信息商品描述信息2',
    price: '￥价格2'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品3',
    brief: '商品描述信息商品描述信息3',
    price: '￥价格3'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品4',
    brief: '商品描述信息商品描述信息4',
    price: '￥价格4'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品5',
    brief: '商品描述信息商品描述信息5',
    price: '￥价格5'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品6',
    brief: '商品描述信息商品描述信息6',
    price: '￥价格6'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品7',
    brief: '商品描述信息商品描述信息7',
    price: '￥价格7'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品8',
    brief: '商品描述信息商品描述信息8',
    price: '￥价格8'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品9',
    brief: '商品描述信息商品描述信息9',
    price: '￥价格9'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品10',
    brief: '商品描述信息商品描述信息10',
    price: '￥价格10'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品11',
    brief: '商品描述信息商品描述信息11',
    price: '￥价格11'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品12',
    brief: '商品描述信息商品描述信息12',
    price: '￥价格12'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品13',
    brief: '商品描述信息商品描述信息13',
    price: '￥价格13'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品14',
    brief: '商品描述信息商品描述信息14',
    price: '￥价格14'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品15',
    brief: '商品描述信息商品描述信息15',
    price: '￥价格15'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品16',
    brief: '商品描述信息商品描述信息16',
    price: '￥价格16'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品17',
    brief: '商品描述信息商品描述信息17',
    price: '￥价格17'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品18',
    brief: '商品描述信息商品描述信息18',
    price: '￥价格18'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品19',
    brief: '商品描述信息商品描述信息19',
    price: '￥价格19'
  },
  {
    img: '/Common/img/demo.png',
    name: '商品20',
    brief: '商品描述信息商品描述信息20',
    price: '￥价格20'
  }
]

export {
  pageList,
  dataDirective,
  dataComponentListBase,
  dataComponentListFinegrainsize,
  dataComponentListLazyload
}