import { StateInterface } from './interfaces'

let state: StateInterface = {
    user: null
};


export default {
    namespaced: true,

    state,

    getters: {
        /**
         * Get the current loggd in user instance
         */
        user(state: StateInterface) {
            return state.user;
        }
    },

    mutations: {
        /**
         * Set the current logged in user interface
         */
        setUser(state: StateInterface, user: object|null) {
            state.user = user;
        }
    },

    actions: {
    }
}