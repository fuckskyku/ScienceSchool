/*
 * File: Store.js
 * Project: scienceschool
 * File Created: Wednesday, 29th May 2019 9:38:41 am
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Wednesday, 3rd July 2019 5:16:01 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"; //vuex持久化
//界面各种状态
import InterfaceState from "./InterfaceState/InterfaceState";
import crumbsList from "./crumbsList/crumbsList"; //面包屑数据持久化
import Authority from "./Authority/Authority"; //权限
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    crumbsList,
    InterfaceState,
    Authority
  },
  plugins: [createPersistedState({ key: "SCIENCESCHOOL" })]
});
