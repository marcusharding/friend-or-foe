<template>
    <div v-if="!partnerName" class="flex-col fade-in">
        <img class="gif" src="@/assets/images/mr-bean.gif" alt="" />
        <h1>Waiting for partner to enter their details...</h1>
    </div>
    <div v-if="partnerName" class="instructions flex-col fade-in">
        <h1>How to play.</h1>
        <p 
            class="subtitle" 
            v-if="host && partnerName"
        >
            {{ partnerName }} will be answering questions about you.
        </p>
        <p 
            class="subtitle" 
            v-if="!host && partnerName"
        >
            You will be answering questions about {{ partnerName }}.
        </p>
        <button 
            v-if="partnerName"
            class="button"
            @click="updateState('QUESTIONS');"
        >
            Play
        </button>
    </div>
</template>

<script setup>

// Modules
import { useUserStore } from '~/store/user';
import { storeToRefs } from 'pinia';

// Store
const userStore = useUserStore();
const { host, partnerName } = storeToRefs(userStore);

// Props
const props = defineProps({
    updateState: { type: Function, default: () => {} }
});

</script>
