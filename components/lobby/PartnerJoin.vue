<template>
    <div class="partner-join flex-col fade-in">
        <h2>Waiting for guest to join...</h2>
        <p>Please scan the below QR Code on another mobile device to join this session.</p>
        <img class="qr-code" :src="qrCode" alt="" />
    </div>
</template>

<script setup>

// Props
const props = defineProps({
    qrCode: { type: String, default: '' }
});

</script>

<style lang="scss" scoped>

.qr-code {
    width: 250px;
    height: auto;
    max-width: 95%;
}

</style>