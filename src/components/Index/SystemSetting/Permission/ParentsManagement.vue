/*
 * File: GradeConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 5:05:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Friday, 12th July 2019 9:19:29 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="ParentsManagement">
    <div class="PublicTitle">
      <span>家长管理</span>
      <!-- <el-button>编辑</el-button> -->
    </div>
    <section>
      <div class="Button_Group">
        <div class="SearchGroup">
          <el-select v-model="filter.schoolYearId" placeholder="请选择学年" @change="SchoolYearChange">
            <el-option
              v-for="item in Dictionary.SchoolYearOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>

          <el-select placeholder="请选择年级" clearable v-model="filter.gradeId" @change="GradeChange">
            <el-option
              v-for="item in gradeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>

          <el-select placeholder="请选择班级" clearable v-model="filter.classId" @change="filterChange">
            <el-option
              v-for="item in classOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="ButtonGroup">
          <el-button
            type="primary"
            @click="PopShowFlag = true"
            v-if="isAuthority('sys:parent:create')"
          >添加</el-button>
          <el-button
            type="primary"
            @click="PopShowLeadingIn=true"
            v-if="isAuthority('sys:parent:import')"
          >导入</el-button>
          <el-button type="primary" @click="dowload" v-if="isAuthority('sys:parent:export')">导出</el-button>
          <el-button
            type="primary"
            @click="disabled(null,false)"
            v-if="isAuthority('sys:parent:valid')"
          >批量启用</el-button>
          <el-button
            type="primary"
            @click="disabled(null,true)"
            v-if="isAuthority('sys:parent:valid')"
          >批量禁用</el-button>
          <el-button type="danger" @click="del(false)" v-if="isAuthority('sys:parent:delete')">批量删除</el-button>
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
        <el-table-column :show-overflow-tooltip="true" label="姓名" prop="name"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="性别" prop="sex">
          <template slot-scope="scope">{{scope.row.sex == 1 ? '男' : '女'}}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="手机号码" prop="mobile"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="状态">
          <template slot-scope="scope">{{scope.row.disabled ? "禁用" : "启用"}}</template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button
              type="text"
              :class="[scope.row.disabled?'green':'orange']"
              v-if="isAuthority('sys:parent:valid')"
              @click="disabled(scope.row.userId,scope.row.disabled?false:true)"
            >{{scope.row.disabled?'启用':'禁用'}}</el-button>
            <el-button
              type="text"
              class="green"
              @click="info(scope.row)"
              v-if="isAuthority('sys:parent:info')"
            >详情</el-button>
            <el-button
              type="text"
              @click="edit(scope.row)"
              v-if="isAuthority('sys:parent:update')"
            >编辑</el-button>
            <el-button
              type="text"
              @click="changePwd(scope.row)"
              v-if="isAuthority('sys:parent:modifyPwd')"
            >修改密码</el-button>
            <el-button
              type="text"
              class="red"
              @click="del(scope.row.id)"
              v-if="isAuthority('sys:parent:delete')"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page :tabObj.sync="tableObj" :filterObj="filter" name="ParentPage"></page>
    </section>
    <DiaLog
      :Show.sync="PopShowFlag"
      :Edit.sync="PopEdit"
      :Info.sync="PopInfo"
      :InfoObj="PopInfoObj"
      @Update="Update"
    ></DiaLog>
    <ChangePwDiaLog :Show.sync="PopShowPwFlag" :InfoObj="PopInfoObj"></ChangePwDiaLog>
    <LeadingIn
      :Show.sync="PopShowLeadingIn"
      :UploadUrl="'api/parent/importParentUserData'"
      @Update="Update"
      :Href="'/static/Dowload/家长导入模板.xlsx'"
    ></LeadingIn>
  </main>
</template>

<script>
import DiaLog from "./DiaLog/ParentsManagementDiaLog";
import ChangePwDiaLog from "../../../Templet/ChangePwDiaLog";
import LeadingIn from "../../../Templet/LeadingIn";
import {
  ParentPage,
  GradeList,
  ClassList,
  ParentExportParentUserData,
  ParentDelete,
  UserSetValid
} from "^/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      PopShowFlag: false,
      PopShowLeadingIn: false,
      PopEdit: false,
      PopInfo: false,
      PopShowPwFlag: false,
      PopInfoObj: {},
      delTableList: [],
      delTableUserIdList: [],
      gradeOptions: [],
      classOptions: [],
      filter: {
        schoolYearId: this.Dictionary.SchoolYearDefault
      },
      tableObj: [{}]
    };
  },
  created() {
    this.SchoolYearChange(this.filter.schoolYearId);
    this.init();
  },
  methods: {
    init(obj) {
      ParentPage(obj).then(res => {
        this.tableObj = res.data.data;
      });
    },
    del(id) {
      let AllFlag = false;
      if (!id) {
        
        if (!this.delTableList.length) {
          AllFlag = false;
          this.elInfo("请选择需要批量删除的数据", "warning");
        } else {
          AllFlag = true;
        }
      } else {
        AllFlag = true;
      }
      console.log('id',id,'this.delTableList',this.delTableList)
      if (AllFlag)
        this.OpenDel(
          id ? null : "是否批量删除已选数据",
          "warning",
          function() {
            ParentDelete({
              parentIds: id ? id : this.delTableList.toString()
            }).then(res => {
              this.delTableList = [];
              this.delTableUserIdList = [];
              this.init(this.filter);
            });
          }.bind(this)
        );
    },
    changePwd(row) {
      this.PopShowPwFlag = true;
      this.PopInfoObj = row;
    },

    edit(row) {
      this.PopInfoObj = row;
      this.PopShowFlag = true;
      this.PopEdit = true;
    },
    info(row) {
      this.PopEdit = true;
      this.PopShowFlag = true;
      this.PopInfo = true;
      this.PopInfoObj = row;
    },
    disabled(id, flag) {
      let AllFlag = false;
      if (!id) {
        if (!this.delTableUserIdList.length) {
          this.elInfo("请选择需要批量操作的数据", "warning");
        } else {
          AllFlag = true;
        }
      } else {
        AllFlag = true;
      }
      if (AllFlag)
        UserSetValid({
          disabled: flag,
          userIds: id ? id : this.delTableUserIdList.toString()
        }).then(res => {
          this.delTableUserIdList = [];
          this.delTableList = [];
          this.elInfo(res.data.message, "success");
          this.init(this.filter);
        });
    },
    SchoolYearChange(val) {
      delete this.filter.pageNo;
      this.filter.gradeId = "";
      this.filter.classId = "";
      this.classOptions = [];
      GradeList({ schoolYearId: val }).then(res => {
        this.gradeOptions = res.data.data;
        this.init(this.filter);
      });
    },
    GradeChange(val) {
      delete this.filter.pageNo;
      this.filter.classId = "";
      ClassList({ gradeId: val }).then(res => {
        this.classOptions = res.data.data;
        this.init(this.filter);
      });
    },
    filterChange() {
      delete this.filter.pageNo;
      this.init(this.filter);
    },
    checked(selection, row) {
      this.delTableList = selection.map((item, index, array) => {
        return item.id;
      });
      this.delTableUserIdList = selection.map((item, index, array) => {
        return item.userId;
      });
      // console.log(this.delTableList,'this.delTableList',this.delTableUserIdList,'this.delTableUserIdList')
    },
    dowload() {
      // console.log('this.filter',this.filter)
      ParentExportParentUserData(this.filter).then(res => {

      });
    },
    Update() {
      this.init(this.filter);
    }
  },
  components: {
    DiaLog,
    ChangePwDiaLog,
    LeadingIn
  }
};
</script>

<style>
</style>
