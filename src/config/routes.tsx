
import { Foo } from '../views/Foo'
import { Bar } from '../views/Bar'
import { RouteRecordRaw } from 'vue-router'
import { Welcome } from '../views/Welcome'
import { One } from '../components/welcome/one'
import { Two } from '../components/welcome/two'
import { Three } from '../components/welcome/three'
import { Four } from '../components/welcome/four'


export const routes = [
  { path: '/', component: Foo },
  { path: '/about', component: Bar },
    
  { path: '/welcome', 
    component:Welcome,
    children:[
        {path:'1',component:One,},
        {path:'2',component:Two,},
        {path:'3',component:Three,},
        {path:'4',component:Four,},
      ]
  },

]




