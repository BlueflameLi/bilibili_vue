<template>
    <div id="bili_manga" ref="manga">
        <a
            v-if="storyBanner.manga && storyBanner.manga.server_type"
            target="_blank"
            class="banner-card wrap"
            :href="storyBanner.manga.url"
        >
            <img v-lazy="storyBanner.manga.pic" />
            <i v-if="storyBanner.manga.is_ad" class="gg-icon"></i>
        </a>
        <div class="space-between">
            <MangaPanel :isShow="isShow"></MangaPanel>
            <MangaRank :isShow="isShow"></MangaRank>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import MangaPanel from './MangaPanel'
import MangaRank from './MangaRank'

export default {
    name: 'Mange',
    components: {
        MangaPanel, MangaRank
    },
    data() {
        return {
            isShow: false
        }
    },
    computed: {
        ...mapGetters(['storyBanner']),
        ...mapState(['scrollTop', 'viewHeight']),
        inView() {
            if (this.$refs.manga) {
                let offsetHeight = this.$refs.manga.offsetHeight
                let offsetTop = this.$refs.manga.offsetTop
                return offsetTop - (this.viewHeight + 100) < this.scrollTop && this.scrollTop< offsetTop + offsetHeight
            }
            else
                return this.scrollTop && this.viewHeight && false
        }
    },
    watch: {
        inView() {
            if (!this.isShow && this.inView)
                this.isShow = true
        }
    },
}
</script>
<style>
</style>