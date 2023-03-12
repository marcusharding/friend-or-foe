<template>
    <div class="name">
        <h1>Tell Us Your Name</h1>
        <p>[Copy more tailored for Host] Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <input 
            class="input"
            placeholder="Enter Your Name" 
            :value="name" 
            @input="event => name = event.target.value" 
        />
        <!-- Change to disabled class rather than hiding -->
        <button 
            v-if="name !== ''" 
            @click="updateName(name); updateState('QUESTION_1');"
        >
            Submit
        </button>
    </div>
</template>

<script setup>

// Modules
import { ref } from 'vue';
import { useUserStore } from '~/store/user';

// Props
const props = defineProps({
    updateState: { type: Function, default: () => {} }
});

// Reactive Data
const name = ref('');

// Store
const { updateName } = useUserStore();

</script>

<style lang="scss" scope></style>