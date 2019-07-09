/*
 * File: InterfaceState.js
 * Project: scienceschool
 * File Created: Wednesday, 29th May 2019 9:51:55 am
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Tuesday, 25th June 2019 2:17:30 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */

const InterfaceState = {
  //默认状态值
  state: {
    HeaderState: "Home", //首页导航切换到那一个导航
    SettingLogState: "login", //日志状态

    SettingConfig: "SchoolInfoConfig", //系统设置选中状态
    SettingConfigParent: "1", //系统设置选中状态

    LoginIfShow: false, //登录控制间隙不显示

  },
  //提交方法
  mutations: {
    HeaderState(state, change) {
      state.HeaderState = change;
    },
    SettingLogState(state, change) {
      state.SettingLogState = change;
    },
    SettingConfig(state, change) {
      state.SettingConfig = change;
    },
    // SettingConfigParent(state, change) {
    //   state.SettingConfig = change;
    // },

    LoginIfShow(state, change) {
      state.LoginIfShow = change;
    }
  },
  actions: {
    setHeaderState(state, change) {
      state.commit("HeaderState", change);
    },
    setSettingLogState(state, change) {
      state.commit("SettingLogState", change);
    },
    setSettingConfig(state, change) {
      state.commit("SettingConfig", change);
    },
    // setSettingConfigParent(state, change) {
    //   state.commit("SettingConfigParent", change);
    // },
    setLoginIfShow(state, change) {
      state.commit("LoginIfShow", change);
    }
  }
};

export default InterfaceState;
