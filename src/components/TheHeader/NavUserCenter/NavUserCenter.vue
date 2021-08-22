<template>
    <div class="nav-user-center">
        <div class="user-con search-icon">
            <a href="//search.bilibili.com/?from_source=webtop_search" target="_blank">
                <i class="bilifont bili-icon_dingdao_sousuo"></i>
            </a>
        </div>
        <div v-if="userInfo && userInfo.isLogin" class="user-con">
            <div class="item">
                <NavUserCenterAvatar></NavUserCenterAvatar>
            </div>
            <div class="item">
                <NavUserCenterVip></NavUserCenterVip>
            </div>
            <div class="item">
                <div class="nav-item">
                    <div class="t">
                        <a href="/" class="name" target="_blank">消息</a>
                    </div>
                </div>
            </div>
            <div v-for="(item,index) in userConItem" :key="index" class="item">
                <div class="nav-item">
                    <div class="t">
                        <a :href="item.url" class="name" target="_blank">{{ item.name }}</a>
                    </div>
                </div>
            </div>
        </div>
        <NavUserCenterUnlogin v-else></NavUserCenterUnlogin>
        <div>
            <span class="mini-upload">投稿</span>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import NavUserCenterAvatar from './NavUserCenterAvatar'
import NavUserCenterVip from './NavUserCenterVip'
import NavUserCenterUnlogin from './NavUserCenterUnlogin'
export default {
    name: 'NavUserCenter',
    components: {
        NavUserCenterAvatar, NavUserCenterVip, NavUserCenterUnlogin
    },
    data() {
        return {
            userConItem: [
                {
                    name: '动态',
                    url: ''
                },
                {
                    name: '收藏',
                    url: ''
                },
                {
                    name: '历史',
                    url: ''
                },
                {
                    name: '创作中心',
                    url: ''
                }
            ]
        }
    },
    computed: {
        ...mapState(['userInfo']),
    }
}
</script>
<style>
.nav-user-center {
    display: flex;
    flex-shrink: 0;
}

.nav-user-center .user-con {
    display: flex;
    align-items: center;
}

.nav-user-center .search-icon {
    display: none;
}

.nav-user-center .bilifont {
    color: #fff;
    vertical-align: middle;
    font-size: 20px;
    cursor: pointer;
}

@media screen and (max-width: 1190px) {
    .nav-user-center .search-icon {
        display: flex;
        align-items: center;
    }
}

.nav-user-center .user-con .item {
    position: relative;
    display: flex;
    margin-left: 12px;
    cursor: pointer;
}

.nav-user-center .user-con .item .name {
    color: #fff;
    text-shadow: 0 1px 1px rgb(0 0 0 / 30%);
    white-space: nowrap;
}

.nav-item {
    float: left;
    text-align: center;
    position: relative;
    background-color: rgba(255, 255, 255, 0);
    transition: all 0.3s;
}

.t {
    color: inherit;
    height: 100%;
    display: block;
}

.nav-user-center .user-con .item .name {
    color: #fff;
    text-shadow: 0 1px 1px rgb(0 0 0 / 30%);
    white-space: nowrap;
    font-size: 14px;
}

/*  */
.nav-user-center .user-con .fall-mini-avatar {
    width: 36px;
    height: 36px;
    position: relative;
    margin-right: 10px;
}

.nav-user-center .user-con .fall-mini-avatar.unlogin {
    margin-right: 16px;
}

.nav-user-center .user-con .fall-mini-avatar img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
}

.nav-user-center .user-con .fall-mini-avatar .unlogin-mark {
    position: absolute;
    top: -13px;
    left: -3px;
    display: inline-block;
    width: 80px;
    height: 32px;
    border-radius: 16px;
    line-height: 28px;
    font-size: 20px;
    background: #fb7299;
    color: #fff;
    text-align: center;
    border: 2px solid #fff;
    transform: scale(0.5);
}

/* 投稿按钮 */
.mini-upload {
    cursor: pointer;
    position: relative;
    color: #fff;
    font-size: 14px;
    display: block;
    width: 100px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background: #fb7299;
    border-radius: 2px;
    margin-left: 14px;
}

.international-header,
.el-popover {
    -webkit-font-smoothing: antialiased;
    font: 14px -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica,
        Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
    position: relative;
    z-index: 1000;
    margin: 0;
    padding: 0;
}
</style>