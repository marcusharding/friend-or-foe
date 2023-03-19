import { defineStore } from 'pinia';

export const useSetupStore = defineStore({
    id: 'setup-store',
    state: () => {
        return {
            _socket: null
        }
    },
    actions: {
        updateSocket(value: any) {

            this._socket = value;
        },
    },
    getters: {
        socket: state => state._socket
    }
})