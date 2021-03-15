<template>
<div class="container">
    <header class="header">
        <site-title></site-title>
    </header>
    <main :class="$style['main']">
        <h2>{{ pack.title }}</h2>
        <img 
            :src="pack.coverPhoto" 
            :class="$style.coverPhoto" 
        />
        <p>{{ pack.author }}</p>
        <p>{{ pack.description }}</p>
        <ul>
            <li 
                v-for="patch in pack.patches" 
                :key="patch.id"
            >
                <span @click="patchClicked(patch)">{{ patch.name }}</span>
            </li>
        </ul>
    </main>
</div>
</template>

<style lang="scss" module>
.main{
	padding-bottom: 10em;
}

.coverPhoto {
    width: 300px;
}
</style>

<script>
import { AUDIO_PREVIEW_URL_PREFIX } from '../../jukebox.js';
import SiteTitle from '../common/site-title.vue';

export default {
    props: {
        packsMap: {
            type: Object,
            required: true,
        },
    },
    components: {
        SiteTitle,
    },
    data(){
        return {
        };
    },
    computed: {
        pack(){
            return this.packsMap[this.$route.params.id];
        },
    },
    methods: {
        patchClicked(patch){
            this.$emit('audioStart', {
                url: `${AUDIO_PREVIEW_URL_PREFIX}${patch.previewUrl}`,
                title: `${this.pack.title} - ${patch.name}`,
            });
        },
    },
};
</script>