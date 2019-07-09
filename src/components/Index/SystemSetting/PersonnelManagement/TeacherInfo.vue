/*
 * File: GradeConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 5:05:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Thursday, 4th July 2019 2:29:50 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="TeacherInfo">
    <div class="PublicTitle">
      <span>教师信息管理</span>
      <!-- <el-button>编辑</el-button> -->
    </div>
    <section>
      <div class="Button_Group">
        <div class="SearchGroup">
          <div class="checkGroup" style="margin-bottom:20px;">
            <el-checkbox-group v-model="checkList" @change="handleCheckedChange">
              <el-checkbox label="noCard">无卡号</el-checkbox>
              <el-checkbox label="noFaceImg">无相片</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="ButtonGroup">
          <el-button
            type="primary"
            @click="addTeacher()"
            v-if="isAuthority('sys:teacher:create')"
          >新增</el-button>
          <el-button type="primary" @click="dowload" v-if="isAuthority('sys:teacher:export')">导出</el-button>
          <el-button
            type="primary"
            @click="PopShowLeadingIn=true"
            v-if="isAuthority('sys:teacher:import')"
          >导入</el-button>
          <el-upload
            class="upload-demo"
            action="/api/teacher/uploadBetchImg"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            name="files"
            multiple
          >
            <el-button
              style="margin:0 15px"
              type="primary"
              v-if="isAuthority('sys:teacher:importImg')"
            >照片导入</el-button>
          </el-upload>
        </div>
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
        <el-table-column :show-overflow-tooltip="true" label="姓名" prop="name"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="性别">
          <!-- <template slot-scope="scope">{{scope.row.sex == 1 ? '男' : '女'}}</template> -->
          <template
            slot-scope="scope"
          >{{scope.row.sex == 1 ? "男" : scope.row.sex == 2 ? '女' : scope.row.sex }}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="部门" prop="departmentName"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="教研组" prop="teacherGroupName"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="职务" prop="positionName"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="手机" prop="mobile"></el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="green"
              @click="info(scope.row)"
              v-if="isAuthority('sys:teacher:info')"
            >详情</el-button>
            <el-button
              type="text"
              @click="edit(scope.row)"
              v-if="isAuthority('sys:teacher:update')"
            >编辑</el-button>
            <el-button
              type="text"
              @click="changePwd(scope.row)"
              v-if="isAuthority('sys:teacher:modifyPwd')"
            >修改密码</el-button>
            <el-button
              type="text"
              class="red"
              @click="del(scope.row.id)"
              v-if="isAuthority('sys:teacher:delete')"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page :tabObj.sync="tableObj" :filterObj="filter" name="TeacherPage"></page>
    </section>
    <DiaLog
      :Show.sync="PopShowFlag"
      :Edit.sync="PopEdit"
      :InfoObj="PopInfoObj"
      @Update="Update"
      :Info.sync="PopInfo"
    ></DiaLog>
    <ChangePwDiaLog :Show.sync="PopShowPwFlag" :InfoObj="ParameterObj"></ChangePwDiaLog>
    <LeadingIn
      :Show.sync="PopShowLeadingIn"
      :UploadUrl="'api/teacher/importData'"
      @Update="Update"
      :Href="'/static/Dowload/教师信息导入模板.xlsx'"
    ></LeadingIn>
  </main>
</template>

<script>
import ChangePwDiaLog from "../../../Templet/ChangePwDiaLog";
import DiaLog from "./DiaLog/TeacherInfoDiaLog";
import LeadingIn from "../../../Templet/LeadingIn";
import { TeacherPage, TeacherDelete, TeacherExportData } from "^/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      PopShowFlag: false,
      PopShowPwFlag: false,
      PopShowLeadingIn: false,
      PopEdit: false,
      PopInfo: false,
      PopInfoObj: {},
      ParameterObj: {},
      filter: {},
      type: "Class",
      tableObj: [{}],
      // multipleSelection: [],
      checkList: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    handleCheckedChange(value) {
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
      // console.log(this.multipleSelection);
    },
    init(obj) {
      TeacherPage(obj).then(res => {
        console.log("tableObj", res.data.data);
        this.tableObj = res.data.data;
      });
    },
    changePwd(row) {
      this.PopShowPwFlag = true;
      this.ParameterObj = row;
      // console.log(row);
    },
    del(id) {
      this.OpenDel(
        null,
        "warning",
        function() {
          TeacherDelete({ teacherId: id }).then(res => {
            this.init(this.filter);
          });
        }.bind(this)
      );
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
      this.PopInfoObj.worker = true;
      this.PopInfoObj.teacherId = this.PopInfoObj.id;
    },
    addTeacher() {
      this.PopEdit = false;
      this.PopShowFlag = true;
    },
    dowload() {
      TeacherExportData(this.filter).then(res => {});
    },

    Update() {
      this.init({
        noCard: this.checkList.some((item, index, array) => {
          return item == "noCard";
        }),
        noFaceImg: this.checkList.some((item, index, array) => {
          return item == "noFaceImg";
        })
      });
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
    LeadingIn
  }
};
</script>

<style>
</style>
