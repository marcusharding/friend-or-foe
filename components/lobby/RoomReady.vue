<template>
    <Transition>
        <EnterName 
            v-if="state === states.ENTER_NAME" 
            :updateState="updateState"
            :socketEmits="socketEmits"
        />
        <Instructions
            v-if="state === states.INSTRUCTIONS"
            :updateState="updateState"
        />
        <Questions 
            v-if="state === states.QUESTIONS" 
            :socketEmits="socketEmits"
            :updateState="updateState"
        />
        <Intermission v-if="state === states.INTERMISSION" :updateState="updateState" />
        <Summary v-if="state === states.SUMMARY" :updateState="updateState" />
    </Transition>
</template>

<script>

// Components
import EnterName from '~/components/setup/EnterName.vue';
import Instructions from '~/components/setup/Instructions.vue';
import Questions from '~/components/setup/Questions.vue';
import Summary from '~/components/setup/Summary.vue';
import Intermission from '~/components/setup/Intermission.vue';

// Static Data
const STATES = {
    ENTER_NAME: 0,
    INSTRUCTIONS: 1,
    QUESTIONS: 2,
    INTERMISSION: 3,
    SUMMARY: 4
};

export default {
    name: 'RoomReady',
    components: {
        EnterName,
        Instructions,
        Questions,
        Summary,
        Intermission
    },
    props: {
        socketEmits: { type: Function, default: () => {} }
    },
    data() {
        return {
            state: STATES.ENTER_NAME
        }
    },
    computed: {
        states() { return STATES }
    },
    methods: {
        updateState(value) { this.state = this.states[value] }
    }
}

</script>

<style lang="scss" scoped>

.room-ready {
    align-items: flex-start;
}

</style>