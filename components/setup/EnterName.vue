<template>
    <div class="name flex-col fade-in">
        <h1 class="heading">Enter Your Name</h1>
        <input 
            class="input"
            placeholder="Enter Your Name" 
            :value="name" 
            @input="event => {
                name = event.target.value;
                updateName(name); 
            }" 
        />
        <button 
            :class="`button ${!name ? 'disabled' : ''}`"
            @click="
                updateState('INSTRUCTIONS');
                socketEmits('user_name', name);
            "
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
    updateState: { type: Function, default: () => {} },
    socketEmits: { type: Function, default: () => {} }
});

// Reactive Data
const name = ref('');

// Store
const { updateName } = useUserStore();

</script>

<style lang="scss" scope>

.name {
    text-align: center;
}

.heading {
    margin-bottom: 50px;
}

.input {
    margin-bottom: 50px;
}

.input:focus-visible {
    outline: #f09;
    border-color: #f09;
}

</style>