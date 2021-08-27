<template>
    <div id="bili_guochuang" ref="guochuang">
        <div class="guochuang">
            <div class="space-between">
                <TimeLine :seasonType="4" :timeLineData="guochuangTimeLine"></TimeLine>
                <div class="r-con">
                    <Rank
                        v-if="guochuangRank.length"
                        pgc
                        moreLink="//www.bilibili.com/v/popular/rank/guochan"
                    >
                        <PgcRankItem
                            v-for="(item,index) in guochuangRank.slice(0, 7)"
                            :key="index"
                            :rank="index + 1"
                            :info="item"
                        ></PgcRankItem>
                    </Rank>
                    <div class="special-recommend home-slide">
                        <Carousel v-if="guochuangSlideShow.length" class="carousel">
                            <CarouselItem v-for="(item,index) in guochuangSlideShow" :key="index">
                                <a :href="item.link" target="_blank">
                                    <img v-lazy="$format.trimHttp(item.img)" />
                                    <p class="title">{{ item.title }}</p>
                                </a>
                            </CarouselItem>
                        </Carousel>
                    </div>
                </div>
            </div>
            <div class="space-between">
                <div class="card-list">
                    <StoreyTitle title="国产原创相关" link="//www.bilibili.com/guochuang/">
                        <ExchangeBtn link="//www.bilibili.com/guochuang/" @click="getGuochuang"></ExchangeBtn>
                    </StoreyTitle>
                    <div class="zone-list-box">
                        <VideoCardCommon
                            v-for="(item,index) in guochuangData"
                            :key="index"
                            :aid="item.aid"
                            :pic="item.pic"
                            :bvid="item.bvid"
                            :stat="item.stat"
                            :duration="item.duration"
                            :title="item.title"
                            :owner="item.owner"
                        ></VideoCardCommon>
                    </div>
                </div>
                <Rank v-if="guochuangOriginalRank.length">
                    <RankItem
                        v-for="(item,index) in guochuangOriginalRank.slice(0, 10)"
                        :key="index"
                        :rank="index + 1"
                        :info="item"
                    ></RankItem>
                </Rank>
            </div>
        </div>
    </div>
</template>
<script>
import { getRegionDynamic, getRegionRanking, getTimeLine, getPgcRanking, getSlideShow } from '@/api'
import { mapState } from 'vuex'
import StoreyTitle from '../StoreyTitle'
import ExchangeBtn from '../ExchangeBtn'
import VideoCardCommon from '../VideoCardCommon'
import Rank from '../../Rank/Rank'
import RankItem from '../../Rank/RankItem'
import PgcRankItem from '../../Rank/PgcRankItem.vue'
import TimeLine from '../TimeLine'
import Carousel from '../../Carousel/Carousel'
import CarouselItem from '../../Carousel/CarouselItem'

export default {
    name: 'Guochuang',
    components: {
        StoreyTitle,
        ExchangeBtn,
        VideoCardCommon,
        Rank,
        RankItem,
        PgcRankItem,
        TimeLine,
        Carousel,
        CarouselItem
    },
    data() {
        return {
            guochuangTimeLine: {},
            guochuangRank: [],
            guochuangSlideShow: [],
            guochuangData: [],
            guochuangOriginalRank: [],
            isShow: false
        }
    },
    computed: {
        ...mapState(['scrollTop', 'viewHeight']),
        inView() {
            if (this.$refs.guochuang) {
                let offsetHeight = this.$refs.guochuang.offsetHeight
                let offsetTop = this.$refs.guochuang.offsetTop
                return offsetTop - (this.viewHeight + 100) < this.scrollTop && this.scrollTop< offsetTop + offsetHeight
            }
            else
                return this.scrollTop && this.viewHeight && false
        }
    },
    watch: {
        inView() {
            if (!this.isShow && this.inView) {
                this.isShow = true
                this.getGuochuangTimeLine()
                this.getGuochuangRanking()
                this.getGuochuangSlideShow()
                this.getGuochuang()
                this.getGuochuangOriginalRanking()
            }
        }
    },
    methods: {
        getGuochuangTimeLine() {
            var days = (new Date().getDay() + 6) % 7
            getTimeLine({ season_type: 4, day_before: days, day_after: 6 - days }).then(
                response => {
                    this.guochuangTimeLine = response.result
                }
            )
        },
        getGuochuangRanking() {
            getPgcRanking({ season_type: 4, day: 3 }).then(
                response => {
                    this.guochuangRank = response.result.list
                }
            )
        },
        getGuochuangSlideShow() {
            getSlideShow({ position_id: 101 }).then(
                response => {
                    this.guochuangSlideShow = response.result
                }
            )
        },
        getGuochuang() {
            getRegionDynamic({ ps: '12', rid: '168' }).then(
                response => {
                    this.guochuangData = response.data.archives
                }
            )
        },
        getGuochuangOriginalRanking() {
            getRegionRanking({ rid: '168' }).then(
                response => {
                    this.guochuangOriginalRank = response.data
                }
            )
        },

    },
    mounted() {
        this.getGuochuangTimeLine()
        this.getGuochuangRanking()
        this.getGuochuangSlideShow()
        this.getGuochuang()
        this.getGuochuangOriginalRanking()
    }
}
</script>
<style>
.guochuang .r-con {
    width: 320px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .guochuang .r-con,
    .footer-wrap .pgc-rank,
    .wrap .guochuang .r-con,
    .wrap .pgc-rank {
        width: 265px;
    }
}

.guochuang .special-recommend {
    height: 110px;
    margin-top: 20px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .guochuang .special-recommend,
    .wrap .guochuang .special-recommend {
        width: 265px !important;
        height: 91px !important;
    }
}
</style>