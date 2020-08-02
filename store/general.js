export const state = () => ({
    isLoading: true,
    webpSupport: null
});

export const mutations = {
    IS_LOADING(state, isLoading) {
        state.isLoading = isLoading
    },
    IS_WEBP_SUPPORTED(state, supported) {
        state.webpSupport = supported
    }
};