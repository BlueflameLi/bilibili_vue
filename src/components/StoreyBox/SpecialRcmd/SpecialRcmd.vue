<template>
    <div id="bili_report_spe_rec" class="space-between s-rec wrap">
        <div class="card-list">
            <StoreyTitle svg="#bili-tebietuijian" title="特别推荐"></StoreyTitle>
            <div class="zone-list-box">
                <VideoCardCommon
                    v-for="(item, index) in specialRcmdData"
                    :key="index"
                    :pic="item.pic+'@206w_116h_1c_100q.webp'"
                    :bvid="item.bvid"
                    :stat="{ like: item.like, view: item.play, coin: item.coins }"
                    :duration="item.duration"
                    :title="item.title"
                    :owner="{ name: item.author, mid: item.mid }"
                ></VideoCardCommon>
            </div>
        </div>
        <a v-if="spcialRcmdPic" target="_blank" class="operate-card gg" :href="spcialRcmdPic.url">
            <img v-lazy="spcialRcmdPic.pic" :alt="spcialRcmdPic.name" />
        </a>
    </div>
</template>
<script>
import { getSpecialRcmd } from '@/api'
import { mapState } from 'vuex'
import StoreyTitle from '../StoreyTitle'
import VideoCardCommon from '../VideoCardCommon'
export default {
    name: 'SpecialRcmd',
    components: {
        StoreyTitle, VideoCardCommon
    },
    data() {
        return {
            specialRcmdData: []
        }
    },
    computed: {
        ...mapState({
            spcialRcmdPic: state => state.locsData && state.locsData['31'] && state.locsData['31'][0]
        })
    },
    methods: {
        setSpecialRcmd() {
            getSpecialRcmd().then(
                response => {
                    this.specialRcmdData = response.list || []
                }
            )
        }
    },
    mounted() {
        this.setSpecialRcmd()
    },
}
</script>
<style>
.s-rec {
    height: 252px;
    overflow: hidden;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .s-rec,
    .wrap .s-rec {
        height: 220px;
    }
}

.s-rec .gg {
    width: 320px;
    margin-top: 52px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .s-rec .operate-card,
    .wrap .s-rec .operate-card {
        width: 265px;
    }
}
</style>