<template>
<div>
    <router-view
        @audio-start="startAudio"
        @audio-stop="stopAudio"
    />
</div>
</template>

<style lang="scss" module>
</style>

<script>
let audio = null;

export default {
    created(){
        audio = new Audio();
    },
    methods: {
        startAudio({title, url}){
            audio.src = url;
            audio.load();
            audio.play();
        },
        stopAudio(){
            audio.pause();
        },
    },
};
</script>