<template>
    <div :class="$style.container">
        <a :href="reasonPlusUrl">Open in Reason+</a>
    </div>
</template>

<style lang="scss" module>
.container{

}
</style>

<script>
export default {
    props: {
        packId: {
            type: Number,
            required: true,
        },
    },
    computed: {
        reasonPlusUrl(){
            return `rslaunch://packs/${this.packId}`;
        },
    },
};
</script>