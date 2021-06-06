<template>
<ul>
    <li
        v-for="tag in tags"
        :key="tag"
        :class="$style.item"
    >
        <router-link :to="{name: 'patchTagsShow', params: {id: tag}}">{{ tag }}</router-link>
    </li>
</ul>
</template>

<style lang="scss" module>
.item {
    margin: 0 0 1em;
}
</style>

<script>
export default {
    props: {
        patchTagsSet: {
            type: Set,
            required: true,
        },
    },
    computed: {
        tags(){
            return Array.from(this.patchTagsSet.entries()).map(([key, dupKey]) => key).sort();
        },
    },
};
</script>