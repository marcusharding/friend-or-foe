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

            this.$store.commit('user/updateHost', false);
            this.$store.commit('user/updatePartnerName', '');
            this.$store.commit('user/updateName', '');
            this.$store.commit('questions/updateAvailableQuestions', []);
            this.$store.commit('questions/updateCurrentQuestions', []);
            this.$store.commit('questions/updateUserSelections', []);
            this.$store.commit('questions/updatePartnerSelections', []);
        }
    }
}

</script>
