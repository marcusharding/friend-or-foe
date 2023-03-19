import { defineStore } from 'pinia';

export const useQuestionsStore = defineStore({
    id: 'questions-store',
    state: () => {
        return {
            _availableQuestions: [],
            _currentQuestions: []
        }
    },
    actions: {
        updateAvailableQuestions(value: any) {

            this._availableQuestions = value;
        },
        updateCurrentQuestions(value: any) {

            this._currentQuestions = value;
        }
    },
    getters: {
        availableQuestions: state => state._availableQuestions,
        currentQuestions: state => state._currentQuestions
    }
});