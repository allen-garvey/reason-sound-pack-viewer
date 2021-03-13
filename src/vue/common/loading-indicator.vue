<template>
    <div :class="$style['loading-container']">
        <div :class="$style['loading-message']">Loading&hellip;</div>
        <div :class="$style['loader']"></div>
    </div>
</template>

<style lang="scss" module>
    .loading-container{
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .loading-message{
        margin-bottom: 1em;
    }

    /*
    * Loading icon
    * based on: https://www.w3schools.com/howto/howto_css_loader.asp
    */
    .loader {
        border: 4px solid #c8e2f4; /* Lighter blue */
        border-top: 4px solid dodgerblue; /* Blue */
        border-radius: 50%;
        width: 32px;
        height: 32px;
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>

<script>
export default {};
</script>