<template>
<div>
    <h2>{{ title }} <items-count :count="getItems().length" /></h2>
    <ul>
        <li
            v-for="item in getItems()"
            :key="item"
            :class="$style.item"
        >
            <router-link :to="{name: itemRouteName, params: {id: item}}">{{ item }}</router-link>
        </li>
    </ul>
</div>
</template>

<style lang="scss" module>
.item {
    font-size: 1.125rem;
    margin: 0 0 1em;
}
</style>

<script>
import ItemsCount from './items-count.vue';

export default {
    props: {
        // From app.vue
        packsMap: {
            type: Object,
            required: true,
        },
        patchTagsSet: {
            type: Set,
            required: true,
        },
        packTagsSet: {
            type: Set,
            required: true,
        },
        patchDevicesSet: {
            type: Set,
            required: true,
        },
        // From route
        title: {
            type: String,
            required: true,
        },
        itemRouteName: {
            type: String,
            required: true,
        },
        getItems: {
            type: Function,
            required: true,
        },
    },
    components: {
        ItemsCount,
    },
};
</script>