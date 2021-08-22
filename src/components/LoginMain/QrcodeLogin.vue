<template>
    <div class="qrcode-login">
        <div class="qrcode-con">
            <i class="tv-icon"></i>
            <div class="qrcode-box" @mouseenter="showAndHideTips" @mouseleave="showAndHideTips">
                <div class="qrcode-tips" :class="{ mouseenter: showTips }"></div>
                <div class="qrcode-img" ref="qrcode"></div>
                <div v-if="qrcodeStatus != 'normal'" class="status">
                    <div
                        v-if="qrcodeStatus === 'overdue'"
                        class="overdue"
                        @click="reloadQrcode"
                    >点击刷新</div>
                    <div v-else-if="qrcodeStatus === 'success'" class="success"></div>
                </div>
            </div>
        </div>
        <div class="qrcode-footer">
            <p v-if="qrcodeStatus === 'normal'" class="status-txt">扫描二维码登录</p>
            <p v-else-if="qrcodeStatus === 'overdue'" class="status-txt">二维码已失效</p>
            <p v-else-if="qrcodeStatus === 'success'" class="status-txt">扫描成功</p>
            <p v-if="qrcodeStatus != 'success'" class="app-link">
                请使用
                <a href="//app.bilibili.com/" target="_blank">哔哩哔哩客户端</a>
                <br />扫码登录
                <br />或扫码下载APP
            </p>
            <p v-else-if="qrcodeStatus === 'success'" class="suc-txt">请在手机上确认是否授权</p>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import QRCode from 'qrcodejs2'
import { getQRCode, checkQRCode } from '@/api'
export default {
    name: 'QrcodeLogin',
    data() {
        return {
            qrcode: null,
            oauthKey: null,
            loop: null,
            cd: null,
            showTips: false,
            qrcodeStatus: 'normal',
            cdTime: 18e4,
            loopTime: 3e3,
        }
    },
    methods: {
        setQRCode() {
            getQRCode().then(
                response => {
                    if (response.status) {
                        if (this.qrcode) {
                            this.qrcode.clear()
                            this.qrcode.makeCode(response.data.url)
                        }
                        else {
                            this.$nextTick(() => {
                                this.qrcode = new QRCode(this.$refs.qrcode, {
                                    text: response.data.url,
                                    width: 140,
                                    height: 140,
                                    colorDark: '#000000',
                                    colorLight: '#ffffff'
                                })
                            })
                        }
                        this.oauthKey = response.data.oauthKey
                    }
                    clearTimeout(this.cd)
                    this.cd = setTimeout(this.expire, this.cdTime)
                    clearInterval(this.loop)
                    this.loop = setInterval(this.updateQRCode, this.loopTime)
                }
            )
        },
        updateQRCode() {
            checkQRCode({ oauthKey: this.oauthKey }).then(
                response => {
                    if (response.status) {
                        let query = qs.parse(response.data.url.substring(42))
                        let Expires = new Date(new Date().getTime() + parseInt(query.Expires) * 1000)
                        this.$cookies.set('DedeUserID', query.DedeUserID, Expires)
                        this.$cookies.set('DedeUserID__ckMd5', query.DedeUserID__ckMd5, Expires)
                        this.$cookies.set('SESSDATA', query.SESSDATA, Expires)
                        this.$cookies.set('bili_jct', query.bili_jct, Expires)
                        this.$router.push('/')
                    }
                    else {
                        switch (response.data) {
                            case -2:
                                this.expire()
                                break;
                            case -5:
                                this.scanSucess()
                                break;
                            default:
                                break;
                        }
                    }
                })
        },
        showAndHideTips(event) {
            if (this.qrcodeStatus === "normal") {
                if (event.type === "mouseenter")
                    this.showTips = true
                else
                    this.showTips = false
            }
        },
        expire() {
            clearInterval(this.loop)
            this.qrcodeStatus = "overdue"
        },
        scanSucess() {
            this.qrcodeStatus = "success"
        },
        reloadQrcode() {
            this.qrcodeStatus = "normal"
            this.setQRCode()
        }
    },
    mounted() {
        this.setQRCode()
    },
    beforeDestroy() {
        clearInterval(this.loop)
        clearTimeout(this.cd)
    }
}
</script>
<style>
/* 二维码 */
.qrcode-login {
    position: relative;
    width: 480px;
}

.qrcode-login .qrcode-con {
    padding-top: 72px;
}

