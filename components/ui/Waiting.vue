<template>
    <div class="flex-col fade-in">
        <img class="gif" src="@/assets/images/mr-bean.gif" alt="" />
        <h1>{{ message }}</h1>
    </div>
</template>

<script setup>

// Props
const props = defineProps({
    message: { type: String, default: '' }
});

// Reactive data
const { message } = toRefs(props);

</script>
