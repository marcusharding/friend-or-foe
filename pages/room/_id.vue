<template>
    <Transition>
        <!-- <RoomReady v-if="state === states.ROOM_READY" :socketEmits="socketEmits" /> -->
        <PartnerJoin v-if="state === states.WAITING_FOR_GUEST" :qrCode="qrCode" />
        <RoomFull v-if="state === states.ROOM_FULL" />
        <Disconnected v-if="state === states.DISCONNECTED" />
        <Loading v-if="state === states.LOADING" />
    </Transition>
</template>

<script>

// Helpers
import { generateQr } from '~/assets/utils/helpers';

// Modules.
import { mapState } from 'vuex';
import { io } from 'socket.io-client';

// Data
import { questions } from '~/data/questions.js';

// Components
import RoomFull from '~/components/lobby/RoomFull.vue';
import PartnerJoin from '~/components/lobby/PartnerJoin.vue';
import RoomReady from '~/components/lobby/RoomReady.vue';
import Disconnected from '~/components/lobby/Disconnected.vue';
import Loading from '~/components/ui/Loading.vue';

// Static Data
const STATES = {
    DISCONNECTED: -1,
    WAITING_FOR_GUEST: 0,
    ROOM_READY: 1,
    ROOM_FULL: 2,
    LOADING: 3
};

export default {
    name: 'id',
    components: {
        RoomFull,
        PartnerJoin,
        RoomReady,
        Disconnected,
        Loading
    },
    data() {
        return {
            socket: null,
            state: STATES.LOADING,
            qrCode: null,
            occupants: 0
        }
    },
    computed: {
        ...mapState({
            name: state => state.name,
        }),
        states() { return STATES },
        roomId() { return $nuxt.$route.params.id }
    },
    watch: {
        occupants: function (newAmount, oldAmount) { 

            if ( newAmount === 1 ) this.state = this.states.WAITING_FOR_GUEST;
            if ( newAmount === 2 ) this.state = this.states.ROOM_READY;
        }
    },
    methods: {
        async getQrCode() { this.qrCode = await generateQr(location.href) },
        socketListeners() {

            // Room is full
            this.socket.on('room_full', () => this.state = this.states.ROOM_FULL);

            // Room has space
            this.socket.on('room_space', () => this.joinRoom());

            // Room is empty
            this.socket.on('room_empty', () => this.joinRoom());

            // Room occupants
            this.socket.on('room_occupants', data => this.occupants = data);

            // Room host
            this.socket.on('room_host', data => this.$store.commit('user/updateHost', data));

            // Commit partner name to store
            this.socket.on('partner_name', data => { if ( data !== this.name ) this.$store.commit('user/updatePartnerName', data)});

            // Commit current questions to store
            this.socket.on('current_questions', data => this.$store.commit('questions/updateCurrentQuestions', data));

            // Commit partners selections
            this.socket.on('user_selections', data => { if ( data.user !== this.name ) this.$store.commit('questions/updatePartnerSelections', data.selections)});

            // Socket disconnected
            this.socket.on('socket_disconnected', () => this.state = this.states.DISCONNECTED );
        },
        socketEmits(event, data) {

            switch( event ) {

                case 'room_full_check':
                    
                    // Is room full
                    this.socket.emit('room_full_check', data);
                    break;

                case 'user_name':

                    // Emit user name
                    this.socket.emit('user_name', data);
                    break;
                
                case 'set_current_questions':

                    // Emit current questions
                    this.socket.emit('set_current_questions', data);
                    break;

                case 'selections':

                    // Emit users selections
                    this.socket.emit('set_user_selections', 
                        {
                            selections: data,
                            user: this.name
                        }
                    );
                    break;
            }
        },
        joinRoom() {

            // Join room by id
            this.socket.emit('room_join', this.roomId);
            this.$store.commit('questions/updateAvailableQuestions', questions);
        },
        createSocket() {

            this.socket = io(`${ process.env.WEBSOCKET_PROTOCOL }://${ location.host }`, {
                withCredentials: false,
                transports: ['websocket']
            });
            this.socketEmits('room_full_check', this.roomId);
            this.socketListeners();
        },
    },
    mounted() {

        if ( !this.socket ) {

            this.createSocket();
            this.getQrCode();
        }
    }
}

</script>