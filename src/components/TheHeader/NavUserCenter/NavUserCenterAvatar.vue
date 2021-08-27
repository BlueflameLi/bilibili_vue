<template>
    <el-popover
        v-model="popoverVisible"
        popper-class="van-popper-nav van-popper-avatar"
        trigger="hover"
        :visible-arrow="false"
        :open-delay="150"
        @show="popperShow"
    >
        <template #reference>
            <div class="mini-avatar">
                <div :class="{ 'mini-move': popoverVisible }">
                    <div class="bili-avatar">
                        <img
                            v-if="userInfo.face"
                            class="bili-avatar-img bili-avatar-face bili-avatar-img-radius"
                            alt
                            :src="$format.trimHttp(userInfo.face) + '@96w_96h_1c_1s.webp'"
                        />

                        <span class="bili-avatar-icon"></span>
                    </div>
                </div>
            </div>
        </template>
        <div v-if="userInfo.isLogin" class="vp-container">
            <a
                href="//space.bilibili.com"
                target="_blank"
                class="avatar"
                :class="{ 'has-decorate': hasDecorate }"
            >
                <div class="bili-avatar">
                    <img
                        v-if="userInfo.face"
                        class="bili-avatar-img bili-avatar-face bili-avatar-img-radius"
                        alt
                        :src="$format.trimHttp(userInfo.face) + (hasDecorate ? '@120w_120h_1c_1s.webp' : '@160w_160h_1c_1s.webp')"
                    />
                    <div v-if="hasDecorate" class="bili-avatar-pendent">
                        <img
                            class="bili-avatar-img"
                            data-src="https://i0.hdslb.com/bfs/garb/item/6b168fff6ad3fc4fa1a995f16fb77ed9db9776c6.png@204w_204h.webp"
                            alt
                            src="https://i0.hdslb.com/bfs/garb/item/6b168fff6ad3fc4fa1a995f16fb77ed9db9776c6.png@204w_204h.webp"
                        />
                    </div>
                    <span
                        class="bili-avatar-icon"
                        :class="iconType && iconType != 'custom' ? 'bili-avatar-icon--' + iconType : ''"
                        :style="iconType === 'custom' ? `background-image: url(${$format.trimHttp(userInfo.vip.avatar_subscript_url)}@40w_40h_1c.webp);` : ''"
                    ></span>
                </div>
            </a>
            <p
                class="nickname"
                :style="{ 'padding-top': hasDecorate ? '52px' : '42px', 'color': userInfo.vip ? userInfo.vip.nickname_color : '#212121' }"
            >{{ userInfo.uname }}</p>
            <a
                v-if="isVip"
                href="//account.bilibili.com/account/big"
                target="_blank"
                class="vip"
                :style="labelColor"
            >{{ userInfo.vip && userInfo.vip.label ? userInfo.vip.label.text : "" }}</a>
            <div class="level-content">
                <div class="level-info">
                    <span class="grade">等级 {{ userInfo.level_info.current_level }}</span>
                    <span
                        v-if="userInfo.level_info.current_level"
                        class="progress"
                    >{{ userInfo.level_info.current_exp }} / {{ userInfo.level_info.next_exp }}</span>
                    <a
                        v-else
                        href="https://www.bilibili.com/v/newbie/entry?re_src=17"
                        target="_blank"
                        class="hint"
                    >答题转正直升Lv 1</a>
                </div>
                <a
                    href="https://account.bilibili.com/account/record?type=exp"
                    target="_blank"
                    class="level-link"
                >
                    <div class="level-bar">
                        <div class="level-progress" :style="{ width: progressWidth }"></div>
                    </div>
                </a>
                <div class="level-intro">
                    <p
                        class="level-intro__title"
                    >作为LV{{ userInfo.level_info.current_level }}，{{ userInfo.level_info.current_level ? '你可以：' : '你无法享受特权' }}</p>
                    <div class="level-intro__content" v-html="levelTxtArray"></div>
                    <a
                        href="//www.bilibili.com/blackboard/help.html"
                        target="_blank"
                        class="level-intro__link"
                    >
                        会员等级相关说明
                        <svg aria-hidden="true" class="svg-icon">
                            <use xlink:href="#bili-icon_caozuo_xiangyou" />
                        </svg>
                    </a>
                </div>
            </div>
            <div class="coins">
                <div class="coins-container">
                    <div class="info">
                        <svg
                            aria-hidden="true"
                            class="add-one-icon"
                            :class="{ 'add-one-icon--show': isFirstLoginAni && popoverVisible }"
                        >
                            <use xlink:href="#bili-yingbi" />
                        </svg>
                        <a
                            href="https://account.bilibili.com/site/coin"
                            target="_blank"
                            title="硬币"
                            class="jump"
                        >
                            <svg aria-hidden="true" class="coins-icon">
                                <use xlink:href="#bili-icon_dingdao_yingbi" />
                            </svg>
                            <span class="money">{{ userInfo.money.toFixed(1) }}</span>
                        </a>
                        <span
                            class="login-award"
                            :class="{ 'login-award--show': isFirstLoginAni && popoverVisible }"
                        >登录奖励</span>
                        <a
                            href="https://pay.bilibili.com/paywallet-fe/bb_balance.html"
                            target="_blank"
                            title="B币"
                        >
                            <svg aria-hidden="true" class="coins-icon">
                                <use xlink:href="#bili-icon_dingdao_Bbi" />
                            </svg>
                            <span
                                class="money"
                            >{{ userInfo.wallet ? userInfo.wallet.bcoin_balance : '--' }}</span>
                        </a>
                    </div>
                    <div class="contact">
                        <a
                            href="https://passport.bilibili.com/account/security#/bindmail"
                            target="_blank"
                            class="email"
                        >
                            <i
                                class="bilifont email-icon"
                                :class="{ 'email-icon--bind': userInfo.email_verified }"
                            ></i>
                            <span v-if="!userInfo.email_verified" class="email-mark"></span>
                            <span
                                class="contact-tips email-tips"
                            >{{ userInfo.email_verified ? '已绑定' : '前去绑定邮箱' }}</span>
                        </a>
                        <a
                            href="https://passport.bilibili.com/account/security#/bindphone"
                            target="_blank"
                            class="phone"
                        >
                            <i
                                class="bilifont phone-icon"
                                :class="{ 'phone-icon--bind': userInfo.mobile_verified }"
                            ></i>
                            <span v-if="!userInfo.mobile_verified" class="phone-mark"></span>
                            <span
                                class="contact-tips phone-tips"
                            >{{ userInfo.mobile_verified ? '已绑定' : '前去绑定手机' }}</span>
                        </a>
                    </div>
                </div>
                <div v-if="userInfo.mobile_verified === 0" class="hint">
                    <a
                        href="https://passport.bilibili.com/account/security#/bindphone"
                        target="_blank"
                    >绑定手机可领取每日硬币</a>
                </div>
            </div>
            <div class="counts">
                <a
                    :href="`//space.bilibili.com/${userInfo.mid}/fans/follow`"
                    target="_blank"
                    class="count-item"
                >
                    <div class="item-key">关注</div>
                    <div class="item-value">
                        <span class="item-num">{{ following.num }}</span>
                        <span class="item-unit">{{ following.unit }}</span>
                    </div>
                </a>
                <a
                    href="//space.bilibili.com/12570204/fans/fans"
                    target="_blank"
                    class="count-item"
                >
                    <div class="item-key">粉丝</div>
                    <div class="item-value">
                        <span class="item-num">{{ follower.num }}</span>
                        <span class="item-unit">{{ follower.unit }}</span>
                    </div>
                </a>
                <a href="//space.bilibili.com/12570204/dynamic" target="_blank" class="count-item">
                    <div data-v-5314bca5 class="item-key">动态</div>
                    <div data-v-5314bca5 class="item-value">
                        <span data-v-5314bca5 class="item-num">{{ dynamic_count.num }}</span>
                        <span data-v-5314bca5 class="item-unit">{{ dynamic_count.unit }}</span>
                    </div>
                </a>
            </div>
            <div class="links">
                <a
                    href="https://account.bilibili.com/account/home"
                    target="_blank"
                    class="link-item"
                >
                    <div class="link-title">
                        <i class="link-icon bilifont bili-icon_dingdao_gerenzhongxin"></i>
                        个人中心
                    </div>
                </a>
                <a
                    href="https://member.bilibili.com/v2#/upload-manager/article"
                    target="_blank"
                    class="link-item"
                >
                    <div class="link-title">
                        <i class="link-icon bilifont bili-icon_dingdao_tougaoguanli"></i>
                        投稿管理
                    </div>
                </a>
                <a
                    href="https://pay.bilibili.com/pay-v2-web/bcoin_index"
                    target="_blank"
                    class="link-item"
                >
                    <div class="link-title">
                        <i class="link-icon bilifont bili-icon_dingdao_qianbao"></i>
                        B币钱包
                    </div>
                </a>
                <a href="https://show.bilibili.com/orderlist" target="_blank" class="link-item">
                    <div class="link-title">
                        <i class="link-icon bilifont bili-icon_dingdao_dingdanzhongxin"></i>
                        订单中心
                    </div>
                </a>
                <a
                    href="https://link.bilibili.com/p/center/index"
                    target="_blank"
                    class="link-item"
                >
                    <div class="link-title">
                        <i class="link-icon bilifont bili-icon_dingdao_zhibozhongxin"></i>
                        直播中心
                    </div>
                </a>
                <a
                    href="https://www.bilibili.com/cheese/mine/list"
                    target="_blank"
                    class="link-item"
                >
                    <div class="link-title">
                        <i class="link-icon bilifont bili-icon_dingdao_cheese"></i>
                        我的课程
                    </div>
                </a>
            </div>
            <div data-v-5314bca5 class="lang-change">
                <div class="lang-item">
                    <div class="lang-title">
                        <i class="lang-icon bilifont bili-icon_dingdao_yuyanshezhi"></i>
                        语言：简体中文
                    </div>
                    <i class="lang-icon-more bilifont bili-icon_caozuo_qianwang"></i>
                </div>
                <div class="lang-intro">
                    <ul>
                        <li class="lang-intro-item on">
                            简体中文
                            <i class="bilifont bili-icon_caozuo_xuanzhong"></i>
                        </li>
                        <li class="lang-intro-item">
                            繁体中文
                            <i class="bilifont bili-icon_caozuo_xuanzhong"></i>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="logout" @click="logout">
                <span>
                    <i class="link-icon bilifont bili-icon_dingdao_dengchu"></i>
                    退出
                </span>
            </div>
        </div>
    </el-popover>
