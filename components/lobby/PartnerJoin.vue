<template>
    <div class="partner-join flex-col fade-in">
        <h1>Waiting for a guest to join...</h1>
        <p>Have your guest scan the below QR Code on another mobile device to join this session.</p>
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

.partner-join {
    text-align: center;
}

.qr-code {
    width: 250px;
    height: auto;
}

</style>