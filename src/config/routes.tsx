
import { Foo } from '../views/Foo'
import { Bar } from '../views/Bar'
import { RouteRecordRaw } from 'vue-router'
import { Welcome } from '../views/Welcome'
import { One } from '../components/welcome/One'
import { Two } from '../components/welcome/Two'
import { Three } from '../components/welcome/Three'
import { Four } from '../components/welcome/Four'


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




