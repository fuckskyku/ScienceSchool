/*
 * File: Header.vue
 * Project: scienceschool
 * File Created: Tuesday, 21st May 2019 2:18:39 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Thursday, 4th July 2019 5:57:45 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <header id="Header">
    <div>统一数据基础平台</div>
    <el-menu
      :default-active="InterfaceState.HeaderState"
      :router="true"
      background-color="#006190"
      text-color="#FFF"
      active-text-color="#7CD4FF"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="Home">首页</el-menu-item>
      <el-menu-item index="ApplyManage" v-if="isAuthority('sys:app:menu')">应用管理</el-menu-item>
      <el-menu-item index="NavHome" v-if="isAuthority('sys:setting:menu')">系统设置</el-menu-item>
      <!-- <el-menu-item index="4">账号管理</el-menu-item> -->
      <el-menu-item index="SettingLog" v-if="isAuthority('sys:log:menu')">系统日志</el-menu-item>
      <el-menu-item index="ChangePwd">LINMEIMEI</el-menu-item>
      <el-menu-item @click="loginOut">退出</el-menu-item>
    </el-menu>
  </header>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { UserLogout } from "^/api/api";
export default {
  data() {
    return {
      // activeIndex: "Home"
    };
  },
  created() {
    if (this.$route.name == "Home") {
      this.setHeaderState("Home");
    } else {
    }
  },
  computed: { ...mapState(["InterfaceState"]) },
  methods: {
    ...mapActions(["setHeaderState", "setSettingConfig"]),
    handleSelect(key, keyPath) {
      this.setHeaderState(key);
      this.setSettingConfig("SchoolInfoConfig");
    },
    loginOut() {
      UserLogout().then(res => {
        window.location.href = res.data.data;
      });
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/HeaderAsFooter.scss";
</style>
