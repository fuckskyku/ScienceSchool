/*
 * File: GradeConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 5:05:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Thursday, 4th July 2019 1:44:33 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="GradeConfig">
    <div class="PublicTitle">
      <span>学年设置</span>
      <!-- <el-button>编辑</el-button> -->
    </div>
    <section>
      <div class="Button_Group">
        <div class="SearchGroup"></div>
        <div class="ButtonGroup">
          <el-button
            type="primary"
            @click="PopShowFlag=true"
            v-if="isAuthority('sys:schoolYear:create')"
          >添加学年</el-button>
        </div>
      </div>
      <el-table
        :data="tableObj.data"
        border
        stripe
        :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
        :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
      >
        <el-table-column :show-overflow-tooltip="true" label="学年名称" prop="name"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="工作日开始日" prop="workStartDate">
          <template slot-scope="scope">
            <div>{{new Date(scope.row.workStartDate).format('yyyy-MM-dd')}}</div>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="第一学期" width="170">
          <template slot-scope="scope">
            <div>开学时间：{{new Date(scope.row.firstOpenDate).format('yyyy-MM-dd')}}</div>
            <div>放假时间：{{new Date(scope.row.firstCloseDate).format('yyyy-MM-dd')}}</div>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="第二学期" width="170">
          <template slot-scope="scope">
            <div>开学时间：{{new Date(scope.row.secondOpenDate).format('yyyy-MM-dd')}}</div>
            <div>放假时间：{{new Date(scope.row.secondCloseDate).format('yyyy-MM-dd')}}</div>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="工作结束日" prop="workEndDate">
          <template slot-scope="scope">
            <div>{{new Date(scope.row.workEndDate).format('yyyy-MM-dd')}}</div>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="状态" prop="isValid" v-if="isAuthority('sys:schoolYear:valid')">
          <template slot-scope="scope">
            <el-radio v-model="radioVal" :label="scope.row.id" @change="radioChange">设为有效学年</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="edit(scope.row.id)"
              v-if="isAuthority('sys:schoolYear:update')"
            >编辑</el-button>
            <el-button
              type="text"
              class="red"
              @click="del(scope.row)"
              v-if="isAuthority('sys:schoolYear:delete')"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page :tabObj.sync="tableObj" :filterObj="filter" name="SchoolYearPage"></page>
    </section>
    <DiaLog :Show.sync="PopShowFlag" :ID="PopID" :Edit.sync="PopEdit" @Update="Update"></DiaLog>
  </main>
</template>

<script>
import DiaLog from "./DiaLog/GraderConfigDiaLog";
import {
  SchoolYearPage,
  SchoolYearDelete,
  SchoolYearSetIsValid
} from "^/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      PopShowFlag: false,
      PopEdit: false,
      PopID: "",
      filter: {},
      tableObj: [{}],
      radioVal: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      SchoolYearPage().then(res => {
        res.data.data.data.forEach(item => {
          if (item.isValid) {
            this.radioVal = item.id;
          }
        });
        this.tableObj = res.data.data;
      });
    },
    radioChange(val) {
      SchoolYearSetIsValid({ id: val }).then(res => {
        this.Dictionary.DictionaryInit();
      });
    },
    edit(id) {
      this.PopID = id;
      this.PopEdit = true;
      this.PopShowFlag = true;
    },
    del(row) {
      if (row.isValid) {
        this.elInfo(
          "不能删除默认学年,如需要删除默认学年,请先设置新的默认学年",
          "warning"
        );
      } else {
        this.OpenDel(
          null,
          "warning",
          function() {
            SchoolYearDelete({
              id: row.id
            }).then(res => {
              this.init();
            });
          }.bind(this)
        );
      }
    },
    Update() {
      this.init();
    }
  },
  components: {
    DiaLog
  }
};
</script>

<style>
</style>
