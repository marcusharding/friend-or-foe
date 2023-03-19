import { defineStore } from 'pinia';

export const useUserStore = defineStore({
    id: 'user-store',
    state: () => {
        return {
            _host: false,
            _name: '',
            _partnerName: ''
        }
    },
    actions: {
        updateHost(value: boolean) {
            this._host = value;
        },
        updateName(value: string) {
            this._name = value;
        },
        updatePartnerName(value: string) {
            this._partnerName = value
        }
    },
    getters: {
        host: state => state._host,
        name: state => state._name,
        partnerName: state => state._partnerName
    },
});