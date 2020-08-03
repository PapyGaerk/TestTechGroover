export const state = () => ({
    searchWord: ''
});

export const mutations = {
    SET_SEARCHED_WORD(state, word) {
        state.searchWord = word;
    }
};