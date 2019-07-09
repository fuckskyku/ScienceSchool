/*
 * File: GradeConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 5:05:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Friday, 5th July 2019 1:55:10 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="StudentsManagement">
    <div class="PublicTitle">
      <span>学生管理</span>
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

          <el-select placeholder="年级" clearable v-model="filter.grade" @change="GradeChange">
            <el-option
              v-for="item in gradeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select placeholder="班级" clearable v-model="filter.class">
            <el-option
              v-for="item in classOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="ButtonGroup">
          <!-- <el-button>批量启用</el-button>
          <el-button>批量禁用</el-button>
          <el-button>批量删除</el-button>-->
          <!-- <el-button>启用</el-button>
          <el-button>禁用</el-button>-->
        </div>
      </div>
      <el-table
        :data="tableObj.data"
        border
        stripe
        :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
        :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
      >
        <!-- <el-table-column  :show-overflow-tooltip="true"   type="selection" width="55"></el-table-column  > -->
        <el-table-column :show-overflow-tooltip="true" label="用户名" prop="userName"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="学籍号" prop="xjh"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="姓名" prop="name"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="性别" prop="sex">
          <template slot-scope="scope">{{scope.row.sex == 1 ? '男' : '女'}}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="证件号码" prop="idCard"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="状态">
          <template slot-scope="scope">{{scope.row.disabled==0? "启用" : "禁用"}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="green"
              @click="info(scope.row)"
              v-if="isAuthority('sys:studentUser:info')"
            >详情</el-button>
            <el-button
              type="text"
              @click="changePwd(scope.row)"
              v-if="isAuthority('sys:studentUser:modifyPwd')"
            >修改密码</el-button>
            <el-button
              type="text"
              v-if="isAuthority('sys:studentUser:valid')"
              :class="[scope.row.disabled?'green':'orange']"
              @click="disabled(scope.row)"
            >{{scope.row.disabled==0?'禁用':'启用'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <p class="tip">*添加学生用户请到学生信息管理进行添加</p>
      <page :tabObj.sync="tableObj" :filterObj="filter" name="StudentUserPage"></page>
    </section>
    <DiaLog
      :Show.sync="PopShowFlag"
      :Edit.sync="PopEdit"
      :InfoObj="PopInfoObj"
      @Update="Update"
      :Info.sync="PopInfo"
    ></DiaLog>
    <ChangePwDiaLog :Show.sync="PopShowPwFlag" :InfoObj="PopInfoObj"></ChangePwDiaLog>
  </main>
</template>

<script>
import DiaLog from "../PersonnelManagement/DiaLog/StudentInfoDiaLog";
import ChangePwDiaLog from "../../../Templet/ChangePwDiaLog";
import { StudentUserPage, GradeList, ClassList, UserSetValid } from "^/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      PopShowFlag: false,
      PopShowPwFlag: false,
      PopShowFlagSearch: false,
      PopEdit: false,
      PopInfo: false,
      PopInfoObj: {},
      filter: {
        schoolYearId: this.Dictionary.SchoolYearDefault
      },
      gradeOptions: [],
      classOptions: [],
      tableObj: [{}]
    };
  },
  created() {
    this.SchoolYearChange(this.filter.schoolYearId);
    this.init();
  },
  methods: {
    init(obj) {
      StudentUserPage(obj).then(res => {
        this.tableObj = res.data.data;
      });
    },
    info(row) {
      this.PopShowFlag = true;
      this.PopEdit = true;
      this.PopInfo = true;
      this.PopInfoObj = row;
    },
    changePwd(row) {
      this.PopInfoObj = row;
      this.PopShowPwFlag = true;
    },
    SchoolYearChange(val) {
      this.filter.gradeId = "";
      this.filter.classId = "";
      this.classOptions = [];
      GradeList({ schoolYearId: val }).then(res => {
        this.gradeOptions = res.data.data;
        this.init(this.filter);
      });
    },
    GradeChange(val) {
      this.filter.classId = "";
      ClassList({ gradeId: val }).then(res => {
        this.classOptions = res.data.data;
        this.init(this.filter);
      });
    },
    disabled(row) {
      UserSetValid({
        userIds: row.userId,
        disabled: row.disabled ? 0 : 1
      }).then(res => {
        // this.init();
        row.disabled = row.disabled ? 0 : 1;
      });
    },
    Update() {
      this.init();
    }
  },
  components: {
    DiaLog,
    ChangePwDiaLog
  }
};
</script>

<style>
</style>
