/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Thursday, 4th July 2019 9:56:18 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="GradeCurriculumDiaLog">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
      @close="closeDialog"
    >
      <span slot="title" class="DiaLogTitle">{{Edit?'编辑年级课程信息':'添加年级课程信息'}}</span>
      <main class="form">
        <el-form :model="form" ref="form" :rules="Verification.GradeCurriculum" label-width="120px">
          <el-form-item label="学年：" prop="schoolYearId">
            <el-select v-model="form.schoolYearId" placeholder="请选择学年" @change="SchoolYearChange">
              <el-option
                v-for="item in Dictionary.SchoolYearOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学期：" prop="semester">
            <el-select placeholder="请选择学期" v-model="form.semester">
              <el-option
                v-for="item in Dictionary.SchoolTerm"
                :key="item.val"
                :label="item.label"
                :value="item.val"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级：" prop="gradeId">
            <el-select v-model="form.gradeId" placeholder="请选择年级">
              <el-option
                v-for="item in gradeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="科目：" prop="subjectId">
            <el-select v-model="form.subjectId" placeholder="请选择科目">
              <el-option
                v-for="item in Dictionary.SubjectOptions"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="周课时：">
            共&nbsp;
            <el-input-number v-model="form.weekTime" :min="0" :precision="0"></el-input-number>&nbsp;时
          </el-form-item>
          <el-form-item label="开始周：">
            第&nbsp;
            <el-input-number v-model="form.startWeek" :min="0" :precision="0"></el-input-number>&nbsp;周
          </el-form-item>
          <el-form-item label="结束周：">
            第&nbsp;
            <el-input-number v-model="form.endWeek" :min="form.startWeek+1" :precision="0"></el-input-number>&nbsp;周
          </el-form-item>
          <el-form-item label="总课时：">
            共&nbsp;
            <el-input-number v-model="form.totalTime" :min="form.weekTime+1" :precision="0"></el-input-number>&nbsp;时
          </el-form-item>
          <el-form-item label="学分：">
            共&nbsp;
            <el-input-number v-model="form.xf" :min="0" :precision="1"></el-input-number>&nbsp;分
          </el-form-item>

          <el-form-item label="备课组组长：" prop="teacherId">
            <span>{{form.teacherName}}</span>
            <el-button type="text" @click="innerVisibleClick">选择</el-button>
          </el-form-item>
        </el-form>
      </main>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="Save">确 定</el-button>
      </div>

      <el-dialog
        width="60%"
        :visible.sync="innerVisible"
        append-to-body
        class="innerDiaLog"
        :close-on-click-modal="false"
      >
        <span slot="title" class="DiaLogTitle">选择人员</span>
        <main class="form">
          <div class="input">
            <el-input v-model="filter.keyWord" placeholder="请输入查找条件" @change="filterChange"></el-input>
          </div>
          <el-table
            :data="tableObj.data"
            border
            stripe
            :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
            :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
          >
            <el-table-column :show-overflow-tooltip="true" label width="80">
              <template slot-scope="scope">
                <!-- <el-checkbox v-model="scope.row." @change="classShow(scope.row.id)" label></el-checkbox>  -->
                <el-radio v-model="radio" :label="scope.row.id">&nbsp</el-radio>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="姓名" prop="name"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="手机" prop="mobile"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="部门" prop="departmentName"></el-table-column>
          </el-table>
          <page :tabObj.sync="tableObj" name="TeacherPage" :filterObj="filter"></page>
        </main>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="SubmitSelect">确 定</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </main>
</template>
<script>
import {
  GradeSubjectSaveOrUpdate,
  GradeList,
  TeacherPage,
  GradeSubjectInfo
} from "^/api/api";
export default {
  inject: ["reload"],
  props: {
    Show: Boolean,
    Edit: Boolean,
    InfoObj: null
  },
  data() {
    return {
      dialogVisible: false,
      innerVisible: false,
      gradeOptions: [],
      filter: {},
      tableObj: [{}],
      radio: "",
      form: {
        schoolYearId: this.Dictionary.SchoolYearDefault
      }
    };
  },
  watch: {
    Show(val) {
      this.dialogVisible = val;
      if (val) {
        this.SchoolYearChange(this.form.schoolYearId);
      }
    },
    Edit(val) {
      if (val) {
        // this.form = this.InfoObj;
        GradeSubjectInfo({ gradeSubjectId: this.InfoObj.id }).then(res => {
          this.form = res.data.data;
        });
      }
    }
  },
  created() {
    this.SchoolYearChange(this.form.schoolYearId);
    this.init();
  },
  methods: {
    init(obj) {
      TeacherPage(obj).then(res => {
        this.tableObj = res.data.data;
      });
    },
    innerVisibleClick() {
      this.innerVisible = true;
      this.init();
    },
    Save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$loadingRes("执行中");
          GradeSubjectSaveOrUpdate(this.form).then(res => {
            this.$loadingRes().close();
            this.closeDialog();
          });
        } else {
          return false;
        }
      });
    },
    SubmitSelect() {
      this.innerVisible = false;
      this.form.teacherId = this.radio;
      this.tableObj.data.forEach(item => {
        if (this.radio == item.id) {
          this.form.teacherName = item.name;
        }
      });
    },
    filterChange() {
      this.init(this.filter);
    },
    SchoolYearChange(val) {
      GradeList({ schoolYearId: val }).then(res => {
        this.gradeOptions = res.data.data;
      });
    },
    // handleCurrentChange(val) {
    //   this.tempObj.teacherId = val.id;
    //   this.tempObj.teacherName = val.name;
    // },
    closeDialog() {
      this.$emit("update:show", false);
      this.$emit("update:edit", false);
      this.$emit("Update");
      this.radio = "";
      this.form = {
        schoolYearId: this.Dictionary.SchoolYearDefault
      };
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/DiaLog.scss";
</style>

