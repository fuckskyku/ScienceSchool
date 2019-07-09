/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Wednesday, 19th June 2019 3:11:46 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="ForgetPwdDiaLog">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="514px"
      @close="closeDialog"
    >
      <main class="form">
        <div>
          <img src="/static/img/img_password_tip.png" alt="">
          <p class="sub_title">系统提示</p>
        </div>
        <p class="desc">{{form.confirm == true && form.active == 2 ? '密保问题回答正确，现在您可以重新设置密码了！': form.confirm == false && form.active == 2 ? '密保问题回答错误，请检查后重新提交' : form.confirm == true && form.active == 3 ? '您已重新设置了密码，立即去登录吧！' : ''}}</p>
        <!-- <p>{{'密保问题回答正确，现在您可以重新设置密码了！'}}</p>
        <p>{{'您已重新设置了密码，立即去登录吧！'}}</p> -->
      </main>
      <div slot="footer" class="dialog-footer">
        <el-button class=" f_fd" type="primary" @click="dialogVisible=false" v-if="form.confirm == false && form.active == 2">确定</el-button>
        <el-button class=" f_fd" type="primary" @click="setPwd()" v-if="form.confirm == true && form.active == 2">立即设置</el-button>
        <el-button class=" f_fd" type="primary" @click="skip('Login');dialogVisible=false" v-if="form.confirm == true && form.active == 3">立即登录</el-button>
      </div>
    </el-dialog>
  </main>
</template>
<script>
export default {
  inject: ["reload"],
  props: {
    Show: Boolean,
    Edit: Boolean,
    Info: Boolean,
    InfoObj: null
  },
  data() {
    return {
      dialogVisible: false,
      gradeOptions: [],
      classOptions: [],
      imageUrl: "",
      form: {}
    };
  },
  mounted() {
    
  },
  watch: {
    Show(val) {
      this.dialogVisible = val;
      // this.init();
    },
    Edit(val) {
      if (val) {
        this.form = this.InfoObj;
        console.log("this.InfoObj",this.form)
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      
    },
    setPwd() {
      this.$emit("Update");
      this.dialogVisible=false
      this.$emit("update:show", false);
      this.$emit("update:edit", false);
      this.$emit("update:info", false);
    },
    closeDialog() {
      this.$emit("update:show", false);
      this.$emit("update:edit", false);
      this.$emit("update:info", false);
      this.form = {};
    },
    skip(type) {
      this.$router.push({
        name: type
      })
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/DiaLog.scss";
</style>

