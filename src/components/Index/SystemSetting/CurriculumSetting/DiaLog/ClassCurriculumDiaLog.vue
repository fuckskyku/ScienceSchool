/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Thursday, 4th July 2019 9:07:09 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="ClassCurriculumDiaLog">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
      @close="closeDialog"
    >
      <span slot="title" class="DiaLogTitle">添加任课表</span>
      <main class="form">
        <el-form :model="form" ref="form" :rules="Verification.ClassCurriculum" label-width="120px">
          <el-form-item label="学年：" prop="schoolYearId">
            <el-select placeholder="请选择学年" @change="SchoolYearChange" v-model="form.schoolYearId">
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
            <el-select v-model="form.gradeId" placeholder="请选择年级" @change="GradeChange">
              <el-option
                v-for="item in gradeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级：" prop="classId">
            <el-select v-model="form.classId" placeholder="请选择班级">
              <el-option
                v-for="item in classOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程：" prop="subjectId">
            <el-select v-model="form.subjectId" placeholder="请选择课程">
              <el-option
                v-for="item in subjectOption"
                :label="item.subjectName"
                :value="item.subjectId"
                :key="item.subjectId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任课老师：" class="flex" prop="teacherName">
            <el-input :disabled="true" type="text" v-model="form.teacherName"></el-input>
            <el-button type="primary" @click="innerVisible=true;">选择</el-button>
          </el-form-item>
        </el-form>
      </main>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="Save">确 定</el-button>
      </div>

      <el-dialog
        width="60%"
        :visible.sync="innerVisible"
        append-to-body
        class="innerDiaLog"
        :close-on-click-modal="false"
      >
        <span slot="title" class="DiaLogTitle">选择</span>
        <main class="form">
          <div class="input">
            <el-input v-model="filter.tableSearchText" placeholder="请输入查找条件"></el-input>
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
  GradeList,
  ClassList,
  TeacherPage,
  SubjectTeacherSaveOrUpdate,
  GradeSubjectPage
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
      classOptions: [],
      subjectOption: [],
      filter: {},
      radio: "",
      tableObj: [],
      form: { schoolYearId: this.Dictionary.SchoolYearDefault }
    };
  },
  created() {
    this.init();
    this.SchoolYearChange(this.form.schoolYearId);
    // GradeList().then(res => {
    //   this.gradeOptions = res.data.data;
    // });
  },
  watch: {
    Show(val) {
      this.dialogVisible = val;
    },
    Edit(val) {
      if (val) {
        this.InfoObj.isMajor = Number(this.InfoObj.isMajor);
        this.form = this.InfoObj;
      }
    }
  },
  methods: {
    init() {
      TeacherPage().then(res => {
        this.tableObj = res.data.data;
      });
    },
    Save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$loadingRes("执行中");
          SubjectTeacherSaveOrUpdate(this.form).then(res => {
            this.$loadingRes().close();
            this.closeDialog();
          });
        } else {
          return false;
        }
      });
    },
    // handleCurrentChange(val) {
    //   this.tempObj.teacherId = val.id;
    //   this.tempObj.teacherName = val.name;
    // },
    SubmitSelect() {
      this.innerVisible = false;
      this.form.teacherId = this.radio;
      this.tableObj.data.forEach(item => {
        if (this.radio == item.id) {
          this.form.teacherName = item.name;
        }
      });
    },
    SchoolYearChange(val) {
      GradeList({ schoolYearId: val }).then(res => {
        this.gradeOptions = res.data.data;
      });
    },
    GradeChange(val) {
      ClassList({ gradeId: val }).then(res => {
        this.classOptions = res.data.data;
      });
      GradeSubjectPage(this.form).then(res => {
        this.subjectOption = res.data.data;
      });
    },
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

