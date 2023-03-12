<template>
    <div class="intro">
        <h1>[Header Copy Messaging]</h1>
        <div class="video-container">
            <video
                class="video"
                src="@/assets/videos/placeholder.mp4"
                muted 
                autoplay 
                loop 
                playsinline
            >
            </video>
        </div>
        <button @click="skipIntro();">Skip</button>
    </div>
</template>

<script setup>

// Props
const props = defineProps({
    skipIntro: { type: Function, default: () => {} }
});

</script>

<style lang="scss" scoped>

.intro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // Better way to handle every component being full height?
    height: 100%;
}

.video-container {
    width: 350px;
    height: 350px;
    position: relative;
}

.video {
    object-fit: cover;
    position: absolute;
    width: 100%;
    height: 100%;
}

</style>