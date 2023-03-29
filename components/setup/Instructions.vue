<template>
    <div v-if="!partnerName" class="flex-col">
        <p>Waiting for partner to enter their details...</p>
    </div>
    <div v-if="partnerName" class="instructions flex-col">
        <h1>How to play.</h1>
        <p v-if="host && partnerName">{{ partnerName }} will be answering questions about you.</p>
        <p v-if="!host && partnerName">You will be answering questions about {{ partnerName }}.</p>
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

<style lang="scss" scoped></style>