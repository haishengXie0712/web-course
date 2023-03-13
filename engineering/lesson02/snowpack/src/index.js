import {createApp} from 'vue';
import App from './App.vue';

const xhr = new XMLHttpRequest()
xhr.open('get', '/public/public.js')
xhr.addEventListener('load', (e) => {
    eval(e.currentTarget.responseText)
})
xhr.send()

console.error(import.meta.env)
createApp(App).mount('#app');