</template>
<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'
import { getUserStatCnt, Logout } from '@/api'
export default {
    name: 'NavUserCenterAvatar',
    data() {
        return {
            isFirstLoginAni: false,
            popoverVisible: false,
            levelArray: [
                "成为正式会员,你可以：<br/>1、发射个性弹幕<br/>2、参与视频评论<br/>3、登入获得硬币<br/>4、投稿成为偶像",
                "1、发射滚动弹幕<br/>2、投稿成为偶像",
                "1、发射个性弹幕（彩色、高级）<br/>2、参与视频互动（评论）<br/>3、投稿成为偶像",
                "1、发射个性弹幕（彩色、高级、顶部、底部）<br/>2、参与视频互动（评论、添加tag）<br/>3、投稿成为偶像",
                "1、发射个性弹幕（彩色、高级、顶部、底部）<br/>2、参与视频互动（评论、添加tag）<br/>3、投稿成为偶像",
                "1、购买邀请码（1个/月）<br/>2、发射个性弹幕（彩色、高级、顶部、底部）<br/>3、参与视频互动（评论、添加tag）<br/>4、投稿成为偶像",
                "1、购买邀请码（2个/月）<br/>2、发射个性弹幕（彩色、高级、顶部、底部）<br/>3、参与视频互动（评论、添加tag）<br/>4、投稿成为偶像"],
            userStatCnt: null
        }
    },
    computed: {
        ...mapState(['userInfo']),
        hasDecorate() {
            return this.userInfo.pendant && this.userInfo.pendant.image
        },
        iconType: function () {
            return "organization" === this.verify ? "business" : "person" === this.verify ? "personal" : this.isVip && this.userInfo.vip && this.userInfo.vip.avatar_subscript_url ? "custom" : this.isVip && 2 === this.userInfo.vip.vip_avatar_subscript ? "small-vip" : this.isVip && 1 === this.userInfo.vip.vip_avatar_subscript ? "big-vip" : ""
        },
        verify: function () {
            if (this.userInfo && this.userInfo.official) {

                var t = this.userInfo.official.role;
                if (1 === t || 2 === t || 7 === t)
                    return "person";
                if (3 === t || 4 === t || 5 === t || 6 === t)
                    return "organization"
            }
            return ""
        },
        isVip: function () {
            return (this.userInfo.vipType == 1 || this.userInfo.vipType == 2) && this.userInfo.vipStatus == 1
        },
        labelColor() {
            if (this.userInfo.vip && this.userInfo.vip.label)
                return {
                    background: this.userInfo.vip.label.bg_color,
                    color: this.userInfo.vip.label.text_color
                }
            else
                return ''
        },
        progressWidth() {
            var level_info = this.userInfo.level_info;
            return level_info ? 6 === level_info.current_level ? "100%" : (level_info.current_exp / level_info.next_exp * 100 >> 0) + "%" : "0"
        },
        levelTxtArray() {
            return this.levelArray[this.userInfo.level_info.current_level]
        },
        dynamic_count() {
            return this.formatNumForAvatar(this.userStatCnt && this.userStatCnt.dynamic_count)
        },
        follower() {
            return this.formatNumForAvatar(this.userStatCnt && this.userStatCnt.follower)
        },
        following() {
            return this.formatNumForAvatar(this.userStatCnt && this.userStatCnt.following)
        }

    },
    methods: {
        checkTracker() {
            if (window.localStorage) {
                var uid = this.$cookies.get("DedeUserID")
                    , timeTracker = JSON.parse(localStorage.getItem("time_tracker")) || {}
                    , t = dayjs().format("YYYYMMDD")
                if (timeTracker[uid] !== t) {
                    timeTracker[uid] = t,
                        localStorage.setItem("time_tracker", JSON.stringify(timeTracker)),
                        this.isFirstLoginAni = true
                }
                else
                    this.isFirstLoginAni = false
            }
        },
        formatNumForAvatar(val) {
            if (!val)
                return {
                    num: "--"
                }
            if (val <= 0)
                return {
                    num: 0
                }
            let num = Number(val);
            if (num > 99999999)
                return {
                    num: Math.round(num / 1e7) / 10,
                    unit: "亿"
                }
            if (num > 9999)
                return {
                    num: Math.round(num / 1e3) / 10,
                    unit: "万"
                }
            return {
                num
            }
        },
        setUserStatCnt() {
            getUserStatCnt().then(
                response => {
                    this.userStatCnt = response.data
                }

            )
        },
        popperShow() {
            if (!this.userStatCnt)
                this.setUserStatCnt()
            this.checkTracker()
        },
        logout() {
            Logout(this.$cookies.get('bili_jct')).then(
                () => {
                    this.$cookies.remove('DedeUserID')
                    this.$cookies.remove('DedeUserID__ckMd5')
                    this.$cookies.remove('SESSDATA')
                    this.$cookies.remove('bili_jct')
                    location.reload()
                }
            )

        }
    },
}
</script>
<style>
.bili-avatar {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    background-image: url(data:image/gif;base64,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);
    background-size: cover;
    -moz-border-radius: 50%;
    border-radius: 50%;
}

