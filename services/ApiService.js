import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3/',
    apiKey = '?api_key=0931480d08dd4234d51d7c56978c3ded&language=fr&region=FR',
    apiClient = axios.create({
        baseURL: apiUrl
    });

const call = (endpoint, parameters = {}) => {
    let url = apiUrl + endpoint + apiKey;
    if (Object.values(parameters).length !== 0) {
        url += '&' + Object.keys(parameters).map((name) => name + '=' + parameters[name]).join('&');
    }

    return apiClient.get(url);
};

export default {
    /**
     *
     * @param params
     * @return {Promise<AxiosResponse<T>>}
     */
    getFilms(params) {
        const {
            page = 1,
            genre,
            year
        } = params;

        let paramsCall = {
            'sort_by': 'vote_count.desc',
            'include_adult': false,
            'include_video': false,
            'page': page
        };

        if (genre) {
            paramsCall['with_genres'] = genre;
        }

        if (year) {
            paramsCall['primary_release_year'] = year;
        }

        return call('discover/movie', paramsCall);
    },
    getFilm(search) {
        if (search) {
            return call('search/movie', {
                'include_adult': false,
                'page': 1,
                'query': search
            });
        } else {
            return []
        }
    },
    getGenres() {
        return call('genre/movie/list');
    }
}