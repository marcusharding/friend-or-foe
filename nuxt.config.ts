// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    app: {
        head: {
            title: 'compatibility-app',
            htmlAttrs: {
                lang: 'en'
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: '' },
                { name: 'format-detection', content: 'telephone=no' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        },
    },

    css: [
        '@/assets/styles/global.scss',
    ],

    components: true,

    modules: [
        '~/modules/ws',
        '@pinia/nuxt',
    ],

    // serverHandlers: [
    //     {
    //         host: '0.0.0.0'
    //     }
    // ],

    // build: {
    //     standalone: true
    // },

    runtimeConfig: {
		WEBSOCKET_PROTOCOL: process.env.WEBSOCKET_PROTOCOL,
		HTTP_PROTOCOL: process.env.HTTP_PROTOCOL
    }
});
