/*
 * File: GradeConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 5:05:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Monday, 8th July 2019 11:36:04 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="ClassConfig">
    <div class="PublicTitle">
      <span>班级管理</span>
      <!-- <el-button>编辑</el-button> -->
    </div>
    <section>
      <div class="Button_Group">
        <div class="SearchGroup">
          <el-select v-model="filter.schoolYearId" placeholder="请选择学年" @change="filterChange(true)">
            <el-option
              v-for="item in Dictionary.SchoolYearOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="filter.gradeId"
            clearable
            placeholder="请选择年级"
            @change="filterChange(false)"
          >
            <el-option
              v-for="item in gradeOptions"
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
            v-if="isAuthority('sys:class:create')"
          >添加班级</el-button>
          <el-button type="primary" @click="dowload" v-if="isAuthority('sys:class:export')">导出班级</el-button>
          <el-button
            type="primary"
            @click="PopShowLeadingIn = true"
            v-if="isAuthority('sys:class:import')"
          >导入班级</el-button>
        </div>
      </div>
      <el-table
        :data="tableObj.data"
        border
        stripe
        :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
        :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
      >
        <!-- <el-table-column :show-overflow-tooltip="true" label="班级代码" prop="classId"></el-table-column> -->
        <el-table-column :show-overflow-tooltip="true" label="年级" prop="gradeName"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="班级名称" prop="name"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="班级类型" prop="classTypeName"></el-table-column>
        <!-- <el-table-column :show-overflow-tooltip="true" label="入学学年" prop="enteryear"></el-table-column> -->
        <el-table-column :show-overflow-tooltip="true" label="建班日期" prop="createDate"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="学制" prop="studyLength"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="班主任" prop="classTeacherName">
          <template slot-scope="scope">
            <span>{{scope.row.classTeacherName}}</span>
            <el-button type="text" @click="selectTeacher(scope.row)">选择</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="edit(scope.row)"
              v-if="isAuthority('sys:class:update')"
            >编辑</el-button>
            <el-button
              type="text"
              class="red"
              v-if="isAuthority('sys:class:delete')"
              @click="del(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page :tabObj.sync="tableObj" :filterObj="filter" name="ClassPage"></page>
    </section>

    <DiaLog :Show.sync="PopShowFlag" :Edit.sync="PopEdit" :InfoObj="PopInfoObj" @Update="Update"></DiaLog>
    <DiaLogSearch
      :Show.sync="PopShowFlagSearch"
      :ParameterObj.sync="ParameterObj"
      :type="type"
      @Update="Update"
    ></DiaLogSearch>
    <LeadingIn
      :Show.sync="PopShowLeadingIn"
      :UploadUrl="'api/class/importClassData'"
      @Update="Update"
      :Href="'/static/Dowload/班级导入模板.xlsx'"
    ></LeadingIn>
  </main>
</template>

<script>
import DiaLogSearch from "./DiaLog/GradeSettingSearchDiaLog";
import DiaLog from "./DiaLog/ClassConfigDiaLog";
import LeadingIn from "../../../Templet/LeadingIn";
import {
  ClassPage,
  ClassDelete,
  SchoolYearList,
  GradeList,
  ClassExportClassData
} from "^/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      PopShowFlag: false,
      PopShowFlagSearch: false,
      PopShowLeadingIn: false,
      PopEdit: false,
      PopInfoObj: {},
      ParameterObj: {},
      gradeOptions: [],
      type: "Class",
      filter: {
        schoolYearId: this.Dictionary.SchoolYearDefault
      },
      tableObj: [{}]
    };
  },
  created() {
    this.init(this.filter);
    GradeList(this.filter).then(res => {
      this.gradeOptions = res.data.data;
    });
  },
  methods: {
    init(obj) {
      ClassPage(obj).then(res => {
        this.tableObj = res.data.data;
      });
    },
    filterChange(flag) {
      if (flag) {
        this.filter.gradeId = "";
        GradeList(this.filter).then(res => {
          this.gradeOptions = res.data.data;
        });
      }
      this.init(this.filter);
    },
    selectTeacher(row) {
      this.PopShowFlagSearch = true;
      this.ParameterObj = row;
    },
    del(id) {
      this.OpenDel(
        null,
        "warning",
        function() {
          ClassDelete({ id: id }).then(res => {
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
    add() {
      this.tableObj.push({});
    },
    dowload() {
      ClassExportClassData().then(res => {});
    },
    Update() {
      this.init(this.filter);
    }
  },
  components: {
    DiaLog,
    DiaLogSearch,
    LeadingIn
  }
};
</script>

<style>
</style>