.bili-avatar-face {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
}

.bili-avatar-pendent {
    height: 170%;
    width: 170%;
    position: absolute;
    top: -35%;
    left: -35%;
    overflow: hidden;
}

.bili-avatar-pendent img {
    height: 100%;
    min-width: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.bili-avatar-img {
    border: none;
    display: block;
    -o-object-fit: cover;
    object-fit: cover;
    image-rendering: -webkit-optimize-contrast;
}

.bili-avatar-img-radius {
    -moz-border-radius: 50%;
    border-radius: 50%;
}

.bili-avatar-img:not([src]),
.bili-avatar-img[src=""] {
    opacity: 0;
}

.bili-avatar-icon {
    width: 33.33333%;
    height: 33.33333%;
    position: absolute;
    right: 0;
    bottom: 0;
    background-size: cover;
    image-rendering: -webkit-optimize-contrast;
}

.bili-avatar-icon--big-vip {
    background-image: url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiPjxkZWZzPjxzdHlsZS8+PC9kZWZzPjxwYXRoIGQ9Ik01MTEuMDcuMDQ2YTUxMS4wNyA1MTEuMDcgMCAwMTUxMS4wNzIgNTExLjA3MWMwIDI4Mi4yNS0yMjguODIgNTExLjA3MS01MTEuMDcxIDUxMS4wNzFTMCA3OTMuMzY4IDAgNTExLjExOCAyMjguODIuMDQ1IDUxMS4wNy4wNDV6IiBmaWxsPSIjRkZGIi8+PHBhdGggZD0iTTUxMS4wNyA5Mi45NjhhNDE4LjE0OSA0MTguMTQ5IDAgMTEwIDgzNi4yOTggNDE4LjE0OSA0MTguMTQ5IDAgMDEwLTgzNi4yOTh6IiBmaWxsPSIjRkI3Mjk5Ii8+PHBhdGggZD0iTTQzNi43MzMgMjQwLjIwM2M0MC4yODIuOTMgNzcuMzU4IDIyLjQ4NyA5OC40NTEgNTcuMTk0IDIwLjM1IDQwLjcgMCA4OS4zNDQgNS42MjIgOTUuMDU5IDUuNjIyIDUuNjY4IDUwLjU1LTE1Ljg0MyA2Ny43NC0yMS4yMzNBMjAxLjEzIDIwMS4xMyAwIDAxNzE4Ljg5IDM1OS4zM2E5Mi4wODYgOTIuMDg2IDAgMDE0Mi41NTggODkuMjA1Yy0zLjk1IDM4LjI4NC0zOC4wNTIgMzYuNTY1LTc4LjI0IDI5LjczNWE0MzAuNDYxIDQzMC40NjEgMCAwMC0xNDIuNjgyIDE3LjA5OGMtMTcuNzAyIDUuNzE1LTI5LjkyIDkuMi0zOC4zNzcgMjQuMTEzaC42NWMtOC41OTUgMTQuODY4LTgwLjI4NCAxNzkuNTcyLTg5LjM0NCAyMDIuNTctMTUuMzMyIDI3Ljg3Ny0zOC41MTYgNTAuNTUtNjYuNDg1IDY1LjIzMWExMDguMzQ3IDEwOC4zNDcgMCAwMS05OC40NTEtNS43MTRjLTI3LjgzLTIxLjgzNy0zNS4zMS0zOC40Ny01LjExLTQ4Ljc4NCAzMC4xOTktMTAuMjY4IDg4LjY5My04NC4wOTUgMTAzLjU2LTEwNi44NiAxNC44NjgtMjIuODEzIDY4LjY3LTk5LjAwOSA1Ni43NzYtMTA3LjA5M2EyOTMuODY2IDI5My44NjYgMCAwMC0xMDIuOTU4IDExLjU2OWMtMTYuNCA1LjA2NC0yNC4zOTIgMTMuMTQ4LTM4LjY1NS01LjI1YTE1OS43MzMgMTU5LjczMyAwIDAxLTIzLjkyOC03Ny4xMjZjMS44NTktOS4xOTkgMy42MjQtMTMuNzUyIDUuMTU4LTEzLjc1MmE5NzYuMzc3IDk3Ni4zNzcgMCAwMDE4NS41NjUtMjUuMTgyYzcuODk4LTI0LjQzOSA5LjM4NS01MC41NSA0LjQxNC03NS43MzFhMzAxLjk5NiAzMDEuOTk2IDAgMDAtMjkuNTk2LTc3LjI2NWMtNC41NTMtMy40ODUgNi4yNzItMTUuODQzIDMyLjk4Ny0xNS44NDN6TTU5Mi4yODUgNTgwLjUzYTQxMi41NzQgNDEyLjU3NCAwIDAxOTUuMDEyIDI3LjczN2MzMC4xNTMgMTUuMDU0IDEzMi40MTQgNTEuNjE4IDExMS43ODUgMTE3LjgyNS0yMC41ODIgNjYuMDY4LTI5LjY0MiA3MS42NDMtNDkuMjAyIDU1LjUyMUM3MzAuMzY3IDc2NS40OTEgNTYxLjI1IDYxNS4wOTcgNTU2IDYwNi43MzNhMTcuOTM0IDE3LjkzNCAwIDAxMS4wNjgtMjIuM2M3Ljg1Mi02LjY5IDI1LjIyOC00LjM2OCAzNS4yMTgtMy45MDN6IiBmaWxsPSIjRkZGIi8+PC9zdmc+);
}

