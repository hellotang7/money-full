import { createApp } from "vue";
import { App } from "./App";
import { createRouter } from "vue-router";
import { routes } from "./config/routes";
import { history } from "./shared/histouy";
import "@svgstore";
import { http } from "./shared/Http";
import { fetchMe, mePromise } from "./shared/me";

const router = createRouter({ history, routes });

fetchMe();

router.beforeEach((to, from) => {
  if (
    to.path === "/" ||
    to.path.startsWith("/welcome") ||
    to.path.startsWith("/sign_in")
  ) {
    return true;
  } else {
    return mePromise!.then(
      () => true,
      () => "/sign_in?return_to=" + to.path //登录后返回到原始页面
    );
  }
});

const app = createApp(App);
app.use(router);
app.mount("#app");
