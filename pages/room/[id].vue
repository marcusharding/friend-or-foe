<template>
    <RoomReady v-if="state === states.ROOM_READY" :socketEmits="socketEmits" />
    <PartnerJoin v-if="state === states.WAITING_FOR_GUEST" :qrCode="qrCode" />
    <RoomFull v-if="state === states.ROOM_FULL" />
</template>

<script setup>

// Modules
import { io } from 'socket.io-client';
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from '~/store/user';
import { storeToRefs } from 'pinia';

// Helpers
import { generateQr } from '@/utils/helpers';

// Components
import RoomFull from '@/components/lobby/RoomFull.vue';
import PartnerJoin from '@/components/lobby/PartnerJoin.vue';
import RoomReady from '@/components/lobby/RoomReady.vue';

// Nuxt
const route = useRoute();

// Static Data
const STATES = {
    DISCONNECTED: -1,
    WAITING_FOR_GUEST: 0,
    ROOM_READY: 1,
    ROOM_FULL: 2
};

// Reactive Data
const state = ref(STATES.DISCONNECTED);
const socket = ref(null);
const qrCode = ref(null);
const occupants = ref(0);

// Computed
const states = computed(() => STATES );
const roomId = computed(() => route.params.id );

// Store
const userStore = useUserStore();
const { updateHost, updatePartnerName } = userStore;
const { name } = storeToRefs(userStore);

// Watchers
watch(occupants, async (newAmount, oldAmount) => {

    if ( newAmount === 1 ) {
        state.value = STATES.WAITING_FOR_GUEST
    }

    if ( newAmount === 2 ) {
        state.value = STATES.ROOM_READY
    }
});

// Methods
const getQrCode = async () => {

    qrCode.value = await generateQr(location.href);
}

const createSocket = () => {

    socket.value = io(location.host);

    socketEmits('room_full_check', roomId.value);
    socketListeners();
}

const socketEmits = (event, data) => {

    switch( event ) {
        
        case 'room_full_check':
            
            // Is room full
            socket.value.emit('room_full_check', data);
            break;

        case 'user_name':

            // Emit user name
            socket.value.emit('user_name', data);
            break;
    }
}

const socketListeners = () => {

    // Room is full
    socket.value.on('room_full', () => state.value = STATES.ROOM_FULL);

    // Room has space
    socket.value.on('room_space', () => joinRoom());

    // Room is empty
    socket.value.on('room_empty', () => joinRoom());

    // Room occupants
    socket.value.on('room_occupants', data => occupants.value = data);

    // Room host
    socket.value.on('room_host', data => updateHost(data));

    // Commit partner name to store
    socket.value.on('partner_name', data => {

        if ( data !== name.value ) {

            updatePartnerName(data);
        }
    });
}

const joinRoom = () => {

    // Join room by id
    socket.value.emit('room_join', roomId.value);
}

// Lifecylce Hooks
onMounted(() => {

    if ( !socket.value ) {

        createSocket();
        getQrCode();
    }
});

</script>