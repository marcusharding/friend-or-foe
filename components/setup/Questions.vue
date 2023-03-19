<template>
    <ul class="questions flex-col fade-in">
        <li 
            v-if="currentQuestions.length" v-for="(question, index) in currentQuestions" 
            :key="`question-${index}`"
        >
            <Question :question="question" />
        </li>
    </ul>
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
const { updateAvailableQuestions } = questionsStore;

// Props
const props = defineProps({
    
    socketEmits: { type: Function, default: () => {} }
});

// Reactive data 
const { socketEmits } = toRefs(props);

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

// Created
if ( host ) {

    generateQuestions();
}

</script>

<style lang="scss" scoped>

.questions {
    list-style: none;
}

</style>