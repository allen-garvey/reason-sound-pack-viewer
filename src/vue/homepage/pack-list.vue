<template>
    <div :class="$style.container">
        <ul :class="$style.packList">
            <li 
                v-for="pack in packs" 
                :key="pack.id"
                :class="$style.pack"
            >
                <div :class="$style.imageContainer">
                    <div
                        :class="$style.imageControlContainer"
                        @click="packClicked(pack)"
                    >
                        <svg :class="$style.icon">
                            <use xlink:href="#icon-play" v-if="!isPackPlaying(pack.id)" />
                            <use xlink:href="#icon-pause" v-if="isPackPlaying(pack.id)" />
                        </svg>
                    </div>
                    <img 
                        :src="pack.coverPhoto" 
                        :class="$style.coverPhoto" 
                        loading="lazy" 
                    />
                </div>
                <div :class="$style.packTitle">
                    <router-link :to="{name: 'show', params: {id: pack.id}}">{{ pack.title }}</router-link>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" module>
    $image-dimensions: 150px;

    .container {
        
    }

    .packList {
        display: flex;
        flex-wrap: wrap;
    }
    
    .pack {
        margin: 0 0 20px;
        width: $image-dimensions;
    }

    .packTitle {
        padding: 0 1em;
        text-align: center;
    }

    .imageContainer {
        position: relative;
        height: $image-dimensions;

        &:hover {
            .imageControlContainer {
                display: flex;
            }
        }
    }

    .imageControlContainer {
        color: #fff;
        display: none;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

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

    .icon {
        position: relative;
        z-index: 1;
        max-width: 67%;
    }
</style>
<script>
export default {
    props: {
        packs: {
            type: Array,
            required: true,
        },
        isPackPlaying: {
            type: Function,
            required: true,
        },
    },
    components: {
    },
    computed: {
    },
    methods: {
        packClicked(pack){
            this.$emit('packClicked', pack.id);
        }
    }
};
</script>