<template>
    <Nuxt v-if="!isLoading"/>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        beforeCreate() {
            this.$store.dispatch('films/fetchGenres');
        },
        beforeMount() {
            this.isWebpSupported()
        },
        methods: {
            async isWebpSupported() {
                // https://developers.google.com/speed/webp/faq
                const feature = 'lossy',
                    kTestImages = {
                        lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
                        lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
                        alpha: 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
                        animation: 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA'
                    },
                    img = new Image();
                img.onload = () => {
                    this.$store.commit('general/IS_WEBP_SUPPORTED', true);
                    this.$store.commit('general/IS_LOADING', false)
                };
                img.onerror = () => {
                    this.$store.commit('general/IS_WEBP_SUPPORTED', false);
                    this.$store.commit('general/IS_LOADING', false)
                };
                img.src = 'data:image/webp;base64,' + kTestImages[feature]
            }
        },
        computed: {
            ...mapState({
                isLoading: (state) => state.general.isLoading
            })
        }
    }
</script>