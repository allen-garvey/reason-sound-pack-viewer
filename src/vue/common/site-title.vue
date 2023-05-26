<template>
    <h1 :class="$style['title']">
        <router-link :to="{name: 'home'}">{{ title }}</router-link>
    </h1>
</template>

<style lang="scss" module>
.title{
    margin: 1.2rem 0 0;

    a{
        color: #000;
    }
}
</style>

<script>
import { siteTitle } from '../models/site.js';

export default {
    computed: {
        title(){
            return siteTitle;
        }
    }
};
</script>