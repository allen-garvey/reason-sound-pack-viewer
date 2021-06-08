<template>
    <span :class="$style.count">({{ count }})</span>
</template>

<style lang="scss" module>
.count {
    font-size: 0.57em;
    vertical-align: super;
}
</style>

<script>
export default {
    props: {
        count: {
            type: Number,
            required: true,
        }
    },
};
</script>