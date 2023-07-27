import { Welcome } from '../views/Welcome'
import { One } from '../components/welcome/One'
import { Two } from '../components/welcome/Two'
import { Three } from '../components/welcome/Three'
import { Four } from '../components/welcome/Four'


export const routes = [
  { path: '/', redirect:'/welcome'},

  { path: '/welcome',
    component:Welcome,
    children:[
        {path: '',redirect:'/welcome/1'},
        {path:'1',component:One,},
        {path:'2',component:Two,},
        {path:'3',component:Three,},
        {path:'4',component:Four,},
      ]
  },

]




