export const state = () => ({

    host: false,
    name: '',
    partnerName: ''
});

export const mutations = {

    updateHost(value) { state.host = value },
    updateName(value) { state.name = value },
    updatePartnerName(value) { state.partnerName = value },
}