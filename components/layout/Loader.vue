<template>
    <div class="loader">
        <img :src="require('@/assets/img/pokeball.png')" alt="Loader">
    </div>
</template>

<script>
    export default {
        name: "Loader"
    }
</script>

<style lang="scss" scoped>
    .loader {
        max-width  : 80%;
        width      : 5rem;
        display    : flex;
        margin     : auto;
        padding    : 1rem 0;
        box-sizing : border-box;
        animation  : 1s roll .2s infinite ease-in;
        position   : fixed;
        bottom     : 0;
        left       : 50%;
        img {
            width : 100%;
        }
        @keyframes roll {
            0%, 100% {
                transform : translateX(-50%) scale(1) rotate(0);
            }
            40%, 60% {
                transform : translateX(-50%) scale(1.2) rotate(360deg);
            }
        }
    }
</style>