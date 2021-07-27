import '@/assets/scss/style.scss'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons'
import VueMeta from 'vue-meta'
import Vuelidate from 'vuelidate'
import ScrollToTop from '@/lib/plugins/scroll-to-top'
import User from '@/models/user'
import Auth from '@/services/api/auth'
import VueNanoBar from '@the_code_genin/vue-nanobar'
import VueAuth from '@the_code_genin/vue-auth'



Vue.config.productionTip = false
Vue.use(CoreuiVue);
Vue.use(VueMeta);
Vue.use(Vuelidate);
Vue.use(new VueNanoBar, {
  router
});
Vue.use(new VueAuth, {
  store,
  router,
  storeModuleName: 'Auth',
  redirects: {
    login: { name: 'Login' },
    dashboard: { name: 'Dashboard' },
    home: { name: 'Home' },
  },
  logoutRoute: {
    name: 'Logout',
    path: '/logout'
  },
  async getUser(): Promise<User> {
    return await Auth.index();
  },
  async logout(): Promise<void> {
    await Auth.logout();
  },
});
Vue.use(ScrollToTop);


new Vue({
  router,
  store,
  // @ts-ignore
  icons,
  render: h => h(App)
}).$mount('#app')
