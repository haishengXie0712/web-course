/** @type {import("snowpack").SnowpackUserConfig } */
const config = {
    mode: "development",
    // root: './src',
    // extends: ''
    exclude: ['**/node_modules/**/*'],
    mount: {
        public: {
            url: '/public',
            static: false,
            resolve: true,
        },
        src: {
            url: '/',
            static: false,
            resolve: true,
        }
    },
    env: {
        API: 'API'
    },
    alias: {
        '@src': './src',
        '@public': './public'
    },
    plugins: [
        '@snowpack/plugin-vue',
    ],
};

export default config;
