<template>
    <header class="storey-title">
        <div class="l-con">
            <svg v-if="svg" aria-hidden="true" class="svg-icon">
                <use :xlink:href="svg" />
            </svg>
            <a :href="link" target="_blank" class="name" :class="{ 'no-link': !link }">{{ title }}</a>
            <slot name="title"></slot>
        </div>
        <slot></slot>
    </header>
</template>
<script>
export default {
    name: 'StoreyTitle',
    props: {
        svg: String,
        link: String,
        title: {
            type: String,
            required: true
        }

    }
}
</script>
<style>
.storey-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    height: 36px;
}
.storey-title .l-con {
    display: inline-flex;
}

.storey-title .l-con .svg-icon {
    margin-right: 6px;
}

.storey-title .no-link {
    color: #212121;
    cursor: default;
}

.storey-title .name {
    margin: 0 20px 0 0;
    vertical-align: bottom;
    font-size: 20px;
    line-height: 36px;
}
</style>