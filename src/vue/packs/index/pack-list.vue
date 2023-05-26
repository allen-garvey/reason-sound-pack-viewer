<template>
    <div>
        <template v-if="isLoaded">
            <ul :class="$style.packList">
                <li 
                    v-for="pack in packsVisible" 
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
            <infinite-observer :on-trigger="loadMorePacks" />
        </template>
    </div>
</template>

<style lang="scss" module>
    $image-dimensions: 150px;

    .packList {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 20px 10px;
    }
    
    .pack {
        width: $image-dimensions;
    }

    .packTitle {
        font-size: 1.125rem;
        margin-top: 0.5em;
        padding: 0 0.25em;
        text-align: center;
    }

    .imageContainer {
        height: $image-dimensions;
    }

    $pack-mobile-right-margin: 28px;

    @media screen and (max-width: 668px) {
        .packList {
            justify-content: center;
            margin-right: -1 * $pack-mobile-right-margin;
        }

        .pack {
            margin-right: $pack-mobile-right-margin;
        }
    }
</style>
<script>
import { nextTick } from 'vue';

import CoverImage from '../../common/cover-image.vue';
import InfiniteObserver from '../../common/infinite-observer.vue';

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
        InfiniteObserver,
    },
    data(){
        return {
            isLoaded: false,
            packsEndIndex: 0,
            packChunkSize: 0,
        };
    },
    computed: {
        packsVisible(){
            return this.packs.slice(0, this.packsEndIndex);
        }
    },
    watch: {
        '$route'(to, from){
            nextTick().then(() => {
                this.setup();
            });
        }
    },
    created(){
        this.setup();
    },
    methods: {
        setup(){
            this.isLoaded = false;
            this.setChunkSize();
            this.packsEndIndex = this.packChunkSize;

            nextTick().then(() => {
                this.isLoaded = true;
            });
        },
        setChunkSize(){
            if(window.innerWidth <= 366){
                this.packChunkSize = 6;
            }
            else if(window.innerWidth <= 544){
                this.packChunkSize = 12;
            }
            else{
                this.packChunkSize = 28;
            }
        },
        packClicked(pack){
            this.$emit('packClicked', pack.id);
        },
        increasePacks(){
            this.packsEndIndex = Math.min(this.packs.length, this.packsEndIndex + this.packChunkSize);
        },
        loadMorePacks({loaded, complete}){
            this.increasePacks();
            
            if(this.packsEndIndex === this.packs.length){
                complete();
            }
            else{
                loaded();
            }
        },
    }
};
</script>