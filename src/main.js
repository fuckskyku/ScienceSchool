/*
 * File: main.js
 * Project: scienceschool
 * File Created: Tuesday, 21st May 2019 1:34:23 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Wednesday, 3rd July 2019 5:15:02 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

//引入Vuex
import store from "./Store/Store";

//引入动画Css
import "animate.css";

//引入ElementUI
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

//分页组件挂载全局
import page from "./components/Templet/Page.vue";
Vue.component("page", page);

//路由拦截（以及面包屑）
import "./router/routerSetting";

//引入工具类
import utils from "./utils/util";
//引入时间转换
import "./utils/Date";

//引入混入文件
import Mixin from "./utils/MiXin";
Vue.mixin(Mixin);

Vue.config.productionTip = false;
Vue.use(Element);
Vue.use(utils);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});

// export default Vuethis;
