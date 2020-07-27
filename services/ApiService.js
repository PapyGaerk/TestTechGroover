import axios from 'axios';

const apiUrl = 'https://pokeapi.co/api/v2/',
    apiClient = axios.create({
        baseURL: apiUrl
    });

export default {
    /**
     * Remonte tout les pokemons
     * @param {Number} limit - La limite maximum d'élément à retourner
     * @param {Number|Boolean} offset - A partir de quel pokemon on doit se limiter
     * @returns {Promise<AxiosResponse<T>>}
     */
    async getPokemons(limit, offset = false) {
        return apiClient.get(`pokemon?limit=${limit}&offset=${offset}`);
    },
    /**
     * Remonte un pokemon
     * @param {Number|Boolean} pokemonID - L'ID du Pokemon
     * @param {String|Boolean} url - L'url direct du Pokemon
     * @returns {Promise<AxiosResponse<T>>}
     */
    getPokemon(pokemonID, url = false) {
        return apiClient.get(url ? url : `pokemon/${pokemonID}`)
    },

    /**
     * Remonte les types des pokemons
     * @returns {Promise<AxiosResponse<T>>}
     */
    getTypes() {
        return apiClient.get(`type`);
    },

    /**
     * Remonte les natures des pokemons
     * @returns {Promise<AxiosResponse<T>>}
     */
    getNatures() {
        return apiClient.get(`nature`);
    }
}