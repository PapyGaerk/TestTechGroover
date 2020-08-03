<template>
    <main id="home">
        <Search/>
        <Sort name="years"/>
        <Sort name="types"/>
        <section id="films">
            <div class="wrapper" ref="films">
                <ul v-if="films.length > 0">
                    <Card :film="film" :key="film.id" v-for="film in films"/>
                </ul>
                <p v-else>Malheureusement, aucun film n'est trouvé</p>
                <!--                <Loader v-if="pokemonLoading === true"/>-->
            </div>
        </section>
    </main>
</template>

<script>
    import {mapState} from 'vuex'
    import Loader from '../components/layout/Loader.vue'
    import Search from "../components/common/Search";
    import Sort from "../components/common/Sort";
    import Card from "../components/common/Card";

    export default {
        name: 'index',
        components: {Card, Sort, Search, Loader},
        asyncData({store}) {
            return store.dispatch('films/fetchFilms');
        },
        data() {
            return {
                inViewport: false
            }
        },
        beforeMount() {
            window.addEventListener('scroll', this.loadMoreFilms);
        },
        methods: {
            /**
             * Permet de charger plus de films au scroll
             */
            loadMoreFilms() {
                const filmsRect = this.$refs.films.querySelector('ul .film:last-child').getBoundingClientRect(); // On récupère les infos du dernier éléments

                if (filmsRect.top >= 0 && filmsRect.bottom - filmsRect.height <= window.innerHeight) { // Si il rentre dans le viewport
                    if (this.inViewport !== true) {
                        this.inViewport = true; // On set une variable pour éviter de multiples appels
                        this.$store.dispatch('films/fetchFilms'); // On fait un appel API
                    }
                } else {
                    this.inViewport = false;
                }
            }
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.loadMoreFilms)
        },
        computed: mapState({
            films: state => state.films.films,
            genres: state => state.films.genres
        })

    }
</script>

<style lang="scss" scoped>
    #home {
        #films {
            .wrapper {
                padding : 0;
                ul {
                    display   : flex;
                    flex-wrap : wrap;
                }
            }
        }
    }
</style>
