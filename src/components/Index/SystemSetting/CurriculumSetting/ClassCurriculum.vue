/*
 * File: GradeConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 5:05:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Friday, 5th July 2019 1:54:01 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="ClassCurriculum">
    <div class="PublicTitle">
      <span>班级课程设置</span>
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
          <el-select placeholder="请选择学期" clearable v-model="filter.semester" @change="filterChange">
            <el-option
              v-for="item in Dictionary.SchoolTerm"
              :key="item.val"
              :label="item.label"
              :value="item.val"
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
          <el-select v-model="filter.classId" placeholder="请选择班级" clearable @change="filterChange">
            <el-option
              v-for="item in classOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="ButtonGroup top">
          <el-button
            type="primary"
            @click="PopShowFlag=true"
            v-if="isAuthority('sys:classSubject:create')"
          >添加</el-button>
          <el-button
            type="primary"
            @click="dowload"
            v-if="isAuthority('sys:classSubject:export')"
          >导出任课表</el-button>
          <el-button
            type="primary"
            @click="PopShowLeadingIn=true"
            v-if="isAuthority('sys:classSubject:import')"
          >导入任课表</el-button>
        </div>
      </div>
      <el-table
        :data="tableObj.data"
        border
        stripe
        :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
        :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
      >
        <el-table-column :show-overflow-tooltip="true" label="年级" prop="gradeName"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="班级" prop="className"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="课程" prop="subjectName"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="任课老师" prop="teacherName"></el-table-column>
        <!-- <el-table-column  :show-overflow-tooltip="true"   label="课代表" prop="createDate"></el-table-column  > -->
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="red"
              @click="del(scope.row.id)"
              v-if="isAuthority('sys:classSubject:delete')"
            >删除</el-button>
            <!-- <el-button type="text" @click="edit(scope.row)">启用</el-button> -->
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
      <!-- <page :tabObj.sync="tableObj" :filterObj.sync="filter" ref="msg" name="SubjectTeacherPage"></page> -->
    </section>
    <DiaLog :Show.sync="PopShowFlag" :Edit.sync="PopEdit" :InfoObj="PopInfoObj" @Update="Update"></DiaLog>
    <LeadingIn
      :Show.sync="PopShowLeadingIn"
      :UploadUrl="'api/subjectTeacher/importSubjectTeacher'"
      @Update="Update"
      :Href="'/static/Dowload/班级课程导入模板.xlsx'"
    ></LeadingIn>
  </main>
</template>

<script>
import DiaLog from "./DiaLog/ClassCurriculumDiaLog";
import LeadingIn from "../../../Templet/LeadingIn";
import {
  SubjectTeacherPage,
  SubjectTeacherDelete,
  GradeList,
  ClassList,
  SubjectTeacherExportData
} from "^/api/api";

export default {
  inject: ["reload"],
  data() {
    return {
      PopShowFlag: false,
      PopShowLeadingIn: false,
      PopEdit: false,
      PageEdit: false,
      PopInfoObj: {},
      gradeOptions: [],
      classOptions: [],
      filter: {
        pageSize: 10,
        schoolYearId: this.Dictionary.SchoolYearDefault
      },
      tableObj: [{}]
    };
  },
  created() {
    this.SchoolYearChange(this.filter.schoolYearId);
    this.init(this.filter);
  },
  methods: {
    init(obj) {
      SubjectTeacherPage(obj).then(res => {
        this.tableObj = res.data.data;
      });
    },
    del(id) {
      this.OpenDel(
        null,
        "warning",
        function() {
          SubjectTeacherDelete({ subjectTeacherId: id }).then(res => {
            this.init(this.filter);
          });
        }.bind(this)
      );
    },
    SchoolYearChange(val) {
      this.filter.gradeId = "";
      this.filter.semester = "";
      this.filter.classId = "";
      this.PageEdit = true
      this.classOptions = [];
      GradeList({
        schoolYearId: val
      }).then(res => {
        delete this.filter.pageNo;
        this.gradeOptions = res.data.data;
        this.init(this.filter);
      });
    },
    GradeChange(val) {
      this.PageEdit = true
      // this.$refs.msg.getMessage(this.PageEdit)
      ClassList({ gradeId: val }).then(res => {
        delete this.filter.pageNo;
        this.filter.classId = "";
        this.classOptions = res.data.data;
        console.log('Grade.filter',this.filter)
        this.init(this.filter);
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
    filterChange(val) {
      delete this.filter.pageNo;
      this.PageEdit = true
      // this.$refs.msg.getMessage(this.PageEdit)
      // console.log('class.filter',this.filter)
      this.init(this.filter);
    },
    edit(row) {
      this.PopInfoObj = row;
      this.PopShowFlag = true;
      this.PopEdit = true;
    },
    dowload() {
      SubjectTeacherExportData(this.filter).then(res => {});
    },
    pageUpdate() {
      alert(1)
    },
    Update() {
      this.init(this.filter);
    }
  },
  components: {
    DiaLog,
    LeadingIn
    // DiaLogSearch
  }
};
</script>

<style>
</style>
