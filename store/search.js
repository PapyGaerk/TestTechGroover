export const state = () => ({
    searchWord: ''
});

export const mutations = {
    SET_SEARCHED_WORD(state, word) {
        console.log(word);
        state.searchWord = word;
    }
};

export const actions = {};