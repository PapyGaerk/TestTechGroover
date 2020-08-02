import apiService from '@/services/ApiService.js';

export const state = () => ({
    films: [],
    filmsSearched: [],
    page: 1,
    pageIncrement: 1,
    genres: [],
    sortedGenre: ''
});

export const mutations = {
    SET_FILMS(state, films) {
        state.films = state.films.concat(films);
    },
    SET_FILMS_SEARCHED(state, films) {
        state.filmsSearched = films;
    },
    INCREMENT_PAGE(state) {
        state.page += state.pageIncrement;
    },
    SET_GENRES(state, genres) {
        state.genres = genres;
    },
    SET_SORTED_GENRE(state, genre) {
        state.sortedGenre = genre;
    }
};

export const actions = {
    async fetchFilms({commit, state}) {
        // commit('IS_LOADING', true);
        const {data} = await apiService.getFilms(state.page);

        commit('INCREMENT_PAGE');
        commit('SET_FILMS', data.results);
        // commit('IS_LOADING', false);
    },
    async fetchFilmSearched({commit}, search) {
        const {data} = await apiService.getFilm(search);

        commit('SET_FILMS_SEARCHED', data.results && data.results.length > 0 ? data.results : []);
    },
    async fetchGenres({commit}) {
        const {data} = await apiService.getGenres();

        commit('SET_GENRES', data.genres);
    }
};