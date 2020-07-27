<template>
    <main id="home">
        <ul class="pokemons" ref="pokemons">
            <li :class="['pokemon']" :style="getTypeStyleBackground(pokemon.types)" v-for="pokemon in pokemons">
                <p v-html="pokemon.name"/>
                <img :alt="pokemon.name" :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${getID(pokemon.id)}.png`">
                <Types :types="pokemon.types"/>
            </li>
        </ul>
        <Loader v-if="pokemonLoading === true"/>
    </main>
</template>

<script>
    import {mapState} from 'vuex'
    import Loader from '../components/layout/Loader.vue'
    import Types from "../components/common/Types";
    import {types} from '@/mixins/typesMixin.js';

    export default {
        name: 'index',
        mixins: [types],
        components: {Types, Loader},
        asyncData({store}) {
            return store.dispatch('pokemons/fetchPokemons');
        },
        data() {
            return {
                inViewport: false
            }
        },
        beforeMount() {
            console.log(types);
            window.addEventListener('scroll', this.loadMorePokemons);
        },
        methods: {
            loadMorePokemons() {
                const pokemonsRect = this.$refs.pokemons.querySelector('.pokemon:last-child').getBoundingClientRect();

                if (pokemonsRect.top >= 0 && pokemonsRect.bottom - pokemonsRect.height <= window.innerHeight) {
                    if (this.inViewport !== true) {
                        this.inViewport = true;
                        this.$store.dispatch('pokemons/fetchPokemons');
                    }
                } else {
                    this.inViewport = false;
                }

            },
            getID(pokemonID) {
                const pokemonLength = pokemonID.toString().length;

                if (pokemonLength === 1) {
                    pokemonID = `00${pokemonID}`
                } else if (pokemonLength === 2) {
                    pokemonID = `0${pokemonID}`
                }

                return pokemonID;
            }
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.loadMorePokemons)
        },
        computed: mapState({
            pokemons: state => state.pokemons.pokemons,
            pokemonLoading: state => state.pokemons.pokemonLoading
        })

    }
</script>

<style lang="scss" scoped>
    #home {
        display        : flex;
        flex-direction : column;
        .pokemons {
            display   : flex;
            flex-wrap : wrap;
            li {
                display         : flex;
                width           : 20%;
                height          : 20vw;
                align-items     : center;
                justify-content : center;
                flex-direction  : column;
                position        : relative;
                p {
                    text-transform : capitalize;
                }
                img {
                    position  : absolute;
                    width     : 50%;
                    top       : 50%;
                    left      : 50%;
                    transform : translate(-50%, -50%);
                }
            }
        }
    }
</style>
