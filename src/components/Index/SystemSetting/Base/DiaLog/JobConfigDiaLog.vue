/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Sunday, 30th June 2019 2:43:03 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="JobConfigDiaLog">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
      @close="closeDialog"
    >
      <span slot="title" class="DiaLogTitle">{{Edit?'编辑职位':'添加职位'}}</span>
      <main class="form">
        <el-form :model="form" ref="form" :rules="Verification.Job" label-width="120px">
          <el-form-item label="职位名称：" prop="positionName">
            <el-input v-model="form.positionName" maxlength="30" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="职位描述：" prop="remark">
            <el-input type="textarea" v-model="form.remark" maxlength="100" show-word-limit></el-input>
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
import { PositionSave, PositionUpdate } from "^/api/api";

export default {
  inject: ["reload"],
  props: {
    Show: Boolean,
    Edit: Boolean,
    InfoObj: Object
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
        this.form = this.InfoObj;
      }
    }
  },
  methods: {
    Save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$loadingRes("执行中");
          if (this.Edit) {
            PositionUpdate(this.form).then(res => {
              this.$loadingRes().close();
              this.closeDialog();
              // this.reload()
            });
          } else {
            PositionSave(this.form).then(res => {
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
      this.form = {};
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/DiaLog.scss";
</style>

