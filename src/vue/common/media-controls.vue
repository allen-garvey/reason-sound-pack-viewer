<template>
    <div :class="$style.container">
        {{ title }}
    </div>
</template>

<style lang="scss" module>
    .container {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2em;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #541604;
        color: #fff;
    }
</style>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    data(){
        return {
        };
    },
    computed: {
    },
    methods: {
    }
};
</script>