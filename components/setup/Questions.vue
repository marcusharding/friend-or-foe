<template>
    <Waiting v-if="!currentQuestions.length" message="Waiting for the host to begin..." />
    <div class="questions flex-col fade-in" :class="currentQuestions.length ? 'flex' : 'hidden'">
        <div class="swiper" ref="questionsSwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(question, index) in currentQuestions" :key="`question-${index}`">
                    <Question
                        :question="question"
                        :index="index"
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
import Waiting from '../ui/Waiting.vue';

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

// Methods
const generateQuestions = () => {

    // Randomize questions
    const questions = availableQuestions.value.sort(() => 0.5 - Math.random());
    const current = questions.slice(0, 3);

    // Emit three to use for this play through
    socketEmits.value('set_current_questions', [...current]);

    // Remove the questions we just chose to use from selection pool
    current.forEach(question => {

        if ( questions.includes(question) ) questions.splice(questions.indexOf(question), 1);
    });

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
    if ( findIndex(question.id) === -1 ) selections.value.push(object);

    // If one does exist overwrite the previous selection
    if ( findIndex(question.id) !== -1 ) selections.value[findIndex(question.id)] = object;
}

const findIndex = id => { return selections.value.findIndex(selection => selection.id === id) }

// Created
if ( host.value ) generateQuestions();

// Lifecylce Hooks
onMounted(() => {

    swiper.value = new Swiper(questionsSwiper.value, {
        slidesPerView: "auto",
        centeredSlides: "true",
        slidesPerView: 1.2,
        spaceBetween: 20
    });
});

</script>

<style lang="scss" scoped>

.questions-container {
    list-style: none;
    height: 100%;
    padding: 0;
}

.swiper {
    width: 100%;
    margin-bottom: 40px;
}

p {
    text-align: center;
}

</style>