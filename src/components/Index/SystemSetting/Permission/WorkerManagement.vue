/*
 * File: GradeConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 5:05:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Thursday, 4th July 2019 4:38:56 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="WorkerManagement">
    <div class="PublicTitle">
      <span>职工管理</span>
      <!-- <el-button>编辑</el-button> -->
    </div>
    <section>
      <div class="Button_Group">
        <div class="SearchGroup">
          <el-input placeholder="姓名" clearable v-model="filter.name" @change="filterChange"></el-input>
          <el-input placeholder="用户名" clearable v-model="filter.userName" @change="filterChange"></el-input>
          <el-button slot="append" @click="filterChange" icon="el-icon-search"></el-button>
        </div>
        <div class="ButtonGroup">
          <!-- <el-button type="primary" @click="PopShowFlag=true">新增</el-button> -->
          <!-- <el-button type="primary" @click="PopShowLeadingIn=true">导入</el-button> -->
          <!-- <el-button type="primary" @click="dowload">导出</el-button> -->
          <el-button
            type="primary"
            @click="disabled(null,false)"
            v-if="isAuthority('sys:teacherUser:valid')"
          >批量启用</el-button>
          <el-button
            type="primary"
            @click="disabled(null,true)"
            v-if="isAuthority('sys:teacherUser:valid')"
          >批量禁用</el-button>
          <el-button
            type="danger"
            @click="del(false)"
            v-if="isAuthority('sys:teacherUser:delete')"
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
        <el-table-column :show-overflow-tooltip="true" type="selection" width="55"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="用户名" prop="userName"></el-table-column>
        <!-- <el-table-column  :show-overflow-tooltip="true"   label="姓名" prop="name"></el-table-column  > -->
        <el-table-column :show-overflow-tooltip="true" label="工号" prop="jobNo"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="手机号码" prop="mobile"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="角色" prop="roleName"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="状态">
          <template slot-scope="scope">{{scope.row.disabled ? "禁用" : "启用"}}</template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button
              type="text"
              :class="[scope.row.disabled?'green':'orange']"
              @click="disabled(scope.row.id,scope.row.disabled?false:true)"
            >{{scope.row.disabled?'启用':'禁用'}}</el-button>

            <el-button
              type="text"
              class="green"
              @click="info(scope.row)"
              v-if="isAuthority('sys:teacherUser:update')"
            >详情</el-button>
            <el-button
              type="text"
              @click="edit(scope.row)"
              v-if="isAuthority('sys:teacherUser:update')"
            >编辑</el-button>
            <el-button
              type="text"
              @click="changePwd(scope.row)"
              v-if="isAuthority('sys:teacherUser:modifyPwd')"
            >修改密码</el-button>
            <el-button
              type="text"
              class="red"
              @click="del(scope.row.id)"
              v-if="isAuthority('sys:teacherUser:delete')"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page :tabObj.sync="tableObj" :filterObj="filter" name="UserTeacherUserPage"></page>
    </section>
    <DiaLog
      :Show.sync="PopShowFlag"
      :Edit.sync="PopEdit"
      :Info.sync="PopInfo"
      :InfoObj="PopInfoObj"
      @Update="Update"
    ></DiaLog>

    <TeacherInfoDiaLog
      :Show.sync="PopTeacherInfoShowFlag"
      :Edit.sync="PopTeacherInfoEdit"
      :Info.sync="PopTeacherInfoInfo"
      :InfoObj="PopTeacherInfoObj"
    ></TeacherInfoDiaLog>

    <DiaLogChange :Show.sync="PopShowFlagChange" :InfoObj="PopPwdInfoObj"></DiaLogChange>
    <LeadingIn
      :Show.sync="PopShowLeadingIn"
      :UploadUrl="'api/teacher/importTeacherUserData'"
      @Update="Update"
      :Href="'/static/Dowload/职工导入模板.xlsx'"
    ></LeadingIn>
  </main>
</template>

<script>
import DiaLog from "./DiaLog/WorkerManagementDiaLog";
import TeacherInfoDiaLog from "../PersonnelManagement/DiaLog/TeacherInfoDiaLog";
import DiaLogChange from "../../../Templet/ChangePwDiaLog";
import LeadingIn from "../../../Templet/LeadingIn";
import {
  UserTeacherUserPage,
  TeacherExportTeacherUserData,
  UserDelete,
  UserSetValid
} from "^/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      PopShowFlag: false,
      PopShowFlagChange: false,
      PopShowLeadingIn: false,
      PopEdit: false,
      PopInfo: false,
      PopInfoObj: {},
      PopPwdInfoObj: {},
      PopTeacherInfoShowFlag: false,
      PopTeacherInfoEdit: false,
      PopTeacherInfoInfo: false,
      PopTeacherInfoObj: {},
      filter: {},
      tableObj: [{}],
      delTableList: [],
      keyWords: "",
      departmentVal: "",
      workStatus: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init(obj) {
      UserTeacherUserPage(obj).then(res => {
        this.tableObj = res.data.data;
      });
    },
    changePwd(row) {
      this.PopPwdInfoObj = row;
      this.PopShowFlagChange = true;
    },
    filterChange() {
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
            UserDelete({
              userIds: id ? id : this.delTableList.toString()
            }).then(res => {
              this.init(this.filter);
            });
          }.bind(this)
        );
    },

    info(row) {
      this.PopTeacherInfoShowFlag = true;
      this.PopTeacherInfoEdit = true;
      this.PopTeacherInfoInfo = true;
      this.PopTeacherInfoObj = row;
      this.PopTeacherInfoObj.worker = true;
      // this.PopShowFlag = true;
      // this.PopEdit = true;
      // this.PopInfo = true;
      // this.PopInfoObj = row;
    },
    edit(row) {
      this.PopInfoObj = row;
      this.PopShowFlag = true;
      this.PopEdit = true;
    },
    checked(selection, row) {
      this.delTableList = selection.map((item, index, array) => {
        return item.id;
      });
    },

    disabled(id, flag) {
      if (!this.delTableList.length) {
        this.elInfo("请选择需要操作的数据", "warning");
      } else {
        UserSetValid({
          disabled: flag,
          userIds: id ? id : this.delTableList.toString()
        }).then(res => {
          this.elInfo(res.data.message, "success");
          this.init(this.filter);
        });
      }
    },

    Update() {
      this.init();
    },
    dowload() {
      TeacherExportTeacherUserData().then(res => {});
    }
  },
  components: {
    DiaLog,
    TeacherInfoDiaLog,
    DiaLogChange,
    LeadingIn
  }
};
</script>

<style>
</style>
