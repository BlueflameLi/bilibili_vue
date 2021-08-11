<template>
    <transition :name="dir">
        <div v-show="active" class="item">
            <slot></slot>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'CarouselItem',
    data() {
        return {
            dir:'',
            active:false
        }
    },
    methods: {
    },
}
</script>
<style >
.pre-leave-to,
.next-enter {
    transform: translateX(100%);
}

.pre-enter,
.next-leave-to {
    transform: translateX(-100%);
}

.pre-enter-active,
.pre-leave-active,
.next-enter-active,
.next-leave-active {
    transition: all 0.55s ease 0s;
}

.pre-leave,
.pre-enter-to,
.next-leave,
.next-enter-to {
    transform: translateX(0%);
}
</style>