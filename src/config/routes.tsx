import { Welcome } from "../views/Welcome";
import { One } from "../components/welcome/One";
import { Two } from "../components/welcome/Two";
import { Three } from "../components/welcome/Three";
import { Four } from "../components/welcome/Four";
import { FourActions } from "../components/welcome/FourActions";
import { OneActions } from "../components/welcome/OneActions";
import { ThreeActions } from "../components/welcome/ThreeActions";
import { TwoActions } from "../components/welcome/TwoActions";
import { StartPage } from "../views/StartPage";
import { ItemPage } from "../views/ItemPage";
import { ItemList } from "../components/item/ItemList";
import { ItemCreate } from "../components/item/ItemCreate";
import { TagPage } from "../components/tags/TagPage";
import { TagCreate } from "../components/tags/TagCreate";
import { TagEdit } from "../components/tags/TagEdit";
import { SignInPage } from "../views/SignInPage";
import { StatisticsPage } from "../views/StatisticsPage";

export const routes = [
  { path: "/", redirect: "/welcome" },

  {
    path: "/welcome",
    component: Welcome,
    beforeEnter: (to, from, next) => {
      localStorage.getItem("skipFeatures") === "yes" ? next("/start") : next();
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
  { path: "/start", component: StartPage },
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
      { path: ":id/deit", component: TagEdit },
    ],
  },
  { path: "/sign_in", component: SignInPage },
  { path: "/statistics", component: StatisticsPage },
];
