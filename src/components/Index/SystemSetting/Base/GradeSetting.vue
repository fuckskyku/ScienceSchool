/*
 * File: GradeConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 5:05:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Tuesday, 9th July 2019 1:21:21 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="GradeSetting">
    <div class="PublicTitle">
      <span>年级设置</span>
      <!-- <el-button>编辑</el-button> -->
    </div>
    <section>
      <div class="Button_Group">
        <div class="SearchGroup">
          <el-select v-model="filter.schoolYearId" placeholder="请选择学年" @change="filterChange">
            <el-option
              v-for="item in Dictionary.SchoolYearOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="ButtonGroup"></div>
      </div>
      <el-table
        :data="tableObj"
        border
        stripe
        :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
        :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
      >
        <el-table-column :show-overflow-tooltip="true" label="显示班级" prop="SchoolName">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.row.id" @change="classShow(scope.row.id)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="学段" prop="gradeLevel"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="年级" prop="name"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="入学学年" prop="enteryear"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="段长" prop="gradeMasterName" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="warp">
              <span class="context">{{scope.row.gradeMasterName}}</span>
              <el-button type="text" @click="selectTeacher(scope.row,'Teacher')">选择</el-button>
            </div>
            
          </template>
        </el-table-column>
        <!-- <el-table-column  :show-overflow-tooltip="true"   label="操作">
          <template>
            <el-button type="text" @click="save">更新</el-button>
          </template>
        </el-table-column  >-->
      </el-table>
    </section>

    <div class="PublicTitle" style="margin-top:30px;" v-if="classFlag">
      <span>班级管理</span>
    </div>

    <section v-if="classFlag">
      <div class="Button_Group">
        <div class="SearchGroup"></div>
        <div class="ButtonGroup"></div>
      </div>
      <el-table
        :data="tableClassObj.data"
        border
        stripe
        :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
        :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
      >
        <el-table-column :show-overflow-tooltip="true" label="班级名称" prop="name"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="班级类型" prop="classTypeName"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="建班日期" prop="createDate"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="学制" prop="studyLength"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="班主任" prop="classMasterName" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="warp">
              <span class="context">{{scope.row.classMasterName}}</span>
              <el-button type="text" @click="selectTeacher(scope.row,'Class')">选择</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <DiaLogSearch
      :Show.sync="PopShowFlagSearch"
      :ParameterObj.sync="ParameterObj"
      :type="type"
      @Update="Update"
    ></DiaLogSearch>
  </main>
</template>

<script>
import DiaLogSearch from "./DiaLog/GradeSettingSearchDiaLog";
import { GradeList, ClassPage, SchoolYearList } from "^/api/api";
export default {
  data() {
    return {
      PopShowFlag: false,
      PopShowFlagSearch: false,
      ParameterObj: {},
      filter: {
        schoolYearId: this.Dictionary.SchoolYearDefault
      },
      gradeId: '',
      type: "Teacher",
      radio: "",
      tableObj: [{}],
      classFlag: false,
      tableClassObj: []
    };
  },
  created() {
    this.init(this.filter);
  },
  methods: {
    init(obj) {
      GradeList(obj).then(res => {
        this.tableObj = res.data.data;
      });
    },
    filterChange() {
      delete this.filter.pageNo;
      this.init(this.filter);
      this.radio = "";
      this.tableClassObj = [];
    },

    classShow(id) {
      this.gradeId = id
      ClassPage({ gradeId: id }).then(res => {
        this.classFlag = true
        this.tableClassObj = res.data.data;
      });
    },

    selectTeacher(row, text) {
      this.PopShowFlagSearch = true;
      this.ParameterObj = row;
      this.type = text;
      // console.log(row);
    },
    Update() {
      this.init(this.filter);
      ClassPage({ gradeId: this.gradeId }).then(res => {
        this.tableClassObj = res.data.data;
      });
    }
  },
  components: {
    DiaLogSearch
  }
};
</script>

<style>
</style>
