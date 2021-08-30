<template>
<div>
    <h2 :class="$style.title">{{ title }} <items-count :count="getItems().length" /></h2>
    <ul>
        <li
            v-for="item in getItems()"
            :key="item"
            :class="$style.item"
        >
            <router-link :to="{name: itemRouteName, params: {id: item}}">
                {{ item }}
                <items-count 
                    :count="getItemLength(item)"
                    v-if="getItemLength"
                />
            </router-link>
        </li>
    </ul>
</div>
</template>

<style lang="scss" module>
.title {
    margin-bottom: 1rem;
}
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
        creatorsMap: {
            type: Map,
            required: true,
        },
        patchTagsMap: {
            type: Map,
            required: true,
        },
        packTagsMap: {
            type: Map,
            required: true,
        },
        patchDevicesMap: {
            type: Map,
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
        getItemLength: {
            type: Function,
            default: null,
        },
    },
    components: {
        ItemsCount,
    },
};
</script>