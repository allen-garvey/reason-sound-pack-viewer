<template>
    <div :class="$style.container">
        <div
            :class="$style.buttonContainer"
            v-if="hasAudio"
        >
            <svg 
                :class="$style.icon"
                @click="buttonClicked"
                viewBox="0 0 24 24"
            >
                <use 
                    xlink:href="#icon-play"
                    v-if="isPaused" />
                <use 
                    xlink:href="#icon-pause"
                    v-if="isPlaying" />
            </svg>
        </div>
        <div>
            {{ title }}
        </div>
    </div>
</template>

<style lang="scss" module>
$icon-controls-dimensions: 40px;

.container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3em;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #541604;
    color: #fff;
}

.buttonContainer {
    max-height: 100%;
    margin-right: 1em;
}

.icon {
    max-height: 100%;
    width: $icon-controls-dimensions;
    cursor: pointer;
    
    &:hover {
        color: #888;
    }
}
</style>

<script>
import playStates from '../models/play-states';

export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        playState: {
            type: Number,
            required: true,
        },
        mediaId: {
            required: true,
        },
    },
    computed: {
        hasAudio(){
            return this.playState !== playStates.IS_EMPTY && this.playState !== playStates.IS_LOADING;
        },
        isPlaying(){
            return this.playState === playStates.IS_PLAYING;
        },
        isPaused(){
            return this.playState === playStates.IS_PAUSED;
        },
        isLoading(){
            return this.playState === playStates.IS_LOADING;
        },
    },
    methods: {
        buttonClicked(){
            if(this.playState === playStates.IS_PAUSED){
                this.$emit('audioRestart');
            }
            else {
                this.$emit('audioStop');
            }
        }
    }
};
</script>