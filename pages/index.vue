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
    import Genres from "../components/common/Genres";
    import Years from "../components/common/Years";
    import Sort from "../components/common/Sort";
    import Card from "../components/common/Card";

    export default {
        name: 'index',
        components: {Card, Sort, Years, Genres, Search, Loader},
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
            loadMoreFilms() {
                const filmsRect = this.$refs.films.querySelector('ul .film:last-child').getBoundingClientRect();

                if (filmsRect.top >= 0 && filmsRect.bottom - filmsRect.height <= window.innerHeight) {
                    if (this.inViewport !== true) {
                        this.inViewport = true;
                        this.$store.dispatch('films/fetchFilms');
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
