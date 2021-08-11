<template>
    <div>
        <FirstScreen />
        <StoryBox />
        <Login />
    </div>
</template>
<script>
import Login from './Login'
import FirstScreen from './FirstScreen'
import StoryBox from './StoryBox';

export default {
    name: 'TheMain',
    components: { FirstScreen, StoryBox, Login }
}
</script>
<style>
</style>