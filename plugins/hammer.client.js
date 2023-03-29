import * as Hammer from 'hammerjs'

export default defineNuxtPlugin((nuxtApp) => {
  
    return {
        provide: {
            Hammer
        }
    }
});