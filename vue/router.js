// Routes
const routes = [
  {
    path: "/login",
    alias: "",
    component: gekLayoutPlain,
    children: [
      {
        path: "",
        name: "Login",
        component: gekPageLogin,
        props: { mainHeader: "Bitte anmelden", startPage: "Page1" },
        meta: { description: "show login" },
      },
    ],
  },
  {
    path: "/admin",
    component: gekLayoutPage,
    children: [
      {
        path: "user",
        component: gekPageUser,
        name: "User",
        meta: { description: "show user" },
      },
      {
        path: "contact",
        component: gekPageContact,
        name: "Contact",
        meta: { description: "show contact" },
      },
    ],
  },
  {
    path: "/",
    component: gekLayoutPage,
    children: [
      {
        path: "page1",
        component: gekPage1,
        name: "Page1",
        meta: { description: "show page1" },
      },
    ],
  },
  {
    // not found handler
    path: "*",
    component: gekNotFoundView,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if user is not logged in and trying to access a restricted page
  const publicPages = ["/", "/page2", "/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    console.log("route to Login from " + to.path);
    return next({ to: "/login" });
  }
  next();
});
