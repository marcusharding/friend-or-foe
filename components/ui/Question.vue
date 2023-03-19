<template>
    <div class="question" :id="`question-${question.id}`" :ref="`question${question.id}`">
        <p>
            {{ 
                host ? 
                formatQuestion(question.questionHost) : 
                formatQuestion(question.questionGuest)
            }}
        </p>
    </div>
</template>

<script setup>

// Modules
import { useUserStore } from '~/store/user';
import { storeToRefs } from 'pinia';
import { toRefs } from 'vue';

// Store
const userStore = useUserStore();
const { host, partnerName } = storeToRefs(userStore);

// Props
const props = defineProps({
    question: { type: Object, default: () => {} }
});

// Reactive data
const { question } = toRefs(props);

// Methods
const formatQuestion = text => {

    let formatted = text;

    if ( formatted.includes('[insert name]') ) {

        formatted = formatted.replace('[insert name]', partnerName.value);
    }

    return formatted;
}

</script>

<style lang="scss" scoped></style>