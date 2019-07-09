/*
 * File: routerSetting.js
 * Project: msschoolnew
 * File Created: Tuesday, 4th December 2018 5:14:46 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Tuesday, 25th June 2019 2:32:23 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2018 - 2018 Your Company, Your Company
 */

import Router from "../router/index";
import Store from "../Store/Store";
import Vue from "vue";
import {} from "^/api/api";
let _Vue = new Vue();
//路由守卫
var routeList = [];
// console.log(Store.state.crumbsList.crumbsList,'路由表');
//  &&Store.state.crumbsList.crumbsList.length
Router.beforeEach((to, from, next) => {
  //   if (to.name == "SchoolInfoConfig") {
  //     if (
  //       Store.state.crumbsList.crumbsList &&
  //       Store.state.crumbsList.crumbsList.length != 0
  //     ) {
  //       routeList = Store.state.crumbsList.crumbsList.slice(
  //         0,
  //         Store.state.crumbsList.crumbsList.length - 1
  //       );
  //     }
  //     // 面包屑导航
  //     var index = -1;
  //     for (var i = 0; i < routeList.length; i++) {
  //       if (routeList[i].name == to.name) {
  //         index = i;
  //         break;
  //       }
  //     }
  //     if (routeList.length == 4) {
  //       routeList.splice(routeList.length - 1, 1);
  //     }
  //     if (index !== -1) {
  //       //如果存在路由列表，则把之后的路由都删掉
  //       routeList.splice(index + 1, routeList.length - index - 1);
  //     } else if (to.name !== "Login") {
  //       routeList.push({
  //         name: to.name,
  //         path: to.fullPath,
  //         title: to.meta.title
  //       });
  //       to.meta.routeList = routeList;
  //     }
  //     Store.commit("CrumbsList", routeList);
  //     next();
  //   }

  next();
});
