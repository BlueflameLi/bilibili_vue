<template>
    <div id="bili_douga" ref="douga">
        <div class="space-between">
            <div class="card-list">
                <StoreyTitle title="动画" link="/v/douga" svg="#bili-douga">
                    <ExchangeBtn link="/v/douga" @click="getDouga"></ExchangeBtn>
                </StoreyTitle>
                <div class="zone-list-box">
                    <VideoCardCommon
                        v-for="(item,index) in dougaData"
                        :key="index"
                        :pic="item.pic"
                        :bvid="item.bvid"
                        :stat="item.stat"
                        :duration="item.duration"
                        :title="item.title"
                        :owner="item.owner"
                    ></VideoCardCommon>
                </div>
            </div>
            <Rank v-if="dougaRank.length" moreLink="//www.bilibili.com/v/popular/rank/douga">
                <RankItem
                    v-for="(item,index) in dougaRank.slice(0, 10)"
                    :key="index"
                    :bvid="item.bvid"
                    :pic="item.pic"
                    :title="item.title"
                    :pts="item.pts"
                ></RankItem>
            </Rank>
        </div>
    </div>
</template>
<script>
import { getRegionDynamic, getRegionRanking } from '@/api'
import { mapState } from 'vuex'
import StoreyTitle from '../StoreyTitle'
import ExchangeBtn from '../ExchangeBtn'
import VideoCardCommon from '../VideoCardCommon'
import Rank from '../../Rank/Rank'
import RankItem from '../../Rank/RankItem'
export default {
    name: 'Douga',
    components: {
        StoreyTitle,
        ExchangeBtn,
        VideoCardCommon,
        Rank,
        RankItem
    },
    data() {
        return {
            dougaData: [],
            dougaRank: [],
            isShow: false
        }
    },
    computed: {
        ...mapState(['scrollTop', 'viewHeight']),
        inView() {
            if (this.$refs.douga) {
                let offsetHeight = this.$refs.douga.offsetHeight
                let offsetTop = this.$refs.douga.offsetTop
                return offsetTop - (this.viewHeight + 100) < this.scrollTop && this.scrollTop < offsetTop + offsetHeight
            }
            else
                return this.scrollTop && this.viewHeight && false
        }
    },
    watch: {
        inView(val) {
            if (!this.isShow && val) {
                this.isShow = true
                this.getDouga()
                this.getDougaRanking()
            }
        }
    },
    methods: {
        getDouga() {
            getRegionDynamic({ ps: '12', rid: '1' }).then(
                response => {
                    this.dougaData = response.data.archives
                }
            )
        },
        getDougaRanking() {
            getRegionRanking({ rid: '1' }).then(
                response => {
                    this.dougaRank = response.data
                }
            )
        },

    },
    mounted() {

    }
}
</script>
<style>
</style>