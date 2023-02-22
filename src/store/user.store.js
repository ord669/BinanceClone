import { userService } from "../services/user.service.js"

export const userStore = {
    state: {
        user: null
    },
    getters: {
        user({ user }) {
            return user
        },
    },
    mutations: {
        setUser(state, { user }) {
            try {
                state.user = user
            } catch (err) {
                console.log('err from stores', err)
            }
        },

    },
    actions: {
        async onSetUser({ commit, dispatch }) {
            const user = await userService.getLoggedinUser()
            commit({ type: 'setUser', user })
            dispatch({ type: "loadContacts" });
        },
        async onLogin({ commit, dispatch }, { credentials }) {
            try {
                const user = await userService.login(credentials);
                commit({ type: "setUser", user });
                dispatch({ type: "loadContacts" });
                console.log("success login:");
            } catch (err) {
                console.log("Cannot login", err);
                throw err;
            }
        },
        async onLogout({ commit, dispatch }) {
            try {
                const user = await userService.logout();
                commit({ type: "setUser", user });
                dispatch({ type: "loadContacts" });
                console.log("success logout:");
            } catch (err) {
                console.log("Cannot logout");
                throw err;
            }
        },
        async onSignup({ commit, dispatch }, { credentials }) {
            try {
                const user = await userService.signup(credentials);
                commit({ type: "setUser", user });
                dispatch({ type: "loadContacts" });
                console.log("success:signup");
            } catch (err) {
                console.log("Cannot signup");
                throw err;
            }
        },
        async sendMoney({ commit, dispatch }, { user: contactToChange, amount }) {
            try {

                const user = await userService.updateBalance(amount);
                commit({ type: "setUser", user });

                dispatch({ type: "updateContactBalance", contactToChange, amount });
            } catch (err) {
                console.log('err frmo', err)

            }

        }

    }
};