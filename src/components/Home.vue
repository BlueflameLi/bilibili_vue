<template>
    <div class="home">
        <TheHeader :navType="1" />
        <FirstScreen />
        <StoryBox />
        <TheFooter />
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import TheHeader from './TheHeader/TheHeader'
import FirstScreen from './FirstScreen'
import StoryBox from './StoreyBox/StoryBox';
import TheFooter from './TheFooter'
export default {
    name: 'Home',
    components: {
        TheHeader,
        FirstScreen,
        StoryBox,
        TheFooter
    },
    methods: {
        ...mapActions(['setUserInfo']),
    },
    created() {
        this.$store.dispatch('getLocsData')
    },
    mounted() {
        this.setUserInfo()
    },
}
</script>


<style>
/* border-box全局继承 */
html {
    box-sizing: border-box;
}

*:not(.login-app *), .el-popover {
    box-sizing: border-box;
}
</style>
