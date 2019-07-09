/*
 * File: GradeConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 5:05:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Monday, 8th July 2019 9:43:08 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="RoleManagement">
    <div class="PublicTitle">
      <span>角色管理</span>
      <!-- <el-button>编辑</el-button> -->
    </div>
    <section>
      <div class="Button_Group">
        <div class="SearchGroup">
          <el-input
            placeholder="请输入角色名称"
            clearable
            v-model="filter.roleName"
            @change="filterChange"
          ></el-input>
          <el-button slot="append" @click="filterChange" icon="el-icon-search"></el-button>
        </div>
        <div class="ButtonGroup">
          <el-button
            type="primary"
            @click="PopShowFlag=true"
            v-if="isAuthority('sys:role:create')"
          >添加角色</el-button>
          <el-button type="danger" @click="del(false)" v-if="isAuthority('sys:role:delete')">批量删除</el-button>
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
        <el-table-column :show-overflow-tooltip="true" type="selection" width="55"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="授权对象" prop="classId"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="角色名称" prop="roleName"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="创建时间" prop="createTime">
          <template
            slot-scope="scope"
          >{{new Date(scope.row.createTime).format('yyyy-MM-dd hh:mm:ss')}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="Appoint(scope.row)"
              v-if="isAuthority('sys:role:detail')"
            >角色委派</el-button>
            <el-button type="text" @click="edit(scope.row)" v-if="isAuthority('sys:role:update')">编辑</el-button>
            <!-- <el-button type="text" @click="changePwd(scope.row.id)">修改密码</el-button> -->
            <el-button
              type="text"
              class="red"
              @click="del(scope.row.id)"
              v-if="isAuthority('sys:role:delete')"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page :tabObj.sync="tableObj" :filterObj="filter" name="RolePage"></page>
    </section>
    <DiaLog :Show.sync="PopShowFlag" :Edit.sync="PopEdit" :InfoObj="PopInfoObj" @Update="Update"></DiaLog>
    <DiaLogAppoint :Show.sync="PopShowAppointFlag" :InfoObj="PopInfoObj" :Edit.sync="PopEditTwo"></DiaLogAppoint>
    <ChangePwDiaLog :Show.sync="PopShowPwFlag"></ChangePwDiaLog>
  </main>
</template>

<script>
import DiaLog from "./DiaLog/RoleManagementDiaLog";
import DiaLogAppoint from "./DiaLog/RoleManagementAppointDiaLog";
import ChangePwDiaLog from "../../../Templet/ChangePwDiaLog";
import { RolePage, RoleDelete } from "^/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      PopShowFlag: false,
      PopShowPwFlag: false,
      PopShowAppointFlag: false,
      PopEdit: false,
      PopEditTwo: false,
      PopInfoObj: {},
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
      RolePage(obj).then(res => {
        this.tableObj = res.data.data;
      });
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
            RoleDelete({ roleId: id ? id : this.delTableList.toString() }).then(
              res => {
                this.init(this.filter);
              }
            );
          }.bind(this)
        );
    },
    changePwd() {
      this.PopShowPwFlag = true;
    },

    filterChange() {
      this.init(this.filter);
    },

    edit(row) {
      this.PopInfoObj = row;
      this.PopEdit = true;
      this.$loadingRes("加载中");
      setTimeout(() => {
        this.PopShowFlag = true;
        this.$loadingRes().close();
      }, 500);
    },
    Appoint(row) {
      this.PopShowAppointFlag = true;
      this.PopEditTwo = true;
      this.PopInfoObj = row;
    },

    checked(selection, row) {
      this.delTableList = selection.map((item, index, array) => {
        return item.id;
      });
    },

    Update() {
      this.init();
    }
  },
  components: {
    DiaLog,
    DiaLogAppoint,
    ChangePwDiaLog
  }
};
</script>

<style>
</style>
