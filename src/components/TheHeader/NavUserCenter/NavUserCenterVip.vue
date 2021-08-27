<template>
    <el-popover popper-class="van-popper-vip" trigger="hover" :open-delay="300">
        <template #reference>
            <div class="mini-vip">
                <!---->
                <span target="_blank" class="name">大会员</span>
            </div>
        </template>
        <div class="vip-m">
            <div class="bubble-traditional">
                <div class="recommand">
                    <div class="title">精彩推荐</div>
                    <div class="bubble-col bubble-col-1">
                        <div v-if="locsData['2836']" class="item">
                            <a target="_blank" :href="locsData['2836'][0].url" class="pic">
                                <img :src="locsData['2836'][0].pic" width="230" height="68" />
                            </a>
                            <a
                                target="_blank"
                                :href="locsData['2836'][0].url"
                                class="recommand-link"
                            >{{ locsData['2836'][0].name }}~</a>
                        </div>
                        <div v-else class="item">
                            <a
                                target="_blank"
                                href="//account.bilibili.com/account/big"
                                class="pic"
                            >
                                <img
                                    src="//s1.hdslb.com/bfs/static/jinkela/international-home/assets/vip-default-banner.png"
                                    width="230"
                                    height="68"
                                />
                            </a>
                            <a
                                target="_blank"
                                href="//account.bilibili.com/account/big"
                                class="recommand-link"
                            >大会员可畅享各种专属内容，还有游戏礼包、个性装扮等你来拿~</a>
                        </div>
                    </div>
                    <!---->
                    <div class="renew-btn">
                        <button>{{ userInfo.vipStatus === 1 ? '续期大会员' : '开通大会员' }}</button>
                        <!---->
                    </div>
                </div>
            </div>
        </div>
    </el-popover>
</template>
<script>

import { mapState } from 'vuex'
export default {
    name: 'NavUserCenterVip',
    data() {
        return {

        }
    },
    computed: {
        ...mapState(['userInfo', 'locsData']),
    },
    methods: {

    },
}
</script>
<style>
.el-popover.el-popper.van-popper-vip {
    padding: 0;
    border: none;
    top: 44px !important;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2) !important;
}

.vip-m {
    width: 260px;
}

.vip-m .bubble-traditional {
    padding: 14px;
}

.vip-m .bubble-traditional .recommand .title {
    color: #212121;
    font-size: 14px;
    margin: 5px 0 12px;
    font-weight: 900;
}

.vip-m .bubble-traditional .recommand .bubble-col .item {
    display: inline-block;
    margin-bottom: 7px;
}

.vip-m .bubble-traditional .recommand .bubble-col .item .pic {
    display: inline-block;
}

.vip-m .bubble-traditional .recommand .bubble-col .item img {
    border-radius: 2px;
    background: #ccc;
    display: block;
}

.vip-m .bubble-traditional .recommand .bubble-col .item .recommand-link {
    margin-top: 10px;
    font-size: 14px;
    color: #222;
    text-align: left;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-line-clamp: 2;
    line-height: 18px;
    overflow: hidden;
}

.vip-m .bubble-traditional .recommand .bubble-col .item .recommand-link:hover {
    color: #00a1d6;
}

.vip-m .bubble-traditional .recommand .bubble-col.bubble-col-1 .item {
    width: 100%;
}

.vip-m .bubble-traditional .recommand .bubble-col.bubble-col-1 img {
    width: 230px;
    height: 68px;
}

.vip-m .bubble-traditional .recommand .bubble-col.bubble-col-2 {
    display: -ms-flexbox;
    display: flex;
}

.vip-m .bubble-traditional .recommand .bubble-col.bubble-col-2 .item {
    width: 50%;
}

.vip-m
    .bubble-traditional
    .recommand
    .bubble-col.bubble-col-2
    .item:nth-child(2) {
    text-align: right;
}

.vip-m
    .bubble-traditional
    .recommand
    .bubble-col.bubble-col-2
    .item:nth-child(2)
    .recommand-link {
    margin-left: 8px;
}

.vip-m .bubble-traditional .recommand .bubble-col.bubble-col-2 img {
    width: 107px;
    height: 143px;
}

.vip-m .bubble-traditional .recommand .bubble-col.bubble-col-3 {
    display: -ms-flexbox;
    display: flex;
}

.vip-m .bubble-traditional .recommand .bubble-col.bubble-col-3 .item {
    width: 33%;
}

.vip-m
    .bubble-traditional
    .recommand
    .bubble-col.bubble-col-3
    .item:nth-child(2) {
    text-align: center;
}

.vip-m
    .bubble-traditional
    .recommand
    .bubble-col.bubble-col-3
    .item:nth-child(2)
    .recommand-link {
    margin-left: 3px;
}

.vip-m
    .bubble-traditional
    .recommand
    .bubble-col.bubble-col-3
    .item:nth-child(3) {
    text-align: right;
}

.vip-m
    .bubble-traditional
    .recommand
    .bubble-col.bubble-col-3
    .item:nth-child(3)
    .recommand-link {
    margin-left: 4px;
}

.vip-m .bubble-traditional .recommand .bubble-col.bubble-col-3 img {
    width: 72px;
    height: 94px;
}

.vip-m .bubble-traditional .notify {
    border-top: 1px solid #f0f0f0;
    padding: 11px 0 4px;
}

.vip-m .bubble-traditional .notify .notify-list {
    font-size: 14px;
}

.vip-m .bubble-traditional .notify .notify-list li {
    margin-top: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.vip-m .bubble-traditional .notify .notify-list li:first-child {
    margin-top: 0;
}

.vip-m .bubble-traditional .notify .notify-list li a {
    color: #222;
}

.vip-m .bubble-traditional .notify .notify-list li a:hover {
    color: #00a1d6;
}

.vip-m .bubble-traditional .notify .notify-list li .icon {
    color: #fb7299;
    border: 1px solid #fb7299;
    width: 32px;
    height: 16px;
    line-height: 16px;
    border-radius: 3px;
    text-align: center;
    display: inline-block;
    box-sizing: border-box;
    margin-right: 6px;
}

.vip-m .bubble-traditional .renew-btn {
    margin-top: 20px;
    text-align: center;
    position: relative;
}

.vip-m .bubble-traditional .renew-btn button {
    width: 160px;
    height: 32px;
    background: #00a1d6;
    color: #fff;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    font-size: 14px;
}

.vip-m .bubble-traditional .renew-btn button:hover {
    background: #00b5e5;
}

.vip-m .bubble-traditional .renew-btn .cash {
    position: absolute;
    right: 25px;
    top: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 20px;
    font-size: 12px;
    background: #f25d8e;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 10px;
}
</style>
