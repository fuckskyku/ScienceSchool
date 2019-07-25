/*
 * File: ApplyManage.vue
 * Project: scienceschool
 * File Created: Tuesday, 28th May 2019 5:00:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Friday, 12th July 2019 4:57:24 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="ApplyManage" class="MAXWIDTH">
    <!-- <div class="Index_item_true">
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
    </div>
    <div class="Index_item_false">
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
          <el-image :src="item.logo" fit="cover"></el-image>
          <span class="item_name">{{item.name}}</span>
          <div class="item_button">
            <el-button
              type="text"
              v-if="isAuthority('sys:app:update')"
              @click.stop="PopID=item.id;PopNoShowFlag=true;PopEdit=true"
            >编辑</el-button>
            <el-button
              type="text"
              class="red"
              v-if="isAuthority('sys:app:delete')"
              @click.stop="delApp(item.id)"
            >删除</el-button>
          </div>
        </div>
        <div class="item" @click="PopNoShowFlag=true" v-if="isAuthority('sys:app:create')">
          <el-image src="/static/img/add.png" fit="cover"></el-image>
          <div>
            <el-button type="text">点击添加</el-button>
          </div>
        </div>
      </article>
    </div>-->

    <nav class="Type">
      <ul>
        <li :class="{'active':isH5==false}" @click="isH5Tab(false)">PC</li>
        <li :class="{'active':isH5==true}" @click="isH5Tab(true)">H5</li>
      </ul>
    </nav>

    <div class="Index_item_true">
      <div class="Title">
        <img src="/static/img/Index_true.png" alt />
      </div>

      <el-scrollbar :native="false" id="section">
        <div class="Index_item_container">
          <div
            class="item"
            v-for="(item,index) in AppYes"
            :key="index"
            @click.stop="open(item.url)"
          >
            <el-image :src="item.logo" fit="cover"></el-image>
            <span class="item_name">{{item.name}}</span>
            <div class="item_button">
              <el-button
                type="text"
                v-if="isAuthority('sys:app:update')"
                @click.stop="editApp();PopID=item.id;"
              >编辑</el-button>
              <el-button
                type="text"
                class="red"
                v-if="isAuthority('sys:app:delete')"
                @click.stop="delApp(item.id)"
              >删除</el-button>
            </div>
          </div>
          <div
            class="item"
            @click="YesAndNo=true;PopShowFlag=true,isYesAndNo=5"
            v-if="isAuthority('sys:app:create')"
          >
            <el-image src="/static/img/add.png" fit="cover"></el-image>
            <div>
              <el-button type="text">点击添加</el-button>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="Index_item_false">
      <nav class="nav">
        <ul>
          <li
            v-for="(item,index) in FormObjItem.IndexTabTag"
            :class="{'active':NoVal==item.val}"
            :key="index"
            @click="TabNoClick(item.val)"
          >{{item.label}}</li>
        </ul>
      </nav>
      <el-scrollbar :native="false" id="section">
        <div class="Index_item_container">
          <div class="item" v-for="(item,index) in AppNo" :key="index" @click.stop="open(item.url)">
            <el-image :src="item.logo" fit="cover"></el-image>
            <span class="item_name">{{item.name}}</span>
            <div class="item_button">
              <el-button
                type="text"
                v-if="isAuthority('sys:app:update')"
                @click.stop="PopID=item.id;PopNoShowFlag=true;PopEdit=true"
              >编辑</el-button>
              <el-button
                type="text"
                class="red"
                v-if="isAuthority('sys:app:delete')"
                @click.stop="delApp(item.id)"
              >删除</el-button>
            </div>
          </div>
          <div
            class="item"
            @click="YesAndNo=true;NoVal==1?(PopShowFlag=true,isYesAndNo=1):PopNoShowFlag=true"
            v-if="isAuthority('sys:app:create')"
          >
            <el-image src="/static/img/add.png" fit="cover"></el-image>
            <div>
              <el-button type="text">点击添加</el-button>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <NoDiaLog :Show.sync="PopNoShowFlag"  :AppType="NoVal"  @Update="Update" :isH5Flag="isH5" :ID="PopID" :Edit.sync="PopEdit"></NoDiaLog>

    <DiaLog
      :Show.sync="PopShowFlag"
      :AppType="isYesAndNo"
      :YN.sync="YesAndNo"
      @Update="Update"
      :ID="PopID"
      :Edit.sync="PopEdit"
      :isH5Flag="isH5"
    ></DiaLog>
    <DiaLogTip :Show.sync="PopShowTipFlag"></DiaLogTip>
  </main>
</template>
<script>
import NoDiaLog from "../../Dialog/NoAppDiaLog";
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
      PopNoShowFlag: false,
      PopShowTipFlag: false,
      TabListYes: [],
      YesVal: 5, //用于控制统一验证CSS
      AppYes: [], //统一应用列表
      TabListNo: [],
      NoVal: 1, //用于控制非统一验证CSS
      AppNo: [], //非统一应用列表
      isH5: false,
      isYesAndNo: 5,
      YesAndNo: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      AppUniformAccountList().then(res => {
        // this.TabListYes = res.data.data;
        // this.YesVal = res.data.data.length ? res.data.data[0].appType : 5;
        // this.YesVal = res.data.data[0].appType;
        this.selectType(this.YesVal, true);
      });
      this.selectType(this.NoVal, false);
    },

    editApp() {
      this.YesAndNo=false;
      this.PopShowFlag=true;
      this.PopEdit=true;
      this.isYesAndNo=5
    },
    //切换引用方法
    selectType(val, flag) {
      if(flag) {
        AppUniformAccountList({ appType: val, isH5: this.isH5 }).then(res => {
          this.AppYes = res.data.data;
        });
      }else{
        if (val == 1) {
          AppUniformAccountList({ appType: val, isH5: this.isH5 }).then(res => {
            this.AppNo = res.data.data;
          });
        } else {
          NonUniformAccountList({ appType: val }).then(res => {
            this.AppNo = res.data.data;
          });
        }
        
      }
        
       
      // if (flag) {
      //   AppUniformAccountList({ appType: val, isH5: this.isH5 }).then(res => {
      //     this.AppYes = res.data.data;
      //   });
      // } else {
      //   if (val == 1) {
      //     AppUniformAccountList({ appType: val, isH5: this.isH5 }).then(res => {
      //       this.AppNo = res.data.data;
      //     });
      //   } else {
      //     NonUniformAccountList({ appType: val }).then(res => {
      //       this.AppNo = res.data.data;
      //     });
      //   }
      // }
      // NonUniformAccountList({ appType: val }).then(res => {
      //   if (flag) {
      //     this.AppYes = res.data.data;
      //   } else {
      //     this.AppNo = res.data.data;
      //   }
      // });
    },
    //切换PC,H5
    isH5Tab(flag) {
      this.isH5 = flag;
      this.selectType(this.YesVal, true);
      this.selectType(this.NoVal, false);
    },
    Update() {
      // alert(11)
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
  components: { DiaLog, NoDiaLog, DiaLogTip }
};
</script>

<style lang='scss'>
// @import "&/scss/Index.scss";
</style>
