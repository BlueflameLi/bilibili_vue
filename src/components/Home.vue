<template>
    <div class="home">
        <TheHeader></TheHeader>
        <TheMain></TheMain>
    </div>
</template>

<script>
import TheHeader from './TheHeader.vue'
import TheMain from './TheMain'
export default {
    name: 'Home',
    components: {
        TheHeader,
        TheMain
    }
}
</script>


<style>
</style>
