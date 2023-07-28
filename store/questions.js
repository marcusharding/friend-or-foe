export const state = () => ({

    availableQuestions: [],
    currentQuestions: [],
    userSelections: [],
    partnerSelections: []
});

export const mutations = {

    updateAvailableQuestions(value) { state.availableQuestions = value },
    updateCurrentQuestions(value) { state.currentQuestions = value },
    updateUserSelections(value) { state.userSelections = value },
    updatePartnerSelections(value) { state.partnerSelections = value }
}