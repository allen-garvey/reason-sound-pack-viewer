<template>
<div>
    <h2>Pack Tags</h2>
    <ul>
        <li
            v-for="tag in tags"
            :key="tag"
            :class="$style.item"
        >
            <router-link :to="{name: 'packTagsShow', params: {id: tag}}">{{ tag }}</router-link>
        </li>
    </ul>
</div>
</template>

<style lang="scss" module>
.item {
    margin: 0 0 1em;
}
</style>

<script>
export default {
    props: {
        packTagsSet: {
            type: Set,
            required: true,
        },
    },
    computed: {
        tags(){
            return Array.from(this.packTagsSet.entries()).map(([key, dupKey]) => key).sort();
        },
    },
};
</script>