<template>
    <div :class="$style.container">
        <ul :class="$style.packList">
            <li 
                v-for="pack in packs" 
                :key="pack.id"
                :class="$style.pack"
            >
                <img 
                    :src="pack.coverPhoto" 
                    :class="$style.coverPhoto" 
                    loading="lazy" 
                    @click="packClicked(pack)"
                />
                <div :class="$style.packTitle">
                    <router-link :to="{name: 'show', params: {id: pack.id}}">{{ pack.title }}</router-link>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" module>
    .container {
        
    }

    .packList {
        display: flex;
        flex-wrap: wrap;
    }
    
    .pack {
        margin: 0 0 20px;
        width: 150px;
    }

    .packTitle {
        padding: 0 1em;
        text-align: center;
    }

    .coverPhoto {
        
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
        packClicked(pack){
            this.$emit('packClicked', pack.id);
        }
    }
};
</script>