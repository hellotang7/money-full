import { RouteRecordRaw } from "vue-router";
import { Welcome } from "../views/Welcome";
import { One } from "../components/welcome/One";
import { Two } from "../components/welcome/Two";
import { Three } from "../components/welcome/Three";
import { Four } from "../components/welcome/Four";
import { FourActions } from "../components/welcome/FourActions";
import { OneActions } from "../components/welcome/OneActions";
import { ThreeActions } from "../components/welcome/ThreeActions";
import { TwoActions } from "../components/welcome/TwoActions";
import { ItemPage } from "../views/ItemPage";
import { ItemList } from "../components/item/ItemList";
import { ItemCreate } from "../components/item/ItemCreate";
import { TagPage } from "../components/tags/TagPage";
import { TagCreate } from "../components/tags/TagCreate";
import { TagEdit } from "../components/tags/TagEdit";
import { SignInPage } from "../views/SignInPage";
import { StatisticsPage } from "../views/StatisticsPage";
import {ComingSoon} from '../views/ComingSoon';
import {User} from '../views/User';
import {Start} from '../components/welcome/Start';



export const routes = [
  { path: "/", redirect: "/welcome" },

  {
    path: '/welcome',
    component: Welcome,
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
    component: ItemPage,

    children: [
      { path: "", component: ItemList },
      { path: "create", component: ItemCreate },
    ],
  },
  {
    path: "/tags",
    component: TagPage,
    children: [
      { path: "create", component: TagCreate },
      { path: ":id/edit", component: TagEdit },
    ],
  },
  { path: "/sign_in", component: SignInPage },
  { path: "/statistics", component: StatisticsPage },
  {path: '/export', component: ComingSoon},
  {path: '/user', component: User},
  {path: '/start', component: Start},

];
