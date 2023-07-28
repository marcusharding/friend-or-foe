<template>
    <Transition>
        <DesktopDevice v-if="state === states.DESKTOP_DEVICE" :qrCode="qrCode" />
        <GetStarted v-if="state === states.GET_STARTED" :roomLink="roomLink" />
    </Transition>
</template>

<script>

// Modules
import Bowser from 'bowser';
import { v4 as uuidv4 } from 'uuid';

// Helpers
import { generateQr } from '~/assets/utils/helpers';

// Components
import DesktopDevice from '../components/landing/DesktopDevice.vue';
import GetStarted from '../components/landing/GetStarted.vue';

// Satic Data
const STATES = {
    DESKTOP_DEVICE: -1,
    GET_STARTED: 1
};

export default {
    name: 'IndexPage',
    components: {
        GetStarted,
        DesktopDevice
    },  
    data() {
        return {
            state: null,
            roomLink: `/room/${uuidv4()}`,
            qrCode: null
        }
    },
    computed: {
        states() { return STATES },
    },
    methods: {
        setDevice() {

            if ( window ) {

                const browser = Bowser.getParser(window.navigator.userAgent);

                // Switch this check to test on desktop or mobile while in dev
                browser.parsedResult.platform.type !== 'desktop' ? 
                    this.state = this.states.DESKTOP_DEVICE:
                    this.state = this.states.GET_STARTED;
            }
        },
        async getQrCode() { this.qrCode = await generateQr(location.href) }
    },
    mounted() { 
        this.setDevice();
        this.getQrCode();
    },
}
</script>
