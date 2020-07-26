<template>
    <main id="home">
        <ul class="pokemons">
            <li v-for="pokemon in pokemons">
                <p v-html="pokemon.name"/>
                <img :alt="pokemon.name" :src="pokemon.sprites.front_default">
            </li>
        </ul>
    </main>
</template>

<script>
    import apiService from '@/services/ApiService.js'

    // https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png

    export default {
        name: 'index',
        async asyncData() {
            const {data} = await apiService.getPokemons(25);

            for (let i = 0; i < data.results.length; i++) {
                const pokemonDetails = await apiService.getPokemon(false, data.results[i].url);
                data.results[i] = pokemonDetails.data;
            }

            return {
                pokemons: data.results
            }
        },
        mounted() {
            console.log(this.pokemons[0]);
        }
    }
</script>

<style lang="scss">
</style>
