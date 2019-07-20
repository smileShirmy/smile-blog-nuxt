## smile-blog-nuxt (https://www.shirmy.me)

[![Build Status](https://www.travis-ci.org/smileShirmy/smile-blog-nuxt.svg?branch=master)](https://www.travis-ci.org/smileShirmy/smile-blog-nuxt)

- 适配多分辨率
- 支持白昼黑夜主题切换
- 文章图片懒加载
- 评论、留言、搜索、点赞、多个作者
- SSR服务端渲染

该项目为前端展示部分，其它部分可点击下面的链接

- 展示前端 [smile-blog-nuxt](https://github.com/smileShirmy/smile-blog-nuxt)
- 管理后台 [smile-blog-admin](https://github.com/smileShirmy/smile-blog-admin)
- 服务端 [smile-blog-koa](https://github.com/smileShirmy/smile-blog-koa)

## screenshot

![首页(黑夜主题)](https://resource.shirmy.me/blog/screenshot/2019-07-20/smile-blog-nuxt-screenshot-01.png)

![归档(白昼主题)](https://resource.shirmy.me/blog/screenshot/2019-07-20/smile-blog-nuxt-screenshot-02.png)

![标签(白昼主题)](https://resource.shirmy.me/blog/screenshot/2019-07-20/smile-blog-nuxt-screenshot-03.png)

![文章详情(白昼主题)](https://resource.shirmy.me/blog/screenshot/2019-07-20/smile-blog-nuxt-screenshot-04.png)

## Setup

该项目使用 RESTful API，要启动该项目要先启动服务端 [smile-blog-koa](https://github.com/smileShirmy/smile-blog-koa)

```bash
# install
npm install

# development
npm run dev

# production 
npm run build
npm start

# use pm2
npm run build
pm2 start npm --name nuxt -- start
```
