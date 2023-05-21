<template>
    <div class="summary flex-col fade-in">
        <div class="summary-container fade-in">
            <div class="user-answers">
                <h2>Your answers</h2>
                <ul class="answers">
                    <!-- Break into UI component -->
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
                    <!-- Break into UI component -->
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
                @click="updateState('QUESTIONS');"
            >
                Play again
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>

// TO DO - Strip out duplicated logic from intermission when can pull from store

// Modules
import { useQuestionsStore } from '~/store/questions';
import { useUserStore } from '~/store/user';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

// Data
import { scoreCopy } from '@/data/summary';

// Store
const questionsStore = useQuestionsStore();
const userStore = useUserStore();
const { partnerSelections, userSelections } = storeToRefs(questionsStore);
const { partnerName, host } = storeToRefs(userStore);

// Props
const props = defineProps({
    updateState: { type: Function, default: () => {} }
});

// Reactive data
const score = ref(0);
const message = ref();

// Computed
const hasPartnerSelections = computed(() => {
    return partnerSelections.value.length > 0;
});

// Watchers
watch(hasPartnerSelections, async (newValue, oldValue) => {

    if ( newValue ) {
        
        calculateScore();
        setMessage();
    }
});

// Methods
const calculateScore = () => {

    userSelections.value.forEach(selection => {

        if (
            partnerSelections.value.filter(
                e => e.selection === selection.selection
            ).length > 0 
        ) {

            score.value = score.value += 1;
        }
    });
}

const getAnswerClass = selection => {

    let className = 'wrong';

    if (
        partnerSelections.value.filter(
            e => e.selection === selection
        ).length > 0 
    ) {

        className = 'correct';
    }

    return className;
}

const setMessage = () => {

    switch( score.value ) {

        case 0:
            message.value = getMessage(score.value);
            break;

        case 1:
            message.value = getMessage(score.value);
            break;

        case 2:
            message.value = getMessage(score.value);
            break;

        case 3:
            message.value = getMessage(score.value);
            break;
    }
}

const getMessage = value => {

    let text = '';

    const object = scoreCopy.filter(obj => {

        return obj.value === value;
    });

    if ( object && host.value ) { text = object[0].hostText }

    if ( object && !host.value ) { text = object[0].guestText }

    return text;
}

// Created
if ( hasPartnerSelections.value ) {

    calculateScore();
    setMessage();
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