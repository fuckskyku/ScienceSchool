/*
 * File: GradeConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 5:05:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Friday, 12th July 2019 9:19:48 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="StudentInfo">
    <div class="PublicTitle">
      <span>学生信息管理</span>
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
          <el-select placeholder="年级" v-model="filter.gradeId" clearable @change="GradeChange">
            <el-option
              v-for="item in gradeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select placeholder="班级" v-model="filter.classId" clearable @change="filterChange">
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
            @click="PopShowFlag=true"
            v-if="isAuthority('sys:student:create')"
          >添加</el-button>
          <el-button type="primary" @click="dowload" v-if="isAuthority('sys:student:export')">导出</el-button>
          <el-button type="primary" @click="importTMP" v-if="isAuthority('sys:student:import')">导入</el-button>
          <!-- <el-button type="primary">照片导出</el-button> -->
          <el-button
            @click="PopShowStudentLeadingIn=true"
            style="margin:0 15px"
            type="primary"
            v-if="isAuthority('sys:student:importImg')"
          >照片导入</el-button>
        </div>
      </div>
      <div class="checkGroup" style="margin-bottom:20px;">
        <el-checkbox-group v-model="checkList" @change="handleCheckedChange">
          <el-checkbox label="noCard">无卡号</el-checkbox>
          <el-checkbox label="noFaceImg">无相片</el-checkbox>
        </el-checkbox-group>
      </div>
      <el-table
        :data="tableObj.data"
        border
        stripe
        :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
        :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
        @selection-change="checked"
      >
        <!-- <el-table-column  :show-overflow-tooltip="true"   type="selection" width="55"></el-table-column  > -->
        <!-- <el-table-column  :show-overflow-tooltip="true"   label="编号" prop="classId"></el-table-column  > -->
        <el-table-column :show-overflow-tooltip="true" label="学籍号" prop="xjh"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="姓名" prop="name"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="性别" prop="sex">
          <template slot-scope="scope">{{scope.row.sex == 1 ? '男' : '女'}}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="班级" prop="className"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="身份证号" prop="idCard"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="是否住宿" prop="isStay">
          <template slot-scope="scope">
            <span>{{scope.row.isStay?'是':'否'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="green"
              @click="info(scope.row)"
              v-if="isAuthority('sys:student:info')"
            >详情</el-button>
            <el-button
              type="text"
              @click="edit(scope.row)"
              v-if="isAuthority('sys:student:update')"
            >编辑</el-button>
            <el-button
              type="text"
              @click="changePwd(scope.row)"
              v-if="isAuthority('sys:student:modifyPwd')"
            >修改密码</el-button>
            <el-button
              type="text"
              class="red"
              @click="del(scope.row.id)"
              v-if="isAuthority('sys:student:delete')"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page :tabObj.sync="tableObj" :filterObj="filter" name="StudentPage"></page>
    </section>
    <DiaLog
      :Show.sync="PopShowFlag"
      :Edit.sync="PopEdit"
      :InfoObj="PopInfoObj"
      @Update="Update"
      :Info.sync="PopInfo"
    ></DiaLog>
    <ChangePwDiaLog :Show.sync="PopShowPwFlag" :InfoObj="PopInfoObj"></ChangePwDiaLog>
    <LeadingIn
      :Show.sync="PopShowLeadingIn"
      :Parameter="filter"
      :UploadUrl="'api/student/importData'"
      @Update="Update"
      :Href="'/static/Dowload/学生信息导入模板.xlsx'"
    ></LeadingIn>
    <StudentLeadingIn :Show.sync="PopShowStudentLeadingIn" :Type="1"></StudentLeadingIn>
  </main>
</template>
<script>
import DiaLog from "./DiaLog/StudentInfoDiaLog";
import StudentLeadingIn from "./DiaLog/StudnetLeadingIn";
import ChangePwDiaLog from "../../../Templet/ChangePwDiaLog";
import LeadingIn from "../../../Templet/LeadingIn";
import {
  StudentPage,
  StudentDelete,
  GradeList,
  ClassList,
  StudentExportData
} from "^/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      testflat: true,
      PopShowFlag: false,
      PopShowLeadingIn: false,
      PopShowStudentLeadingIn: false,
      PopEdit: false,
      PopInfo: false,
      PopShowPwFlag: false,
      PopInfoObj: {},
      filter: {
        schoolYearId: this.Dictionary.SchoolYearDefault
      },
      tableObj: [{}],
      gradeOptions: [],
      classOptions: [],
      // multipleSelection: [],
      checkList: []
    };
  },
  created() {
    this.SchoolYearChange(this.filter.schoolYearId);
    this.init(this.filter);
  },
  methods: {
    handleCheckedChange(val) {
      delete this.filter.pageNo;
      this.$set(
        this.filter,
        "noCard",
        this.checkList.some((item, index, array) => {
          return item == "noCard";
        })
      );
      this.$set(
        this.filter,
        "noFaceImg",
        this.checkList.some((item, index, array) => {
          return item == "noFaceImg";
        })
      );
      this.init(this.filter);
    },
    checked(val) {
      // this.multipleSelection = val;
    },
    init(obj) {
      StudentPage(obj).then(res => {
        this.tableObj = res.data.data;
      });
    },
    SchoolYearChange() {
      delete this.filter.pageNo;
      this.filter.gradeId = "";
      this.filter.classId = "";
      this.classOptions = [];
      GradeList(this.filter).then(res => {
        this.gradeOptions = res.data.data;
      });
      this.init(this.filter);
    },
    GradeChange() {
      delete this.filter.pageNo;
      this.filter.classId = "";
      ClassList(this.filter).then(res => {
        this.classOptions = res.data.data;
      });
      this.init(this.filter);
    },
    filterChange() {
      delete this.filter.pageNo;
      this.init(this.filter);
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
    del(id) {
      this.OpenDel(
        null,
        "warning",
        function() {
          StudentDelete({ studentId: id }).then(res => {
            this.init(this.filter);
          });
        }.bind(this)
      );
    },
    dowload() {
      StudentExportData(this.filter).then(res => {});
    },
    importTMP() {
      if (this.filter.schoolYearId) {
        this.PopShowLeadingIn = true;
      } else {
        this.elInfo("先选择学年", "error");
      }
    },
    Update() {
      this.init(this.filter);
    },
    handleAvatarSuccess(res, file) {
      this.elInfo(res.message, "success");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  components: {
    DiaLog,
    ChangePwDiaLog,
    LeadingIn,
    StudentLeadingIn
  }
};
</script>

<style>
</style>
