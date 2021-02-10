import Vue from 'vue';
import Photo from './Photo.vue';

// plugins
import "@/plugins/element";

Vue.config.productionTip = false;
// const ipc = require('electron').ipcRenderer;

new Vue({
    render: h => h(Photo)
}).$mount('#app');

// // listen for data from the main process if you want to, put this in your component if necessary
// ipc.on('data', (event, data) => {
//     // use data
//     return;
// });
