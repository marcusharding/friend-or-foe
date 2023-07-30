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

<script>

// Modules
import { mapState } from 'vuex';

export default {
    name: 'Question',
    props: {
        question: { type: Object, default: () => {} },
        index: { type: Number, default: 0 },
        updateSelection: { type: Function, default: () => {} }
    },
    data() {
        return {
            options: null
        }
    },
    computed: {
        ...mapState({
            host: state => state.user.host,
            partnerName: state => state.user.partnerName,
        }),
    },
    methods: {
        formatQuestion(text) {

            let formatted = text;

            if ( formatted.includes('[insert name]') ) formatted = formatted.replace('[insert name]', this.partnerName);

            return formatted;
        },
        onClickOption(event) {

            const refs = this.$refs.options.querySelectorAll('.option');

            refs.forEach(option => option.classList.remove('active'));

            event.classList.add('active');
        }
    }
}

</script>

<style lang="scss" scoped>

.question {
    background-color: #3d3c3f;
    color: white;
    text-align: center;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
}

.options {
    list-style: none;
    padding: 0;
}

.heading-container {
    padding: 5px;
}

.options-container {
    background-color: #313033;
    padding: 25px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    height: 100%;

    &:hover {
        cursor: pointer;
    }
}

.option {
    background-color: #3d3c3f;
    margin-bottom: 20px;
    border-radius: 10px;
    padding: 10px 0 10px 10px;
    display: flex;
    align-items: center;
    transition: border 3ms ease-in;
    border: solid 1px #3d3c3f;

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