.bili-avatar-icon--business {
    background-image: url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiPjxkZWZzPjxzdHlsZS8+PC9kZWZzPjxwYXRoIGQ9Ik0wIDUxMmE1MTIgNTEyIDAgMTAxMDI0IDBBNTEyIDUxMiAwIDEwMCA1MTJ6IiBmaWxsPSIjRkZGIi8+PHBhdGggZD0iTTkzLjA4OTk5OTk5OTk5OTk3IDUxMmE0MTguOTEgNDE4LjkxIDAgMTA4MzcuODIgMCA0MTguOTEgNDE4LjkxIDAgMTAtODM3LjgyIDB6IiBmaWxsPSIjNEFDN0ZGIi8+PHBhdGggZD0iTTQ3NC4xMTIgNzYzLjk1YTMzLjI4IDMzLjI4IDAgMDEtMTQuMDU3IDQuMDUgMjEuMDM5IDIxLjAzOSAwIDAxLTIxLjMxOC0yMC44MDYgMTkuNTUgMTkuNTUgMCAwMTEuMjEtNS44NjVsNDAuNDk1LTE4Ny40MzgtMTY3LjY1Ny4zMjZhMjEuMjI1IDIxLjIyNSAwIDAxLTIxLjg3Ni0yMC44MDYgMjAuNDMzIDIwLjQzMyAwIDAxOS40OTUtMTYuODVsMjUwLjE4Mi0yNTUuNzY3YzQuNjA4LTIuNzkzIDkuNTQyLTQuNzQ3IDE0LjY2Mi00Ljc5NGEyMS4xMzIgMjEuMTMyIDAgMDEyMS4zNjQgMjAuODUyIDE5Ljk2OCAxOS45NjggMCAwMS0yLjc5MiA5Ljc3NWwtNDAuMjE2IDE4NC4zMmgxNjcuODQzYTIxLjE3OCAyMS4xNzggMCAwMTIxLjY0NCAyMC44NTIgMjAuMjk0IDIwLjI5NCAwIDAxLTkuNDk1IDE2Ljk0M0w0NzQuMTEyIDc2My45NXoiIGZpbGw9IiNGRkYiLz48L3N2Zz4=);
}

