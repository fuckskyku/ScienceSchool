/*
 * File: GradeConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 5:05:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Friday, 5th July 2019 1:53:46 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="GradeCurriculum">
    <div class="PublicTitle">
      <span>年级课程设置</span>
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

          <el-select placeholder="请选择年级" clearable v-model="filter.gradeId" @change="filterChange">
            <el-option
              v-for="item in gradeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>

          <el-select
            placeholder="请选择科目"
            clearable
            v-model="filter.subjectId"
            @change="filterChange"
          >
            <el-option
              v-for="item in Dictionary.SubjectOptions"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="ButtonGroup">
          <el-button
            type="primary"
            @click="PopShowFlag=true"
            v-if="isAuthority('sys:gradeSubject:create')"
          >添加年级</el-button>
        </div>
      </div>

      <el-table
        :data="tableObj.data"
        border
        stripe
        :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
        :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
      >
        <el-table-column :show-overflow-tooltip="true" label="学年" prop="schoolYearName"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="学期" prop="semester">
          <template slot-scope="scope">
            <span>{{returnSelectVal(scope.row.semester,Dictionary.SchoolTerm,'val','label')}}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="年级" prop="gradeName"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="科目" prop="subjectName"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="备课组组长" prop="teacherName"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="edit(scope.row)"
              v-if="isAuthority('sys:gradeSubject:update')"
            >编辑</el-button>
            <el-button
              type="text"
              class="red"
              @click="del(scope.row.id)"
              v-if="isAuthority('sys:gradeSubject:delete')"
            >删除</el-button>
            <!-- <el-button type="text">启用</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <page :tabObj.sync="tableObj" :filterObj="filter" name="GradeSubjectPage"></page>
    </section>
    <DiaLog :Show.sync="PopShowFlag" :Edit.sync="PopEdit" :InfoObj="PopInfoObj" @Update="Update"></DiaLog>
  </main>
</template>

<script>
import DiaLog from "./DiaLog/GradeCurriculumDiaLog";
import { GradeSubjectPage, GradeSubjectDelete, GradeList } from "^/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      PopShowFlag: false,
      PopEdit: false,
      PopInfoObj: {},
      gradeOptions: [],
      filter: {
        schoolYearId: this.Dictionary.SchoolYearDefault
      },
      tableObj: [{}]
    };
  },
  created() {
    this.init(this.filter);
    this.SchoolYearChange(this.filter.schoolYearId);
  },
  methods: {
    init(obj) {
      GradeSubjectPage(obj).then(res => {
        this.tableObj = res.data.data;
      });
    },
    SchoolYearChange(val) {
      this.filter.semester = "";
      this.filter.gradeId = "";
      GradeList({ schoolYearId: val }).then(res => {
        this.gradeOptions = res.data.data;
      });
      this.init(this.filter);
    },
    filterChange() {
      this.init(this.filter);
    },
    del(id) {
      this.OpenDel(
        null,
        "warning",
        function() {
          GradeSubjectDelete({
            gradeSubjectId: id
          }).then(res => {
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
    Update() {
      this.init(this.filter);
    }
  },
  components: {
    DiaLog
  }
};
</script>

<style>
</style>
