<template>
    <div class="desktop-device flex-col">
        <h1>[Love Powered]</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod erat turpis, et dapibus nunc fermentum malesuada.</p>
        <img :src="qrCode" alt="" />
        <p>[www.verizon-lovepowered.com]</p>
    </div>
</template>

<script setup>

// Props
const props = defineProps({
    qrCode: { type: String, default: '' }
});

</script>

<style lang="scss" scoped>

.desktop-device {

    // Suppose this should be utility class really
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    // Better way to handle every component being full height?
    height: 100%;
}

</style>