.bili-avatar-icon--personal {
    background-image: url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiPjxkZWZzPjxzdHlsZS8+PC9kZWZzPjxwYXRoIGQ9Ik0wIDUxMmE1MTIgNTEyIDAgMTAxMDI0IDBBNTEyIDUxMiAwIDEwMCA1MTJ6IiBmaWxsPSIjRkZGIi8+PHBhdGggZD0iTTkzLjA4OTk5OTk5OTk5OTk3IDUxMmE0MTguOTEgNDE4LjkxIDAgMTA4MzcuODIgMCA0MTguOTEgNDE4LjkxIDAgMTAtODM3LjgyIDB6IiBmaWxsPSIjRkZDNjJFIi8+PHBhdGggZD0iTTQ3NC4xMTIgNzYzLjk1YTMzLjI4IDMzLjI4IDAgMDEtMTQuMDU3IDQuMDUgMjEuMDM5IDIxLjAzOSAwIDAxLTIxLjMxOC0yMC44MDYgMTkuNTUgMTkuNTUgMCAwMTEuMjEtNS44NjVsNDAuNDk1LTE4Ny40MzgtMTY3LjY1Ny4zMjZhMjEuMjI1IDIxLjIyNSAwIDAxLTIxLjg3Ni0yMC44MDYgMjAuNDMzIDIwLjQzMyAwIDAxOS40OTUtMTYuODVsMjUwLjE4Mi0yNTUuNzY3YzQuNjA4LTIuNzkzIDkuNTQyLTQuNzQ3IDE0LjY2Mi00Ljc5NGEyMS4xMzIgMjEuMTMyIDAgMDEyMS4zNjQgMjAuODUyIDE5Ljk2OCAxOS45NjggMCAwMS0yLjc5MiA5Ljc3NWwtNDAuMjE2IDE4NC4zMmgxNjcuODQzYTIxLjE3OCAyMS4xNzggMCAwMTIxLjY0NCAyMC44NTIgMjAuMjk0IDIwLjI5NCAwIDAxLTkuNDk1IDE2Ljk0M0w0NzQuMTEyIDc2My45NXoiIGZpbGw9IiNGRkYiLz48L3N2Zz4=);
}

