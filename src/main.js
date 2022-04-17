import Vue from "vue";
import App from "./App";
import store from "./store";

// 配置全局路由守卫
import router from "./router";
import "@/permission";

//引入重置样式
import "normalize.css/normalize.css";
import "@/styles/index.scss";

//引入elm-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";
Vue.use(ElementUI, { locale });

//引入SVG的图片
import "@/icons";
// 引入v-charts配置文件
import "@/plugins/vcharts";

//关闭提示
Vue.config.productionTip = false;

//挂载API
import API from "@/api";
Vue.prototype.$API = API;

// 注册全局组件
import CategorySelect from "@/components/CategorySelect";
import HintButton from "@/components/HintButton";
Vue.component(CategorySelect.name, CategorySelect);
Vue.component(HintButton.name, HintButton);

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
