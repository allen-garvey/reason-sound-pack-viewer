<template>
<div>
    <h2>Creators</h2>
    <ul>
        <li
            v-for="creator in creators"
            :key="creator"
            :class="$style.item"
        >
            <router-link
                :to="{name: 'creatorsShow', params: {id: creator}}"
            >
                {{ creator }}
            </router-link>
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
import { enumeratePacks } from '../../../model-helpers';

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

            enumeratePacks(this.packsMap).forEach((pack) => {
                creatorsSet.add(pack.author);
            });

            return Array.from(creatorsSet.entries()).map(([key, dupKey]) => key).sort();
        },
    },
};
</script>