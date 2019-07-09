/*
 * File: SettingLog.vue
 * Project: scienceschool
 * File Created: Wednesday, 29th May 2019 11:31:20 am
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Thursday, 4th July 2019 9:42:20 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="SettingLog">
    <nav>
      <ul class="MAXWIDTH">
        <li
          v-for="(item,index) in navList"
          :key="index"
          @click="navCilck(item.val)"
          :class="{'active':InterfaceState.SettingLogState==item.val}"
        >{{item.label}}</li>
      </ul>
    </nav>
    <section v-if="InterfaceState.SettingLogState=='登入'" class="MAXWIDTH" style="max-width:1400px;">
      <div class="Filter_GroupContianer">
        <div class="Search_Group">
          <el-input v-model="filter.userName" placeholder="账号" clearable @change="filterChange"></el-input>
          <el-input v-model="filter.idCard" placeholder="身份证号码" clearable @change="filterChange"></el-input>
          <!-- <el-input v-model="filter.Name" placeholder="姓名" clearable></el-input> -->
          <!-- <el-input v-model="filter.Role" placeholder="角色" clearable></el-input> -->
          <el-row>
            <!-- <el-col :span="4" style="line-height:40px;color:#606266;font-size:16px;">抓拍时间</el-col> -->
            <el-col :span="11">
              <el-date-picker
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="开始日期"
                @change="filterChange"
                v-model="filter.startTime"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="结束日期"
                @change="filterChange"
                v-model="filter.endTime"
                :picker-options="{disabledDate(time) {return new Date(filter.startTime)?time.getTime() < new Date(filter.startTime).getTime():null;}}"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-row>
        </div>
        <!-- <div class="Button_Group">
                <el-button type="primary" @click="filter"></el-button>
        </div>-->
      </div>
      <el-table
        :header-cell-style="{textAlign:'center',background:'#4D94D0',color:'#fff',border:'none'}"
        :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
        :data="tableData.data"
        border
        stripe
        height="500"
        style="width: 100%"
      >
        <el-table-column :show-overflow-tooltip="true" type="selection"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="userName" label="账户"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="idCard" label="身份证"></el-table-column>
        <!-- <el-table-column :show-overflow-tooltip="true" prop="address" label="姓名"></el-table-column> -->
        <!-- <el-table-column :show-overflow-tooltip="true" prop="address" label="角色"></el-table-column> -->
        <el-table-column :show-overflow-tooltip="true" prop="createTime" label="登入时间">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.createTime).format('yyyy-MM-dd hh:mm:ss')}}</span>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <section v-if="InterfaceState.SettingLogState=='登出'" class="MAXWIDTH" style="max-width:1400px;">
      <div class="Filter_GroupContianer">
        <div class="Search_Group">
          <el-input v-model="filter.userName" placeholder="账号" clearable @change="filterChange"></el-input>
          <el-input v-model="filter.idCard" placeholder="身份证号码" clearable @change="filterChange"></el-input>
          <!-- <el-input v-model="filter.Name" placeholder="姓名" clearable></el-input> -->
          <!-- <el-input v-model="filter.Role" placeholder="角色" clearable></el-input> -->
          <el-row>
            <!-- <el-col :span="4" style="line-height:40px;color:#606266;font-size:16px;">抓拍时间</el-col> -->
            <el-col :span="11">
              <el-date-picker
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="开始日期"
                @change="filterChange"
                v-model="filter.startTime"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="结束日期"
                @change="filterChange"
                v-model="filter.endTime"
                :picker-options="{disabledDate(time) {return new Date(filter.startTime)?time.getTime() < new Date(filter.startTime).getTime():null;}}"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-row>
        </div>
        <!-- <div class="Button_Group">
                <el-button type="primary" @click="filter"></el-button>
        </div>-->
      </div>
      <el-table
        :header-cell-style="{textAlign:'center',background:'#4D94D0',color:'#fff',border:'none'}"
        :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
        :data="tableData.data"
        border
        stripe
        height="500"
      >
        <el-table-column :show-overflow-tooltip="true" type="selection"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="userName" label="账户"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="idCard" label="身份证"></el-table-column>
        <!-- <el-table-column :show-overflow-tooltip="true" prop="address" label="姓名"></el-table-column> -->
        <!-- <el-table-column :show-overflow-tooltip="true" prop="address" label="角色"></el-table-column> -->
        <el-table-column :show-overflow-tooltip="true" prop="createTime" label="登入时间">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.createTime).format('yyyy-MM-dd hh:mm:ss')}}</span>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <section
      v-if="InterfaceState.SettingLogState=='look'"
      class="MAXWIDTH"
      style="max-width:1400px;"
    >
      <div class="tip">
        <span>统一账号应用</span>
      </div>
      <div class="item_Container">
        <div
          class="item"
          v-for="item in AppLogList"
          :key="item.id"
          @click.stop="open(item.logLink)"
        >
          <el-image :src="item.logo" fit="cover"></el-image>
          <span>{{item.name}}</span>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { SystemLogPage, AppLogPage } from "^/api/api";
export default {
  data() {
    return {
      //导航数据
      navList: [
        { label: "登录时间统计", val: "登入" },
        { label: "退出时间统计", val: "登出" },
        { label: "查看各应用日志", val: "look" }
      ],
      AppLogList: [],
      //过滤数据
      filter: {},
      //表格数据
      tableData: {}
      //   activeVal: "login" //默认选中导航值
    };
  },
  created() {
    this.init({ logType: "登入" });
  },
  computed: {
    ...mapState(["InterfaceState"])
  },
  methods: {
    ...mapActions(["setSettingLogState"]),

    init(obj) {
      SystemLogPage(obj).then(res => {
        this.tableData = res.data.data;
      });
      AppLogPage().then(res => {
        this.AppLogList = res.data.data.data;
      });
    },
    //点击nav切换方法
    navCilck(val) {
      this.setSettingLogState(val); //提交Vuex保存方法
      this.init({ logType: this.InterfaceState.SettingLogState });
      this.filter = {};
      // this.activeVal  = val; //替换当前选中的active值
    },
    //过滤方法
    filterChange() {
      this.$set(this.filter, "logType", this.InterfaceState.SettingLogState);
      this.init(this.filter);
    },
    open(url) {
      window.open(url);
    }
  }
};
</script>

<style lang='scss'>
// @import "&/scss/Index.scss";
</style>
