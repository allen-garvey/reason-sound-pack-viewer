<template>
    <div>
        <h2>{{ title }} <items-count :count="patches.length" /></h2>
        <patch-list
            :patches="patches"
            :media-id="mediaId"
            :get-pack="getPackForPatch"
            :should-show-pack-link="true"
            :should-show-reason-plus-link="true"
            :play-state="playState"
            @audio-start="bubbleAudioStart"
            @audio-stop="bubbleAudioStop"
        />
    </div>
</template>

<style lang="scss" module></style>

<script>
import bubbleAudioEventsMixinBuilder from '../mixins/bubble-audio-events.js';
import PatchList from './patch-list.vue';
import ItemsCount from './items-count.vue';

export default {
    props: {
        // From app.vue
        packsMap: {
            type: Object,
            required: true,
        },
        patchTagsMap: {
            type: Map,
            required: true,
        },
        patchDevicesMap: {
            type: Map,
            required: true,
        },
        mediaId: {
            required: true,
        },
        playState: {
            type: Number,
            required: true,
        },
        // From route
        title: {
            type: String,
            required: true,
        },
        getPatches: {
            type: Function,
            required: true,
        },
    },
    components: {
        PatchList,
        ItemsCount,
    },
    mixins: [bubbleAudioEventsMixinBuilder()],
    computed: {
        patches() {
            return this.getPatches();
        },
    },
    methods: {
        getPackForPatch(patch) {
            return this.packsMap[patch.packId];
        },
    },
};
</script>
