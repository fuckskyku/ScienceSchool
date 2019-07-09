/*
 * File: PublicTipDialLog.vue
 * Project: scienceschool
 * File Created: Tuesday, 28th May 2019 3:39:21 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Thursday, 27th June 2019 9:40:17 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="TipDialog">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
      @close="closeDialog"
    >
      <main class="form">
        <div class="icon">
          <img src="../../assets/img/logo.png" alt>
        </div>
        <div class="title">成功添加应用</div>
        <div class="tip">该角色下的所有用户都可以在平台首页得到这个应用的跳转链接。</div>
      </main>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </main>
</template>
<script>
export default {
  props: {
    Show: Boolean
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  watch: {
    Show(val) {
      this.dialogVisible = val;
    }
  },
  methods: {
    closeDialog() {
      this.$emit("update:show", false);
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/DiaLog.scss";
</style>

