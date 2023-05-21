<template>
    <div class="partner-join flex-col fade-in">
        <h1 class="heading">Waiting for a guest to join...</h1>
        <p class="subtitle">Have your guest scan the QR Code on another mobile device to join this session.</p>
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
    width: 100%;
    max-width: 350px;
    height: auto;
}

.heading {
    line-height: 130%;
    margin-bottom: 30px;
}

</style>