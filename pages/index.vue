<template>
    <main id="home">
        <Search/>
        <Sort name="years"/>
        <Sort name="types"/>
        <section id="films">
            <div class="wrapper" ref="films">
                <ul v-if="films.length > 0">
                    <li :key="film.id" :style="`background-image: url('${getImgUrl({name: film.backdrop_path, imageSize: 0})}')`" @mouseenter="hover($event, 'in')" @mouseleave="hover($event, 'out')" class="film" v-for="film in films">
                        <div class="filter"/>
                        <div class="left">
                            <img :alt="film.title" :src="`${getImgUrl({name: film.poster_path, imageSize: 1})}`">
                        </div>
                        <div class="right">
                            <p class="title" v-html="film.title"/>
                            <p class="date" v-html="getDate(film.release_date)"/>
                        </div>
                    </li>
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
    import {gsap} from 'gsap';
    import {imgOptions} from "../mixins/generalMixin";
    import Genres from "../components/common/Genres";
    import Years from "../components/common/Years";
    import moment from 'moment'
    import Sort from "../components/common/Sort";

    export default {
        name: 'index',
        components: {Sort, Years, Genres, Search, Loader},
        mixins: [imgOptions],
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
            },
            hover(e, type) {
                if (type === 'in') {
                    gsap.timeline()
                        .to(e.target.querySelector('.filter'), .6, {
                            x: 0
                        })
                        .to(e.target.querySelector('.left img'), .5, {
                            y: 0,
                            opacity: 1
                        }, "-=.4")
                        .to(e.target.querySelector('.right .title'), .2, {
                            y: 0,
                            opacity: 1
                        }, "-=.2")
                        .to(e.target.querySelector('.right .date'), .2, {
                            y: 0,
                            opacity: 1
                        }, "-=.1")

                } else if (type === 'out') {
                    gsap.timeline()
                        .to(e.target.querySelector('.filter'), .6, {
                            x: '-100%'
                        })
                        .to(e.target.querySelector('.right .date'), .2, {
                            y: -20,
                            opacity: 0
                        }, "-=.5")
                        .to(e.target.querySelector('.right .title'), .2, {
                            y: -20,
                            opacity: 0
                        }, "-=.3")
                        .to(e.target.querySelector('.left img'), .5, {
                            y: -20,
                            opacity: 0
                        }, "-=.3")
                }
            },
            getDate(date) {
                return moment(date).format('LL')
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
                    li {
                        display             : flex;
                        width               : 50%;
                        height              : 25vw;
                        position            : relative;
                        background-size     : cover;
                        background-position : center;
                        padding             : 2.5vw;
                        box-sizing          : border-box;
                        overflow            : hidden;
                        .filter {
                            content    : '';
                            position   : absolute;
                            left       : 0;
                            top        : 0;
                            width      : 100%;
                            height     : 100%;
                            background : linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, .8) 100%);
                            transform  : translateX(-100%);
                        }
                        .left, .right {
                            display  : flex;
                            flex     : 1;
                            height   : 100%;
                            position : relative;
                            z-index  : 5;
                        }
                        .left {
                            img {
                                height        : 100%;
                                margin        : auto;
                                border-radius : 10px;
                                box-shadow    : 0 0 10px 0 rgba(0, 0, 0, 0.5);
                                opacity       : 0;
                                transform     : translateY(-20px);
                            }
                        }
                        .right {
                            flex-direction  : column;
                            align-items     : center;
                            justify-content : center;
                            text-align      : center;
                            p {
                                opacity   : 0;
                                transform : translateY(-20px);
                            }
                            .title {
                                text-transform : uppercase;
                                font-weight    : 700;
                                letter-spacing : 1px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
