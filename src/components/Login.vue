<template>
    <div>
        <div class="qrcode-img" ref="qrcode"></div>
        <p>status:{{ qrcode.status }}</p>
        <p>message:{{ qrcode.message }}</p>
    </div>
</template>
<script>
import qs from 'qs'
import QRCode from 'qrcodejs2'
import { getUserInfo, getQRCode, checkQRCode } from '@/api'

export default {
    name: 'Login',
    data() {
        return {
            userInfo: {},
            qrcode: {
                qrcode: null,
                url: '',
                oauthKey: '',
                status: false,
                message: '',
                timer: null
            },
        }
    },
    methods: {
        setUserInfo() {
            getUserInfo()
                .then(
                    response => {
                        console.log(response.data)
                        this.userInfo = response.data
                    })
                .finally(() => {
                    console.log(this.userInfo.isLogin);
                    if (!this.userInfo.isLogin)
                        this.setQRCode()
                })
        },
        setQRCode() {
            getQRCode().then(
                response => {
                    this.qrcode.url = response.data.url
                    this.qrcode.oauthKey = response.data.oauthKey
                    this.qrcode.qrcode = new QRCode(this.$refs.qrcode, {
                        text: response.data.url,
                        render: 'canvas',
                        width: 140,
                        height: 140,
                        colorDark: '#000000',
                        colorLight: '#ffffff'
                    })
                    this.qrcode.timer = setInterval(() => {
                        this.updateQRCode()
                    }, 10000);
                    setTimeout(() => {
                        if (!this.qrcode.state)
                            clearInterval(this.qrcode.timer)
                    }, 180000);
                }
            )
        },
        updateQRCode() {
            checkQRCode({ oauthKey: this.qrcode.oauthKey }).then(
                response => {
                    this.qrcode.status = response.status
                    this.qrcode.message = response.message
                    if (this.qrcode.status) {
                        clearInterval(this.qrcode.timer)
                        let query = qs.parse(response.data.url.substring(42))
                        console.log(query);
                        let Expires = new Date(new Date().getTime() + parseInt(query.Expires) * 1000)
                        console.log(Expires);
                        this.$cookies.set('DedeUserID', query.DedeUserID, Expires)
                        this.$cookies.set('DedeUserID__ckMd5', query.DedeUserID__ckMd5, Expires)
                        this.$cookies.set('SESSDATA', query.SESSDATA, Expires)
                        this.$cookies.set('bili_jct', query.bili_jct, Expires)
                    }
                })
        },
    },
    mounted() {
        this.setUserInfo()
    },
}
</script>
<style>
</style>