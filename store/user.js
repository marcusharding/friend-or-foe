export const state = () => ({

    host: false,
    name: '',
    partnerName: ''
});

export const mutations = {

    updateHost(state, value) { state.host = value },
    updateName(state, value) { state.name = value },
    updatePartnerName(state, value) { state.partnerName = value },
}