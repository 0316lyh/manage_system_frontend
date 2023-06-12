import { createStore } from 'vuex'

const store = createStore({
    state () {
        return {
            count: 10,
            name: 'tom',
            todos: [
                { id: 1, text: 'java', done: true },
                { id: 2, text: 'JavaScript', done: true }
            ],

            // 已登录用户账号密码
            username:"",
            password:"",

            loginUserId: -1, // 已登录账号的id
        }
    },
    mutations: {
        increment (state, payload) {
            state.count += payload.num;
        },

        // 登陆成功后标记登录的账号id
        loginSuccess(state, id) {
            state.loginUserId = id;
        },
        // 登陆成功后标记登录的用户姓名
        loginSuccess2(state, username) {
            state.username = username;
        },
        // 登出成功后
        logoutSuccess(state) {
            state.loginUserId = -1;
        }
    },
    getters: {
        doneCount(state) {
            return state.todos.filter(todo => todo.done === true).length;
        }
    }
})

export default store;
