<template>
    <div class="get-started flex-col fade-in">
        <h1 class="heading">
            <span class="friend">
                Friend
            </span> 
            <span class="or">
                or
            </span>
            <span class="foe">
                Foe.
            </span>
        </h1>
        <p class="subtitle">Find out if you're a dynamic duo or an epic fail! But dont sweat it, its just a game.</p>
        <img class="image" src="@/assets/images/sweating.gif" alt="" />
        <NuxtLink :to="roomLink" class="button">Get started</NuxtLink>
    </div>
</template>

<script setup>

// Props
const props = defineProps({
    roomLink: { type: String, default: '' }
});

</script>

<style lang="scss" scoped>

.image {
    margin: 40px 0;
    border-radius: 10px;
}

.subtitle {
    max-width: 400px;
    text-align: center;
}

</style>