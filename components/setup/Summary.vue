<template>
    <div class="summary flex-col fade-in">
        <h1>Summary</h1>
        <p 
            v-if="!hasPartnerSelections"
        >
            Waiting for {{ partnerName }} to complete their answers...
        </p>
        <div v-if="hasPartnerSelections" class="summary-container fade-in">
            <p class="message">{{ message }}</p>
            <div class="user-answers">
                <h2>Your answers</h2>
                <ul class="answers">
                    <!-- Break into UI component -->
                    <li 
                        v-for="({selection}, index) in userSelections"
                        :class="
                            `answer ${selection === partnerSelections[index].selection ? 
                                'correct' : 
                                'wrong'}`
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
                <h2>You scored</h2>
                <p>{{ score }} / 3</p>
            </div>
        </div>
    </div>
</template>

<script setup>

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
const { name, partnerName, host } = storeToRefs(userStore);

// Props
const props = defineProps({
    socket: { type: Object, default: () => {} }
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

    userSelections.value.forEach((selection, index) => {

        if ( selection.selection === partnerSelections.value[index].selection ) {

            score.value = score.value += 1;
        }
    });
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

    if ( object && host ) {

        text = object[0].hostText;
    }

    if ( object && !host ) {

        text = object[0].guestText;
    }

    return text;
}

// Created

// Issue - Triggering when it shouldnt

if ( hasPartnerSelections ) {

    console.log('triggered from create');

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