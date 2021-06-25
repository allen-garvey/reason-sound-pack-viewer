<template>
    <div :class="$style.container">
        <ul :class="$style.packList">
            <li 
                v-for="pack in packs" 
                :key="pack.id"
                :class="$style.pack"
            >
                <cover-image
                    :class="$style.imageContainer"
                    :is-playing="isPackPlaying(pack.id)"
                    :src="pack.coverPhoto"
                    :pack-title="pack.title"
                    @controls-clicked="packClicked(pack)"
                 />
                <div :class="$style.packTitle">
                    <router-link :to="{name: 'packsShow', params: {id: pack.id}}">{{ pack.title }}</router-link>
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
        justify-content: space-between;
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
        height: $image-dimensions;
    }
</style>
<script>
import CoverImage from '../../common/cover-image.vue';

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
        CoverImage,
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