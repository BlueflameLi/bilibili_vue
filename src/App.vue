<template>
    <div id="app">
        <SvgIcon></SvgIcon>
        <router-view></router-view>
    </div>
</template>

<script>
// import Home from './components/Home'

export default {
    name: 'App',
    components: {
        // Home
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}


/* li无点 */
ol,
ul,
li {
    list-style: none;
}

/* a标签初始化 */
a {
    color: #212121;
    transition: color 0.3s;
    background-color: transparent;
    text-decoration: none;
    outline: none;
    cursor: pointer;
}

a:hover {
    color: #00a1d6;
}

img {
    vertical-align: middle;
    border-style: none;
}

em,
i {
    font-style: normal;
}

/* 去掉Vue路由标签发光 */
.router-link-active {
    text-shadow: none !important;
}

input,
textarea {
    outline: none;
}

/* 全局鼠标滑过蓝光过渡 */
.hover-blue:hover,
.hover-blue:hover span,
.hover-blue:hover p,
.hover-blue:hover a {
    color: #00a1d6 !important;
    transition: color 0.3s !important;
}

.clearfix {
    display: block;
}

.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

body {
    font: 12px -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica,
        Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
    margin-right: 12px;
}

input,
textarea {
    font-family: Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}


/* 滚动条美化 */
html ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

html ::-webkit-scrollbar-corner,
html ::-webkit-scrollbar-track {
    background: 0 0;
}

html ::-webkit-resizer,
html ::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 3px;
}

html ::-webkit-scrollbar-thumb:hover {
    background: #888;
}



</style>