.bili-avatar-icon--small-vip {
    background-image: url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiPjxkZWZzPjxzdHlsZS8+PC9kZWZzPjxwYXRoIGQ9Ik0wIDUxMi40NjVDMCA3OTQuOTk2IDIyOS4wMDQgMTAyNCA1MTEuNTM1IDEwMjRjMjgyLjQ4NCAwIDUxMS40ODgtMjI5LjAwNCA1MTEuNDg4LTUxMS41MzVDMTAyMy4wMjMgMjI5Ljk4MSA3OTQuMDE5Ljk3NyA1MTEuNDg4Ljk3N1MwIDIyOS45ODEgMCA1MTIuNTEyeiIgZmlsbD0iI0ZGRiIvPjxwYXRoIGQ9Ik05My4wODk5OTk5OTk5OTk5NyA1MTJhNDE4LjkxIDQxOC45MSAwIDEwODM3LjgyIDAgNDE4LjkxIDQxOC45MSAwIDEwLTgzNy44MiAweiIgZmlsbD0iIzZEQzc4MSIvPjxwYXRoIGQ9Ik0zMzEuMjY0IDYxOC44MjJhMjQuOTAyIDI0LjkwMiAwIDAwLTUuNjMyLTQuODg3Yy0uODM4LS4wOTQgMS42MyAxLjk1NCA1LjU4NSA0Ljg4N3ptMjQ1LjI5NS0xOC44MDVsMi44MzktMTEuMDc3cy00LjE5LS4yOC0yLjc5My0yLjc5M2MxLjM1LTIuNTYgMi43OTMtMTMuODcgMi43OTMtMTMuODdWNTM4Ljk1bC0yLjc5My0xMS4xMjUgMi43OTMtNS41ODUtMi43OTMtMTEuMDc4di0zMC41MzRsLTIuODQtMTEuMTI0IDUuNjMzLTUuNTM5di05Ny4xODdsLTIuNzkzLTExLjA3OC01LjY3OC04LjM3OC0xNC4xMDQtMTMuODctMTQuMDU2LTIyLjIwMy0xOS43ODItMjQuOTk0LTExLjI2NC0xMS4wNzgtNS42MzItOC4zNzh2LTIuNzkzbC01LjYzMi01LjQ5M2gtMi43OTNsLTIuODQtMi43OTItNS42NzggNS41ODUtMi43OTMtMi43OTMtNS42MzItMi43OTJoLTIuNzkybC04LjUxOCA4LjMzMSAyLjc5MyA1LjU4NnYxNi42MTdsMi44ODUgNS41ODV2NS41MzlsMi43OTMgMi43OTMgMi43OTMgMTEuMDc3IDIuODQgNS41ODYgMi43OTIgNS41Mzl2OC4zMzFsLTIuNzkzIDIuNzkzIDIuNzkzIDE2LjYxNy0yLjc5MyAxMS4xMjR2Mi43OTNsLTIuNzkzIDg4LjgwOXYyMi4yNDhsMi43OTMgMTEuMDc4LTIuNzkzIDUuNTg2djIuNzkycy0uMzcyIDMuNDQ1IDAgOC4yODZjLjMyNiA0Ljg0IDAgOC4zNzggMCA4LjM3OHY4LjI4NWwtMi43OTIgNS41ODV2Mi43OTNsMi43OTIgNS40OTJ2Mi43OTNzLjE4NyA1My45LTIuNzkyIDYzLjg2YTI0OC45MjUgMjQ4LjkyNSAwIDAxLTUuNjc5IDE2LjY2NHY1LjU4NWwtNS42MzIgOC4yODV2NS41ODZsLTIuNzkzIDUuNTM5LTIuODM5IDIuNzkycy0xLjg2Mi43NDUtMi44NCAwYy0xLjAyMy0uNzQ0LTIuNzkyLTIuNzkyLTIuNzkyLTIuNzkyTDMzNi44NSA1NzkuNDQ0bC04LjM3OC00LjQyMXMxMjEuNzYzIDY1LjE2MyAxMTguNDEyIDgwLjUyM2MwIDAtOS4yMTYgMS4wMjQtMTQuMTAzLTIuNzkzLTQuOTM0LTMuNzctMTA3LjE0OC01OC4yNzQtMTA3LjE0OC01OC4yNzRsNTMuNTI3IDM2LjA3MmgtMi43OTJsLTUzLjU3NC0yNy43NCAzNi42NzggMjcuNzRzLTE4LjUyNi04LjQ3MS0yOC4yMDctMTMuMzEyYzExLjYzNiA3LjkxMyAzNi42MzEgMjcuMjMgMzYuNjMxIDI3LjIzaC0yLjc5MmwtNzAuNTE3LTQ3LjE5OCA0NS4xNSAzMy4yOHM2OS4zNTIgNDkuODk3IDcwLjQ3IDU4LjMyMmwtOC40NzIgMTEuMTI0aC04LjQyNWwtMi44NCAyLjc5My0yLjc5MiAyLjc0NiAyLjc5MyA1LjU4NWgtOC40NzFsLTUuNTg2LTIuNzkyIDIuNzkzIDUuNTM5djIuNzkybC0yLjc5MyAyLjc5My0yLjg4NiAyLjc0NiAyLjg0IDIuNzkzaDguNDdsLTUuNjMxIDUuNTM5cy00Ljk4IDUuMjEzIDAgOC4zMzJjNC45MzQgMy4xMTggMzEgMjcuNzQgMzEgMjcuNzRsNS42MzEgMi43OTNoMzEuMDQ2bDMxLTEzLjg3aDExLjI2M2w4LjQ3MS01LjU4NiA0Ny45NDItNDEuNjExIDUuNjMyLTEzLjkxNyA4LjQ3Mi0xMS4wNzggNS42MzItNS41ODYgMi43OTItOC4yODUgOC41MTgtMjIuMjQ4IDIuNzkzLTE2LjY2NCAyLjc5My01LjUzOS0yLjc5My01LjU4NS0yLjc5My0xOS40MXptMjg1Ljg4MiAzNS44NGMtMTEuNzc2LTQ2LjgyNC0zOS45MzYtODIuOTktODQuNDgtMTA4LjU5bC0zNy4xOS0yNi44MS01MC43ODEtNTcuMzktMi40NjctMS43N2ExNy40NTUgMTcuNDU1IDAgMDAtMTYuMDU4LTQuMTg5bDEuNTM2IDkuNjM1YzEuMjU2IDQuOTggNC4zMjggMTQuNTY5IDkuMzA5IDI4LjcxOSA0Ljg4NyAxNC4xNSA4Ljg0MyAyNC41MyAxMS44MjIgMzEuMTg1IDMuMDI2IDYuNjU2IDguOTM3IDE3LjIyMiAxNy44MjcgMzEuNzkgOC44OSAxNC41NyAxNS41IDI0LjYyMyAxOS43ODIgMzAuMTYybC0xLjIxIDEuNTM2LTE0Ljk0MSAyLjctNzcuMTczLTEuNzY5YTIxLjQxIDIxLjQxIDAgMDAtMTUuNTkyLTEuNDlsLjc5MS42MDZhOTMuMDkgOTMuMDkgMCAwMDM2LjM5OSA3LjkxMyAxMTAuMTgzIDExMC4xODMgMCAwMTI2LjM5IDE0LjEwM2MzLjUzOC45MyA1LjM1NCAzLjAyNSA1LjQgNi4zM2w0NC42ODQgMTguNzU4YzguMDk5IDUuMDI3IDE2LjMzNyA5LjMwOSAyNC43NjIgMTIuODkzYTI4ODcuNDI0IDI4ODcuNDI0IDAgMDExOS44MjggMTkuMjIzYzguODQ0IDYuMzMgMjEuMTc4IDEyLjAwOSAzNy4wOTcgMTYuOTQzIDE1LjkxOSA0LjkzNCAyOC4yNTMgMi44MzkgMzcuMDk3LTYuMjg0YTM1LjE0MiAzNS4xNDIgMCAwMDcuMTY4LTI0LjIwNHpNMzcwLjg3NCA0MjcuOTg1cy05Mi41NzkgNjAuMzctMTEzLjg1IDg3LjEzNGMwIDAtMTUuOTY1LTExLjgyMy0xNi4yOS0zMi42NzUgMCAwLTEyLjcwOC0zLjA3Mi0yNy4wOSAyNy4yMjktMTQuMzgzIDMwLjI1NC0xNi4yOTEgMjcuMTgyLTE2LjI5MSAyNy4xODJsLTE2LjI0NSA0My41NjdzLTI3LjA5IDgzLjI3IDMyLjUzNiA5Mi41MzJjMCAwIDMyLjI1Ni0yLjY1MyA0My4zOC0yNy4yMjkgMTEuMDc4LTI0LjUzIDE2LjI5LTMyLjYyOCAxNi4yOS0zMi42Mjh2LTEwLjg5MmwtNS40NDUgNS40NDZ2LTEwLjg5Mmw1LjQtNS40NDZzLTkuMDMtMTkuNDU2IDAtMjcuMjI5YzkuMDMtNy43MjYgMTAuODQ0LTEwLjg5MSAxMC44NDQtMTAuODkxbC01LjM5OS01LjQ0NnMxMS4xNzEtMTYuOTkgMTkuMTMtMzMuMDQ3Yy0yLjUxMyA1LjA3My0uNjA1LTMzLjE4NyA3My4wMy04Ni43MTV6IiBmaWxsPSIjRkZGIi8+PC9zdmc+);
}

.bili-avatar-img.bili-avatar-img-error {
    display: none;
}

.mini-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    position: relative;
    margin-right: 10px;
}

.mini-avatar > div {
    height: 100%;
    transform: translate(0);
    transition: transform 0.2s ease;
}

.mini-avatar .mini-move {
    transform: translate(2px, 20px);
    width: 40px;
    height: 40px;
}

.van-popper-avatar {
    background: #fff;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    width: 280px;
    z-index: 1;
}