.qrcode-login .qrcode-con .tv-icon {
    position: absolute;
    width: 70px;
    height: 70px;
    left: 160px;
    top: 10px;
    background: url(//i0.hdslb.com/bfs/static/e6f2388d454c82004905753802e9cfe709d80d08.png)
        no-repeat;
}

.qrcode-login .qrcode-con .qrcode-box {
    width: 140px;
    height: 140px;
    margin: 0 auto;
    background: #ddd;
    position: relative;
}

.qrcode-login .qrcode-con .qrcode-box .qrcode-img {
    width: 140px;
    height: 140px;
    background: url(//s1.hdslb.com/bfs/static/passport/static/img/loadTV.99606e2.gif)
        50% no-repeat;
}

.qrcode-login .qrcode-con .qrcode-box .qrcode-tips {
    z-index: 10;
    position: absolute;
    width: 480px;
    height: 192px;
    top: -50px;
    left: 50%;
    margin-left: -240px;
    background: url(//s1.hdslb.com/bfs/static/passport/static/img/qr-tip.3a21a48.png)
        no-repeat;
    background-size: cover;
    background-color: #fff;
    opacity: 0;
    -webkit-transition: opacity 0.5s;
    -o-transition: opacity 0.5s;
    -moz-transition: opacity 0.5s;
    transition: opacity 0.5s;
}

.qrcode-login .qrcode-con .qrcode-box .qrcode-tips.mouseenter {
    opacity: 1;
}

.qrcode-login .qrcode-con .qrcode-box .status {
    position: absolute;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsla(0, 0%, 100%, 0.8);
}

.qrcode-login .qrcode-con .qrcode-box .status .overdue {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAABLCAYAAADpqX6aAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRBNzBCMDQwNTQ4MjExRTU4RDEzQTlFMjZCMEJCMkEyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRBNzBCMDQxNTQ4MjExRTU4RDEzQTlFMjZCMEJCMkEyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEE3MEIwM0U1NDgyMTFFNThEMTNBOUUyNkIwQkIyQTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEE3MEIwM0Y1NDgyMTFFNThEMTNBOUUyNkIwQkIyQTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6fG4sXAAAD5klEQVR42uyaTUhVQRTHfZGakZURlmCblJRILaWIIitcZGAkYQsXFdXGNDMLXKSFfUGBQl8mFARWtNFSWhWECZGlZVgS1cIirExdaH6UWvr6HzoPDtN9va+57/XwHvjxZu7Mmfk7d+7MmUGb3W4PCRabFhJEZom1xAab2OmuKthq3vlVkH1XwhQZWU02H6wH6WAZ2AK+B0psFMjiN1XDz7aBDQwJtPHzI94I1SE2BhwDO8FMFnEP9PCzrUr9SXA7EKtBLngD8lhoCP+WcLqcvheD/lrY129iy8AtMEc8GwQ3wWvOt4MGA9+57FvqD7E0kidFfhQcBbFgB7gmyuToPgE/Rdkpbss0scngvMh3g7Xc8ZBB/Vc8R2kuZ3PdPlFObaWYJfYcCOM0CdgEXrjwOQGqQS94BjaDES6jtirNEJsGNoo8rQIdbvh18HLlsDaeNg7LAIm6xcoveABc8sB3XMlX8fLmsN26xa4T6Xow5sOyR+Lviny6brHxIt2uYdd77qRtLWKjRLpHg9hBkZ6nW2y/SEdqCm6MhGsR+0GkV2gQmyTSnbrFPhbpHLHeemOhHJUZta1FbJ1IR4O9Snm4B23tU6ZBnW6xj0CryJ9RvuIikOnmqnJa5Fu5be3bLQma4PRs8BDEgQhQDI678Ke698Eszk+wnymxwVMOWhwWy+vldbAQrOITg9EczeetdrESeTWbGSLS6F1W4tMcpdwm9n0KVN7zFivj34tuvAmfxVJ8WgAOOtlyU8VxZik4xG/AYcNgPzhgcJIw7VjjiEXHnYw+je5V8Fmcv+r4D6gKxIExVVlv34Im0MjP6RRRyPOUhH4M1L0Bjdx2cIUFNvHJQbX6/+GSw67sQqabzbr5tsRaYi2xWjYFT44wU+t+NoTWWR+IAdVgxP7H6HcBlzXY/7YJsMTb/nwRmgsGDARVcvlyMGlQ3s++fhNbZiDiG7gB9oh6d+zOrdQfYvOUTn+w+EiDuslidJvBuOKbZ6ZY6nxMdPYFpLrwqeW5HA1Wgl7hT22lmCW2UXREApLc8KE6FSKfBoZFOw/MEJumvMLDHviGKflipa1E3WIrlC863IeVhMR/Fe2ddcfPup+17met+1nrfjYI72c9XR9blMAlXpSVgEw32iCfIdFOi1nb7WrwS3TUBeJABOh2o2Oq2yn8qa01ZkZd5Qbxaa3IZxn4hIJ8g/i33OwQkW5xqv4Rp7ZxHaqbwcF4l0G9C6Ke6SeFIjDqRHA21yk0KKP5WuDvYw2RoMS3DnvJozYDfBLnL5oui7ztL6juZ325RaSjNf2XRp+L+1nrytMSa4m1xFpiLbFTXOxvAQYATXs+1rA84iYAAAAASUVORK5CYII=)
        8px 3px no-repeat #fff;
    border-radius: 3px;
    -webkit-box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    margin: 40px auto;
    width: 60px;
    padding: 40px 0 5px;
    color: #0594c7;
    text-align: center;
}

.qrcode-login .qrcode-con .qrcode-box .status .success {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkEzREU3Qzg4RDI0NDExRTY4RjM3QjJCQzlEOTlFQjY3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkEzREU3Qzg5RDI0NDExRTY4RjM3QjJCQzlEOTlFQjY3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTNERTdDODZEMjQ0MTFFNjhGMzdCMkJDOUQ5OUVCNjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTNERTdDODdEMjQ0MTFFNjhGMzdCMkJDOUQ5OUVCNjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7kG2riAAAKMElEQVR42uRc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)
        no-repeat;
    border-radius: 3px;
    cursor: pointer;
    margin: 40px auto;
    width: 60px;
    padding: 60px 5px 8px;
}

.qrcode-login .qrcode-footer {
    width: 480px;
    height: 155px;
    background: url(//s1.hdslb.com/bfs/static/passport/static/img/2233login.af9c53d.png)
        0 -7px no-repeat;
}

.qrcode-login .qrcode-footer .status-txt {
    padding-top: 20px;
    text-align: center;
    color: #222;
    font-size: 18px;
    letter-spacing: 3px;
    margin-bottom: 5px;
}

.qrcode-login .qrcode-footer .app-link,
.qrcode-login .qrcode-footer .suc-txt {
    text-align: center;
    color: #717171;
    font-size: 14px;
}
</style>