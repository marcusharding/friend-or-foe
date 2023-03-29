<template>
    <div v-if="!currentQuestions.length" class="flex-col">
        <h1>Waiting for host...</h1>
    </div>
    <div v-if="currentQuestions.length" class="questions flex-col">
        <ul class="questions-container flex-col fade-in" ref="questionsContainer">
            <Question
                v-if="currentQuestions.length"
                v-for="(question, index) in currentQuestions"
                ref="questions"
                :key="`question-${index}`"
                :question="question"
                :index="index"
                :updateSelection="updateSelection"
            />
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
import { toRefs, ref, onMounted } from 'vue';

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
const questions = ref(null);
const questionsContainer = ref(null);

// Plugins
const { $Hammer } = useNuxtApp();

// Watchers
watch(questions, value => {

    if ( value.length > 0 ) {

        initQuestions();
        initHammer();
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
    current.forEach(question => {

        if ( questions.includes(question) ) {

            questions.splice(questions.indexOf(question), 1);
        }
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

    const newQuestions = questionsContainer.value.querySelectorAll('.question:not(.removed)');
    const allQuestions = questionsContainer.value.querySelectorAll('.question');

    if ( newQuestions.length > 0 ) {

        newQuestions.forEach((question, index) => {

            question.style.zIndex = allQuestions.length - index;
            question.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
            question.style.opacity = (10 - index) / 10;
        });

        questionsContainer.value.classList.add('loaded');
    }
}

const initHammer = () => {

    const allQuestions = questionsContainer.value.querySelectorAll('.question');

    allQuestions.forEach((card, index) => {

        const hammertime = new $Hammer(card);

        hammertime.on('pan', event => {

            if ( event.target.classList.contains('question') ) {

                if ( selections.value[index] ) {

                    if (event.deltaX === 0) return;
                    if (event.center.x === 0 && event.center.y === 0) return;

                    card.classList.add('moving');

                    const xMulti = event.deltaX * 0.03;
                    const yMulti = event.deltaY / 80;
                    const rotate = xMulti * yMulti;

                    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
                }
            }
        });

        hammertime.on('panend', event => {

            if ( selections.value[index] ) {

                card.classList.remove('moving');

                const moveOutWidth = document.body.clientWidth;
                const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

                event.target.classList.toggle('removed', !keep);

                if ( keep ) {

                    event.target.style.transform = '';

                } else {

                    const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
                    const toX = event.deltaX > 0 ? endX : - endX;
                    const endY = Math.abs(event.velocityY) * moveOutWidth;
                    const toY = event.deltaY > 0 ? endY : - endY;
                    const xMulti = event.deltaX * 0.03;
                    const yMulti = event.deltaY / 80;
                    const rotate = xMulti * yMulti;

                    event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';

                    initQuestions();
                }
            }
        });
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

</style>