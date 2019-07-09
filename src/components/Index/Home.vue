/*
 * File: Home.vue
 * Project: scienceschool
 * File Created: Tuesday, 21st May 2019 3:29:46 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Friday, 5th July 2019 1:39:26 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="Index" :style="{'minHeight':H+'px'}">
    <div class="Index_item_true MAXWIDTH">
      <div class="title">
        <strong>统一账户的应用</strong>
        <span>UNIFIED</span>
      </div>
      <nav>
        <ul>
          <li
            v-for="(item,index) in TabListYes"
            :key="index"
            :class="{'active':YesVal==item.appType}"
            @click="TabYesClick(item.appType)"
          >{{item.tableName}}</li>
        </ul>
      </nav>
      <article class="APP">
        <div class="item" v-for="(item,index) in AppYes" :key="index" @click="open(item.url)">
          <!-- <el-image :src="item.logo" fit="cover"></el-image> -->
          <el-image :src="item.logo" fit="cover"></el-image>
          <span class="item_name">{{item.name}}</span>
        </div>
      </article>
    </div>
    <div class="Index_item_fasle MAXWIDTH">
      <div class="title">
        <strong>非统一账号的应用</strong>
        <span>DISUNITY</span>
      </div>
      <nav>
        <ul>
          <li
            v-for="(item,index) in FormObjItem.IndexTabTag"
            :class="{'active':NoVal==item.val}"
            :key="index"
            @click="TabNoClick(item.val)"
          >{{item.label}}</li>
        </ul>
      </nav>
      <article class="APP">
        <div class="item" v-for="(item,index) in AppNo" :key="index" @click="open(item.url)">
          <!-- <el-image :src="item.logo" fit="cover"></el-image> -->
          <el-image :src="item.logo" fit="cover"></el-image>
          <span class="item_name">{{item.name}}</span>
        </div>
      </article>
      <el-dialog
        :visible.sync="dialogVisible"
        v-if="dialogVisible"
        :close-on-click-modal="false"
        width="514px"
        @close="closeDialog"
      >
        <main class="form">
          <div>
            <img src="/static/img/img_password_tip.png" alt />
            <p class="sub_title">系统提示</p>
          </div>
          <p class="desc">检测到您的密码是管理员为您随机生成的，为了信息安全，请自行更改为自己便于记忆的密码，并设置密保问题，方便找回密码。</p>
        </main>
        <div slot="footer" class="dialog-footer">
          <el-button class="f_fd" type="primary" @click="skip('ChangePwd');dialogVisible=false">立即设置</el-button>
        </div>
      </el-dialog>
      <DiaLog :Show.sync="PopShowFlag"></DiaLog>
      <DiaLogTip :Show.sync="PopShowTipFlag"></DiaLogTip>
    </div>
  </main>
</template>

<script>
import DiaLog from "../Dialog/AppDiaLog";
import DiaLogTip from "../Dialog/PublicTipDialLog";
import {
  UniformAccountList,
  NonUniformAccountList,
  UserCheckPassword
} from "^/api/api";
export default {
  data() {
    return {
      PopShowFlag: false,
      PopShowTipFlag: false,
      dialogVisible: false,
      TabListYes: [],
      YesVal: 5,
      AppYes: [], //统一应用列表
      TabListNo: [],
      NoVal: 1,
      AppNo: [], //非统一应用列表，
      H: ""
    };
  },
  created() {
    let H = document.documentElement.clientHeight || document.body.clientHeight;
    // this.H = H - 60 - 231;
    this.H = H - 60 - 232;
    this.init();
  },
  methods: {
    init() {
      UserCheckPassword().then(res => {
        if (res.data.code == 200) {
          if (res.data.data.flag == false) {
            this.dialogVisible = true;
          }
        }
      });
      UniformAccountList().then(res => {
        this.TabListYes = res.data.data;
        this.YesVal = res.data.data[0].appType;
        this.selectType(this.YesVal, true);
      });
      this.selectType(this.NoVal, false);
    },
    //切换引用方法
    selectType(val, flag) {
      if (flag) {
        UniformAccountList({ appType: val }).then(res => {
          this.AppYes = res.data.data;
        });
      } else {
        NonUniformAccountList({ appType: val }).then(res => {
          this.AppNo = res.data.data;
        });
      }
      // NonUniformAccountList({ appType: val }).then(res => {
      //   if (flag) {
      //     this.AppYes = res.data.data;
      //   } else {
      //     this.AppNo = res.data.data;
      //   }
      //   console.log(this.AppYes);
      // });
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    //统一验证Tab切换
    TabYesClick(val) {
      this.YesVal = val;
      this.selectType(val, true);
    },
    //非统一验证Tab切换
    TabNoClick(val) {
      this.NoVal = val;
      this.selectType(val, false);
    },
    //打开新窗口跳转
    open(url) {
      window.open("http://" + url);
    }
  },
  components: { DiaLog, DiaLogTip }
};
</script>

<style lang='scss'>
// @import "&/scss/Index.scss";
</style>
 