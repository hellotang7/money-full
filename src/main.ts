import { createApp } from 'vue'
import { App } from './App'
import {createRouter} from 'vue-router'
import { routes } from './config/routes'
import { history } from './shared/histouy'




const router = createRouter({history,routes})


const app = createApp(App)
router
app.mount('#app')
