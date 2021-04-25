import Vue from 'vue';
import { VueConstructor } from 'vue/types/umd';

interface UpdateScrollPositionFunction {
    (this: Vue): void
}

let updateScrollPosition: UpdateScrollPositionFunction = function() {
    let app = <Element> document.querySelector('#app');
    if (this.$route == null) return;
    let hash: string = this.$route.hash;

    if (hash != '') {
        let scrollTopElement = <any> app.querySelector(hash);
        if (scrollTopElement != null) app.scrollTop = <number> scrollTopElement.offsetTop;
        else app.scrollTop = 0;
    } else app.scrollTop = 0;
}

export default {
    install(vue: VueConstructor) {
        vue.mixin(
            Vue.extend({
                beforeRouteEnter(to, from, next) {
                    next(vm => {
                        vm.$nextTick(updateScrollPosition);
                    });
                },
                beforeRouteUpdate (to, from, next) {
                    this.$nextTick(updateScrollPosition);
                    next();
                }
            })
        );
    }
}