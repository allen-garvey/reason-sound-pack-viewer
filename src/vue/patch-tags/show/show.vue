<template>
<div>
    <h2>{{ patchKey }} <span :class="$style.patchCount">({{ patches.length }})</span></h2>
    <patch-list 
        :patches="patches"
        :media-id="mediaId"
        :get-pack="getPackForPatch"
        :should-show-pack-link="true"
        @audio-start="bubbleAudioStart"
        @audio-stop="bubbleAudioStop"
    />
</div>
</template>

<style lang="scss" module>
.patchCount {
    font-size: 0.57em;
    vertical-align: super;
}

</style>

<script>
import bubbleAudioEventsMixinBuilder from '../../mixins/bubble-audio-events';
import PatchList from '../../common/patch-list.vue';

export default {
    props: {
        packsMap: {
            type: Object,
            required: true,
        },
        mediaId: {
            required: true,
        },
    },
    components: {
        PatchList,
    },
    mixins: [bubbleAudioEventsMixinBuilder()],
    data(){
        return {
        };
    },
    computed: {
        patchKey(){
            return this.$route.params.id;
        },
        patches(){
            return Object.keys(this.packsMap)
                .map((packKey) => {
                    const pack = this.packsMap[packKey];
                    return pack.patches
                    .filter(patch => patch.tags.has(this.patchKey))
                    .map(patch => {
                        patch.packId = pack.id;
                        return patch;
                    })
                }).flat();
        },
    },
    methods: {
        getPackForPatch(patch){
            return this.packsMap[patch.packId];
        },
    },
};
</script>