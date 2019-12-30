# 小康：智能病历管家

-----

## 项目名称

小康：智能病历管家

iMRmanager

## 组织结构

iMR_quickapp/

├── .gitignore  忽略node_modules, build, dist文件夹
├── babel.config.js
├── package.json
├── package-lock.json
├── sign    签名文件
│   ├── debug
│   │   ├── certificate.pem
│   │   └── private.pem
│   └── release
│       ├── certificate.pem
│       └── private.pem
└── src
    ├── app.ux	全局配置文件
    ├── card	快应用卡片主页面
    │   └── index.ux
    ├── Common
    │   └── logo.png
    ├── image
    ├── main	快应用入口页面（登录页面）
    │   ├── index.js
    │   └── index.ux
    ├── manifest.json   快应用基本设置
    ├── pages	其他页面
    │   ├── advice	医嘱建议功能页面
    │   │   └── index.ux
    │   ├── index.ux	用户主界面
    │   ├── medicine	用药跟踪页面
    │   │   ├── index.ux
    │   │   └── none.ux
    │   ├── newmr	新建病历页面
    │   │   ├── index.js
    │   │   ├── index.ux
    │   │   └── test_image.jpg
    │   ├── register	注册页面
    │   │   ├── index.js
    │   │   └── index.ux
    │   ├── register2	注册页面（旧版备用）
    │   │   ├── index.js
    │   │   └── index.ux
    │   ├── search_by_illness	按照类别查询病历页面
    │   │   ├── index.js
    │   │   └── index.ux
    │   ├── search_by_time	按照时间查询病历页面
    │   │   ├── index.js
    │   │   └── index.ux
    │   ├── searchmr	查找病历主页面
    │   │   └── index.ux
    │   └── viewmr	查看病历详细内容
    │       ├── index.js
    │       └── index.ux
    └── util.js	快应用全局函数和变量

## 主入口文件

main/index.ux

## 时间

2019/12/30

## 团队

全面小康