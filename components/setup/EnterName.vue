<template>
    <div class="name flex-col fade-in">
        <h1 class="heading">Enter Your Name</h1>
        <input 
            class="input"
            placeholder="Enter Your Name" 
            :value="name" 
            @input="event => {
                name = event.target.value;
                $store.commit('user/updateName', name);
            }" 
        />
        <button 
            :class="`button ${!name ? 'disabled' : ''}`"
            @click="
                updateState('INSTRUCTIONS');
                socketEmits('user_name', name);
            "
        >
            Submit
        </button>
    </div>
</template>

<script>

export default {
    name: 'EnterName',
    props: {
        updateState: { type: Function, default: () => {} },
        socketEmits: { type: Function, default: () => {} }
    },
    data() {
        return {
            name: ''
        }
    }
}

</script>

<style lang="scss" scope>

.name {
    text-align: center;
}

.heading {
    margin-bottom: 50px;
}

.input {
    margin-bottom: 50px;
}

.input:focus-visible {
    outline: #f09;
    border-color: #f09;
}

</style>