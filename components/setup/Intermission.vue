<template>
    <div class="flex-col fade-in">
    <div v-if="!hasPartnerSelections">
        <img class="gif" src="@/assets/images/mr-bean.gif" alt="" />
        <h1>
            Waiting for {{ partnerName }} to complete their answers...
        </h1>
    </div>
    <div v-if="hasPartnerSelections" class="flex-col">
        <img class="gif" :src="imagePath" alt="" />
        <h1>{{ message }}</h1>
    </div>
    </div>
</template>

<script setup>

// TO DO - Commit all below score calculations etc to store for summary

// Modules
import { useQuestionsStore } from '~/store/questions';
import { useUserStore } from '~/store/user';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

// Data
import { scoreCopy } from '@/data/summary';

// Assets
import shocked from '@/assets/images/shocked.gif';
import confused from '@/assets/images/confused.gif';
import unimpressed from '@/assets/images/unimpressed.gif';
import hug from '@/assets/images/hug.gif';

// Store
const questionsStore = useQuestionsStore();
const userStore = useUserStore();
const { partnerSelections, userSelections } = storeToRefs(questionsStore);
const { partnerName, host } = storeToRefs(userStore);

// Props
const props = defineProps({
    updateState: { type: Function, default: () => {} }
});

// Reactive data
const { updateState } = toRefs(props);
const score = ref(0);
const message = ref();
const imagePath = ref('');

// Computed
const hasPartnerSelections = computed(() => {
    return partnerSelections.value.length > 0;
});

// Watchers
watch(hasPartnerSelections, async (newValue, oldValue) => {

    if ( newValue ) {
        
        calculateScore();
        setMessage();

        setTimeout(() => {

            updateState.value('SUMMARY');
        }, 2000);
    }
});

// Methods
const calculateScore = () => {

    userSelections.value.forEach(selection => {

        if (
            partnerSelections.value.filter(
                e => e.selection === selection.selection
            ).length > 0 
        ) {

            score.value = score.value += 1;
        }
    });
}

const setMessage = () => {

    switch( score.value ) {

        case 0:
            message.value = getMessage(score.value);
            imagePath.value = shocked;
            break;

        case 1:
            message.value = getMessage(score.value);
            imagePath.value = confused;
            break;

        case 2:
            message.value = getMessage(score.value);
            imagePath.value = unimpressed;
            break;

        case 3:
            message.value = getMessage(score.value);
            imagePath.value = hug;
            break;
    }
}

const getMessage = value => {

    let text = '';

    const object = scoreCopy.filter(obj => {

        return obj.value === value;
    });

    if ( object && host.value ) {

        text = object[0].hostText;
    }

    if ( object && !host.value ) {

        text = object[0].guestText;
    }

    return text;
}

// Created
if ( hasPartnerSelections.value ) {

    calculateScore();
    setMessage();
}


</script>