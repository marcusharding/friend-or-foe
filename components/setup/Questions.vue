<template>
    <Waiting v-if="!currentQuestions.length" message="Waiting for the host to begin..." />
    <div v-else-if="currentQuestions" class="questions flex-col fade-in">
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
                $store.commit('questions/updateUserSelections', selections);
            "
        >
            Submit
        </button>
        <div v-if="!swiper" class="loading"><Loading /></div>
    </div>
</template>

<script>

// Modules
import Swiper from 'swiper';
import { mapState } from 'vuex';

// Styles
import 'swiper/swiper.min.css';

// Components
import Question from '../ui/Question.vue';
import Waiting from '../ui/Waiting.vue';
import Loading from '../ui/Loading.vue';

export default {
    name: 'Questions',
    components: {
        Waiting,
        Question,
        Loading
    },
    props: {
        socketEmits: { type: Function, default: () => {} },
        updateState: { type: Function, default: () => {} }
    },
    data() {
        return {
            selections: [],
            swiper: null
        }
    },
    computed: {
        ...mapState({
            availableQuestions: state => state.questions.availableQuestions,
            currentQuestions: state => state.questions.currentQuestions,
            host: state => state.user.host,
        }),
    },
    methods: {
        generateQuestions() {

            // Randomize questions
            let questions = [...this.availableQuestions];
            questions = questions.sort(() => 0.5 - Math.random());
            const current = questions.slice(0, 3);

            // Emit three to use for this play through
            this.socketEmits('set_current_questions', [...current]);

            // Remove the questions we just chose to use from selection pool
            current.forEach(question => {

                if ( questions.includes(question) ) questions.splice(questions.indexOf(question), 1);
            });

            // Now commit the remaining questions back to the store
            this.$store.commit('questions/updateAvailableQuestions', questions);
        },
        updateSelection(question, selection) {

            // Construct selection object
            const object = {
                id: question.id,
                selection: selection
            }

            // If a selection doesnt exist yet push new object to the array
            if ( this.findIndex(question.id) === -1 ) this.selections.push(object);

            // If one does exist overwrite the previous selection
            if ( this.findIndex(question.id) !== -1 ) this.selections[this.findIndex(question.id)] = object;
        },
        findIndex(id) { return this.selections.findIndex(selection => selection.id === id) },
        initSwiper() {

            this.swiper = new Swiper(this.$refs.questionsSwiper, {
                centeredSlides: "true",
                slidesPerView: 1.2,
                spaceBetween: 20
            });
        }
    },
    watch: { 
        currentQuestions(newValue, oldValue) {

            setTimeout(() => { this.initSwiper() }, 1000);
        } 
    },
    created() { if ( this.host ) this.generateQuestions() }
}

</script>

<style lang="scss" scoped>

.swiper {
    width: 100%;
    margin-bottom: 40px;
}

p {
    text-align: center;
}

.loading {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: #161a1d;
}

</style>