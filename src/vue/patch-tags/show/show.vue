<template>
<div class="container">
    <header class="header">
        <site-title></site-title>
    </header>
    <main :class="$style['main']">
        <ul>
            <li
                v-for="patch in patches"
                :key="patch.id"
                :class="$style.item"
            >
                {{ patch.name }}
            </li>
        </ul>
    </main>
</div>
</template>

<style lang="scss" module>
.main {
    margin-top: 1.5rem;
	padding-bottom: 10em;
}

.item {
    margin: 0 0 1em;
}
</style>

<script>
import SiteTitle from '../../common/site-title.vue';

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
        SiteTitle,
    },
    data(){
        return {
        };
    },
    computed: {
        patches(){
            const patchKey = this.$route.params.id;

            return Object.keys(this.packsMap).map((packKey) => this.packsMap[packKey].patches.filter(patch => patch.tags.has(patchKey))).flat();
        },
    },
    methods: {

    },
};
</script>