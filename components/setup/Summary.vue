<template>
    <div class="summary flex-col fade-in">
        <div class="summary-container fade-in">
            <div class="user-answers">
                <h2>Your answers</h2>
                <ul class="answers">
                    <li
                        v-for="({selection}) in userSelections"
                        :class="
                            `answer ${getAnswerClass(selection)}`
                        "
                    >
                        {{ selection }}
                    </li>
                </ul>
            </div>
            <div class="partner-answers">
                <h2>{{ partnerName }}'s answers</h2>
                <ul class="answers">
                    <li 
                        v-for="({selection}, index) in partnerSelections"
                        :class="
                            `answer ${selection === userSelections[index].selection ? 
                                'correct' : 
                                'wrong'}`
                        "
                    >
                        {{ selection }}
                    </li>
                </ul>
            </div>
            <div class="score">
                <h2>Final score</h2>
                <p>{{ score }} / 3</p>
            </div>
            <NuxtLink 
                to="/" 
                class="button"
                @click="() => {
                    $store.commit('questions/updateUserSelections', []);
                    $store.commit('questions/updatePartnerSelections', []);
                    updateState('QUESTIONS');
                }"
            >
                Play again
            </NuxtLink>
        </div>
    </div>
</template>

<script>

// Modules.
import { mapState } from 'vuex';

export default {
    name: 'Summary',
    props: {
        updateState: { type: Function, default: () => {} }
    },
    data() {
        return {
            score: 0
        }
    },
    computed: {
        ...mapState({
            partnerSelections: state => state.questions.partnerSelections,
            userSelections: state => state.questions.userSelections,
            partnerName: state => state.user.partnerName,
        }),
        hasPartnerSelections() { return this.partnerSelections.length > 0 }
    },
    methods: {
        calculateScore() {

            this.userSelections.forEach(selection => {

                if ( this.partnerSelections.filter(e => e.selection === selection.selection).length > 0 ) {

                    this.score = this.score += 1;
                }
            });
        },
        getAnswerClass(selection) {

            let className = 'wrong';

            if ( this.partnerSelections.filter(e => e.selection === selection).length > 0 ) {

                className = 'correct';
            }

            return className;
        }
    },
    created() { if ( this.hasPartnerSelections ) this.calculateScore() }
}

</script>

<style lang="scss" scoped>

.answers {
    list-style: none;
    padding: 0;
    margin: 0;
}

.answer.correct {
    color: green;
}

.answer.wrong {
    color: red;
}

</style>