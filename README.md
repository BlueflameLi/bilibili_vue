# bilibili_vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 项目展示

![](screenshot/Snipaste_2021-08-22_21-59-57.png) 

![Snipaste_2021-08-22_22-00-33](screenshot/Snipaste_2021-08-22_22-00-33.png)  

![Snipaste_2021-08-22_22-00-46](screenshot/Snipaste_2021-08-22_22-00-46.png) 

![Snipaste_2021-08-22_22-00-56](screenshot/Snipaste_2021-08-22_22-00-56.png)

![Snipaste_2021-08-22_22-01-05](screenshot/Snipaste_2021-08-22_22-01-05.png)

![Snipaste_2021-08-22_22-01-12](screenshot/Snipaste_2021-08-22_22-01-12.png)

![Snipaste_2021-08-22_22-01-34](screenshot/Snipaste_2021-08-22_22-01-34.png)

## 项目说明

学习 Vue 用的项目，主要使用了 Vue2 + axios + Vuex +vue router + element-ui 

所有的样式都是直接从 b 站上扒下来的

图片和文字等数据大部分都是通过调用 b 站的 api 获得

api 部分来自第三方收集的，部分是我自己从官网上爬下来的

目前依旧还是半成品，不过功能已经七七八八了，后面就佛系更新了

漫画分区由于 api 有限制，axios 发的请求携带的 origin 无法通过检查，没什么好办法，因此用 express 做了个临时代理服务器来转发请求，特别推荐分区也有类似的情况，server 文件夹中放着两个转发请求用的代理服务器，需要开启才能获取漫画分区和特别推荐的数据（后面有空我就都合到一个后端服务器里去

```
node app 	//漫画分区代理服务器
node app2	//特别推荐代理服务器
```

登录界面目前只做了扫码登录，因为这个接口简单点，不过也够用了
