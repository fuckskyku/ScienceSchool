/*
 * File: App.vue
 * Project: scienceschool
 * File Created: Tuesday, 21st May 2019 1:34:23 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Monday, 17th June 2019 3:18:17 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <div id="app">
    <el-scrollbar :native="false" id="section" v-show="InterfaceState.LoginIfShow">
      <router-view v-if="isRouterAlive"/>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return { isRouterAlive: true };
  },
  methods: {
    reload() {
      (this.isRouterAlive = false),
        this.$nextTick(function() {
          this.isRouterAlive = true;
        });
    }
  },
  computed: { ...mapState(["InterfaceState"]) }
};
</script>
<style lang='scss'>
#app {
  height: 100%;
  width: 100%;
  .el-scrollbar {
    width: 100%;
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}

@import "&/scss/Public.scss";
</style>
