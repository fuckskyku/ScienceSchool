/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Thursday, 27th June 2019 3:00:32 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="LeadingIn">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="40%"
      @close="closeDialog"
    >
      <span slot="title" class="DiaLogTitle">导入</span>
      <main class="main">
        <div class="button">
          <a :href="Href" download>
            <el-button type="primary">下载模版</el-button>
          </a>
        </div>

        <div class="header">
          <el-upload
            ref="LeadingIn"
            class="upload-demo"
            drag
            :action="UploadUrl"
            :multiple="false"
            :data="Parameter"
            name="toImportFile"
            :on-change="handleAvatarChange"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :auto-upload="false"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传xlsx/xls文件</div>
          </el-upload>
        </div>

        <div class="tip">
          <p>1、批量导入用户数据时，用户模板中导入项的栏目名称不允许更改。</p>
          <p>2、模板中的红色标题为必填项目，其他可以不填</p>
        </div>
      </main>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Save">确 定</el-button>
      </div>
    </el-dialog>
  </main>
</template>
<script>
import {} from "^/api/api";
export default {
  inject: ["reload"],
  props: {
    Show: Boolean,
    Edit: Boolean,
    Parameter: Object,
    UploadUrl: String,
    Href: String
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
      }
    }
  },
  created() {},
  methods: {
    Save() {
      this.$refs.LeadingIn.submit();
    },
    handleAvatarChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
    },
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        this.elInfo(res.message, "success");
        this.closeDialog();
      } else {
        this.elInfo(res.message, "error");
      }
    },
    beforeAvatarUpload(file) {
      const isType =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isType) {
        this.$message.error("上传文件只能是 xlsx或者xls 格式!");
      }
      return isType;
    },
    closeDialog() {
      this.$emit("update:show", false);
      this.$emit("Update");
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/DiaLog.scss";
</style>

