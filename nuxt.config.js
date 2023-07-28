export default {

    head: {
        title: 'friend-or-foe',
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

    css: [
        '~/assets/styles/global.scss',
    ],

    components: true,

    modules: [
        '~/modules/ws',
    ],

    env: {
		WEBSOCKET_PROTOCOL: process.env.WEBSOCKET_PROTOCOL,
		HTTP_PROTOCOL: process.env.HTTP_PROTOCOL
	}
}
