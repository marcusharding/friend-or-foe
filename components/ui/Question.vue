<template>
    <div
        class="question"
        :id="`question-${index + 1}`"
        :ref="`question${index + 1}`"
    >
        <div class="heading-container">
            <h2 class="title">Question {{ index + 1 }}</h2>
        </div>
        <div class="options-container">
            <p class="current-question">
                {{
                    host ?
                    formatQuestion(question.questionHost) :
                    formatQuestion(question.questionGuest)
                }}
            </p>
            <ul class="options" ref="options">
                <li
                    v-for="(option, index) in question.options"
                    :key="`option-${index}`"
                    @click="updateSelection(question, option); onClickOption($event.target);"
                >
                    <div class="option">
                        {{ option }}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>

// Modules
import { useUserStore } from '~/store/user';
import { storeToRefs } from 'pinia';
import { toRefs, ref } from 'vue';

// Store
const userStore = useUserStore();
const { host, partnerName } = storeToRefs(userStore);

// Props
const props = defineProps({
    question: { type: Object, default: () => {} },
    index: { type: Number, default: 0 },
    updateSelection: { type: Function, default: () => {} }
});

// Reactive data
const { question, index, hasSelection } = toRefs(props);
const options = ref(null)

// Methods
const formatQuestion = text => {

    let formatted = text;

    if ( formatted.includes('[insert name]') ) {

        formatted = formatted.replace('[insert name]', partnerName.value);
    }

    return formatted;
}

const onClickOption = event => {

    const refs = options.value.querySelectorAll('.option');

    refs.forEach(option => {

        option.classList.remove('active');
    });

    event.classList.add('active');
}

</script>

<style lang="scss" scoped>

.question {
    background-color: #3d3c3f;
    color: white;
    text-align: center;
    width: 70vw;
    max-width: 400px;
    height: 60vh;
    border-radius: 8px;
    overflow: hidden;
    will-change: transform;
    transition: all 0.3s ease-in-out;
    cursor: grab;
}
.moving.question {
  transition: none;
  cursor: -webkit-grabbing;
  cursor: -moz-grabbing;
  cursor: grabbing;
}

.options {
    list-style: none;
    padding: 0;
}

.heading-container {
    padding: 5px 25px 25px 25px;
    box-shadow: 0 4px 6px -6px #313033;
    pointer-events: none;
}

.options-container {
    background-color: #313033;
    padding: 25px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    pointer-events: none;
}

.option {
    background-color: #3d3c3f;
    margin-bottom: 20px;
    border-radius: 5px;
    padding: 10px 0 10px 10px;
    display: flex;
    align-items: center;
    border: solid 1px #3d3c3f;
    transition: border 3ms ease-in;
    pointer-events: all;

    &:before {
        content: '';
        display: inline-block;
        width: 25px;
        height: 25px;
        background-color: white;
        opacity: 0.3;
        border-radius: 5px;
        margin-right: 20px;
    }
}

.option.active {
    border: solid 1px #f09;
    transition: border 0.17s ease-in;

    &:before {
        background-color: #f09;
        opacity: 0.5;
        transition: background-color 0.1s ease;
    }
}

</style>