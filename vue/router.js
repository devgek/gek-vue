console.log("router.js");

import Vue from "vue";
import VueRouter from "vue-router";
import GekLayoutPlain from "./layouts/GekLayoutPlain.vue";
import GekLayoutEntityPage from "./layouts/GekLayoutEntityPage.vue";
import GekPageNotFound from "./pages/gekNotFound.vue";
import GekPageLogin from "./pages/gekPageLogin.vue";
import GekPageUser from "./pages/entities/gekPageUser.vue";
import GekPageContact from "./pages/entities/gekPageContact.vue";
import GekPage1 from "./pages/gekPage1.vue";

Vue.use(VueRouter);

// Routes
const myRoutes = [
  {
    path: "/login",
    alias: "",
    component: GekLayoutPlain,
    children: [
      {
        path: "",
        name: "Login",
        component: GekPageLogin,
        props: { mainHeader: "Bitte anmelden", startPage: "Page1" },
        meta: { description: "show login" },
      },
    ],
  },
  {
    path: "/admin",
    component: GekLayoutEntityPage,
    children: [
      {
        path: "user",
        component: GekPageUser,
        name: "User",
        meta: { description: "show user" },
      },
      {
        path: "contact",
        component: GekPageContact,
        name: "Contact",
        meta: { description: "show contact" },
      },
    ],
  },
  {
    path: "/",
    component: GekLayoutEntityPage,
    children: [
      {
        path: "page1",
        component: GekPage1,
        name: "Page1",
        meta: { description: "show page1" },
      },
    ],
  },
  {
    // not found handler
    path: "*",
    component: GekPageNotFound,
  },
];

const myRouter = new VueRouter({
  routes: myRoutes,
});

myRouter.beforeEach((to, from, next) => {
  console.log("myRouter::beforeEach", to.path);
  // redirect to login page if user is not logged in and trying to access a restricted page
  const publicPages = ["/page2", "/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("userData");

  if (authRequired && !loggedIn) {
    console.log("route to login from " + to.path, "authRequired:", authRequired, "loggedIn:", loggedIn);
    next({ path: "/login" });
  } else {
    next();
  }
});

export default myRouter;
