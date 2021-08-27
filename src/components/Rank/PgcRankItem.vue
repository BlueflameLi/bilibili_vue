<template>
    <div class="pgc-rank-wrap">
        <span  class="number" :class="{ on: rank <= 3 }">{{ rank }}</span>
        <a :href="`https://www.bilibili.com/bangumi/play/ss${info.season_id}/`" target="_blank" class="link">
            <p class="txt">
                <span :title="info.title" class="title">{{ info.title }}</span>
                <span class="update">{{ info.new_ep.index_show }}</span>
            </p>
        </a>
    </div>
</template>
<script>
export default {
    name: 'PgcRankItem',
    props: ['rank','info']
}
</script>
<style>
.pgc-rank-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
}

.pgc-rank-wrap .number {
    font-size: 14px;
    color: #999;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    background: #fff;
    border-radius: 2px;
    display: inline-block;
}

.pgc-rank-wrap .number.on {
    color: #fff;
    background: #00a1d6;
}

.pgc-rank-wrap .link {
    display: inline-block;
}

.pgc-rank-wrap .txt {
    width: 290px;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
}

@media screen and (max-width: 1438px) {
    .footer-wrap .pgc-rank .pgc-rank-wrap .txt,
    .wrap .pgc-rank .pgc-rank-wrap .txt {
        width: 235px;
    }
}

.pgc-rank-wrap .txt .title {
    width: 198px;
    font-size: 14px;
    font-weight: 500;
}

.pgc-rank-wrap .txt .title,
.pgc-rank-wrap .txt .update {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.pgc-rank-wrap .txt .update {
    font-size: 12px;
    color: #999;
    text-align: right;
    min-width: 90px;
}
</style>