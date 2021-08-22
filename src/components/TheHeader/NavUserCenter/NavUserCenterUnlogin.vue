<template>
    <div class="user-con">
        <el-popover trigger="hover" :visible-arrow="false" :open-delay="150" :width="360">
            <template #reference>
                <div class="item fall-mini-avatar unlogin">
                    <span>
                        <div class="unlogin-avatar">登录</div>
                    </span>
                </div>
            </template>
            <div class="unlogin-popover unlogin-popover-avatar">
                <div class="title">登录后你可以：</div>
                <div class="content ltc-content">
                    <div>
                        <div class="lt-icon icon-hd"></div>
                        <span class="lt-text">免费看高清视频</span>
                    </div>
                    <div>
                        <div class="lt-icon icon-time"></div>
                        <span class="lt-text">多端同步播放记录</span>
                    </div>
                    <div>
                        <div class="lt-icon icon-danmaku"></div>
                        <span class="lt-text">发表弹幕/评论</span>
                    </div>
                    <div>
                        <div class="lt-icon icon-video"></div>
                        <span class="lt-text">热门番剧影视看不停</span>
                    </div>
                </div>
                <router-link to="/login" target="_blank" class="login-btn">立即登录</router-link>
                <div class="register-tip">
                    首次使用？
                    <a
                        href="https://passport.bilibili.com/register/phone.html"
                        target="_blank"
                    >点我注册</a>
                </div>
            </div>
        </el-popover>
        <div class="item">
            <NavUserCenterVip></NavUserCenterVip>
        </div>
        <el-popover
            v-for="(item, index) in userConItem"
            :key="index"
            trigger="hover"
            :visible-arrow="false"
            :open-delay="150"
            :width="360"
        >
            <template #reference>
                <div class="item">
                    <span class="name">{{ item.name }}</span>
                </div>
            </template>
            <div class="unlogin-popover">
                <div class="content-msg">登录即可查看{{ item.contentMsg }}</div>
                <router-link to="/login" target="_blank" class="login-btn">立即登录</router-link>
            </div>
        </el-popover>
        <div class="item">
            <a href="//member.bilibili.com/platform/home" target="_blank">
                <span class="name">创作中心</span>
            </a>
        </div>
    </div>
</template>
<script>
import NavUserCenterVip from './NavUserCenterVip'
export default {
    name: 'NavUserCenterUnlogin',
    components: {
        NavUserCenterVip
    },
    data() {
        return {
            userConItem: [
                {
                    name: '消息',
                    url: '',
                    contentMsg: '消息记录'
                },
                {
                    name: '动态',
                    url: '',
                    contentMsg: '关注动态'
                },
                {
                    name: '收藏',
                    url: '',
                    contentMsg: '我的收藏'
                },
                {
                    name: '历史记录',
                    url: '',
                    contentMsg: '历史记录'
                }
            ]
        }
    },
}
</script>
<style scoped>
.unlogin-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    line-height: 36px;
    font-size: 14px;
    color: #00a1d6;
    letter-spacing: 0;
    background: #f6f6f6;
    text-align: center;
    font-weight: 600;
}

.unlogin-history {
    position: relative;
}

.unlogin-history .dot {
    position: absolute;
    right: -3px;
    top: 3px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #fb7299;
}

.unlogin-popover {
    width: 360px;
    background: #fff;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    position: relative;
    padding: 14px 16px;
}

.unlogin-popover:before {
    display: block;
    content: " ";
    position: absolute;
    width: 10px;
    height: 10px;
    top: -5px;
    left: 175px;
    background: #fff;
    transform: rotate(45deg);
}

.unlogin-popover .content-msg {
    height: 40px;
    line-height: 40px;
    margin-bottom: 14px;
    font-size: 14px;
    color: #999;
    letter-spacing: 0;
    text-align: center;
}

.unlogin-popover-avatar {
    height: 234px;
}

.unlogin-popover-avatar .title {
    line-height: 20px;
    font-size: 14px;
    color: #212121;
    letter-spacing: 0;
    margin-left: 4px;
    margin-bottom: 16px;
}

.unlogin-popover-avatar .ltc-content {
    margin-bottom: 6px;
}

.unlogin-popover-avatar .register-tip {
    margin-top: 16px;
    text-align: center;
    font-size: 14px;
    color: #212121;
    letter-spacing: 0;
    line-height: 20px;
}

.unlogin-popover-avatar .register-tip > a {
    color: #00a1d6;
}

.unlogin-popover-avatar .register-tip > a:hover {
    color: #00b5e5;
}

.login-btn {
    display: block;
    box-sizing: border-box;
    height: 40px;
    padding: 10px 0;
    line-height: 20px;
    font-size: 14px;
    color: #fff;
    letter-spacing: 0;
    text-align: center;
    background: #00a1d6;
    border-radius: 2px;
    cursor: pointer;
}

.login-btn:hover {
    color: #fff;
    background: #00b5e5;
}

.name {
    cursor: pointer;
}

/*  */
.content {
    flex-wrap: wrap;
}

.content,
.content > * {
    display: flex;
}

.content > * {
    width: 162px;
    height: 26px;
    margin-bottom: 14px;
    align-items: center;
}

.content .lt-icon {
    width: 26px;
    height: 26px;
    background-size: contain;
    background-position: 50%;
    background-repeat: no-repeat;
}

.content .lt-icon.icon-video {
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/international-home/assets/video.png);
}

.content .lt-icon.icon-time {
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/international-home/assets/time.png);
}

.content .lt-icon.icon-danmaku {
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/international-home/assets/danmaku.png);
}

.content .lt-icon.icon-hd {
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/international-home/assets/hd.png);
}

.content .lt-text {
    margin-left: 6px;
    font-size: 14px;
    line-height: 14px;
    color: #212121;
}
</style>