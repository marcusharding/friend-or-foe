<template>
    <div class="error fade-in">
        <h1>Dang it, this page doesnt exist.</h1>
        <NuxtLink 
            to="/" 
            class="button"
        >
            Go home
        </NuxtLink>
    </div>
</template>

<script>

    export default {
        props: ['error'],
        layout: 'error', // you can set a custom layout for the error page
    }

</script>

<style lang="scss" scoped>

.error {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.button {
    max-width: 200px;
}

h1 {
    color: #ffffff;
}

</style>