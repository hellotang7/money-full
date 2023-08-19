import { One } from "../components/welcome/One";
import { Two } from "../components/welcome/Two";
import { Three } from "../components/welcome/Three";
import { Four } from "../components/welcome/Four";
import { FourActions } from "../components/welcome/FourActions";
import { OneActions } from "../components/welcome/OneActions";
import { ThreeActions } from "../components/welcome/ThreeActions";
import { TwoActions } from "../components/welcome/TwoActions";
import { ItemList } from "../components/item/ItemList";
import { ItemCreate } from "../components/item/ItemCreate";
import { TagCreate } from "../components/tags/TagCreate";
import { TagEdit } from "../components/tags/TagEdit";
import {ComingSoon} from '../views/ComingSoon';



export const routes = [
  { path: "/", redirect: "/welcome" },

  {
    path: '/welcome',
    component: ()=>import('../views/Welcome'),
    beforeEnter: (to:any, from:any, next:any) => {
      localStorage.getItem('skipFeatures') === 'yes' ? next('/start') : next()
    },


    children: [
      { path: "", redirect: "/welcome/1" },
      {
        path: "1",
        name: "Welcome1",
        components: { main: One, footer: OneActions },
      },
      {
        path: "2",
        name: "Welcome2",
        components: { main: Two, footer: TwoActions },
      },
      {
        path: "3",
        name: "Welcome3",
        components: { main: Three, footer: ThreeActions },
      },
      {
        path: "4",
        name: "Welcome4",
        components: { main: Four, footer: FourActions },

      },
    ],
  },

  {
    path: "/items",
    component: ()=>import('../views/ItemPage'),

    children: [
      { path: "", component: ItemList },
      { path: "create", component: ItemCreate },
    ],
  },
  {
    path: "/tags",
    component: ()=>import('../components/tags/TagPage'),
    children: [
      { path: "create", component: TagCreate },
      { path: ":id/edit", component: TagEdit },
    ],
  },
  { path: "/sign_in", component: ()=>import('../views/SignInPage') },
  { path: "/statistics", component: ()=>import('../views/StatisticsPage') },
  {path: '/export', component: ()=>import('../views/ComingSoon')},
  {path: '/user', component: ()=>import('../views/User')},
  {path: '/start', component: ()=>import('../components/welcome/Start')},

];
