<template>
    <span :class="$style.mediaTitle">
        <template v-if="shouldShowTitle">
            <router-link :to="{name: 'packsShow', params: {id: title.packId}}">{{ title.packTitle }}</router-link>{{ subtitle }}
        </template>
        <template v-else>
            {{ message }}
        </template>
    </span>
</template>

<style lang="scss" module>
    .mediaTitle {
        a {
            color: #fff;
        }
    }
</style>

<script>
export default {
    props: {
        title: {
            type: Object,
        },
    },
    computed: {
        subtitle(){
            if(this.title.subtitle){
                return ` - ${this.title.subtitle}`;
            }
            return '';
        },
        shouldShowTitle(){
            return !!this.title && !this.title.message;
        },
        message(){
            return this.title?.message || '';
        },
    },
};
</script>