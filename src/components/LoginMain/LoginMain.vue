<template>
    <div>
        <div class="top-banner">
            <img src="//s1.hdslb.com/bfs/static/passport/static/img/rl_top.35edfde.png" />
        </div>
        <div class="title-line">
            <span class="tit" style="font-size: 38px;">登录</span>
        </div>
        <div class="login-box clearfix">
            <div class="login-left">
                <QrcodeLogin></QrcodeLogin>
            </div>
            <div class="line"></div>
            <div class="login-right"></div>
        </div>
        <p>
            登录即代表你同意
            <a target="_blank" href="https://www.bilibili.com/protocal/licence.html">用户协议</a>和
            <a target="_blank" href="https://www.bilibili.com/blackboard/privacy-pc.html">隐私政策</a>
        </p>
    </div>
</template>
<script>
import QrcodeLogin from './QrcodeLogin'
export default {
    name: 'LoginMain',
    components: {
        QrcodeLogin
    },
    data() {
        return {

        }
    }
}
</script>
<style scoped>
.top-banner {
    background: #00a0d8;
    height: 86px;
    text-align: center;
    margin-bottom: 20px;
}

a {
    color: #00a1d6;
}

p {
    margin: 24px auto 0;
    width: 980px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #99a2aa;
    text-align: center;
    line-height: 16px;
}

.title-line {
    width: 980px;
    height: 28px;
    margin: 0 auto;
    border-bottom: 1px solid #ddd;
    margin-bottom: 28px;
    text-align: center;
}

.title-line .tit {
    height: 56px;
    line-height: 56px;
    margin: 0 auto;
    padding: 0 20px;
    font-size: 40px;
    background: #fff;
    text-align: center;
}

/* 中间登录区 */
.login-box {
    position: relative;
    width: 980px;
    margin: 0 auto;
}

.login-box,
.login-box .type-tab {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
}

.login-box .type-tab {
    cursor: pointer;
    -webkit-box-pack: start-end;
    -webkit-justify-content: start-end;
    -moz-box-pack: start-end;
    -ms-flex-pack: start-end;
    justify-content: start-end;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 12px;
}

.login-box .type-tab > span {
    font-size: 14px;
    color: #555;
    letter-spacing: 0;
    margin-right: 20px;
}

.login-box .type-tab > span.active {
    color: #02a7de;
}

.login-box .form-group {
    position: relative;
}

.login-box .captcha-buttom {
    width: 130px;
    height: 36px;
    position: absolute;
    right: 2px;
    top: 2px;
    padding: 0 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.login-box .line {
    border-right: 1px solid #ddd;
    height: 300px;
    margin-top: 28px;
}

.login-box .login-left {
    width: 489px;
}

.login-box .login-right {
    padding-left: 45px;
    width: 490px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}


</style>