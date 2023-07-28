<template>
    <div class="disconnected flex-col fade-in">
        <h1 class="heading">Oops, your partner has disconnected from the game.</h1>
        <NuxtLink 
            to="/" 
            class="button" 
            @click="wipeStore();"
        >
            Start again
        </NuxtLink>
    </div>
</template>

<script>

export default {
    name: 'Disconnected',
    methods: {
        wipeStore() {

            this.$store.dispatch('updateHost', false);
            this.$store.dispatch('updatePartnerName', '');
            this.$store.dispatch('updateName', '');
            this.$store.dispatch('updateAvailableQuestions', []);
            this.$store.dispatch('updateCurrentQuestions', []);
            this.$store.dispatch('updateUserSelections', []);
            this.$store.dispatch('updatePartnerSelections', []);
        }
    }
}

</script>
