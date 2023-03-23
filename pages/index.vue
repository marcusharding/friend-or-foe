<template>
    <DesktopDevice v-if="state === states.DESKTOP_DEVICE" :qrCode="qrCode" />
    <GetStarted v-if="state === states.GET_STARTED" :roomLink="roomLink" />
</template>

<script setup>

// Modules
import Bowser from 'bowser';
import { v4 as uuidv4 } from 'uuid';
import { ref, onMounted } from 'vue';

// Helpers
import { generateQr } from '@/utils/helpers';

// Components
import DesktopDevice from '@/components/landing/DesktopDevice.vue';
import GetStarted from '@/components/landing/GetStarted.vue';

// Satic Data
const STATES = {
    DESKTOP_DEVICE: -1,
    GET_STARTED: 1
};

// Reactive Data
const roomLink = ref(`/room/${uuidv4()}`);
const qrCode = ref(null);
const state = ref(null);

// Computed
const states = computed(() => STATES );

// Methods
const setDevice = () => {

    if ( window ) {

        const browser = Bowser.getParser(window.navigator.userAgent);

        // Switch this check to test on desktop or mobile while in dev
        browser.parsedResult.platform.type !== 'desktop' ? 
            state.value = STATES.DESKTOP_DEVICE : 
            state.value = STATES.GET_STARTED;
    }
}

const getQrCode = async () => {

    qrCode.value = await generateQr(location.href);
}

// Lifecylce Hooks
onMounted(() => {

    setDevice();
    getQrCode();
});

</script>

<style lang="scss" scoped>

</style>