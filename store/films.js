import apiService from '@/services/ApiService.js';
import moment from 'moment'

export const state = () => ({
    films: [],
    filmsStocked: [],
    filmsSearched: [],
    page: 1,
    pageStocked: 1,
    pageIncrement: 1,
    genres: [],
    sortedGenre: '',
    sortedYear: ''
});

export const mutations = {
    SET_FILMS(state, films) {
        state.films = (state.page - 1) === 1 ? films : state.films.concat(films);
        if (!state.sortedGenre && !state.sortedYear) {
            state.filmsStocked = state.films;
            state.pageStocked = state.page;
        }
    },
    SORT_FILMS(state) {
        state.films = state.filmsStocked.filter((film) => {
            const isGenre = film.genre_ids.includes(state.sortedGenre),
                isYear = moment(film.release_date).format('YYYY') === state.sortedYear.toString();

            if (state.sortedGenre && !state.sortedYear) {
                return isGenre;
            } else if (!state.sortedGenre && state.sortedYear) {
                return isYear;
            } else if (state.sortedGenre && state.sortedYear) {
                return isGenre && isYear;
            } else if (!state.sortedGenre && !state.sortedYear) {
                return true
            }
        });

        if (!state.sortedGenre && !state.sortedYear) {
            state.page = state.pageStocked;
        }

        if (state.films.length < 5) {
            this.dispatch('films/fetchFilms')
        }
    },
    SET_FILMS_SEARCHED(state, films) {
        state.filmsSearched = films;
    },
    RESET_PAGE(state) {
        state.page = 1;
    },
    INCREMENT_PAGE(state) {
        state.page += state.pageIncrement;
    },
    SET_GENRES(state, genres) {
        state.genres = genres;
    },
    SET_SORTED_GENRE(state, genre) {
        state.sortedGenre = genre;
    },
    SET_SORTED_YEAR(state, year) {
        state.sortedYear = year;
    }
};

export const actions = {
    async fetchFilms({commit, state}) {
        // commit('IS_LOADING', true);
        const {data} = await apiService.getFilms({page: state.page, genre: state.sortedGenre, year: state.sortedYear});

        commit('INCREMENT_PAGE');
        commit('SET_FILMS', data.results);
        // commit('IS_LOADING', false);
    },
    async fetchFilmSearched({commit}, search) {
        const {data} = await apiService.getFilm(search);

        commit('SET_FILMS_SEARCHED', data && data.results && data.results.length > 0 ? data.results : []);
    },
    async fetchGenres({commit}) {
        const {data} = await apiService.getGenres();

        commit('SET_GENRES', data.genres);
    }
};