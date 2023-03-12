<template>
    <div class="create-card">
        <h1>[Love Powered]</h1>
        <p>Show how well you know your valentine. Then see how your love powers all.</p>
        <img src="@/assets/images/placeholder.png" alt="" />
        <NuxtLink :to="roomLink">Create a valentines card</NuxtLink>
    </div>
</template>

<script setup>

// Props
const props = defineProps({
    roomLink: { type: String, default: '' }
});

</script>

<style lang="scss" scoped></style>