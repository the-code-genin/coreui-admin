export default {
    state: {
        sidebarShow: 'responsive',
        sidebarMinimize: false
    },
    mutations: {
        toggleSidebarDesktop (state: CoreUIStoreState) {
            const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
            state.sidebarShow = sidebarOpened ? false : 'responsive'
        },
        toggleSidebarMobile (state: CoreUIStoreState) {
            const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
            state.sidebarShow = sidebarClosed ? true : 'responsive'
        },
        set (state: CoreUIStoreState, [variable, value]: [string, any]) {
            state[variable] = value
        }
    },
    getters: {
        sidebarShow(state: CoreUIStoreState) {
            return state.sidebarShow;
        },
        sidebarMinimize(state: CoreUIStoreState) {
            return state.sidebarMinimize;
        }
    }
}