.van-popper-avatar .vp-container {
    min-height: 492px;
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-align: center;
    align-items: center;
}

.van-popper-avatar .avatar {
    cursor: pointer;
    position: absolute;
    top: -36px;
    left: 107px;
    width: 68px;
    height: 68px;
    border-radius: 50%;
}

.van-popper-avatar .has-decorate {
    top: -30px;
    left: 112px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
}

.van-popper-avatar .nickname {
    color: #212121;
    font-weight: 600;
    text-align: center;
    font-size: 16px;
}

.van-popper-avatar .vip {
    margin-top: 4px;
    width: 66px;
    text-align: center;
    background-color: #fb7299;
    color: #fff;
    font-size: 12px;
    border-radius: 2px;
}

.van-popper-avatar .vip:hover {
    color: #fff;
}

.van-popper-avatar .level-intro {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    padding: 15px;
    left: 279px;
    background: #fff;
    width: 240px;
    font-size: 14px;
    color: #212121;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s ease;
    border-radius: 2px;
}

.van-popper-avatar .level-intro__title {
    margin-bottom: 12px;
}

.van-popper-avatar .level-intro__content {
    margin-bottom: 14px;
}

.van-popper-avatar .level-intro__link {
    color: #00a1d6;
}

.van-popper-avatar .level-intro .svg-icon {
    width: 13px;
    height: 13px;
    fill: #00a1d6;
    vertical-align: middle;
}

.van-popper-avatar .level-content {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    position: relative;
    width: 100%;
    padding: 0 20px;
}

.van-popper-avatar .level-content:hover .level-intro {
    visibility: visible;
    opacity: 1;
}

.van-popper-avatar .level-info {
    margin: 20px 0 5px;
    width: 100%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
}

.van-popper-avatar .level-info .grade {
    font-size: 14px;
    color: #212121;
}

.van-popper-avatar .level-info .progress {
    font-size: 12px;
    color: #999;
}

.van-popper-avatar .level-info .hint {
    font-size: 12px;
    color: #00a1d6;
}

.van-popper-avatar .level-info .hint:hover {
    text-decoration: underline;
}

.van-popper-avatar .level-link {
    height: 10px;
    width: 240px;
}

.van-popper-avatar .level-bar {
    width: 240px;
    height: 2px;
    background-color: #f4f4f4;
    position: relative;
    margin: 4px 0;
}

.van-popper-avatar .level-bar .level-progress {
    position: absolute;
    background: #f3cb85;
    border-radius: 2px;
    width: 80%;
    height: 2px;
    top: 0;
    left: 0;
}

.van-popper-avatar .logout {
    cursor: pointer;
    font-size: 14px;
    color: #212121;
    padding: 7px 0;
}

.van-popper-avatar .logout,
.van-popper-avatar .logout span {
    width: 100%;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
}

.van-popper-avatar .logout span {
    padding: 8px 23px;
    transition: 0.3s ease;
}

.van-popper-avatar .logout span:hover {
    color: #212121;
    background: #f4f4f4;
}

.van-popper-avatar .logout .svg-icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    vertical-align: middle;
    fill: #757575;
    overflow: hidden;
}

.van-popper-avatar .coins {
    width: 100%;
    border-bottom: 1px solid #f4f4f4;
    padding: 14px 20px;
    color: #212121;
}

.van-popper-avatar .coins .coins-container {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
}

.van-popper-avatar .coins .coins-icon {
    width: 20px;
    height: 20px;
}

.van-popper-avatar .coins .info {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    position: relative;
}

.van-popper-avatar .coins .info .add-one-icon {
    width: 15px;
    height: 15px;
    left: 3px;
    opacity: 0;
    position: absolute;
}

.van-popper-avatar .coins .info .add-one-icon--show {
    animation: coin-jump-data-v-5314bca5 1s ease-in-out;
}

.van-popper-avatar .coins .info a {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
}

.van-popper-avatar .coins .info .login-award {
    color: #2cc06f;
    position: absolute;
    transition: 0.3s;
    font-size: 12px;
    opacity: 0;
    top: -12px;
    background: #fff;
    padding: 4px 5px;
    width: 82px;
    z-index: -1;
}

.van-popper-avatar .coins .info .login-award--show {
    z-index: 1;
    animation: login-award-show-data-v-5314bca5 3s ease-in-out 0s 1 alternate
        forwards;
}

.van-popper-avatar .coins .info .money {
    margin: 0 20px 0 8px;
}

.van-popper-avatar .coins .contact {
    -ms-flex-pack: justify;
    justify-content: space-between;
}

.van-popper-avatar .coins .contact,
.van-popper-avatar .coins .contact a {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
}

.van-popper-avatar .coins .contact .email,
.van-popper-avatar .coins .contact .phone {
    position: relative;
    width: 23px;
}

.van-popper-avatar .coins .contact .email {
    margin: 0 4px 0 0;
}

.van-popper-avatar .coins .contact .email-tips {
    display: none;
    right: 33px;
    top: 0;
}

.van-popper-avatar .coins .contact .email-tips:after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAA2BAMAAAAIUcVlAAAALVBMVEUAAADQ0NDOzs7MzMzMzMzMzMzMzMzMzMzMzMzMzMz////09PTt7e3m5ube3t7aN2g1AAAACnRSTlMA/PLhbEktF8nGEiCq/wAAAGtJREFUGNNjeFnAwMCw1gxIrDoUACRWi4AJMBcq8aKAgXjwatWqdQy9q1bdZCg+tcacgU17UwIDQ6AoUIbFgYFUwN4HJJJvMTCw6qxiYHDcBSHAXLAESMk8UgyEOAPsILDTII6cu2rVDbDDAfAAJuuGgkdmAAAAAElFTkSuQmCC);
    right: -8px;
    top: 5px;
}

.van-popper-avatar .coins .contact .email:hover .email-tips {
    display: block;
}

