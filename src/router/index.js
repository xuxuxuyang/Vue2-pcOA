// 引入Vue|Vue-router
import Vue from "vue";
import Router from "vue-router";

// 使用路由插件
Vue.use(Router);

/* 引入最外层骨架的一级路由组件*/
import Layout from "@/layout";

//公共路由
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true, //控制是否能查看
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },
];

// 权限路由
export const asyncRoutes = [
  //1.权限管理
  {
    name: "Acl",
    path: "/acl",
    component: Layout,
    redirect: "/acl/user/list",
    meta: {
      title: "权限管理",
      icon: "el-icon-lock",
    },
    children: [
      {
        name: "User",
        path: "user/list",
        component: () => import("@/views/acl/user/list"),
        meta: {
          title: "用户管理",
        },
      },
      {
        name: "Role",
        path: "role/list",
        component: () => import("@/views/acl/role/list"),
        meta: {
          title: "角色管理",
        },
      },
      {
        name: "RoleAuth",
        path: "role/auth/:id",
        component: () => import("@/views/acl/role/roleAuth"),
        meta: {
          activeMenu: "/acl/role/list",
          title: "角色授权",
        },
        hidden: true,
      },
      {
        name: "Permission",
        path: "permission/list",
        component: () => import("@/views/acl/permission/list"),
        meta: {
          title: "菜单管理",
        },
      },
    ],
  },
  //2.商品管理
  {
    path: "/product",
    component: Layout,
    name: "Product",
    meta: { title: "商品管理", icon: "el-icon-goods" },
    children: [
      {
        path: "trademark",
        name: "TradeMark",
        component: () => import("@/views/product/tradeMark"),
        meta: { title: "品牌管理" },
      },
      {
        path: "attr",
        name: "Attr",
        component: () => import("@/views/product/Attr"),
        meta: { title: "平台属性管理" },
      },
      {
        path: "spu",
        name: "Spu",
        component: () => import("@/views/product/Spu"),
        meta: { title: "Spu管理" },
      },
      {
        path: "sku",
        name: "Sku",
        component: () => import("@/views/product/Sku"),
        meta: { title: "Sku管理" },
      },
    ],
  },
];

// 404路由：当路径出现错误的时候重定向404（在用户登录之后动态注册）
export const anyRoutes = { path: "*", redirect: "/404", hidden: true };

//生成路由
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    // 因为注册的路由是‘死的’，‘活的’路由如果根据不同用户（角色）可以展示不同菜单
    routes: constantRoutes, //默认只注册了公共路由，动态路由登录后注册
  });

const router = createRouter();

// 重置路由（用户退出时需要调用）
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; //重置路由核心方法
}

export default router;
