<template>
    <div class="instructions flex-col">
        <h1>How to play.</h1>
        <p v-if="host">{{ partnerName }} will be answering questions about you.</p>
        <p v-if="!host">You will be answering questions about {{ partnerName }}.</p>
    </div>
</template>

<script setup>

// Modules
import { useUserStore } from '~/store/user';
import { storeToRefs } from 'pinia';

// Store
const userStore = useUserStore();
const { host, partnerName } = storeToRefs(userStore)

</script>

<style lang="scss" scoped></style>