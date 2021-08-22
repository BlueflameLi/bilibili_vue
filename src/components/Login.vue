<template>
    <div class="login-app bottom-filling">
        <TheHeader></TheHeader>
        <LoginMain></LoginMain>
        <TheFooter></TheFooter>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import TheHeader from './TheHeader/TheHeader'
import LoginMain from './LoginMain/LoginMain'
import TheFooter from './TheFooter'
export default {
    name: 'Login',
    components: {
        TheHeader,
        TheFooter,
        LoginMain
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        ...mapActions(['setUserInfo']),
    },
    mounted() {
        this.setUserInfo().then(
            () => {
                if (this.userInfo.isLogin) {
                    this.$router.push('/')
                }
            }
        )
    }
}
</script>
<style>
.login-app .footer-wrap {
    width: 1160px !important;
}

body .login-app .international-footer {
    margin-top: 30px;
    bottom: 0;
}

.login-app * {
    font-family: "BlinkMacSystemFont,Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif";
}
</style>