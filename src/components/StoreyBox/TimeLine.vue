<template>
    <div class="time-line">
        <StoreyTitle :svg="seasonData.svg" :title="seasonData.title" :link="seasonData.link">
            <template #title>
                <div class="tab-switch">
                    <div
                        v-for="(item,index) in tabSwitchItemTitle"
                        :key="index"
                        class="tab-switch-item"
                        :class="{ 'on': CurrentActiveTab === index }"
                        @click="CurrentActiveTab = index"
                    >{{ item }}</div>
                </div>
            </template>
            <a :href="seasonData.timelinlink" target="_blank" class="tl-link">
                新番时间表
                <i class="bilifont bili-icon_caozuo_qianwang"></i>
            </a>
        </StoreyTitle>
        <div class="zone-list-box">
            <div v-for="(item,index) in TimeLineActive" :key="index" class="time-line-card item">
                <a
                    :href="`//www.bilibili.com/bangumi/play/ss${item.season_id}/`"
                    target="_blank"
                    :title="item.title"
                    class="pic"
                >
                    <img v-lazy="$format.trimHttp(item.square_cover) + '@70w_70h_1c_100q.webp'" :alt="item.title" />
                </a>
                <div class="txt">
                    <a
                        :href="`//www.bilibili.com/bangumi/play/ss${item.season_id}/`"
                        target="_blank"
                        :title="item.title"
                        class="ss"
                    >{{ item.title }}</a>
                    <p class="update">
                        <a
                            :href="`//www.bilibili.com/bangumi/play/ep${item.episode_id}/`"
                            target="_blank"
                            :class="{ 'published': item.published }"
                        >{{ item.delay ? item.delay_reason : item.pub_index }}</a>
                    </p>
                </div>
            </div>
            <div v-if="!TimeLineActive.length" class="pgc-no-data">
                <span>今天没有{{ seasonData.noDataTitle }}更新</span>
            </div>
        </div>
    </div>
</template>
<script>
import StoreyTitle from './StoreyTitle'
export default {
    name: 'TimeLine',
    components: { StoreyTitle },
    props: {
        seasonType: {
            type: Number,
            default: 1
        },
        timeLineData: Object
    },
    data() {
        return {
            tabSwitchItemTitle: [
                '最新', '周一', '周二', '周三', '周四', '周五', '周六', '周日'
            ],
            CurrentActiveTab: 0
        }
    },
    computed: {
        seasonData() {
            if (this.seasonType === 1)
                return {
                    svg: '#bili-anime',
                    title: '番剧',
                    link: '//www.bilibili.com/anime/',
                    timelinlink: '//www.bilibili.com/anime/timeline/',
                    noDataTitle: '番剧'
                }
            else
                return {
                    svg: "#bili-guochuang",
                    title: '国创',
                    link: '//www.bilibili.com/guochuang/',
                    timelinlink: '//www.bilibili.com/guochuang/timeline/',
                    noDataTitle: '国产动画'
                }
        },
        TimeLineActive() {
            switch (this.CurrentActiveTab) {
                case 0:
                    return this.timeLineData && this.timeLineData.latest || []
                default:
                    return this.timeLineData && this.timeLineData.timeline[this.CurrentActiveTab - 1].episodes || []
            }
        }
    }
}
</script>
<style>
.time-line .tab-switch {
    display: flex;
    margin-left: 4px;
}

.time-line .tab-switch .tab-switch-item {
    font-size: 14px;
    line-height: 30px;
    height: 30px;
    margin-right: 24px;
    cursor: pointer;
}

.time-line .tab-switch .tab-switch-item.on {
    border-bottom: 1px solid #00a1d6;
    color: #00a1d6;
}

.time-line .tl-link {
    width: 112px;
    height: 30px;
    border: 1px solid #00a1d6;
    border-radius: 2px;
    background: #fff;
    text-align: center;
    line-height: 27px;
    padding: 0 0 0 14px;
    font-size: 14px;
    color: #00a1d6;
    display: flex;
    align-items: center;
    transition: all 0.2s;
    line-height: 16px;
}

.time-line .tl-link:hover {
    color: #fff;
    background: #00a1d6;
}

.time-line .zone-list-box {
    width: 1287px;
    height: 376px;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    overflow: auto;
}

/* 时间表内容 */
.time-line-card {
    width: 227px;
    height: 70px;
    display: flex;
    justify-content: space-between;
}

@media screen and (max-width: 1870px) {
    .footer-wrap .time-line-card,
    .wrap .time-line-card {
        margin: 0 30px 24px 0 !important;
        width: 227px;
    }
}

@media screen and (max-width: 1438px) {
    .footer-wrap .zone-list-box .time-line-card,
    .wrap .zone-list-box .time-line-card {
        margin: 0 20px 24px 0 !important;
        width: 210px;
    }
}

.time-line .zone-list-box .item {
    margin: 0 30px 24px 0;
}

.time-line-card .txt {
    width: 152px;
    font-weight: 500;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .zone-list-box .time-line-card .txt,
    .wrap .zone-list-box .time-line-card .txt {
        width: 130px;
    }
}

.time-line-card .txt .ss {
    display: inline-block;
    font-size: 14px;
    height: 37px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: 2px 0 12px;
}

.time-line-card .txt .update a {
    width: 100%;
    color: #999;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 400;
}

.time-line-card .txt .update .published {
    color: #00a1d6;
}

.pgc-no-data {
    width: 100%;
    height: 100%;
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/international-home/assets/bgm-nodata.png);
    background-repeat: no-repeat;
    background-position: 50%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.pgc-no-data span {
    margin-top: -120px;
    color: #99a2aa;
}
</style>