<template>
    <div class="questions flex-col">
        <ul class="questions-container flex-col fade-in">
            <li
                v-if="currentQuestions.length" 
                v-for="(question, index) in currentQuestions" 
                :key="`question-${index}`"
            >
                <Question 
                    :question="question"
                    :index="index"
                    :updateSelection="updateSelection"
                />
            </li>
        </ul>
        <button
            :class="`button ${selections.length === 3 ? '' : 'disabled'}`"
            @click="
                updateState('SUMMARY');
                socketEmits('selections', selections);
                updateUserSelections(selections);
            "
        >
            Submit
        </button>
    </div>
</template>

<script setup>

// Modules
import { useQuestionsStore } from '~/store/questions';
import { useUserStore } from '~/store/user';
import { storeToRefs } from 'pinia';

// Components
import Question from '@/components/ui/Question.vue';

// Store
const questionsStore = useQuestionsStore();
const userStore = useUserStore();
const { availableQuestions, currentQuestions } = storeToRefs(questionsStore);
const { host } = storeToRefs(userStore);
const { updateAvailableQuestions, updateUserSelections } = questionsStore;

// Props
const props = defineProps({
    socketEmits: { type: Function, default: () => {} },
    updateState: { type: Function, default: () => {} }
});

// Reactive data 
const { socketEmits } = toRefs(props);
const selections = ref([]);

// Methods
const generateQuestions = () => {

    // Randomize questions
    const questions = availableQuestions.value.sort(() => 0.5 - Math.random());
    const current = questions.slice(0, 3);

    // Emit three to use for this play through
    socketEmits.value('set_current_questions', [...current]);

    // Remove the questions we just chose to use from selection pool
    current.forEach(question => {

        if ( questions.includes(question) ) {

            questions.splice(questions.indexOf(question), 1);
        }
    });

    // Now commit the remaining questions back to the store
    updateAvailableQuestions(questions);
}

const updateSelection = (question, selection) => {

    const object = {
        id: question.id,
        selection: selection
    }

    if ( findIndex(question.id) === -1 ) {

        selections.value.push(object);
    }

    if ( findIndex(question.id) !== -1 ) {

        selections.value[findIndex(question.id)] = object;
    }
}

const findIndex = id => {
    return selections.value.findIndex(selection => selection.id === id);
}

// Created
if ( host ) {

    generateQuestions();
}

</script>

<style lang="scss" scoped>

.questions-container {
    list-style: none;
    height: 100%;
    padding: 0;
    display: flex;
    flex-direction: row;
    margin: 0;
}

</style>