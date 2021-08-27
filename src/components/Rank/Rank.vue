<template>
    <div :class="pgc ? 'pgc-rank' : 'rank-list'">
        <header class="rank-header">
            <span class="name">排行榜</span>
            <a :href="moreLink" target="_blank" class="more">
                更多
                <i class="bilifont bili-icon_caozuo_qianwang"></i>
            </a>
        </header>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Rank',
    props: {
        moreLink: String,
        pgc: Boolean,
    },
}
</script>
<style>
.rank-list {
    width: 320px;
}

@media screen and (max-width: 1438px) {
    .rank-list {
        width: 265px !important;
    }
}

.rank-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    height: 36px;
}

.rank-header .name {
    display: inline-block;
    color: #212121;
    vertical-align: bottom;
    font-size: 20px;
    line-height: 28px;
}

.rank-header .more {
    display: flex;
    align-items: center;
    padding: 0 0 0 12px;
    width: 58px;
    height: 22px;
    border: 1px solid silver;
    border-radius: 2px;
    color: #505050;
    text-align: center;
    font-size: 12px;
    line-height: 16px;
    transition: all 0.2s;
}

.rank-header .more .bilifont {
    vertical-align: middle;
}

.pgc-rank {
    width: 320px;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .guochuang .r-con,
    .footer-wrap .pgc-rank,
    .wrap .guochuang .r-con,
    .wrap .pgc-rank {
        width: 265px;
    }
}
</style>