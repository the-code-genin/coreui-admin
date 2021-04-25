import NanoBar from 'nanobar'
import VueRouter from 'vue-router';
import { VueConstructor } from 'vue/types/umd';

export default {
    install(vue: VueConstructor, options: {router: VueRouter}) {
        const nanoBar = new NanoBar();

        options.router.beforeEach((to, from, next) => {
            nanoBar.go(30);
            next();
        });
          
        options.router.afterEach(() => {
            nanoBar.go(100);
        });
    }
}