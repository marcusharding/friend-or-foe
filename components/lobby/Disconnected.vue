<template>
    <div class="disconnected flex-col fade-in">
        <h1>Oops, your partner has disconnected from the game.</h1>
        <NuxtLink 
            to="/" 
            class="button" 
            @click="wipeStore();"
        >
            Start again
        </NuxtLink>
    </div>
</template>

<script setup>

// Modules
import { useUserStore } from '~/store/user';
import { useQuestionsStore } from '~/store/questions';

// Store
const userStore = useUserStore();
const questionsStore = useQuestionsStore();
const { updateHost, updatePartnerName, updateName } = userStore;
const {
    updateAvailableQuestions, 
    updateCurrentQuestions, 
    updateUserSelections,
    updatePartnerSelections 
} = questionsStore;

// Methods
const wipeStore = () => {

    updateHost(false);
    updatePartnerName('');
    updateName('');
    updateAvailableQuestions([]);
    updateCurrentQuestions([]);
    updateUserSelections([]);
    updatePartnerSelections([]);
}

</script>

<style lang="scss" scoped></style>