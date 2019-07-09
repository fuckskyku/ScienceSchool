/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Thursday, 27th June 2019 9:40:17 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="StudentInfoDiaLog">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
      @close="closeDialog"
    >
      <span slot="title" class="DiaLogTitle">查看学生信息</span>
      <main class="form">
        <el-form :model="form" ref="form" label-width="120px" :disabled="Info">
            <el-form-item label="学籍号：">
              <el-input v-model="form.xjh" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名：">
              <el-input v-model="form.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="性别：">
              <el-radio
                disabled
                v-model="form.sex"
                v-for="item in Dictionary.Sex"
                :key="item.val"
                :label="item.val"
              >{{item.label}}</el-radio>
            </el-form-item>
            <el-form-item label="年级：">
              <el-select v-model="form.gradeName" disabled>
                <el-option
                  v-for="item in gradeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班级：">
              <el-select disabled v-model="form.className">
                <el-option
                  v-for="item in classOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="入学时间：">
              <el-input v-model="form.createdTime" disabled></el-input>
            </el-form-item> -->
        </el-form>
      </main>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible=false">确 定</el-button>
      </div> -->
    </el-dialog>
  </main>
</template>
<script>
import {
  StudentInfo,
  GradeList,
  ClassList,
  StudentSaveOrUpdate
} from "^/api/api";
export default {
  inject: ["reload"],
  props: {
    Show: Boolean,
    Edit: Boolean,
    Info: Boolean,
    InfoObj: null
  },
  data() {
    return {
      dialogVisible: false,
      step: 1,
      gradeOptions: [],
      classOptions: [],
      imageUrl: "",
      form: {
        isClock: true,
        studentParentPinList: [{}]
      }
    };
  },
  mounted() {
    
  },
  watch: {
    Show(val) {
      this.dialogVisible = val;
      // this.init();
    },
    Edit(val) {
      if (val) {
        this.form = this.InfoObj;
        this.form.sex = parseInt(this.form.sex)
        console.log(this.form)
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      
    },
    closeDialog() {
      this.$emit("update:show", false);
      this.$emit("update:edit", false);
      this.$emit("update:info", false);
      this.$emit("Update");
      this.step = 1;
      this.form = {
        isClock: true,
        studentParentPinList: {}
      };
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/DiaLog.scss";
</style>

