<template>
    <Transition>
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
    </Transition>
</template>

<script>

// Modules
import { mapState } from 'vuex';

// Components
import Waiting from '~/components/ui/Waiting.vue';

export default {
    name: 'Instructions',
    components: { Waiting },
    props: { updateState: { type: Function, default: () => {} }},
    computed: {
        ...mapState({
            host: state => state.user.host,
            partnerName: state => state.user.partnerName,
        }),
    },
}

</script>
