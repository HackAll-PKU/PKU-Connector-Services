# PKU-Connector-Services
[![Build Status](https://img.shields.io/travis/HackAll-PKU/PKU-Connector-Services.svg)](https://travis-ci.org/HackAll-PKU/PKU-Connector-Services)
- PKU Connector的服务端
- [Github地址(建议使用Github查看此README,可使链接生效)](https://github.com/HackAll-PKU/PKU-Connector-Services)
- 2016数据库概论大作业
- 使用WebStorm IDE
- 基于Node.js v6.2.0和express v4.13.4构建
- 此服务的[API文档](./dev-resource/api)

## 使用方法
- 在运行了配套的create.sql(不在此项目中)之后在目录中npm install安装所需依赖
- 命令行中到项目目录下node bin/www
- node就会持续运行到手动中断为止,如果需要Deamon运行可以使用[forever](https://github.com/foreverjs/forever)

## 项目结构
### 总览
- 由于使用了express框架所以基本上整个项目是route-controller-model的结构
- route负责路由:定义了一定的正则匹配的URL,把特定的URL交给特定的controller处理
- controller拿到请求之后解析参数,交给model处理,并在model拿到数据之后负责返回的处理
- model被controller调用后向数据库做一定的请求,并把请求的结果交给controller
- 几乎完全按照RESTful风格设计API

### /
- travis.yml持续集成配置文件,就是github页面上能看到的小绿图标
- app.js程序主文件,由bin/www调用,其中对于项目进行了整体配置,包括对404等错误情况的处理
- package.json项目描述文件,其中描述了依赖库

### bin
存放项目启动文件

### conf
- 其中定义了一些基本的配置
- db.json中定义了数据库访问的配置
- default.json中定义了默认头像、默认背景图片的配置
- token.json中定义了颁发token的配置

### public
- 基本没有卵用,只有其中的样式在显示错误信息时有一点点用

### views
- 一开始不前后端分离所有写了views,后来前后端分离了views除了渲染错误信息就基本没用了

### routes
- 定义了各种路由
- 其中每一个router负责一系列的请求
- 其中./routes/router.js是所有router的出口,app.js会调用它来装载所有的路由

### controllers
- 定义了各种controller
- 其中每一个controller负责的每一个请求都有注释

### models
- 定义了各种model
- 其中每一个model负责的每一个数据库交互函数都有注释

## 特点
- 前后端完全分离,维护轻松
- RESTful API使得前端的调用非常方便,接口结构也非常清晰
- 用户认证没有使用不安全的Cookie和Session而使用了W3C推荐的[JSON Web Token](https://jwt.io)技术

## 分工
架构,User模块,认证模块,搜索模块,图片上传:陈乐天
Talking模块,Comment模块,Follow模块:胡顺昕
Like模块:寇雨婷

## Authored By 陈乐天，胡顺昕，寇雨婷
