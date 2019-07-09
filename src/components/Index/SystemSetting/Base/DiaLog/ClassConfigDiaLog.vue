/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Monday, 8th July 2019 10:15:47 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="ClassConfigDiaLog">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
      @close="closeDialog"
    >
      <span slot="title" class="DiaLogTitle">{{Edit?'编辑班级信息':'新增班级信息'}}</span>
      <main class="form">
        <el-form :model="form" ref="form" :rules="Verification.Class" label-width="120px">
          <el-form-item label="学年：" required>
            <el-input v-model="Dictionary.SchoolYearNameDefault" :disabled="true" v-if="!Edit"></el-input>
            <el-input v-model="form.schoolYearName" :disabled="true" v-if="Edit"></el-input>
            <!-- <input type="text"  value=""> -->
            <!-- <el-select v-model="form.enteryear" placeholder="请选择学年" @change="filterChange">
              <el-option
                v-for="item in Dictionary.SchoolYearOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>-->
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

          <el-form-item label="建班日期：" prop="createDate">
            <el-date-picker
              type="date"
              placeholder="开始日期"
              v-model="form.createDate"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="学制：" prop="studyLength">
            <el-input v-model="form.studyLength" placeholder="请输入学制"></el-input>
          </el-form-item>
          <el-form-item label="入学方式：" prop="enterType">
            <el-select v-model="form.enterType" placeholder="请选择入学方式">
              <el-option
                v-for="item in Dictionary.AdmissionMode"
                :label="item.label"
                :value="item.val"
                :key="item.val"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级序号：" prop="orderId">
            <el-input v-model="form.orderId" placeholder="请输入班级序号"></el-input>
          </el-form-item>

          <el-form-item label="班级名称：" prop="name">
            <el-input v-model="form.name" placeholder="如：1班"></el-input>
          </el-form-item>

          <el-form-item label="班级类别：" prop="classType">
            <el-select v-model="form.classType" placeholder="请选择班级类别">
              <el-option
                v-for="item in Dictionary.ClassType"
                :label="item.label"
                :value="item.val"
                :key="item.val"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="校区：" prop="subschoolCode">
            <el-select v-model="form.subschoolCode" placeholder="请选择校区">
              <el-option
                v-for="item in Dictionary.SubSchoolOptions"
                :label="item.name"
                :value="item.subschoolCode"
                :key="item.subschoolCode"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否重点班：" prop="isMajor">
            <el-radio-group v-model="form.isMajor">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </main>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Save">确 定</el-button>
      </div>
    </el-dialog>
  </main>
</template>
<script>
import { ClassSave, GradeList, ClassUpdate } from "^/api/api";
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
      gradeOptions: [],
      form: {
        isMajor: 0
      }
    };
  },
  watch: {
    Show(val) {
      this.dialogVisible = val;
    },
    Edit(val) {
      if (val) {
        this.InfoObj.isMajor = Number(this.InfoObj.isMajor);
        console.log(this.InfoObj);
        this.form = this.InfoObj;
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      GradeList({ schoolYearId: this.Dictionary.SchoolYearDefault }).then(
        res => {
          this.gradeOptions = res.data.data;
        }
      );
    },
    // filterChange(val) {
    //   GradeList({ schoolYearId: val }).then(res => {
    //     this.gradeOptions = res.data.data;
    //   });
    // },
    Save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$loadingRes("执行中");
          if (this.Edit) {
            ClassUpdate(this.form).then(res => {
              this.$loadingRes().close();
              this.closeDialog();
            });
          } else {
            ClassSave(this.form).then(res => {
              this.$loadingRes().close();
              this.closeDialog();
              // this.reload();
            });
          }
        } else {
          return false;
        }
      });
    },
    closeDialog() {
      this.$emit("update:show", false);
      this.$emit("update:edit", false);
      this.$emit("Update");
      this.form = {
        isMajor: 0
      };
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/DiaLog.scss";
</style>

