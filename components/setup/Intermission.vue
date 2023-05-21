<template>
    <div class="flex-col">
        <!-- Make a component -->
        <div v-if="!hasPartnerSelections" class="fade-in">
            <img class="gif" src="@/assets/images/mr-bean.gif" alt="" />
            <h1>
                Waiting for {{ partnerName }} to complete their answers...
            </h1>
        </div>
        <div :class="hasPartnerSelections ? 'flex' : 'hidden'" class="flex-col">
            <h1 class="fade-in text-center" ref="heading">The results are in!</h1>
            <img class="gif hidden" :src="imagePath" alt="" ref="gif" />
            <h1 class="hidden" ref="messageContainer" >{{ message }}</h1>
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
const message = ref('');
const messageContainer = ref(null);
const heading = ref(null);
const gif = ref(null);
const imagePath = ref('');

// Computed
const hasPartnerSelections = computed(() => {
    return partnerSelections.value.length > 0;
});

// Watchers
watch(hasPartnerSelections, async (newValue, oldValue) => {

    if ( newValue ) { handleIntermission() }
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

const handleIntermission = () => {

    calculateScore();
    setMessage();
    setTimeout(() => heading.value.classList.add('opacity-0', 'fade-out'), 2000);
    setTimeout(() => { 
        gif.value.classList.remove('hidden');
        gif.value.classList.add('block', 'fade-in');
    }, 2500);
    setTimeout(() => {
        messageContainer.value.classList.remove('hidden');
        messageContainer.value.classList.add('block', 'fade-in');
    }, 2500);
    setTimeout(() => updateState.value('SUMMARY'), 6000);
}

// Created
if ( hasPartnerSelections.value ) { handleIntermission() }

</script>