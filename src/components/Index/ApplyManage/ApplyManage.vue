/*
 * File: ApplyManage.vue
 * Project: scienceschool
 * File Created: Tuesday, 28th May 2019 5:00:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Thursday, 4th July 2019 11:52:57 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="ApplyManage" class="MAXWIDTH">
    <div class="Index_item_true">
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
        <div class="item" v-for="(item,index) in AppYes" :key="index" @click.stop="open(item.url)">
          <!-- <el-image :src="item.logo" fit="cover"></el-image> -->
          <el-image :src="item.logo" fit="cover"></el-image>
          <span class="item_name">{{item.name}}</span>
        </div>
      </article>
    </div>
    <div class="Index_item_fasle">
      <div class="title">
        <strong>非统一账户的应用</strong>
        <span>UNIFIED</span>
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
        <ul></ul>
      </nav>
      <article class="APP">
        <div class="item" v-for="(item,index) in AppNo" :key="index" @click.stop="open(item.url)">
          <!-- <el-image :src="item.logo" fit="cover"></el-image> -->
          <el-image :src="item.logo" fit="cover"></el-image>
          <span class="item_name">{{item.name}}</span>
          <div class="item_button">
            <el-button
              type="text"
              v-if="isAuthority('sys:app:update')"
              @click.stop="PopID=item.id;PopShowFlag=true;PopEdit=true"
            >编辑</el-button>
            <el-button
              type="text"
              class="red"
              v-if="isAuthority('sys:app:delete')"
              @click.stop="delApp(item.id)"
            >删除</el-button>
          </div>
        </div>
        <div class="item" @click="PopShowFlag=true" v-if="isAuthority('sys:app:create')">
          <el-image src="/static/img/add.png" fit="cover"></el-image>
          <div>
            <el-button type="text">点击添加</el-button>
          </div>
        </div>
      </article>
      <DiaLog :Show.sync="PopShowFlag" :AppType="NoVal" :ID="PopID" :Edit="PopEdit"></DiaLog>
      <DiaLogTip :Show.sync="PopShowTipFlag"></DiaLogTip>
    </div>
  </main>
</template>

<script>
import DiaLog from "../../Dialog/AppDiaLog";
import DiaLogTip from "../../Dialog/PublicTipDialLog";
import {
  AppUniformAccountList,
  NonUniformAccountList,
  AppDelete
} from "^/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      PopID: null,
      PopEdit: false,
      PopShowFlag: false,
      PopShowTipFlag: false,
      TabListYes: [],
      YesVal: 5, //用于控制统一验证CSS
      AppYes: [], //统一应用列表
      TabListNo: [],
      NoVal: 1, //用于控制非统一验证CSS
      AppNo: [] //非统一应用列表
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      AppUniformAccountList().then(res => {
        this.TabListYes = res.data.data;
        this.YesVal = res.data.data[0].appType;
        this.selectType(this.YesVal, true);
      });
      this.selectType(this.NoVal, false);
    },
    //切换引用方法
    selectType(val, flag) {
      if (flag) {
        AppUniformAccountList({ appType: val }).then(res => {
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
      // });
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
    //删除应用
    delApp(id) {
      AppDelete({ id: id }).then(res => {
        this.reload();
      });
    },
    //打开新窗口跳转
    open(url) {
      window.open(url);
    }
  },
  components: { DiaLog, DiaLogTip }
};
</script>

<style lang='scss'>
// @import "&/scss/Index.scss";
</style>
