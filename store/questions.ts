import { defineStore } from 'pinia';

export const useQuestionsStore = defineStore({
    id: 'questions-store',
    state: () => {
        return {
            _availableQuestions: [],
            _currentQuestions: [],
            _userSelections: [],
            _partnerSelections: []
        }
    },
    actions: {
        updateAvailableQuestions(value: any) { this._availableQuestions = value },
        updateCurrentQuestions(value: any) { this._currentQuestions = value },
        updateUserSelections(value: any) { this._userSelections = value },
        updatePartnerSelections(value: any) { this._partnerSelections = value }
    },
    getters: {
        availableQuestions: state => state._availableQuestions,
        currentQuestions: state => state._currentQuestions,
        userSelections: state => state._userSelections,
        partnerSelections: state => state._partnerSelections
    }
});