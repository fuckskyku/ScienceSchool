/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Monday, 8th July 2019 10:04:35 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="RoleManagementDiaLog">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
      @close="closeDialog"
    >
      <span slot="title" class="DiaLogTitle">{{Edit?'编辑角色':"添加角色"}}</span>

      <main class="form">
        <el-form :model="form" ref="form" :rules="Verification.RoleManagement" label-width="120px">
          <el-form-item label="角色名称：" prop="roleName">
            <el-input v-model="form.roleName" placeholder="请输入角色名称" maxlength="30" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="角色描述：" prop="remark">
            <el-input
              type="textarea"
              :rows="4"
              v-model="form.remark"
              placeholder="请输入角色描述"
              maxlength="100"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="角色权限：" required>
            <div class="treeHeight">
              <el-scrollbar :native="false" id="section">
                <el-tree
                  :data="tree"
                  show-checkbox
                  node-key="permissionId"
                  :default-checked-keys="defaultCheckedList"
                  ref="tree"
                  :props="defaultProps"
                ></el-tree>
              </el-scrollbar>
            </div>
          </el-form-item>
        </el-form>
      </main>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="Save">确 定</el-button>
      </div>
    </el-dialog>
  </main>
</template>
<script>
import { PermissionTreeList, RoleSaveOrUpdate, RoleInfo } from "^/api/api";
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
      form: {
        permissionList: []
      },
      tree: [],
      defaultCheckedList: [],
      defaultProps: {
        children: "childTreeList",
        label: function(data, node) {
          return data.appName ? data.appName : data.permissionName;
        }
      }
    };
  },
  watch: {
    Show(val) {
      this.dialogVisible = val;
    },
    Edit(val) {
      if (val) {
        // this.form = this.InfoObj;
        // console.log(this.form);
        this.init();
      }
    }
  },
  created() {
    // this.init();
    PermissionTreeList().then(res => {
      this.tree = res.data.data;
    });
  },
  methods: {
    init() {
      RoleInfo({ roleId: this.InfoObj.id }).then(res => {
        this.form = res.data.data;
        this.defaultCheckedList = res.data.data.rolePermissionOuts.map(
          (item, index, array) => {
            if (!item.parent) {
              return item.permissionId;
            }
          }
        );
      });
    },
    Save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let permissionList = [];
          this.$refs.tree.getCheckedNodes(false, true).forEach(item => {
            if (item.permissionId) {
              item.id = item.permissionId;
              if (this.form.permissionList) {
                this.form.permissionList.push(item);
              } else {
                this.$set(this.form, "permissionList", []);
                this.form.permissionList.push(item);
              }
            }
          });
          if (this.form.permissionList && this.form.permissionList.length) {
            this.$loadingRes("执行中");
            RoleSaveOrUpdate(this.form).then(res => {
              this.$loadingRes().close();
              this.closeDialog();
              // this.reload();
            });
          } else {
            this.elInfo("请至少勾选一个权限", "warning");
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
      this.defaultCheckedList = [];
      this.form = {
        permissionList: []
      };
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/DiaLog.scss";
</style>

