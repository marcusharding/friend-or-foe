<template>
    <div class="desktop-device flex-col fade-in">
        <h1>Uh Oh!</h1>
        <p>This is a mobile only game!</p>
        <p>Please scan the below QR Code using a mobile device to begin.</p>
        <img :src="qrCode" alt="" />
    </div>
</template>

<script setup>

// Props
const props = defineProps({
    qrCode: { type: String, default: '' }
});

</script>

<style lang="scss" scoped></style>