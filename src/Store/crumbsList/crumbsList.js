/*
 * File: crumbsList.js
 * Project: msschoolnew
 * File Created: Tuesday, 4th December 2018 5:16:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Wednesday, 29th May 2019 9:54:15 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2018 - 2018 Your Company, Your Company
 */

//配置面包屑导航持久化
//数据
const crumbs = {
  state: {
    crumbsList: []
  },
  //提交方法
  mutations: {
    CrumbsList(state, change) {
      state.crumbsList = change;
    }
  },
  actions: {
    setCrumbsList(state, change) {
      state.commit("CrumbsList", change);
    }
  }
};
export default crumbs;
