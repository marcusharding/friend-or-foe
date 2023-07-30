export const state = () => ({

    availableQuestions: [],
    currentQuestions: [],
    userSelections: [],
    partnerSelections: []
});

export const mutations = {

    updateAvailableQuestions(state, value) { state.availableQuestions = value },
    updateCurrentQuestions(state, value) { state.currentQuestions = value },
    updateUserSelections(state, value) { state.userSelections = value },
    updatePartnerSelections(state, value) { state.partnerSelections = value }
}