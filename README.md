# 运用nuxt搭建xxx网站

>前言

学习之前都是用vue做前端渲染，由于单页面前端异步加载数据SEO处理比较弱，所以最近学习vue SSR渲染技术,主要用nuxt来实现,仅供学习探讨。

>主要技术栈

[nuxt](https://github.com/nuxt/nuxt.js)、[element-ui](https://github.com/ElemeFE/element)、[axios](https://github.com/axios/axios)、[koa](https://github.com/koajs/koa)、[koa-router](https://www.npmjs.com/package/koa-router)、[mongoose](https://github.com/Automattic/mongoose)
<p align="center">
  <img width="900" src="https://cdn.piaoliusan.com/img/nathan-pro-bg.png">
</p>
## 功能

```
- 登录/退出

- 权限验证
 - 邮箱发送验证码
 - 登录鉴权

- 接口
 - 发送验证码
 - 注册账号
 - 登录账号
 - 退出账号
 - 城市list
 - 菜单
 - 搜索
 - 商品列表
 - 加入购物车
 - 获取购物车信息
 - 提交订单
 - 获取订单信息
```

>发送验证码说明

邮箱验证码功能，需要自己在server/dbs/config.js文件下配置自己的邮箱和授权码。
以QQ邮箱为例需要在设置账号中开通服务获取授权码

## 开发

```bash
# 需要安卓环境依赖
需要自行安装node、mongodb、redis

# 克隆项目
git clone https://github.com/t596502/mt-web.git

# 进入项目目录
cd nuxt-web

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```
