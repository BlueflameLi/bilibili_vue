<template>
    <div class="home">
        <TheHeader></TheHeader>
        <TheMain></TheMain>
        <TheFooter></TheFooter>
    </div>
</template>

<script>
import TheHeader from './TheHeader.vue'
import TheMain from './TheMain'
import TheFooter from './TheFooter'
export default {
    name: 'Home',
    components: {
        TheHeader,
        TheMain,
        TheFooter
    },
    created() {
        this.$store.dispatch('getLocsData')
    },
}
</script>


<style>
</style>
