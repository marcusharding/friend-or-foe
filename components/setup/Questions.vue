<template>
    <div v-if="!currentQuestions.length" class="flex-col">
        <h1>Waiting for host...</h1>
    </div>
    <div v-if="currentQuestions.length" class="questions flex-col">
        <div class="swiper" ref="questionsSwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(question, index) in currentQuestions" :key="`question-${index}`">
                    <Question
                        :question="question"
                        :updateSelection="updateSelection"
                    />
                </div>
            </div>
        </div>
        <button
            :class="`button ${selections.length === 3 ? '' : 'disabled'}`"
            @click="
                updateState('INTERMISSION');
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
import { toRefs, ref } from 'vue';
import Swiper from 'swiper'

// Styles
import 'swiper/swiper.min.css'

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
const questionsSwiper = ref(null);
const swiper = ref(null);

// Watchers
watch(currentQuestions, value => {

    if ( value.length > 0 ) {

        initQuestions();
    }
});

// Methods
const generateQuestions = () => {

    // Randomize questions
    const questions = availableQuestions.value.sort(() => 0.5 - Math.random());
    const current = questions.slice(0, 3);

    // Emit three to use for this play through
    socketEmits.value('set_current_questions', [...current]);

    // Remove the questions we just chose to use from selection pool
    // current.forEach(question => {

    //     if ( questions.includes(question) ) {

    //         questions.splice(questions.indexOf(question), 1);
    //     }
    // });

    // Now commit the remaining questions back to the store
    updateAvailableQuestions(questions);
}

const updateSelection = (question, selection) => {

    // Construct selection object
    const object = {
        id: question.id,
        selection: selection
    }

    // If a selection doesnt exist yet push new object to the array
    if ( findIndex(question.id) === -1 ) {

        selections.value.push(object);
    }

    // If one does exist overwrite the previous selection
    if ( findIndex(question.id) !== -1 ) {

        selections.value[findIndex(question.id)] = object;
    }
}

const findIndex = id => {
    return selections.value.findIndex(selection => selection.id === id);
}

const initQuestions = () => {

    swiper.value = new Swiper(questionsSwiper.value, {
        slideToClickedSlide: true,
        slidesPerView: 1.1,
        threshold: 10,
        loop: false,
        grabCursor: true
    });
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
}

.swiper {
    width: 100%;
}

</style>