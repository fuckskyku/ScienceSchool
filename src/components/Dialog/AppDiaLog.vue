/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Friday, 12th July 2019 5:00:30 pm
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
      <span slot="title" class="DiaLogTitle">{{AppType==5&&YN==false?"编辑应用":AppType==5&&YN?"添加应用":"添加应用"}}</span>
      <!-- <span slot="title" class="DiaLogTitle">{{AppType==1?"添加应用":"添加模块"}}</span> -->

      <main class="form">
        <el-form :model="form" ref="form" :rules="Verification.App" label-width="160px">
          <!-- <el-form-item label="父级应用：" v-if="AppType!=1"> -->
          <el-form-item label="父级应用：" v-if="AppType!=1">
            <el-select v-model="form.parentId" placeholder>
              <el-option label="福龙城" :value="2"></el-option>
              <el-option label="悦讯" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="对应类别：" :disabled="true" v-if="AppType==1">
            <div>学校应用</div>
          </el-form-item>
          <el-form-item label="应用名称：" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="跳转链接：" prop="url">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item label="日志链接：" prop="logLink">
            <el-input v-model="form.logLink"></el-input>
          </el-form-item>
          <el-form-item label="权限值：" prop="permissionCode">
            <el-input v-model="form.permissionCode"></el-input>
          </el-form-item>
          <el-form-item label="排序：">
            <el-input v-model="form.orderId" placeholder="请输入排序值"></el-input>
          </el-form-item>

          <el-form-item label="所属用户类型：" prop="userType" >
            <el-radio-group v-model="form.userType">
              <el-radio :label="1" :value="1">教师</el-radio>
              <el-radio :label="2" :value="2">家长</el-radio>
              <el-radio :label="3" :value="3">学生</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="添加到：" prop="pcOrH5" v-if="!Edit">
            <el-checkbox-group v-model="form.pcOrH5">
              <el-checkbox :label="0" :disabled="!isH5Flag">PC</el-checkbox>
              <el-checkbox :label="1" :disabled="isH5Flag">H5</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

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
import { AppSaveUniformApp, AppInfo, AppUpdate } from "^/api/api";
export default {
  inject: ["reload"],
  props: {
    Show: Boolean,
    AppType: null,
    ID: null,
    Edit: Boolean,
    isH5Flag: Boolean,
    YN: Boolean
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisibleImg: false,
      imageUrl: "",
      form: {
        orderId: 99,
        parentId: 2,
        userType: 1,
        pcOrH5: []
      }
    };
  },
  watch: {
    Show(val) {
      this.dialogVisible = val;
      if (val) {
        this.$set(this.form, "pcOrH5", [this.isH5Flag ? 1 : 0]);
        this.$set(this.form, "userType", 1);
        console.log("AppType",this.AppType);
      }
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
        this.imageUrl = "http://" + window.location.hostname + res.data.data.logo;
        this.$set(this.form, "pcOrH5", [this.isH5Flag ? 1 : 0]);
      });
    },
    closeDialog() {
      //alert(2)
      this.$emit("update:show", false);
      this.$emit("update:edit", false);
      this.$refs["form"].resetFields();
      this.form = {
        orderId: 99,
        parentId: 2,
        pcOrH5: []
      };
      this.imageUrl = "";
    },
    Save() {
      this.Submit({
        id: this.ID,
        name: this.form.name,
        url: this.form.url,
        permissionCode: this.form.permissionCode,
        pcOrH5: this.form.pcOrH5.toString(),
        userType: this.form.userType,
        appType: this.AppType,
        parentId: this.form.parentId,
        orderId: this.form.orderId,
        // appType: 2,
        logLink: this.form.logLink,
        logo: this.form.logo
      });
    },
    Submit(obj) {
      if (obj.id) {
        this.$refs["form"].validate(valid => {
          if (valid) {
            AppSaveUniformApp(obj).then(res => {
              this.elInfo(res.message, "success");
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
            AppSaveUniformApp(obj).then(res => {
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
      console.log("file",file,'file.raw',file.raw)
      this.$set(this.form, "logo", res.data.url);
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

