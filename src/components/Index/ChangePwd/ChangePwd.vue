/*
 * File: Home.vue
 * Project: scienceschool
 * File Created: Tuesday, 21st May 2019 3:29:46 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Saturday, 15th June 2019 4:10:13 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="ChangePwd">
    <div class="Index_item_true MAXWIDTH">
      <nav>
        <ul>
          <li
            v-for="(item,index) in TabList"
            :key="index"
            :class="{'active':activeName == item.name}"
            @click="TabClick(item.name)"
          >{{item.label}}</li>
        </ul>
      </nav>
      <div class="section" v-if="activeName == 'first'">
        <div class="content">
          <main class="form">
            <div class="lt">
              <img src="/static/img/home_modify.png" alt="">
            </div>
            <div class="rt">
              <el-form :model="form" ref="form" :rules="Verification.ChangePwd" label-width="120px">
                <el-form-item label="账号：">
                  <el-input v-model="form.account" class="input" disabled></el-input>
                </el-form-item>
                <el-form-item label="旧密码：" prop="oldPwd">
                  <el-input v-model="form.oldPwd" class="input"></el-input>
                </el-form-item>
                <el-form-item label="新密码：" prop="pwd">
                  <el-input v-model="form.pwd" class="input" maxlength="16"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="rePwd">
                  <el-input v-model="form.rePwd" class="input" maxlength="16"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </main>
          <div class="footer">
            <el-button type="primary" class="btn" @click="changePwd">保 存</el-button>
          </div>
        </div>
      </div>
      <div class="section" v-if="activeName == 'second'">
        <div class="content">
          <div class="title">若您遗忘了登录密码可通过正确回答2个密保问题，来重新设置密码。</div>
          <main class="form">
            <div class="lt">
              <img src="/static/img/home_set.png" alt="">
            </div>
            <div class="rt">
              <el-form :model="EncryptedObj" ref="EncryptedObj" :rules="Verification.SetEncrypted" label-width="120px">
                <el-form-item label="密保问题1：" v-show="false" prop="question1">
                  <el-input v-model="EncryptedObj.question1" class="input"></el-input>
                </el-form-item>
                <el-form-item label=" " prop="answer1" v-show="false">
                  <el-input v-model="EncryptedObj.answer1" class="input"></el-input>
                </el-form-item>
                <el-form-item label="密保问题2：" v-show="false" prop="question2">
                  <el-input v-model="EncryptedObj.question2" class="input"></el-input>
                </el-form-item>
                <el-form-item label=" " prop="answer2" v-show="false">
                  <el-input v-model="EncryptedObj.answer2" class="input"></el-input>
                </el-form-item>
                <el-form-item label="密保问题3：" v-show="false" prop="question3">
                  <el-input v-model="EncryptedObj.question3" class="input"></el-input>
                </el-form-item>
                <el-form-item label=" " prop="answer3" v-show="false">
                  <el-input v-model="EncryptedObj.answer3" class="input"></el-input>
                </el-form-item>
                <el-form-item label="密保问题1：" prop="question1">
                  <el-input v-model="EncryptedObj.question1" class="input"></el-input>
                </el-form-item>
                <el-form-item label=" " prop="answer1">
                  <el-input v-model="EncryptedObj.answer1" class="input"></el-input>
                </el-form-item>
                <el-form-item label="密保问题2：" prop="question2">
                  <el-input v-model="EncryptedObj.question2" class="input"></el-input>
                </el-form-item>
                <el-form-item label=" " prop="answer2">
                  <el-input v-model="EncryptedObj.answer2" class="input"></el-input>
                </el-form-item>
                <el-form-item label="密保问题3：" prop="question3">
                  <el-input v-model="EncryptedObj.question3" class="input"></el-input>
                </el-form-item>
                <el-form-item label=" " prop="answer3">
                  <el-input v-model="EncryptedObj.answer3" class="input"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </main>
          <div class="footer">
            <el-button type="primary" class="btn" @click="saveEncrypted('')">保 存</el-button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {
  PasswordQaCheckPasswordQa,
  PasswordQaCavePasswordQa,
  PasswordQaQaAnswer,
  UserCheckPassword,
  UserModifyPass
} from "^/api/api";
export default {
  data() {
    return {
      activeName: "first",
      TabList: [
        { name: "first", label: "更改密码" },
        { name: "second", label: "设置密保" }
      ],
      form: {
        account: "",
        oldPwd: "",
        pwd: "",
        rePwd: ""
        // EncryptedObj: {
        //   question1: "",
        //   question2: "",
        //   question3: "",
        //   answer1: "",
        //   answer2: "",
        //   answer3: ""
        // }
      },
      EncryptedObj: {
        answer1: "",
        answer2: "",
        answer3: "",
        question1: "",
        question2: "",
        question3: "",
        
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    a() {
      
    },
    init() {
      UserCheckPassword().then(res => {
        this.form.account = res.data.data.userName;
      });
      PasswordQaQaAnswer().then(res => {
        if (res.data.code == 200) {
          if (res.data.data != "") {
            this.EncryptedObj = res.data.data;
          }
        }
      });
    },
    checkPwd() {
      var reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{8,16}$/;
      if(reg.test(this.form.pwd)) {
        return true;
      }else{
        this.elInfo("密码为8~16位数字、字母、!#$%^&*其中两种", "error");
        return false;
      }
    },
    changePwd() {
      // 匹配 密码为8~16位数字、字母、!#$%^&*其中两种
      var reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{8,16}$/;
        this.$refs["form"].validate(valid => {
          if (valid) {
            if(this.checkPwd()) {
              if (this.form.pwd == this.form.rePwd) {
                UserModifyPass({
                  password: this.form.oldPwd,
                  newPassword: this.form.pwd
                }).then(res => {
                  if (res.data.code == 200) {
                    this.elInfo(res.data.message,"success")
                  }
                });
              } else {
                this.elInfo("请确认密码是否一致", "error");
              }
              this.$refs["form"].clearValidate();
            }
            
          } else {
            return false;
          }
        });
      
      
    },
    saveEncrypted() {
      this.$refs["EncryptedObj"].validate(valid => {
        if (valid) {
        PasswordQaCavePasswordQa(this.EncryptedObj).then(res => {
          if (res.data.code == 200) {
            // alert("提交成功");
            this.elInfo(res.data.message,"success")
          }
        });
          this.$refs["EncryptedObj"].clearValidate();
        } else {
          return false;
        }
      });
      
    },
    TabClick(val) {
      // this.$refs["form"].clearValidate();
      this.activeName = val;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //打开新窗口跳转
    open(url) {
      window.open("http://" + url);
    }
  },
  components: {}
};
</script>

<style lang='scss'>
</style>
 