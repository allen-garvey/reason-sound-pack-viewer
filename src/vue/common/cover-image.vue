<template>
    <div :class="$style.container">
        <button
            :class="$style.imageControlContainer"
            @click="clicked()"
        >
            <svg :class="$style.icon">
                <use xlink:href="#icon-play" v-if="!isPlaying" />
                <use xlink:href="#icon-pause" v-if="isPlaying" />
            </svg>
        </button>
        <picture>
            <source :srcset="src.webp" type="image/webp" />
            <source :srcset="src.png" type="image/png" />
            <img 
                :src="src.png"
                :alt="altText"
                :class="$style.coverPhoto" 
                loading="lazy" 
            />
        </picture>
    </div>
</template>

<style lang="scss" module>
.container {
    position: relative;
}

.imageControlContainer {
    color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    &:hover, &:focus-visible {
        color: #fff;

        &:after {
            content: '';
            background-color: #000;
            opacity: 0.5;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }
}

.icon {
    position: relative;
    z-index: 1;
    max-width: 67%;
}
</style>

<script>
export default {
    props: {
        src: {
            type: Object,
            required: true,
        },
        isPlaying: {
            type: Boolean,
            required: true,
        },
        packTitle: {
            type: String,
            required: true,
        },
    },
    computed: {
        altText(){
            return `${this.packTitle} cover image`;
        },
    },
    methods: {
        clicked(){
            this.$emit('controlsClicked');
        },
    }
};
</script>