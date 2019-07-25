/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Friday, 12th July 2019 9:19:00 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="GraderConfigDialog">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
      @close="closeDialog"
    >
      <span slot="title" class="DiaLogTitle">{{Edit?'编辑学年信息':'添加学年信息'}}</span>
      <main class="form">
        <el-form :model="form" ref="form" :rules="Verification.SchoolYearVer" label-width="120px">
          <el-form-item label="学年名称：" prop="name">
            <el-input v-model="form.name" placeholder="如：2018-2019"></el-input>
          </el-form-item>
          <el-form-item label="工作日：" required>
            <el-col :span="11">
              <el-form-item prop="workStartDate">
                <el-date-picker
                  type="date"
                  placeholder="开始日期"
                  v-model="form.workStartDate"
                  style="width: 100%;"
                  value-format="timestamp"
                  :picker-options="Verification.isDateGt(form.workEndDate)"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="workEndDate">
                <el-date-picker
                  v-model="form.workEndDate"
                  type="date"
                  placeholder="结束日期"
                  style="width: 100%;"
                  value-format="timestamp"
                  :picker-options="Verification.isDateLt(form.workStartDate)"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <div class="subhead">第一学期</div>

          <el-form-item label="日期设置：" required>
            <el-col :span="11">
              <el-form-item prop="firstOpenDate">
                <el-date-picker
                  type="date"
                  placeholder="开始日期"
                  v-model="form.firstOpenDate"
                  style="width: 100%;"
                  value-format="timestamp"
                  :picker-options="Verification.isDateGt(form.firstCloseDate)"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="firstCloseDate">
                <el-date-picker
                  v-model="form.firstCloseDate"
                  type="date"
                  placeholder="结束日期"
                  style="width: 100%;"
                  value-format="timestamp"
                  :picker-options="Verification.isDateLt(form.firstOpenDate)"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <!-- <el-form-item label="备注：">
            <el-input type="textarea" v-model="form.descOne"></el-input>
          </el-form-item>-->
          <div class="subhead">第二学期</div>
          <el-form-item label="日期设置：" required>
            <el-col :span="11">
              <el-form-item prop="secondOpenDate">
                <el-date-picker
                  type="date"
                  placeholder="开始日期"
                  v-model="form.secondOpenDate"
                  style="width: 100%;"
                  value-format="timestamp"
                  :picker-options="Verification.isDateLt(form.secondCloseDate)"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="secondCloseDate">
                <el-date-picker
                  v-model="form.secondCloseDate"
                  type="date"
                  placeholder="结束日期"
                  style="width: 100%;"
                  value-format="timestamp"
                  :picker-options="Verification.isDateLt(form.secondOpenDate)"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <!-- <el-form-item label="备注：">
            <el-input type="textarea" v-model="form.descTwo"></el-input>
          </el-form-item>-->

          <el-form-item label-width="20px">
            <el-checkbox label="是否设为有效学年" v-model="form.isValid"></el-checkbox>
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
import { SchoolYearSave, SchoolYearInfo, SchoolYearUpdate } from "^/api/api";
export default {
  inject: ["reload"],
  props: {
    Show: Boolean,
    Edit: Boolean,
    ID: null
  },
  data() {
    return {
      dialogVisible: false,
      form: {}
    };
  },
  watch: {
    Show(val) {
      this.dialogVisible = val;
    },
    Edit(val) {
      if (val) {
        this.init();
      }
    }
  },
  methods: {
    init() {
      SchoolYearInfo({
        id: this.ID
      }).then(res => {
        this.form = res.data.data;
      });
    },
    Save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$loadingRes("执行中");
          this.Submit(this.form);
        } else {
          return false;
        }
      });
    },
    Submit(obj) {
      if (this.Edit) {
        //更新
        SchoolYearUpdate(obj).then(res => {
          // this.reload();
          this.$loadingRes().close();
          this.closeDialog();
          this.Dictionary.DictionaryInit();
        });
      } else {
        //新增
        SchoolYearSave(obj).then(res => {
          // this.reload();
          this.$loadingRes().close();
          this.closeDialog();
          this.Dictionary.DictionaryInit();
        });
      }
    },
    closeDialog() {
      this.$emit("update:show", false);
      this.$emit("update:edit", false);
      this.$emit("Update");
      this.form = {};
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/DiaLog.scss";
</style>

