<template>
    <div class="partner-join">
        <h1>Header</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat nisl fringilla, efficitur diam ut.</p>
        <div class="flex-col">
            <img class="qr-code" :src="qrCode" alt="" />
            <p>Waiting for partner to join...</p>
        </div>
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
    width: 600px;
    height: auto;
    max-width: 95%;
}

</style>