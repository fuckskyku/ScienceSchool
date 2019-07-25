/*
 * File: GradeConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 5:05:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Wednesday, 10th July 2019 5:19:15 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="DepartmentConfig">
    <div class="PublicTitle">
      <span>部门管理</span>
      <!-- <el-button>编辑</el-button> -->
    </div>
    <section>
      <div class="Button_Group">
        <div class="SearchGroup">
          <el-input v-model="filter.name" clearable placeholder="请输入部门名称" @change="filterChange"></el-input>
          <el-input
            v-model="filter.masterName"
            clearable
            placeholder="请输入分管领导"
            @change="filterChange"
          ></el-input>
          <el-button slot="append" @click="filterChange" icon="el-icon-search"></el-button>
        </div>
        <div class="ButtonGroup">
          <el-button
            type="primary"
            @click="PopShowFlag=true"
            v-if="isAuthority('sys:department:create')"
          >添加部门</el-button>
          <el-button
            type="danger"
            @click="del(false)"
            v-if="isAuthority('sys:department:delete')"
          >批量删除</el-button>
        </div>
      </div>
      <el-table
        :data="tableObj.data"
        border
        stripe
        :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
        :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
        @select="checked"
        @select-all="checked"
      >
        <el-table-column :show-overflow-tooltip="true" type="selection"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="部门名称" prop="name"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="上级部门" prop="parentName"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="分管领导" prop="masterName"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="部门描述" prop="remark"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="orange"
              @click="related(scope.row)"
              v-if="isAuthority('sys:department:teacherList')"
            >相关人员</el-button>
            <el-button
              type="text"
              @click="edit(scope.row)"
              v-if="isAuthority('sys:department:update')"
            >编辑</el-button>
            <el-button
              type="text"
              class="red"
              @click="del(scope.row.id)"
              v-if="isAuthority('sys:department:delete')"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="PageDiv">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="tableObj.pageNo"
          :page-sizes="[10, 20, 40,60,80,100]"
          :page-size.sync="tableObj.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableObj.totalCount"
        ></el-pagination>
      </div>
      <!-- <page :tabObj.sync="tableObj" :filterObj="filter" name="DepartmentPage"></page> -->
    </section>
    <DiaLog
      :Show.sync="PopShowFlag"
      :Edit.sync="PopEdit"
      :InfoObj="PopInfoObj"
      @Update="Update"
      :Type="2"
    ></DiaLog>
    <DiaLogInfo :Show.sync="PopShowInfoFlag" :Edit.sync="PopEdit" :InfoObj="PopInfoObj" :Type="2"></DiaLogInfo>
  </main>
</template>
<script>
import DiaLog from "./DiaLog/TeacherGroupConfigDiaLog";
import DiaLogInfo from "./DiaLog/TeacherGroupConfigInfoDiaLog";
import { DepartmentPage, DepartmentDelete } from "^/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      PopShowFlag: false,
      PopShowInfoFlag: false,
      PopInfoObj: {},
      PopEdit: false,
      filter: {},
      tableObj: [{}],
      delTableList: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init(obj) {
      DepartmentPage(obj).then(res => {
        this.tableObj = res.data.data;
      });
    },
    handleSizeChange(val) {
      this.$set(this.filter,"pageSize",val)
      this.init(this.filter);
    },
    handleCurrentChange(val) {
      this.$set(this.filter,"pageNo",val)
      this.init(this.filter);
    },
    filterChange() {
      delete this.filter.pageNo;
      this.init(this.filter);
    },
    del(id) {
      let AllFlag = false;
      if (!id) {
        if (!this.delTableList.length) {
          this.elInfo("请选择需要批量删除的数据", "warning");
        } else {
          AllFlag = true;
        }
      } else {
        AllFlag = true;
      }
      if (AllFlag)
        this.OpenDel(
          id ? null : "是否批量删除已选数据",
          "warning",
          function() {
            DepartmentDelete({
              ids: id ? id : this.delTableList.toString()
            }).then(res => {
              this.delTableList = [];
              this.init(this.filter);
            });
          }.bind(this)
        );
    },
    edit(row) {
      this.PopShowFlag = true;
      this.PopEdit = true;
      this.PopInfoObj = row;
    },
    related(row) {
      this.PopShowInfoFlag = true;
      this.PopEdit = true;
      this.PopInfoObj = row;
    },
    checked(selection, row) {
      this.delTableList = selection.map((item, index, array) => {
        return item.id;
      });
    },
    Update() {
      this.init(this.filter);
    }
  },
  components: {
    DiaLogInfo,
    DiaLog
  }
};
</script>

<style>
</style>
