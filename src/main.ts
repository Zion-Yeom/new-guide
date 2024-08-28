import {App, createApp} from 'vue';
import AppMain from './App.vue';
import router from './plugin/router';
import vrix from 'vrix.vue';
import config from './config';
import store from './plugin/store';
import i18n from './plugin/i18n';

import '../public/css/vrix.css';
import '../public/css/common.css';
import '../public/css/style.css';


/*config(createApp(AppMain).use(store).use(router).use(i18n).use(vrix)).then((app: App) => {
    //app.mount('#app');
});*/
 config(createApp(AppMain).use(store).use(router).use(i18n).use(vrix)).mount('#app');
