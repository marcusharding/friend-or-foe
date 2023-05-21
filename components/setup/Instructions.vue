<template>
    <Waiting v-if="!partnerName" message="Waiting for partner to enter their details..." />
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

// Components
import Waiting from '@/components/ui/Waiting.vue';

// Store
const userStore = useUserStore();
const { host, partnerName } = storeToRefs(userStore);

// Props
const props = defineProps({
    updateState: { type: Function, default: () => {} }
});

</script>
