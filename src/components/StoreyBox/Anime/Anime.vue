<template>
    <div id="bili_anime" ref="anime">
        <a
            v-if="storyBanner.anime && storyBanner.anime.server_type"
            target="_blank"
            class="banner-card wrap"
            :href="$format.trimHttp(storyBanner.anime.url)"
        >
            <img v-lazy="$format.trimHttp(storyBanner.anime.pic)" />
            <i v-if="storyBanner.anime.is_ad" class="gg-icon"></i>
        </a>
        <div class="anime">
            <div class="space-between">
                <TimeLine :timeLineData="animeTimeLine"></TimeLine>
                <Rank
                    v-if="animeRank.length"
                    pgc
                    moreLink="//www.bilibili.com/v/popular/rank/bangumi"
                >
                    <PgcRankItem
                        v-for="(item,index) in animeRank.slice(0, 10)"
                        :key="index"
                        :rank="index + 1"
                        :info="item"
                    ></PgcRankItem>
                </Rank>
            </div>
            <div class="space-between">
                <div class="card-list">
                    <StoreyTitle title="番剧动态" link="//www.bilibili.com/anime/">
                        <ExchangeBtn link="//www.bilibili.com/anime/" @click="getAnime"></ExchangeBtn>
                    </StoreyTitle>
                    <div class="zone-list-box">
                        <VideoCardCommon
                            v-for="(item,index) in animeData"
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
                <div class="special-recommend home-slide">
                    <header>特别推荐</header>
                    <Carousel v-if="animeSlideShow.length" class="carousel">
                        <CarouselItem v-for="(item,index) in animeSlideShow" :key="index">
                            <a :href="item.link" target="_blank">
                                <img v-lazy="$format.trimHttp(item.img)" />
                                <p class="title">{{ item.title }}</p>
                            </a>
                        </CarouselItem>
                    </Carousel>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getRegionDynamic, getTimeLine, getPgcRanking, getSlideShow } from '@/api'
import { mapGetters, mapState } from 'vuex'
import StoreyTitle from '../StoreyTitle'
import ExchangeBtn from '../ExchangeBtn'
import VideoCardCommon from '../VideoCardCommon'
import Rank from '../../Rank/Rank'
import PgcRankItem from '../../Rank/PgcRankItem'
import TimeLine from '../TimeLine'
import Carousel from '../../Carousel/Carousel'
import CarouselItem from '../../Carousel/CarouselItem'
export default {
    name: 'Anime',
    components: {
        StoreyTitle,
        ExchangeBtn,
        VideoCardCommon,
        Rank,
        PgcRankItem,
        TimeLine,
        Carousel,
        CarouselItem
    },
    data() {
        return {
            animeTimeLine: {},
            animeRank: [],
            animeData: [],
            animeSlideShow: [],
            isShow: false
        }
    },
    computed: {
        ...mapGetters(['storyBanner']),
        ...mapState(['scrollTop', 'viewHeight']),
        inView() {
            if (this.$refs.anime) {
                let offsetHeight = this.$refs.anime.offsetHeight
                let offsetTop = this.$refs.anime.offsetTop
                return offsetTop - (this.viewHeight + 100) < this.scrollTop && this.scrollTop < offsetTop + offsetHeight
            }
            else
                return this.scrollTop && this.viewHeight && false
        }
    },
    watch: {
        inView() {
            if (!this.isShow && this.inView) {
                this.isShow = true
                this.getAnimeTimeLine()
                this.getAnimeRanking()
                this.getAnime()
                this.getAnimeSlideShow()
            }
        }
    },
    methods: {
        getAnimeTimeLine() {
            var days = (new Date().getDay() + 6) % 7
            getTimeLine({ season_type: 1, day_before: days, day_after: 6 - days }).then(
                response => {
                    this.animeTimeLine = response.result
                }
            )
        },
        getAnimeRanking() {
            getPgcRanking({ season_type: 1, day: 3 }).then(
                response => {
                    this.animeRank = response.result.list
                }
            )
        },
        getAnime() {
            getRegionDynamic({ ps: '12', rid: '13' }).then(
                response => {
                    this.animeData = response.data.archives
                }
            )
        },
        getAnimeSlideShow() {
            getSlideShow({ position_id: 104 }).then(
                response => {
                    this.animeSlideShow = response.result
                }
            )
        },

    },
    mounted() {

    }
}
</script>
<style>
.anime .zone-list-box {
    height: 376px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .anime .zone-list-box,
    .wrap .anime .zone-list-box {
        height: 332px;
    }
}

.anime .special-recommend {
    height: 314px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .anime .special-recommend,
    .wrap .anime .special-recommend {
        width: 265px !important;
        height: 274px !important;
    }
}
</style>