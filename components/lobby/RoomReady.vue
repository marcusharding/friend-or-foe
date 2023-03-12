<template>
    <EnterName 
        v-if="state === states.ENTER_NAME" 
        :updateState="updateState"
        :socketEmits="socketEmits"
    />
    <Instructions v-if="state === states.INSTRUCTIONS" />
    <Questions v-if="state === states.QUESTIONS" />
    <Summary v-if="state === states.SUMMARY" />
</template>

<script setup>

// Components
import EnterName from '@/components/setup/EnterName.vue';
import Instructions from '@/components/setup/Instructions.vue';
import Questions from '@/components/setup/Questions.vue';
import Summary from '@/components/setup/Summary.vue';

// Static Data
const STATES = {
    ENTER_NAME: 0,
    INSTRUCTIONS: 1,
    QUESTIONS: 2,
    SUMMARY: 3
};

// Props
const props = defineProps({
    
    socketEmits: { type: Function, default: () => {} }
});

// Reactive Data
const state = ref(STATES.ENTER_NAME);

// Computed
const states = computed(() => STATES );

// Methods
const updateState = value => {

    state.value = STATES[value];
}

</script>

<style lang="scss" scoped>

.room-ready {
    align-items: flex-start;
}

</style>