/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Monday, 8th July 2019 10:07:39 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="AppDialog">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
      @close="closeDialog"
    >
      <span slot="title" class="DiaLogTitle">添加非统一账号应用</span>

      <main class="form">
        <el-form :model="form" ref="form" :rules="Verification.App" label-width="140px">
          <el-form-item label="对应类别：" :disabled="true">
            <div>{{AppType==1?'学校应用':AppType==2?'市级应用':AppType==3?'省级应用':'国家应用'}}</div>
          </el-form-item>
          <el-form-item label="应用名称：" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="跳转链接：" prop="url">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <!-- <el-form-item label="日志链接：" prop="logLink">
            <el-input v-model="form.logLink"></el-input>
          </el-form-item>-->
          <el-form-item label="上传Logo：" prop="logo">
            <el-upload
              class="avatar-uploader"
              action="/api/file/uploadSingle"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-input v-model="form.logo" style="display:none"></el-input>
          </el-form-item>
        </el-form>
        <span class="tip">* 添加应用后，该角色下的所有用户都可以在平台首页得到这个应用的跳转链接。</span>
      </main>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Save">确 定</el-button>
      </div>
    </el-dialog>
  </main>
</template>
<script>
import { AppSave, AppInfo, AppUpdate } from "^/api/api";
export default {
  inject: ["reload"],
  props: {
    Show: Boolean,
    AppType: null,
    ID: null,
    Edit: Boolean
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisibleImg: false,
      imageUrl: "",
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
  created() {},
  methods: {
    init() {
      AppInfo({ id: this.ID }).then(res => {
        this.form = res.data.data;
        this.imageUrl =
          "http://" + window.location.hostname + res.data.data.logo;
      });
    },
    closeDialog() {
      this.$emit("update:show", false);
      this.$emit("update:edit", false);
      this.$refs["form"].resetFields();
      this.imageUrl = "";
    },
    Save() {
      this.Submit({
        id: this.ID,
        name: this.form.name,
        url: this.form.url,
        appType: this.AppType,
        logLink: this.form.logLink,
        logo: this.form.logo
      });
    },
    Submit(obj) {
      if (obj.id) {
        this.$refs["form"].validate(valid => {
          if (valid) {
            AppUpdate(obj).then(res => {
              this.closeDialog();
              this.reload();
            });
          } else {
            return false;
          }
        });
      } else {
        this.$refs["form"].validate(valid => {
          if (valid) {
            AppSave(obj).then(res => {
              // this.$loadingRes("添加中");
              this.closeDialog();
              this.reload();
            });
          } else {
            return false;
          }
        });
      }
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.logo = res.data.url;
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
      // return isJPG && isLt2M;
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/DiaLog.scss";
</style>

