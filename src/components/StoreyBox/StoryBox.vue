<template>
    <div class="storey-box wrap">
        <div class="proxy-box">
            <Live></Live>
            <Douga></Douga>
            <Anime></Anime>
            <Guochuang></Guochuang>
            <Manga></Manga>
        </div>
        <SpecialRcmd></SpecialRcmd>
        <Elevator></Elevator>
    </div>
</template>
<script>
import Live from './Live/Live'
import Douga from './Douga/Douga'
import Anime from './Anime/Anime'
import Guochuang from './Guochuang/Guochuang'
import Manga from './Manga/Manga'
import SpecialRcmd from './SpecialRcmd/SpecialRcmd'
import Elevator from './Elevator/Elevator'
import { mapActions } from 'vuex'
import { throttle } from 'lodash'
export default {
    name: 'StoryBox',
    components: { Live, Douga, Anime, Guochuang, Manga, SpecialRcmd, Elevator },
    data() {
        return {

        }
    },
    methods: {
        ...mapActions(['getScrollTop', 'getViewHeight'])
    },
    mounted() {
        let that = this
        window.addEventListener('scroll', throttle(function () {
            that.getScrollTop()
        }, 100))
        window.addEventListener('resize', throttle(function () {
            that.getScrollTop()
            that.getViewHeight()
        }, 100))
    },
}
</script>
<style>
.storey-box .proxy-box {
    min-height: 1000px;
}

/* 横幅 */
.banner-card {
    position: relative;
    display: block;
    max-height: 134px;
    margin-bottom: 46px;
}

.banner-card img {
    width: 100%;
    height: 100%;
    border-radius: 2px;
}

.banner-card .gg-icon {
    position: absolute;
    left: 5px;
    bottom: 5px;
    width: 38px;
    height: 22px;
    margin-right: 3px;
    z-index: 1;
    vertical-align: middle;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAAsCAMAAAD4va5DAAAAolBMVEX///8AAAAAAAAAAAAAAAACAgIAAAAAAAAGBgb5+fns7OwAAACBgYHq6ur9/f17e3tgYGD09PSoqKiLi4sAAAANDQ3V1dW6urqPj48DAwMAAAD////u7u7j4+MbGxv////b29vBwcH19fXt7e3GxsaLi4ukpKRTU1P4+Pjl5eXh4eHX19fLy8vb29v4+PisrKwvLy86Ojr7+/vy8vK4uLhVVVX0WqNFAAAANnRSTlOZAgULFR0IACCBYxIvW4sxJmk0HxoXU0grJQ6TZl0cj1RFcmtENTUmfGFYTUlGcT4rI4dyMhsJ24tXAAABiElEQVRIx+3XyW6DMBCA4WnAzrCUJUDYCpQAIWuTdHn/V6sNqZqFAwSfqv4HJHP4ZECIAabT6ZOQGARnazKqhuBYI1EqjYjSxpsCt6gUaZr8cJoWSZRr0FiObcCIDNvhWoNJTgYjyxypxWhkw+jsiHJsQjVjPGZodMIxSQMBaVKLySIw+R/jxX5lXK2LFYDqK4/tLCeby+UadwA7XAzECj/Py7KcuXVZ5rnv+zHfmEXYzvbuUOwVyU+IGIYhxxLipp4ne15K2Dm/P0Y2ylV8tyQNWF+yEwS6ac4HYC9w0wLT5vr28tvgy7zD3msbhGHqRm369LZqW/Y4FiJxWR7LdQnBMFR6Ylss4KYkSZ4vYkujJ7bDhbjX6YAruGu9nLGW7THvj1Vo3GNzcrIsq64tFtH7YyeELuz3qaT9MQUrcZiKW3HYISw6MSvQddM0dT0gvbH4eIy7MLS41Who9r9nc+hoXX3Auazy/84HZSAmdjwQOriIHKmEDnuCx1ChA7LI0V3sT4XQ351vRIIkxg4KQCAAAAAASUVORK5CYII=);
    background-size: cover;
}

/* 推荐 */
.zone-list-box {
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 1286px;
    height: 404px;
}

@media screen and (max-width: 1654px) {
    .footer-wrap .zone-list-box,
    .wrap .zone-list-box {
        width: 854px !important;
    }
}

@media screen and (max-width: 1438px) {
    .footer-wrap .zone-list-box,
    .wrap .zone-list-box {
        width: 710px !important;
        height: 360px;
    }
}

@media screen and (max-width: 1870px) {
    .footer-wrap .space-between .zone-list-box,
    .wrap .space-between .zone-list-box {
        width: 1070px;
    }
}

/* live */

/* Douga */

/* Anime */

.special-recommend {
    width: 320px;
}

.special-recommend header {
    height: 36px;
    margin-bottom: 16px;
    font-size: 20px;
    color: #212121;
    line-height: 36px;
}

.special-recommend .carousel,
.special-recommend .van-slide {
    position: relative;
    width: 100% !important;
    height: 100% !important;
}

.special-recommend .carousel img,
.special-recommend .van-slide img {
    width: 100%;
    height: 100%;
    border-radius: 2px;
}

/* guochuang */

/* specialRcmd */
</style>