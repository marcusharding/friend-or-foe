<template>
    <div class="summary flex-col fade-in">
        <p>Summary</p>
    </div>
</template>

<script setup>

// Props
const props = defineProps({
    socket: { type: Object, default: () => {} }
});

</script>

<style lang="scss" scoped></style>