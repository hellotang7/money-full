import { useMeStore } from './stores/useMeStore';
import { routes } from './config/routes';
import { createApp } from 'vue'
import { App } from './App'
import { createRouter } from 'vue-router'
import {history} from './shared/histouy';
import '@svgstore';
import { createPinia } from 'pinia';
import {Dialog} from 'vant';


const router = createRouter({ history, routes })
const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')

const meStore = useMeStore()
meStore.fetchMe()



const whiteList: Record<string, 'exact' | 'startsWith'> = {
  '/': 'exact',
  '/start': 'exact',
  '/welcome': 'startsWith',
  '/sign_in': 'startsWith',
}

router.beforeEach((to, from) => {
  for (const key in whiteList) {
    const value = whiteList[key]
    if (value === 'exact' && to.path === key) {
      return true
    }
    if (value === 'startsWith' && to.path.startsWith(key)) {
      return true
    }
  }
  return meStore.mePromise!.then(
      () => true,
      async () => '/sign_in?return_to=' + from.path

  );
})


if (document.documentElement.clientWidth > 500){
  window.alert('请使用手机打开本页面，以保证浏览效果')
  const img = document.createElement('img')
  img.src = './url.png'
  img.style.position = 'fixed'
  img.style.left = '50%'
  img.style.top = '50%'
  img.style.transform = 'translate(-50%,-50%)'
  img.style.boxShadow = '0 0 10px rgba(0,0,0,0.25)'
  document.body.appendChild(img)

  window.onclick = function(event) {
    if (event.target !== img) {
      img.style.display = "none";
    }
  }
}
