<template>
    <section id="years">
        <div class="wrapper">
            <ul>
                <li :class="{active: sortedYear === dates.end - i}" :key="i" @click="setActives(dates.end - i)" v-for="i in (dates.end - dates.start)" v-html="dates.end - i"/>
            </ul>
        </div>
    </section>
</template>
<script>
    import {mapState} from 'vuex'
    import moment from 'moment'

    export default {
        name: "Years",
        data() {
            return {
                dates: {
                    start: 1960,
                    end: moment().add(1, 'y').year()
                }
            };
        },
        methods: {
            setActives(year) {
                this.$store.commit('films/SET_SORTED_YEAR', this.sortedYear !== year ? year : '');
                this.$store.commit('films/RESET_PAGE');
                this.$store.dispatch('films/fetchFilms');
            }
        },
        computed: {
            ...mapState({
                sortedYear: state => state.films.sortedYear
            })
        }
    }
</script>

<style lang="scss" scoped>
    #years {
        .wrapper {
            ul {
                display  : flex;
                overflow : auto;
                li {
                    padding       : 0 .25rem;
                    margin        : 0 .25rem;
                    cursor        : pointer;
                    border-radius : 5px;
                    &.active {
                        background : white;
                        color      : $primary;
                    }
                }
            }
        }
    }
</style>