<template>
<div>
    <h2>{{ title }}</h2>
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
    margin: 0 0 1em;
}
</style>

<script>
export default {
    props: {
        // From app.vue
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
};
</script>