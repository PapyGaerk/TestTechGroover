<template>
    <section id="search">
        <div class="wrapper">
            <form>
                <div class="form-group">
                    <label for="film-search" v-html="`Rechercher`"/>
                    <input autocomplete="off" id="film-search" name="film-search" type="text" v-model="filmSearch">
                </div>
            </form>
            <div id="search-results" v-if="searchWord">
                <div class="wrapper">
                    <ul v-if="filmsSearched && filmsSearched.length > 0">
                        <li :key="film.id" class="film" v-for="film in filmsSearched" v-if="film.poster_path">
                            <div :style="`background-image: url('${getImgUrl({name: film.poster_path, imageSize: 1})}')`" class="img"/>
                        </li>
                    </ul>
                    <p class="no-result" v-else v-html="`C'est étrange, aucun film ne semble correspondre à votre recherche.`"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapState} from 'vuex';
    import {imgOptions} from '../../mixins/generalMixin';

    export default {
        name: "Search",
        mixins: [imgOptions],
        computed: {
            ...mapState({
                filmsSearched: state => state.films.filmsSearched,
                searchWord: state => state.search.searchWord
            }),
            filmSearch: {
                get() {
                    return this.$store.state.search.searchWord
                },
                set(value) {
                    this.$store.dispatch('films/fetchFilmSearched', value);
                    this.$store.commit('search/SET_SEARCHED_WORD', value);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #search {
        padding : 2rem;
        & > .wrapper {
            width    : 50%;
            position : relative;
            margin   : auto;
            form {
                display        : flex;
                flex-direction : column;
                .form-group {
                    align-items    : center;
                    text-transform : uppercase;
                    label {
                        margin-bottom : 1rem;
                    }
                    input, button {
                        background     : transparent;
                        border         : 1px solid white;
                        height         : 2rem;
                        border-radius  : 15px;
                        padding        : .5rem 1rem;
                        box-sizing     : border-box;
                        color          : white;
                        width          : 100%;
                        text-transform : uppercase;
                        &:focus {
                            outline : none;
                        }
                    }
                    button {
                        width       : 50%;
                        margin      : 1rem auto 0;
                        transition  : all .15s ease-in;
                        cursor      : pointer;
                        font-weight : 700;
                        &:hover {
                            background-color : white;
                            color            : $primary;
                        }
                    }
                }
            }
        }
        #search-results {
            display    : flex;
            flex-wrap  : wrap;
            background : white;
            box-shadow : 0 15px 20px 4px rgba(0, 0, 0, 0.5);
            position   : absolute;
            z-index    : 50;
            top        : 5.25rem;
            left       : 50%;
            width      : calc(100% - 2rem);
            transform  : translateX(-50%);
            max-height : 65vh;
            overflow   : auto;
            .wrapper {
                padding : 0;
                ul {
                    display   : flex;
                    width     : 100%;
                    flex-wrap : wrap;
                    li {
                        width       : calc(100% / 3);
                        padding-top : 49%;
                        overflow    : hidden;
                        position    : relative;
                        .img {
                            transition          : all .15s ease-in;
                            width               : 100%;
                            height              : 100%;
                            left                : 0;
                            position            : absolute;
                            top                 : 0;
                            background-size     : cover;
                            background-position : center;
                            &:hover {
                                transform : scale(1.1);
                            }
                        }
                        @media screen and (max-width : 920px) {
                            width       : calc(100% / 2);
                            padding-top : 75%;
                        }
                    }
                }
                .no-result {
                    color     : black;
                    padding   : 1rem;;
                    font-size : .8rem;
                }
            }
        }
    }
</style>