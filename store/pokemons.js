import apiService from '@/services/ApiService.js';

export const state = () => ({
    pokemons: [],
    pokemonsLimit: 25,
    pokemonsOffset: 0,
    pokemonLoading: false
});

export const mutations = {
    SET_POKEMONS(state, pokemons) {
        state.pokemons = state.pokemons.concat(pokemons);
    },
    INCREMENT_OFFSET(state) {
        state.pokemonsOffset += state.pokemonsLimit;
    },
    IS_LOADING(state, loading) {
        state.pokemonLoading = loading;
    }
};

export const actions = {
    async fetchPokemons({commit, state}) {
        commit('IS_LOADING', true);
        const {data} = await apiService.getPokemons(state.pokemonsLimit, state.pokemonsOffset);

        for (let i = 0; i < data.results.length; i++) {
            const pokemonDetails = await apiService.getPokemon(false, data.results[i].url);
            data.results[i] = pokemonDetails.data;
        }

        commit('INCREMENT_OFFSET');
        commit('SET_POKEMONS', data.results);
        commit('IS_LOADING', false);
    }
};