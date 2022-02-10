<template>
<div :class="$style.container">
    <div :class="$style.mobileTitle">
        {{ title }}
    </div>
    <div :class="$style.innerContainer">
        <div
            :class="$style.buttonContainer"
            v-if="hasAudio"
        >
            <button @click="buttonClicked" tabindex="1">
                <svg 
                    :class="$style.icon"
                    viewBox="0 0 24 24"
                >
                    <use 
                        xlink:href="#icon-play"
                        v-if="isPaused" />
                    <use 
                        xlink:href="#icon-pause"
                        v-if="isPlaying" />
                </svg>
            </button>
        </div>
        <div :class="$style.desktopTitle">
            {{ title }}
        </div>
        <div :class="$style.volumeContainer" v-show="!isAudioEmpty">
            <svg 
                :class="$style.volumeIcon"
                viewBox="0 0 24 24"
            >
                <use 
                    xlink:href="#icon-volume-x"
                    v-if="audioVolume === 0" />
                <use 
                    xlink:href="#icon-volume-1"
                    v-else-if="audioVolume <= 0.6" />
                <use 
                    xlink:href="#icon-volume-2"
                    v-else />
            </svg>
            <input 
                tabindex="2"
                type="range"
                min="0"
                max="1"
                :value="audioVolume"
                step="0.05"
                :class="$style.volumeInput"
                @input="$emit('volumeChanged', parseFloat($event.target.value))"
            />
        </div>
    </div>
</div>
</template>

<style lang="scss" module>
$icon-controls-dimensions: 50px;
$breakpoint: 600px;

.container {
    position: fixed;
    z-index: 10;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #541604;
    color: #fff;
    text-align: center;
    box-shadow: 0 -5px 15px rgba(84, 22, 8, 0.2);

    @media screen and (max-width: $breakpoint) {
        height: 104px;
    }
}

.innerContainer {
    display: flex;
    align-items: center;
    justify-content: center;
}

.mobileTitle {
    margin: 0 0 5px;
    
    @media screen and (min-width: $breakpoint) {
        display: none;
    }
}

.desktopTitle {
    margin-left: 1em;
    
    @media screen and (max-width: $breakpoint) {
        display: none;
    }
}

.buttonContainer {
    max-height: 100%;

    button {
        color: #fff;
    }
}

.icon {
    max-height: 100%;
    width: $icon-controls-dimensions;
    cursor: pointer;
    
    &:hover {
        color: #888;
    }
}

.volumeContainer {
    display: flex;
    align-items: center;
    margin-left: 40px;
}

.volumeIcon {
    margin-right: 5px;
    max-height: 100%;
    width: 28px;
}

$volume-slider-handle-color: #6b6b6b;
$volume-slider-handle-dimensions: 15px;
$volume-slider-handle-border-radius: 50%;
$volume-slider-progress-color: #88c341;
$volume-slider-range-color: #dbd9d6;

.volumeInput {
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    background: $volume-slider-range-color;
    border: 1px solid #82887a;
    border-radius: $volume-slider-handle-dimensions;
    height: $volume-slider-handle-dimensions - 1px;
    width: 140px;
    overflow: hidden;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        
        width: $volume-slider-handle-dimensions;
        height: $volume-slider-handle-dimensions;
        border-radius: $volume-slider-handle-border-radius;
        background: $volume-slider-handle-color;

        box-shadow: -80px 0 0 75px $volume-slider-progress-color;
    }

    &::-moz-range-thumb {
        width: $volume-slider-handle-dimensions;
        height: $volume-slider-handle-dimensions;
        border-radius: $volume-slider-handle-border-radius;
        background: $volume-slider-handle-color;
    }

    &::-moz-range-progress {
        height: 100%;
        background-color: $volume-slider-progress-color; 
    }

    &::-moz-range-track {  
        height: 100%;
        background-color: $volume-slider-range-color;
    }
}

// // chrome specific styles
// @media screen and (-webkit-min-device-pixel-ratio:0) {
//     .volumeInput {
//         overflow: hidden;
        
//         &::-webkit-slider-runnable-track {
//             height: 10px;
//             -webkit-appearance: none;
//             appearance: none;
//             color: #13bba4;
//             margin-top: -1px;
//         }
//     }
// }
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
        audioVolume: {
            type: Number,
            required: true,
        },
    },
    computed: {
        isAudioEmpty(){
            return this.playState === playStates.IS_EMPTY;
        },
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