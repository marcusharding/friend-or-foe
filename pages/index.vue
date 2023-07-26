<template>
    <p>Hey</p>
</template>

<script>
export default {
    name: 'IndexPage',
    data() {
        return {
            socket: null
        }
    },
    mounted() { if ( !this.socket ) this.createSocket() },
    methods: {
        createSocket() {
            this.socket = new WebSocket(`${ process.env.WEBSOCKET_PROTOCOL }://${ location.host }`);
        }
    }
}
</script>
