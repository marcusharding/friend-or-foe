<template>
    <div class="room-ready">
        <Name v-if="state === states.NAME" :updateState="updateState" />
        <Question1 v-if="state === states.QUESTION_1" />
        <Question2 v-if="state === states.QUESTION_2" />
        <Question3 v-if="state === states.QUESTION_3" />
        <Summary v-if="state === states.SUMMARY" :socket="socket" />
    </div>
</template>

<script setup>

// Components
import Name from '@/components/setup/Name.vue';
import Question1 from '@/components/setup/Question1.vue';
import Question2 from '@/components/setup/Question2.vue';
import Question3 from '@/components/setup/Question3.vue';
import Summary from '@/components/setup/Summary.vue';

// Static Data
const STATES = {
    NAME: 0,
    QUESTION_1: 1,
    QUESTION_2: 2,
    QUESTION_3: 3,
    SUMMARY: 4
};

// Props
const props = defineProps({

    // Shall I just put the socket in the store?
    
    socket: { type: Object, default: () => {} }
});

// Reactive Data
const state = ref(STATES.NAME);

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