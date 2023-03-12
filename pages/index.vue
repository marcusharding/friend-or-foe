<template>
    <div class="homepage">
        <DesktopDevice v-if="state === states.DESKTOP_DEVICE" :qrCode="qrCode" />
        <Intro v-if="state === states.INTRO" :skipIntro="skipIntro" />
        <CreateCard v-if="state === states.CREATE_CARD" :roomLink="roomLink" />
    </div>
</template>

<script setup>

// Modules
import Bowser from 'bowser';
import { v4 as uuidv4 } from 'uuid';
import { ref, onMounted } from 'vue'

// Helpers
import { generateQr } from '@/utils/helpers';

// Components
import DesktopDevice from '@/components/landing/DesktopDevice.vue';
import Intro from '@/components/landing/Intro.vue';
import CreateCard from '@/components/landing/CreateCard.vue';

// Satic Data
const STATES = {
    DESKTOP_DEVICE: -1,
    INTRO: 0,
    CREATE_CARD: 1
};

// Reactive Data
const roomLink = ref(`/room/${uuidv4()}`);
const qrCode = ref(null);
const state = ref(null);

// Computed
const states = computed(() => STATES );

// Methods
const setDevice = () => {

    const browser = Bowser.getParser(window.navigator.userAgent);

    // Switch this check to test on desktop or mobile while in dev
    browser.parsedResult.platform.type !== 'desktop' ? 
        state.value = STATES.DESKTOP_DEVICE : 
        state.value = STATES.INTRO;
}

const getQrCode = async () => {

    qrCode.value = await generateQr(location.href);
}

const skipIntro = () => {
    state.value = STATES.CREATE_CARD
}

// Lifecylce Hooks
onMounted(() => {

    setDevice();
    getQrCode();
});

</script>

<style lang="scss" scoped>

.homepage {
    height: 100%;
}

</style>