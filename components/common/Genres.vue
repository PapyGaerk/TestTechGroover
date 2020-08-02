<template>
    <section id="genres">
        <div class="wrapper">
            <ul ref="genres">
                <li :class="{active: sortedGenre === genre.name}" @click="setActives(genre.name)" v-for="genre in genres" v-html="genre.name"/>
            </ul>
        </div>
    </section>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "Genres",
        methods: {
            setActives(genre) {
                this.$store.commit('films/SET_SORTED_GENRE', genre);
            }
        },
        computed: {
            ...mapState({
                genres: state => state.films.genres,
                sortedGenre: state => state.films.sortedGenre
            })
        }
    }
</script>

<style lang="scss" scoped>
    #genres {
        .wrapper {
            ul {
                display   : flex;
                flex-wrap : wrap;
                li {
                    padding       : .25rem 1rem;
                    border        : 1px solid white;
                    margin-bottom : .5rem;
                    border-radius : 5px;
                    cursor        : pointer;
                    transition    : all .15s ease-in;
                    &:not(:last-child) {
                        margin-right : 1rem;
                    }
                    &.active {
                        background : white;
                        color      : $primary;
                    }
                }
            }
        }
    }
</style>