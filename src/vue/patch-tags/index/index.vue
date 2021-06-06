<template>
<div class="container">
    <header class="header">
        <site-title></site-title>
    </header>
    <main :class="$style['main']">
        <ul>
            <li
                v-for="tag in tags"
                :key="tag"
                :class="$style.item"
            >
                <router-link :to="{name: 'patchTagsShow', params: {id: tag}}">{{ tag }}</router-link>
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
        patchTagsSet: {
            type: Set,
            required: true,
        },
    },
    components: {
        SiteTitle,
    },
    computed: {
        tags(){
            return Array.from(this.patchTagsSet.entries()).map(([key, dupKey]) => key).sort();
        },
    },
};
</script>