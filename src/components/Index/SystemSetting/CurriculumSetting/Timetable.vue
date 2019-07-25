/*
 * File: GradeConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 5:05:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Wednesday, 10th July 2019 4:59:40 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="Timetable">
    <div class="PublicTitle">
      <span>课程表</span>
      <!-- <el-button>编辑</el-button> -->
    </div>
    <section>
      <div class="Button_Group">
        <div class="SearchGroup">
          <el-select placeholder="请选择学年" v-model="filter.schoolYearId" @change="SchoolYearChange">
            <el-option
              v-for="item in Dictionary.SchoolYearOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>

          <el-select placeholder="请选择学期" v-model="filter.semester">
            <el-option
              v-for="item in Dictionary.SchoolTerm"
              :key="item.val"
              :label="item.label"
              :value="item.val"
            ></el-option>
          </el-select>
          <el-select v-model="filter.gradeId" placeholder="请选择年级" @change="GradeChange">
            <el-option
              v-for="item in gradeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select v-model="filter.classId" placeholder="请选择班级" @change="filterChange">
            <el-option
              v-for="item in classOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="ButtonGroup top">
          <el-button @click="dowload" v-if="isAuthority('sys:subejctTeacher:export')">导出模板</el-button>
          <el-button
            type="primary"
            @click="PopShowLeadingIn = true;"
            v-if="isAuthority('sys:subejctTeacher:import')"
          >导入课程表</el-button>
        </div>
      </div>
      <el-table
        :data="tableObj.data"
        border
        stripe
        :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
        :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
      >
        <el-table-column :show-overflow-tooltip="true" label="节数" prop="orderId"></el-table-column>

        <el-table-column
          :show-overflow-tooltip="true"
          v-for="(item,index) in weekList"
          :key="index"
          :label="item.label"
        >
          <template slot-scope="scope">
            <el-select
              clearable
              placeholder
              v-model="scope.row.classSubjectList[index].subjectId"
              @change="subjectChange($event,index,scope.row)"
            >
              <el-option
                v-for="item in subjectOptions"
                :label="item.subjectName"
                :value="item.subjectId"
                :key="item.subjectId"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <LeadingIn
      :Show.sync="PopShowLeadingIn"
      :Parameter="filter"
      :UploadUrl="'api/classSubject/importData'"
      @Update="Update"
      :Href="'/static/Dowload/课程表导入模板.xlsx'"
    ></LeadingIn>
  </main>
</template>

<script>
import {
  ClassSubjectList,
  GradeList,
  ClassList,
  ClassSubjectSaveOrUpdate,
  ClassSubjectExportData,
  SubjectTeacherPage
} from "^/api/api";

import LeadingIn from "../../../Templet/LeadingIn";

export default {
  inject: ["reload"],
  data() {
    return {
      PopShowFlag: false,
      PopShowFlagSearch: false,
      PopShowLeadingIn: false,
      PopEdit: false,
      PopInfoObj: {},
      weekList: [
        { label: "星期一" },
        { label: "星期二" },
        { label: "星期三" },
        { label: "星期四" },
        { label: "星期五" }
      ],
      gradeOptions: [],
      classOptions: [],
      subjectOptions: [],
      filter: {
        schoolYearId: this.Dictionary.SchoolYearDefault,
        semester: 1,
        gradeId: "",
        classId: "",
        pageSize: 10000
      },
      tableObj: [{}]
    };
  },
  created() {
    GradeList({ schoolYearId: this.filter.schoolYearId }).then(res => {
      this.gradeOptions = res.data.data;
      this.filter.gradeId = res.data.data[0] ? res.data.data[0].id : null;
      ClassList({ gradeId: this.filter.gradeId }).then(res => {
        this.classOptions = res.data.data;
        this.filter.classId = res.data.data[0] ? res.data.data[0].id : null;
        this.filterChange();
      });
    });
  },
  methods: {
    init(obj) {
      ClassSubjectList(obj).then(res => {
        this.tableObj = res.data;
      });
    },
    subjectChange(val, index, row) {
      // console.log(row);
      this.$set(this.filter, "orderId", row.classSubjectList[index].orderId);
      this.$set(this.filter, "week", row.classSubjectList[index].week);
      this.$set(this.filter, "id", row.classSubjectList[index].id);
      this.$set(this.filter, "subjectId", val);
      // console.log(this.filter);
      // console.log(val, index);
      ClassSubjectSaveOrUpdate(this.filter).then(res => {
        this.elInfo("设置成功", "success");
        this.init(this.filter);
      });
    },

    SchoolYearChange(val) {
      this.filter.gradeId = "";
      this.filter.semester = "";
      this.filter.classId = "";
      this.classOptions = [];
      this.tableObj = {};
      GradeList({ schoolYearId: val }).then(res => {
        this.gradeOptions = res.data.data;
      });
    },
    GradeChange(val) {
      this.filter.classId = "";
      this.tableObj = {};
      ClassList({ gradeId: val }).then(res => {
        this.classOptions = res.data.data;
      });
    },
    dowload() {
      ClassSubjectExportData(this.filter).then(res => {});
    },
    filterChange(val) {
      SubjectTeacherPage(this.filter).then(res => {
        this.subjectOptions = res.data.data.data;
      });
      ClassSubjectList(this.filter).then(res => {
        this.tableObj = res.data;
      });
    },
    del(id) {
      ClassDelete({ id: id }).then(res => {
        this.reload();
      });
    },
    edit(row) {
      this.PopInfoObj = row;
      this.PopShowFlag = true;
      this.PopEdit = true;
    },
    Update() {
      this.init();
    }
  },
  components: {
    LeadingIn
  }
};
</script>

<style>
</style>
