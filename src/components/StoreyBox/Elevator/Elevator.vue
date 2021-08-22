<template>
    <div id="elevator" class="elevator" :class="{ edit: isEdit }" ref="elevator">
        <div class="mask"></div>
        <i class="ear bilifont bili-icon_youdaohang_xiaodianshitianxian"></i>
        <div class="list-box">
            <div>
                <div
                    v-for="(item, index) in sortList"
                    :key="index"
                    class="item sortable"
                    :class="{ on: currentFloor === index && !isEdit }"
                    @click="moveTo(elevatorData[item].id)"
                >{{ elevatorData[item].name }}</div>
            </div>
            <div class="item sort" :class="{ on: isEdit }" @click="isEdit = !isEdit">
                <i class="bilifont bili-icon_youdaohang_paixu"></i>
            </div>
            <div class="item back-top" @click="scrollTo(0)">
                <i class="bilifont bili-general_pullup_s"></i>
            </div>
        </div>
        <div class="bg23"></div>
    </div>
</template>
<script>
import { throttle } from 'lodash'
import { mapState, mapMutations } from 'vuex'
import * as TYPE from '@/store/mutation-types'
export default {
    name: 'elevator',
    data() {
        return {
            sortList: [0, 1, 2, 3, 4],
            currentFloor: -1,
            isEdit: false
        }
    },
    computed: {
        ...mapState(['elevatorData', 'scrollTop']),
        top() {
            let screenWidth = document.documentElement.clientWidth
            if (screenWidth < 1655)
                return 369
            else
                return 369 + (454 - 158) / (2560 - 1655) * (this.screenWidth - 1655)
        }
    },
    methods: {
        ...mapMutations({ setScrollTop: TYPE.SET_SCROLL_TOP }),
        scrollHandle() {
            var scrollTop = window.pageYOffset
            var firstScreenOffsetTop = document.querySelector(".first-screen").offsetTop + 106
            var top = (document.documentElement.clientHeight - (this.$refs.elevator.offsetHeight + 70)) / 2
            var res = scrollTop < firstScreenOffsetTop ? firstScreenOffsetTop - scrollTop : top < 0 ? 10 : top
            this.$refs.elevator.style.top = "".concat(res, "px")
            if (scrollTop < 700)
                this.currentFloor = -1
            else
                for (let i = 0; i < this.sortList.length; i++) {
                    let element = document.querySelector("#bili_".concat(this.elevatorData[this.sortList[i]].id));
                    if (element.offsetTop > scrollTop - element.offsetHeight / 2) {
                        this.currentFloor = i;
                        break
                    }
                }
        },
        moveTo(id) {
            var element = document.querySelector("#bili_".concat(id));
            window.scroll(0, element.offsetTop)
        },
        scrollTo(val) {
            window.scroll(0, val)
        }
    },
    mounted() {
        const that = this
        that.scrollHandle()
        window.addEventListener('scroll', throttle(function () {
            that.scrollHandle()
        }, 100))
        window.addEventListener('resize', throttle(function () {
            that.scrollHandle()
        }, 100))
    },
    
}
</script>
<style>
.elevator {
    position: fixed;
    left: calc(50% + 3px);
    top: 10px;
    margin-left: 819px;
    z-index: 10;
}

/* 滚动条偏移修正 */
@media screen and (max-width: 1870px) {
    .footer-wrap .elevator,
    .wrap .elevator {
        margin-left: 710px;
    }
}

@media screen and (max-width: 1654px) {
    .footer-wrap .elevator,
    .wrap .elevator {
        margin-left: 609px;
    }
}

@media screen and (max-width: 1438px) {
    .footer-wrap .elevator,
    .wrap .elevator {
        margin-left: 509px;
    }
}

@media screen and (max-width: 1200px) {
    .wrap .elevator {
        margin-left: 510px;
    }
}

@media screen and (max-width: 1122px) {
    .wrap .elevator {
        margin-left: 500px;
    }
}

.elevator .list-box {
    padding-top: 6px;
    position: relative;
    background: #fff;
    border: 1px solid #e7e7e7;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    z-index: 2;
}

.elevator .list-box .item {
    width: 54px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    -ms-user-select: none;
    user-select: none;
    background: #fff;
    font-size: 12px;
}

.elevator .list-box .item.sort {
    height: 32px;
    line-height: 32px;
    position: relative;
    border-top: 1px solid #e7e7e7;
    margin-top: 5px;
}

.elevator .list-box .item.back-top {
    position: absolute;
    left: -1px;
    bottom: -32px;
    width: 56px;
    line-height: 30px;
    height: 32px;
    border: 1px solid #e7e7e7;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.elevator .list-box .item.back-top .bilifont {
    font-size: 26px;
}

.elevator .list-box .item.back-old {
    position: absolute;
    width: 56px;
    height: 42px;
    line-height: 16px;
    left: -1px;
    bottom: -82px;
    border-radius: 10px;
    border: 1px solid #e7e7e7;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
}

.elevator .list-box .item .bilifont {
    color: #999;
}

.elevator .list-box .item.on,
.elevator .list-box .item:hover {
    background-color: #00a1d6;
    color: #fff;
}

.elevator .list-box .item.on .bilifont,
.elevator .list-box .item:hover .bilifont {
    color: #fff;
}

.elevator .ear {
    position: absolute;
    top: -10px;
    font-size: 12px;
    left: 3px;
    z-index: 2;
}

.elevator .bg23 {
    display: none;
    position: absolute;
    width: 130px;
    height: 105%;
    top: -20px;
    right: -15px;
    background-color: hsla(0, 0%, 100%, 0.8);
    padding: 40px;
    box-sizing: content-box;
    border-radius: 2px;
    background-image: url(https://s1.hdslb.com/bfs/static/jinkela/home/asserts/tab2233.png);
    background-repeat: no-repeat;
    background-position: 16px 20px;
}

.elevator.edit {
    z-index: 1000;
}

.elevator.edit .mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.elevator.edit .bg23 {
    display: block;
}

.slicksort-selected {
    text-align: center;
    line-height: 28px;
    background-color: #00a1d6;
    color: #fff;
    pointer-events: stroke !important;
    z-index: 1001;
}

.slicksort-selected .bilifont {
    color: #fff;
}
</style>