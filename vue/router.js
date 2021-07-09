import Vue from "vue";
import VueRouter from "vue-router";
import GekLayoutPlain from "./layouts/gekLayoutPlain.vue";
import GekLayoutPage from "./layouts/gekLayoutPage.vue";
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
    path: "/xxx",
    name: "xxx",
    component: GekPageLogin,
    props: { mainHeader: "Bitte anmelden", startPage: "Page1" },
    meta: { description: "show login" },
  },
  {
    path: "/admin",
    component: GekLayoutPage,
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
    component: GekLayoutPage,
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
  myRoutes,
});

myRouter.beforeEach((to, from, next) => {
  console.log("myRouter::beforeEach", to.path);
  // redirect to login page if user is not logged in and trying to access a restricted page
  const publicPages = ["/page2", "/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    console.log("route to xxx from " + to.path);
    next({ to: "/xxx" });
  } else {
    next();
  }
});

export default myRouter;
