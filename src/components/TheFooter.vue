<template>
    <div class="international-footer">
        <div class="link-box footer-wrap">
            <div class="footer-left">
                <div class="link-item link-a">
                    <span class="bt">bilibili</span>
                    <ul>
                        <a
                            v-for="(item, index) in btData.slice(0, 8)"
                            :key="index"
                            target="_blank"
                            :href="item.url"
                        >{{ item.name }}</a>
                    </ul>
                </div>
                <div class="link-item link-b">
                    <span class="bt">传送门</span>
                    <ul>
                        <a
                            v-for="(item, index) in btData.slice(8, 20)"
                            :key="index"
                            target="_blank"
                            :href="item.url"
                        >{{ item.name }}</a>
                    </ul>
                </div>
            </div>
            <div class="footer-right">
                <div class="link-item link-c">
                    <div v-for="(item, index) in linkCData" :key="index" class="a-wraper">
                        <a :href="item.url" target="_blank" :class="item.class">
                            <i class="bili-footer-font" :class="item.icon"></i>
                            <p>{{ item.name }}</p>
                            <div class="qrcode"></div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="partner footer-wrap">
            <div class="pic-box">
                <img src="//s1.hdslb.com/bfs/seed/jinkela/footer-v2/images/partner.png" class="pic" />
                <img
                    src="https://s1.hdslb.com/bfs/static/jinkela/long/images/pic962110.png"
                    width="100"
                    height="40"
                    class="pic962110"
                />
            </div>
            <div class="text-con">
                <p>
                    <span>
                        <a
                            href="//i0.hdslb.com/bfs/activity-plat/static/20210302/fd61576fc72dac89e5e7763dfd8d7bc7/JzUN7b8Ek.png"
                            target="_blank"
                        >营业执照</a>
                    </span>
                    <span>信息网络传播视听节目许可证：0910417</span>
                    <span>网络文化经营许可证 沪网文【2019】3804-274号</span>
                    <span>广播电视节目制作经营许可证：（沪）字第01248号</span>
                    <span>增值电信业务经营许可证 沪B2-20100043</span>
                    <span>
                        互联网ICP备案：
                        <a href="http://beian.miit.gov.cn/" target="_blank">沪ICP备13002172号-3</a>
                    </span>
                    <span>出版物经营许可证 沪批字第U6699 号</span>
                    <span>互联网药品信息服务资格证 沪-非经营性-2016-0143</span>
                    <span>营业性演出许可证 沪市文演（经）00-2253</span>
                </p>
                <p>违法不良信息举报邮箱：help@bilibili.com |违法不良信息举报电话：4006262233转1</p>
                <p>
                    <i class="sprite bg1"></i>
                    <a href="http://www.shjbzx.cn" target="_blank">上海互联网举报中心</a> |
                    <a href="http://jbts.mct.gov.cn/" target="_blank">12318全国文化市场举报网站</a> |
                    <i class="sprite bg2"></i>
                    <a
                        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011002002436"
                        target="_blank"
                    >沪公网安备31011002002436号</a> |
                    <a href="mailto:userreport@bilibili.com">儿童色情信息举报专区</a> |
                    <a href="http://www.shdf.gov.cn/shdf/channels/740.html">扫黄打非举报</a>
                </p>
                <p>
                    网上有害信息举报专区：
                    <i class="sprite bg3"></i>
                    <a href="https://www.12377.cn/" target="_blank">中国互联网违法和不良信息举报中心</a>
                </p>
                <p>亲爱的市民朋友，上海警方反诈劝阻电话“96110”系专门针对避免您财产被骗受损而设，请您一旦收到来电，立即接听。</p>
                <p>公司名称：上海宽娱数码科技有限公司|公司地址：上海市杨浦区政立路485号|电话：021-25099888</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TheFooter',
    data() {
        return {
            btData: [
                {
                    url: '//www.bilibili.com/blackboard/aboutUs.html',
                    name: '关于我们'
                },
                {
                    url: '//www.bilibili.com/blackboard/contact.html',
                    name: '联系我们'
                },
                {
                    url: 'https://www.bilibili.com/protocal/licence.html',
                    name: '用户协议'
                },
                {
                    url: '//www.bilibili.com/blackboard/join.html',
                    name: '加入我们'
                },
                {
                    url: '//www.bilibili.com/blackboard/friends-links.html',
                    name: '友情链接'
                },
                {
                    url: 'https://www.bilibili.com/blackboard/privacy-pc.html',
                    name: '隐私政策'
                },
                {
                    url: '//account.bilibili.com/account/official/home',
                    name: 'bilibili认证'
                },
                {
                    url: 'https://www.bilibili.com/protocal/licence.html',
                    name: 'Investor Relations'
                },
                {
                    url: '//www.bilibili.com/blackboard/topic/activity-cn8bxPLzz.html',
                    name: '协议汇总'
                },
                {
                    url: '//www.bilibili.com/blackboard/activity-list.html',
                    name: '活动中心'
                },
                {
                    url: '//www.bilibili.com/blackboard/topic_list.html',
                    name: '活动专题页'
                },
                {
                    url: '//www.bilibili.com/v/copyright/intro/',
                    name: '侵权申诉'
                },
                {
                    url: '//www.bilibili.com/blackboard/help.html',
                    name: '帮助中心'
                },
                {
                    url: 'https://t.bilibili.com/topic/name/%E7%94%A8%E6%88%B7%E5%8F%8D%E9%A6%88%E8%AE%BA%E5%9D%9B/feed',
                    name: '用户反馈论坛'
                },
                {
                    url: '//space.bilibili.com/6823116#/album',
                    name: '壁纸站'
                },
                {
                    url: '//e.bilibili.com/',
                    name: '广告合作'
                },
                {
                    url: '//www.bilibili.com/blackboard/activity-S1jfy69Jz.html',
                    name: '名人堂'
                },
                {
                    url: '//mcn.bilibili.com/studio/mcn/entry',
                    name: 'MCN管理中心'
                },
                {
                    url: '//www.bilibili.com/video/BV1Xx411c7cH/',
                    name: '高级弹幕'
                },
                {
                    url: '//b.bilibili.com',
                    name: '企业号官网'
                }
            ],
            linkCData: [
                {
                    url: '//app.bilibili.com/',
                    class: 'biliapp',
                    icon: 'bili-footer-icon_download',
                    name: '下载APP'
                },
                {
                    url: '//weibo.com/bilibiliweb',
                    class: 'weibo',
                    icon: 'bili-footer-icon_weibo',
                    name: '新浪微博'
                },
                {
                    url: '',
                    class: 'weixin',
                    icon: 'bili-footer-icon_wechat',
                    name: '官方微信'
                }
            ]
        }
    },
}
</script>
<style>
.international-footer {
    font: 12px "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei",
        "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
    position: relative;
    margin: 0;
    padding: 0;
    background-color: #f6f9fa;
    padding: 30px 0;
    min-width: 999px;
    /* 滚动条偏移修正 */
    margin-right: -12px;
}

