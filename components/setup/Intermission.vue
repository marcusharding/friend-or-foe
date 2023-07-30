<template>
    <div class="flex-col">
        <Waiting v-if="!hasPartnerSelections" message="Waiting for partner to answer their questions..." />
        <div :class="hasPartnerSelections ? 'flex' : 'hidden'" class="flex-col">
            <h1 class="fade-in text-center" ref="heading">The results are in!</h1>
            <img class="gif hidden" :src="imagePath" alt="" ref="gif" />
            <h1 class="hidden" ref="messageContainer" >{{ message }}</h1>
        </div>
    </div>
</template>

<script>

// TO DO - Commit all below score calculations etc to store for summary

// Modules.
import { mapState } from 'vuex';

// Components
import Waiting from '../ui/Waiting.vue';

// Data
import { scoreCopy } from '~/data/summary';

// Assets
import shocked from '~/assets/images/shocked.gif';
import confused from '~/assets/images/confused.gif';
import unimpressed from '~/assets/images/unimpressed.gif';
import hug from '~/assets/images/hug.gif';

export default {
    name: 'Intermission',
    components: { Waiting },
    props: {
        updateState: { type: Function, default: () => {} }
    },
    data() {
        return {
            score: 0,
            message: '',
            imagePath: ''
        }
    },
    created() { if ( this.hasPartnerSelections ) this.handleIntermission() },
    computed: {
        ...mapState({
            partnerSelections: state => state.questions.partnerSelections,
            userSelections: state => state.questions.userSelections,
            host: state => state.user.host,
        }),
        hasPartnerSelections() { return this.partnerSelections.length > 0 }
    },
    watch: {
        hasPartnerSelections: function (newValue, oldValue) {

            if ( newValue ) handleIntermission();
        }
    },
    methods: {
        calculateScore() {

            this.userSelections.forEach(selection => {

                if ( this.partnerSelections.filter(e => e.selection === selection.selection).length > 0 ) {

                    this.score = this.score += 1;
                }
            });
        },
        setMessage() {

            switch( this.score ) {

                case 0:
                    this.message = getMessage(this.score);
                    this.imagePath = shocked;
                    break;

                case 1:
                    this.message = getMessage(this.score);
                    this.imagePath = confused;
                    break;

                case 2:
                    this.message = getMessage(this.score);
                    this.imagePath = unimpressed;
                    break;

                case 3:
                    this.message = getMessage(this.score);
                    this.imagePath = hug;
                    break;
            }
        },
        getMessage(value) {

            let text = '';

            const object = scoreCopy.filter(obj => {

                return obj.value === value;
            });

            if ( object && this.host ) text = object[0].hostText;

            if ( object && !this.host ) text = object[0].guestText;

            return text;
        },
        handleIntermission() {

            calculateScore();
            setMessage();

            setTimeout(() => this.$refs.heading.classList.add('opacity-0', 'fade-out'), 2000);
            setTimeout(() => this.updateState.value('SUMMARY'), 6000);

            setTimeout(() => { 

                this.$refs.gif.classList.remove('hidden');
                this.$refs.gif.classList.add('block', 'fade-in');

            }, 2500);

            setTimeout(() => {

                this.$refs.messageContainer.classList.remove('hidden');
                this.$refs.messageContainer.classList.add('block', 'fade-in');

            }, 2500);
        }
    }
}

</script>