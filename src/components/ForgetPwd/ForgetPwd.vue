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
  <main id="ForgetPwd">
    <header class="header">
      <div>统一数据基础平台</div>
      <div class="h_rt" @click="toLogin">
        <div class="avatar"><img src="/static/img/ic_hand.png" alt=""></div>
        <span>去登录</span>
      </div>
    </header>
    <div class="encrypted" v-if="active == 2 && !isSet"><img src="/static/img/ic_password_tips.png" alt=""> 若密保问题也遗忘了，请联系学校教务处重置密码。教务处重置密码后会交给您一个新的随机密码，使用随机密码登录后需要重置密码。</div>
    <div class="Index_item_true MAXWIDTH">
      <!-- 账号 -->
      <div class="title" v-if="active == 1 && !isSet">请输入账号</div>
      <div class="section" v-if="active == 1 && !isSet">
        <div class="content">
          <main class="form">
            <div class="lt f_lt">
              <img src="/static/img/img_password_number.png" alt="">
            </div>
            <div class="rt">
              <el-form :model="form" ref="form" label-width="120px">
                  <el-form-item label="账号：">
                    <el-input v-model="form.account" class="input"></el-input>
                  </el-form-item>
              </el-form>
            </div>
          </main>
          <div class="footer">
            <el-button type="primary" class="btn" @click="checkAccout">确 定</el-button>
          </div>
        </div>
      </div>
      <!-- 密保 -->
      <div class="title tit" v-if="active == 2 && !isSet">填写密保</div>
      <div class="section" v-if="active == 2 && !isSet">
        <div class="content">
          <main class="form">
            <div class="lt">
              <img src="/static/img/home_set.png" alt="">
            </div>
            <div class="rt">
              <el-form :model="form" ref="form" label-width="120px">
                <el-form-item label="密保问题1：">
                    <el-input v-model="EncryptedObj.question1" class="input" disabled></el-input>
                    <el-input v-model="EncryptedObj.answer1" class="input"></el-input>
                  </el-form-item>
                  <el-form-item label="密保问题2：">
                    <el-input v-model="EncryptedObj.question2" class="input" disabled></el-input>
                    <el-input v-model="EncryptedObj.answer2" class="input"></el-input>
                  </el-form-item>
                  <el-form-item label="密保问题3：">
                    <el-input v-model="EncryptedObj.question3" class="input" disabled></el-input>
                    <el-input v-model="EncryptedObj.answer3" class="input"></el-input>
                  </el-form-item>
              </el-form>
            </div>
          </main>
          <div class="footer">
            <el-button type="primary" class="btn" @click="save">确 定</el-button>
          </div>
        </div>
      </div>
      <!-- 密码 -->
      <div class="title" v-if="active == 3 && !isSet">设置新密码</div>
      <div class="section" v-if="active == 3 && !isSet">
        <div class="content">
          <main class="form">
            <div class="lt">
              <img src="/static/img/home_set.png" alt="">
            </div>
            <div class="rt">
              <el-form :model="form" ref="form" label-width="120px">
                <el-form-item label="新密码：">
                  <el-input v-model="form.password" class="input"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：">
                  <el-input v-model="form.rePwd" class="input"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </main>
          <div class="footer">
            <el-button type="primary" class="btn" @click="changePwd">保 存</el-button>
          </div>
        </div>
      </div>
      <!-- 未设置密保 -->
      <div class="section_tip" v-if="isSet == true">
        <img src="/static/img/img_home_question.png" alt="">
        <div class="title">未设置密保</div>
        <main>
          您暂未设置密保问题，请联系学校教务处重置密码。教务处重置密码后会交给您一个新的随机密码，使用随机密码登录后需要重置密码。
        </main>
      </div>
    </div>
    <footer id="Footer">
      <div class="Footer_Container">
        <div class="flex_Container">
          <div>闽ICP备17019130号 增值电信业务经营许可证编号:闽B2-20180189</div>
          <div>地址：厦门市湖里区安岭路966-968号汇金湖里大厦办公楼6A22</div>
          <div>邮编：361000</div>
          <div>电话：0592-5223797、0592-5223798、0592-5223689</div>
        </div>
        <div class="img_Container"></div>
      </div>
      <div class="copy">Powered by MSEENET©2008-2019 www.mseenet.com</div>
    </footer>
    <DiaLog :Show.sync="PopShowFlag" :Edit.sync="PopEdit" :InfoObj="PopInfoObj" @Update="Update"></DiaLog>
  </main>
</template>

<script>
import DiaLog from "./Dialog/ForgetPwdDiaLog";
import { PasswordQaQaAnswer, PasswordQaGetUser, PasswordQaCheckPasswordQa, PasswordQaModifyPw } from "^/api/api";
export default {
  data() {
    return {
      active: 1,
      isSet: false,
      PopShowFlag: false,
      PopInfoObj: {
        confirm: true,
        active:''
      },
      PopEdit: false,
      EncryptedObj: {
        question1: '',
        question2: '',
        question3: '',
        answer1: '',
        answer2: '',
        answer3: '',
      },
      form: {
        account: '',
        password: '',
        rePwd: ''
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      
      
    },
    toLogin() {
      window.location.href = 'http://10.10.101.15:8088/cas/login?&service=http://10.10.101.15:9000/api'
    },
    checkAccout() {
      PasswordQaGetUser({
        name: this.form.account
      }).then(res =>{
        var obj = res.data.data
        if(res.data.code == 200) {
          if(obj.isExist) {
            if(!obj.isPassword) {
              if(obj.isPassQa) {
                console.log('sdfs')
                this.active = 2
                PasswordQaQaAnswer({
                  userName: this.form.account
                }).then(res => {
                  if(res.data.code == 200) {
                    if(res.data.data != '') {
                      this.EncryptedObj = res.data.data
                      this.EncryptedObj.userName = this.form.account
                    }
                  }
                })
              }else{
                this.$alert('该账户尚未设置密保')
              }
            }else{
              this.$alert('该账户为初始密码')
            }
          }
        }
      })
      
    },
    changePwd() {
      if(this.form.password == this.form.rePwd) {
        PasswordQaModifyPw(this.form).then(res => {
          if(res.data.code == 200) {
            this.PopShowFlag = true;
            this.PopEdit = true;
            this.PopInfoObj = {
              confirm: true,
              active: this.active
            };
          }
        })
      }
    },
    save() {
      PasswordQaCheckPasswordQa(this.EncryptedObj).then(res => {
        var obj = res.data.data
        if(res.data.code == 200) {
          this.form.userName = obj.userName
          this.form.userId = obj.userId
          this.PopShowFlag = true;
          this.PopEdit = true;
          if(obj.flag) {
            this.PopInfoObj = {
              confirm: obj.flag,
              active: this.active
            };
          }else{
            this.PopInfoObj = {
              confirm: obj.flag,
              active: this.active
            };
          }
        }
      })
      
    },
    TabClick(val) {
      this.active = val;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    Update() {
      this.active = 3
      console.log(this.active)
    },
    //打开新窗口跳转
    open(url) {
      window.open("http://" + url);
    }
  },
  components: { 
    DiaLog
  }
};
</script>

<style lang='scss'>
@import "&/scss/HeaderAsFooter.scss";
@import "&/scss/Index.scss";
</style>
 