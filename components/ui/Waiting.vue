<template>
    <div class="flex-col fade-in">
        <img class="gif" src="~/assets/images/mr-bean.gif" alt="" />
        <h1>{{ message }}</h1>
    </div>
</template>

<script>

export default {
    name: 'Waiting',
    props: { message: { type: String, default: '' } }
}

</script>
