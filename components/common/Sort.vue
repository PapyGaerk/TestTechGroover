<template>
    <section :id="name">
        <div class="wrapper">
            <ul>
                <li :class="[sortedYear === dates.end - i ? classNameSelected : '']" :key="i" @click="sort(dates.end - i)" v-for="i in (dates.end - dates.start)" v-html="dates.end - i" v-if="name === 'years'"/>
                <li :class="[sortedGenre === genre.id ? classNameSelected : '']" @click="sort(genre.id)" v-for="genre in genres" v-html="genre.name" v-if="name === 'types'"/>
            </ul>
        </div>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    import moment from 'moment'

    export default {
        name: "Sort",
        data() {
            return {
                classNameSelected: 'active',
                dates: {
                    start: 1960,
                    end: moment().add(1, 'y').year()
                }
            }
        },
        props: {
            name: {
                type: String,
                validator: (val) => {
                    const accepted = ['types', 'years'];
                    return accepted.indexOf(val) !== -1
                }
            }
        },
        methods: {
            sort(val) {
                if (this.name === 'types') {
                    this.$store.commit('films/SET_SORTED_GENRE', this.sortedGenre !== val ? val : '');
                } else if (this.name === 'years') {
                    this.$store.commit('films/SET_SORTED_YEAR', this.sortedYear !== val ? val : '');
                }

                this.$store.commit('films/RESET_PAGE');
                this.$store.commit('films/SORT_FILMS');
            },
            test(test) {
                console.log(test)
            }
        },
        computed: {
            ...mapState({
                genres: state => state.films.genres,
                sortedGenre: state => state.films.sortedGenre,
                sortedYear: state => state.films.sortedYear
            })
        }
    }
</script>

<style lang="scss" scoped>
    section {
        .wrapper {
            ul {
                display       : flex;
                border-radius : 5px;
                li {
                    cursor : pointer;
                    &.active {
                        background : white;
                        color      : $primary;
                    }
                }
            }
        }
        &#types {
            .wrapper {
                ul {
                    flex-wrap : wrap;
                    li {
                        padding       : .25rem 1rem;
                        border        : 1px solid white;
                        margin-bottom : .5rem;
                        transition    : all .15s ease-in;
                        &:not(:last-child) {
                            margin-right : 1rem;
                        }
                    }
                }
            }
        }
        &#years {
            .wrapper {
                ul {
                    overflow : auto;
                    li {
                        padding : 0 .25rem;
                        margin  : 0 .25rem;
                    }
                }
            }
        }
    }
</style>