.van-popper-avatar .coins .contact .phone-tips {
    display: none;
    left: 28px;
    top: 0;
}

.van-popper-avatar .coins .contact .phone-tips:after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAA2BAMAAAAIUcVlAAAALVBMVEUAAADQ0NDOzs7MzMzMzMzMzMzMzMzMzMzMzMzMzMz////09PTt7e3m5ube3t7aN2g1AAAACnRSTlMA/PLhbEktF8nGEiCq/wAAAGtJREFUGNNjeFnAwMCw1gxIrDoUACRWi4AJMBcq8aKAgXjwatWqdQy9q1bdZCg+tcacgU17UwIDQ6AoUIbFgYFUwN4HJJJvMTCw6qxiYHDcBSHAXLAESMk8UgyEOAPsILDTII6cu2rVDbDDAfAAJuuGgkdmAAAAAElFTkSuQmCC);
    left: -8px;
    background-repeat: no-repeat;
    background-position: 0 -31px;
    top: 5px;
}

.van-popper-avatar .coins .contact .phone:hover .phone-tips {
    display: block;
}

.van-popper-avatar .coins .contact .email-icon {
    color: silver;
    font-size: 20px;
    margin-right: 12px;
}

.van-popper-avatar .coins .contact .phone-icon {
    color: silver;
    font-size: 20px;
}

.van-popper-avatar .coins .contact .email-icon--bind,
.van-popper-avatar .coins .contact .phone-icon--bind {
    color: #00a1d6;
}

.van-popper-avatar .coins .contact .email-mark,
.van-popper-avatar .coins .contact .phone-mark {
    position: absolute;
    width: 6px;
    height: 6px;
    background: #fa5a57;
    border-radius: 50%;
    left: 15px;
    top: 3px;
}

.van-popper-avatar .coins .contact .contact-tips {
    font-size: 12px;
    padding: 0 6px;
    height: 20px;
    line-height: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    position: absolute;
    white-space: nowrap;
    background-color: #fff;
    color: #222;
    z-index: 10;
}

.van-popper-avatar .coins .hint a {
    margin-top: 8px;
    font-size: 12px;
    color: #00a1d6;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: end;
    justify-content: flex-end;
}

.van-popper-avatar .coins .hint a:hover {
    text-decoration: underline;
}

.van-popper-avatar .counts {
    height: 58px;
    width: 100%;
    border-bottom: 1px solid #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.van-popper-avatar .count-item {
    text-align: center;
    -ms-flex: 1;
    flex: 1;
}

.van-popper-avatar .count-item .item-key {
    font-size: 12px;
    color: #999;
}

.van-popper-avatar .count-item .item-value {
    font-size: 16px;
    color: #212121;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-weight: 600;
    height: 20px;
}

.van-popper-avatar .count-item .item-unit {
    font-size: 14px;
}

.van-popper-avatar .count-item:hover .item-key,
.van-popper-avatar .count-item:hover .item-value {
    color: #00a1d6;
}

.van-popper-avatar .links {
    width: 100%;
    border-bottom: 1px solid #f4f4f4;
    padding: 7px 0;
}

.van-popper-avatar .links .link-item {
    cursor: pointer;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
    transition: 0.3s ease;
    padding: 8px 23px;
}

.van-popper-avatar .links .link-item:hover {
    background: #f4f4f4;
}

.van-popper-avatar .links .link-title {
    font-size: 14px;
    color: #212121;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
}

.van-popper-avatar .link-icon {
    font-size: 24px;
    vertical-align: middle;
    color: #979797;
    margin-right: 5px;
}

.van-popper-avatar .link-icon-more {
    font-size: 16px;
    vertical-align: middle;
    color: #979797;
}

@keyframes login-award-show-data-v-5314bca5 {
    0% {
        top: -12px;
        opacity: 0;
    }

    20% {
        top: 0;
        opacity: 1;
    }

    50% {
        top: 0;
        opacity: 1;
    }

    to {
        top: 0;
        opacity: 0;
        z-index: -1;
    }
}

@keyframes coin-jump-data-v-5314bca5 {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0;
    }

    50% {
        transform: translateY(-50px) rotateY(-1turn);
        opacity: 1;
    }

    to {
        transform: translateY(0) rotateY(0deg);
        opacity: 0;
    }
}

.el-popover.el-popper.van-popper-avatar {
    padding: 0;
    border: none;
    top: 44px !important;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2) !important;
}

/* 修改语言 */
.lang-change {
    width: 100%;
    border-bottom: 1px solid #f4f4f4;
    padding: 7px 0;
    position: relative;
    font-size: 14px;
}

.lang-change .lang-intro {
    padding: 8px 0;
    top: 0;
    visibility: hidden;
    opacity: 0;
    position: absolute;
    left: 279px;
    background: #fff;
    width: 240px;
    font-size: 12px;
    color: #212121;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s ease;
    border-radius: 2px;
}

.lang-change .lang-intro-item {
    font-size: 14px;
    padding: 8px 15px;
    line-height: 22px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    transition: all 0.3s;
}

.lang-change .lang-intro-item .bilifont {
    font-size: 22px;
    display: none;
}

.lang-change .lang-intro-item:hover {
    background: #f4f4f4;
}

.lang-change .lang-intro-item.on {
    color: #00a1d6;
}

.lang-change .lang-intro-item.on .bilifont {
    display: block;
}

.lang-change:hover .lang-intro {
    visibility: visible;
    opacity: 1;
}

.lang-change .lang-item {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.3s ease;
    padding: 8px 23px;
}

.lang-change .lang-item:hover {
    background: #f4f4f4;
}

.lang-change .lang-title {
    font-size: 14px;
    color: #212121;
    display: flex;
    align-items: center;
}

.lang-change .lang-icon {
    font-size: 24px;
    vertical-align: middle;
    color: #979797;
    margin-right: 5px;
}

.lang-change .lang-icon-more {
    font-size: 16px;
    vertical-align: middle;
    color: #979797;
}
</style>