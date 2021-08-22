<template>
    <div class="exchange-btn">
        <div class="btn btn-change" @click="$emit('click')">
            <i class="bilifont bili-icon_caozuo_huanyihuan" :class="{ 'quan': Loading }"></i>换一换
        </div>
        <a :href="link" target="_blank" class="btn more">
            更多
            <i class="bilifont bili-icon_caozuo_qianwang"></i>
        </a>
    </div>
</template>
<script>
export default {
    name: 'ExchangeBtn',
    props: {
        link: {
            type: String,
            required: true
        },
        Loading: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style>
.exchange-btn,
.exchange-btn .btn {
    display: flex;
}

.exchange-btn .btn {
    align-items: center;
    cursor: pointer;
    height: 22px;
    text-align: center;
    border: 1px solid silver;
    border-radius: 2px;
    font-size: 12px;
    color: #505050;
    transition: all 0.2s;
    line-height: 16px;
}

.exchange-btn .btn-change {
    padding: 0 0 0 6px;
    width: 72px;
}

.exchange-btn .btn .bilifont {
    vertical-align: middle;
}

.exchange-btn .btn-change .bilifont {
    margin-right: 4px;
    transition: all 0.5s;
}

.exchange-btn .btn-change .bilifont.quan {
    animation: quan 0.8s linear infinite;
}

.exchange-btn .btn-change:hover .bilifont {
    transform: rotate(-1turn);
}

@keyframes quan {
    0% {
        transform: rotate(1turn);
    }

    25% {
        transform: rotate(270deg);
    }

    50% {
        transform: rotate(180deg);
    }

    75% {
        transform: rotate(90deg);
    }

    to {
        transform: rotate(0deg);
    }
}

.exchange-btn .btn:hover {
    background-color: #f4f4f4;
}

.exchange-btn .btn:active {
    background-color: #ccc;
}

.exchange-btn .more {
    padding: 0 0 0 12px;
    width: 58px;
    margin-left: 12px;
}
</style>