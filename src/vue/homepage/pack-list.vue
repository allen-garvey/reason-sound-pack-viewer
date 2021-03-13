<template>
    <div :class="$style.container">
        <ul>
            <li v-for="pack in packs" :key="pack.id">
                <div>{{ pack.name }}</div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" module>
    .container {
        background-color: red;
    }
</style>
<script>
export default {
    props: {
        packs: {
            type: Array,
            required: true,
        }
    },
    components: {
    },
    computed: {
    },
    methods: {
    }
};
</script>