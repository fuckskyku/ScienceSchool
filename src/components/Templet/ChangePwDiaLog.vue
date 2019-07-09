/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Friday, 5th July 2019 9:30:16 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="ChangePwDiaLog">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
      @close="closeDialog"
    >
      <span slot="title" class="DiaLogTitle">修改密码</span>
      <main class="form">
        <el-form :model="form" ref="form" :rules="rules" label-width="120px">
          <el-form-item label="用户名：" prop>{{InfoObj.userName}}</el-form-item>
          <el-form-item label="新密码：" prop="newPw">
            <el-input placeholder="请输入密码" show-password v-model="form.newPw"></el-input>
          </el-form-item>
          <el-form-item label="确定密码：" prop="okPw">
            <el-input placeholder="请输入密码" show-password v-model="form.okPw"></el-input>
          </el-form-item>
        </el-form>
      </main>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="Save">确 定</el-button>
      </div>
    </el-dialog>
  </main>
</template>
<script>
import { UserModifyPw } from "^/api/api";
export default {
  inject: ["reload"],
  props: {
    Show: Boolean,
    // EditPw: Boolean,
    InfoObj: null
  },
  data() {
    var verify = {
      validatePass1: (rule, value, callback) => {
        if (!value) {
          callback(new Error("请输入密码"));
        } else if (
          !value.match(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,16}$/)
        ) {
          return callback(
            new Error(
              "密码至少8位或8位以上的字母和数字，至少一个字母和一个数字"
            )
          );
        } else {
          callback();
        }
      },
      validatePass2: (rule, value, callback) => {
        if (!value) {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.form.newPw) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      }
    };
    return {
      dialogVisible: false,
      form: {},
      rules: {
        newPw: [
          { required: true, validator: verify.validatePass1, trigger: "blur" }
        ],
        okPw: [
          { required: true, validator: verify.validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    Show(val) {
      this.dialogVisible = val;
    }
    // EditPw(val) {}
  },
  methods: {
    Save() {
      // console.log(this.InfoObj)
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$loadingRes("执行中");
          UserModifyPw({
            userId: this.InfoObj.userId ? this.InfoObj.userId : this.InfoObj.id,
            password: this.form.okPw
          }).then(res => {
            this.elInfo(res.data.message, "success");
            this.$loadingRes().close();
            this.closeDialog();
          });
        } else {
          return false;
        }
      });
    },
    closeDialog() {
      this.$emit("update:show", false);
      this.form = {};
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/DiaLog.scss";
</style>