.international-footer * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.international-footer .footer-wrap {
    max-width: 1630px;
    min-width: 999px;
    margin: 0 auto;
}

.international-footer .link-box {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
}

.international-footer .link-box .footer-left {
    flex: 4;
    display: flex;
    justify-content: space-between;
}

.international-footer .link-box .footer-right {
    flex: 1;
    display: flex;
    align-items: center;
}

.international-footer .link-box .link-item {
    flex: 2;
    padding-right: 40px;
    margin-right: 40px;
    border-right: 1px solid #eee;
}

.international-footer .link-box .link-item.link-b {
    flex: 3;
}

.international-footer .link-box .link-item .bt {
    font-size: 16px;
    color: #999;
    display: block;
    height: 20px;
    margin-bottom: 20px;
}

.international-footer .link-box .link-item ul {
    height: 110px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.international-footer .link-box .link-item ul a {
    display: inline-block;
    margin-bottom: 10px;
    width: 50%;
    height: 20px;
    cursor: pointer;
}

.international-footer .link-box .link-item ul a:nth-child(4n) {
    margin-bottom: 0;
}

.international-footer .link-box .link-item.link-b ul a {
    width: 33.3333%;
}

.international-footer .link-box .link-item.link-b ul {
    height: 110px;
}

.international-footer .link-box .link-item.link-c {
    padding-right: 0;
    border-right: none;
    margin-right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.international-footer .link-box .link-item.link-c .a-wraper {
    flex: 1;
    display: flex;
    min-width: 70px;
    justify-content: center;
    align-items: center;
}

.international-footer .link-box .link-item.link-c a {
    position: relative;
    display: inline-block;
    text-align: center;
    color: #212121;
}

.international-footer .link-box .link-item.link-c .bili-footer-font {
    font-size: 50px;
}

.international-footer .link-box .link-item.link-c a .qrcode {
    display: none;
    position: absolute;
    top: -125px;
    left: -25px;
    width: 117px;
    height: 117px;
    background: #fff;
    border: 1px solid #eee;
    padding: 10px;
    background-repeat: no-repeat;
    background-position: center;
}

.international-footer .link-box .link-item.link-c .biliapp {
    color: #585f69;
}

.international-footer .link-box .link-item.link-c .weibo {
    color: #fe596c;
}

.international-footer .link-box .link-item.link-c .weixin {
    color: #42c86b;
}

.international-footer .link-box .link-item.link-c p {
    margin-top: 10px;
    color: #212121;
    height: 20px;
    transition: color 0.2s;
}

.international-footer .link-box .link-item.link-c a:hover .qrcode {
    display: block;
}

.international-footer .link-box .link-item.link-c a.biliapp .qrcode {
    background-image: url(//s1.hdslb.com/bfs/seed/jinkela/footer-v2/images/biliapp_qrcode.png);
}

.international-footer .link-box .link-item.link-c a.weibo .qrcode {
    background-image: url(//s1.hdslb.com/bfs/seed/jinkela/footer-v2/images/weibo_qrcode.png);
}

.international-footer .link-box .link-item.link-c a.weixin .qrcode {
    width: 241px;
    left: -185px;
    height: 143px;
    top: -151px;
    background-image: url(//s1.hdslb.com/bfs/seed/jinkela/footer-v2/images/weixin_qrcode.gif);
}

.international-footer .link-box .link-item.link-c a:hover p {
    color: #00a1d6;
}

/* 下部 */
.international-footer .partner {
    display: flex;
    padding-top: 30px;
    color: #999;
}

.international-footer .partner .pic-box {
    width: 100px;
    margin-right: 20px;
}

.international-footer .partner .text-con {
    width: calc(100% - 120px);
}

.international-footer .partner .pic {
    width: 96px;
    height: 75px;
}

.international-footer .partner .pic962110 {
    margin: 5px 0;
}

.international-footer .partner p {
    line-height: 24px;
}

.international-footer .partner .sprite {
    display: inline-block;
    background-image: url(//s1.hdslb.com/bfs/seed/jinkela/footer-v2/images/hz_icon.png);
    background-repeat: no-repeat;
    vertical-align: middle;
    margin-right: 3px;
}

.international-footer .partner .sprite.bg1 {
    width: 16px;
    height: 16px;
    background-position: 0 -2px;
}

.international-footer .partner .sprite.bg2 {
    width: 18px;
    height: 20px;
    background-position: -41px 0px;
}

.international-footer .partner .sprite.bg3 {
    width: 16px;
    height: 16px;
    background-position: -18px -3px;
}

.international-footer .partner a {
    color: #999;
}


</style>