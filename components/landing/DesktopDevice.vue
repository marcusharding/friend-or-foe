<template>
    <div class="desktop-device flex-col fade-in">
        <h1>Uh Oh!</h1>
        <p>This is a mobile only game!</p>
        <p>Please scan the below QR Code using a mobile device to begin.</p>
        <img :src="qrCode" alt="" />
    </div>
</template>

<script>

export default {
    name: 'DesktopDevice',
    props: {
        qrCode: { type: String, default: '' }
    },
}

</script>

<style lang="scss" scoped>

.desktop-device {
    align-items: center;
}

h1,
p {
    text-align: center;
}

img {
    width: 50%;
    max-width: 300px;
    height: auto;
    margin-top: 40px;
}

</style>