import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')


router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !store.getters.logginIn) next({ name: 'Login' })
    else next()
  })