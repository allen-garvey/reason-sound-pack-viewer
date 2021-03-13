<template>
    <h1 :class="$style['site-title']">
        <router-link to="/">{{ title }}</router-link>
    </h1>
</template>

<style lang="scss" module>
.site-title{
    margin-bottom: 0;
    display: inline-block;
    padding: 0.45em 1em;
    padding-left: 0.5em;
}
.site-title a{
    color: white;
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