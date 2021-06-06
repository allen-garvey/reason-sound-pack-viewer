<template>
<div>
    <h2>Creators</h2>
    <ul>
        <li
            v-for="creator in creators"
            :key="creator"
            :class="$style.item"
        >
            {{ creator }}
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
        packsMap: {
            type: Object,
            required: true,
        },
    },
    computed: {
        creators(){
            const creatorsSet = new Set();

            Object.keys(this.packsMap)
                .forEach((packKey) => {
                    const pack = this.packsMap[packKey];
                    creatorsSet.add(pack.author);
            });
            return Array.from(creatorsSet.entries()).map(([key, dupKey]) => key).sort();
        },
    },
};
</script>