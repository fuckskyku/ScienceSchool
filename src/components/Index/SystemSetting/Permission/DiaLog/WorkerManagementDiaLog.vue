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
  <main id="WorkerManagementDiaLog">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
      @close="closeDialog"
    >
      <span slot="title" class="DiaLogTitle">{{Edit?'编辑职工':'新增职工'}}</span>
      <main class="form">
        <el-form :model="form" ref="form" :rules="Verification.WorkerManagement" label-width="120px" :disabled="Info">
          <el-form-item label="用户名：" prop="userName">
            <el-input placeholder="请输入用户名" v-model="form.userName"></el-input>
          </el-form-item>
          <!-- <el-form-item label="姓名：">
            <el-input placeholder="请输入姓名" v-model="form.name" ></el-input>
          </el-form-item>-->
          <el-form-item label="工号：" prop="jobNo">
            <el-input placeholder="请输入工号" v-model="form.jobNo"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：" prop="mobile">
            <el-input placeholder="请输入手机号码" v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="角色：" prop="roleStatus">
            <el-input v-model="form.roleStatus" style="display:none"></el-input>
            <el-tag
              v-for="tag in RroleTags"
              :key="tag.id"
              style="margin-right:5px"
              closable
              @close="tagClose2(tag)"
            >{{tag.roleName}}</el-tag>
            <el-button type="primary" @click="selectRole()">选择</el-button>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input placeholder="请输入身份证号" v-model="form.idCard"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input placeholder="请输入邮箱" v-model="form.email"></el-input>
          </el-form-item>
        </el-form>
      </main>
      <el-dialog
        width="60%"
        title="角色"
        :visible.sync="innerVisible"
        :close-on-click-modal="false"
        append-to-body
      >
        <main class="form">
          <div style="margin-bottom:10px;">
            <el-input placeholder="请输入角色" v-model="form.name" @change=" searchRole(form.name)" clearable></el-input>
            <!-- <el-button type="primary" @click="search" style="float:right">搜索</el-button> -->
          </div>
          <div class="tag" style="margin-bottom:20px">
            <el-tag
              style="margin-right:5px"
              v-for="tag in roleTags"
              :key="tag.id"
              closable
              @close="tagClose(tag)"
            >{{tag.roleName}}</el-tag>
            <el-button style="float:right" v-if="roleTags.length" type="text" @click="clear()">清空</el-button>
          </div>
          <el-table
            :data="tableObj"
            ref="multipleTable"
            border
            stripe
            :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
            :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
            @select="handleSelectionChange"
            @select-all="handleSelectionChange"
          >
            <el-table-column  :show-overflow-tooltip="true"   type="selection" width="55"></el-table-column  >
            <el-table-column  :show-overflow-tooltip="true"   label="角色名称" prop="roleName"></el-table-column  >
            <el-table-column  :show-overflow-tooltip="true"   label="角色描述" prop="remark"></el-table-column  >
          </el-table>
        </main>
        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button @click="innerVisible=false;">取 消</el-button>
          <el-button type="primary" @click="confirmRole()">确 定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="Save()">确 定</el-button>
      </div>
    </el-dialog>
  </main>
</template>
<script>
import { UserSaveOrUpdate, UserInfo, RolePage } from "^/api/api";
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
      innerVisible: false,
      form: {
        userRoleOuts: [],
        roleStatus: ''
      },
      relationData: [],
      roleTags: [],
      RroleTags: [],
      tableObj: [],
      type: 'add'
    };
  },
  mounted() {
    // 获取角色列表
    RolePage().then(res => {
      this.tableObj = res.data.data.data;
      this.checkRole();
    });
  },
  watch: {
    innerVisible(val) {
      if (val) {
        [...this.roleTags] = this.RroleTags;
        var that = this;
        that.tableObj.map((item, index) => {
          console.log("item", item);
          that.roleTags.map(list => {
            if (list.roleId == item.id) {
              that.$nextTick(() => {
                that.$refs.multipleTable.toggleRowSelection(item);
              });
            }
          });
        });
      }
    },
    Show(val) {
      this.dialogVisible = val;
    },
    Edit(val) {
      if (val) {
        this.init();
       
      } else {
        
      }
    }
  },
  methods: {
    init() {
      UserInfo({
        userId: this.InfoObj.id
      }).then(res => {
        this.form = res.data.data;
        // this.roleTags = this.form.userRoleOuts;
        this.RroleTags = this.form.userRoleOuts;
        console.log('this.form',this.form)
      });
       this.type == ''
    },
    searchRole(val) {
      // 获取角色列表
      RolePage({
        roleName: val
      }).then(res => {
        this.tableObj = res.data.data.data;
        // console.log("this.tableObj", this.tableObj);
        this.checkRole();
      });
    },
    Save() {
      this.form.userRoleOuts = this.RroleTags
      if(this.form.userRoleOuts.length != 0){
        this.$set(this.form,"roleStatus",'1')
      }else{
        this.$set(this.form,"roleStatus",'')
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$loadingRes("执行中");
          UserSaveOrUpdate(this.form).then(res => {
            this.$loadingRes().close();
            this.closeDialog();
          });
        } else {
          return false;
        }
      });
      
    },
    handleSelectionChange(row) {
      this.roleTags = row;
      this.roleTags.map(item => {
        item.roleId = item.id
      })
      // console.log('this.roleTags',this.roleTags)
    },
    selectRole(row) {
      this.type = "add"
      this.innerVisible = true;
      this.checkRole();
    },
    confirmRole() {
      [...this.RroleTags] = this.roleTags;
      this.innerVisible = false;
      console.log('this.RroleTags',this.RroleTags)
    },
    checkRole() {
      var that = this;
      this.tableObj.map((item, index) => {
        this.roleTags.map(list => {
          if (list.id == item.id) {
            this.$nextTick(() => {
              that.$refs.multipleTable.toggleRowSelection(item);
            });
          }
        });
      });
    },
    tagClose2(val) {
      // val.id = val.roleId
      console.log(val,'val',this.RroleTags)
      // console.log(this.form.userRoleOuts)
      this.RroleTags.splice(this.RroleTags.indexOf(val), 1);
    },
    tagClose(val) {
      // console.log(val,'val',val.id)
      val.id = val.roleId
      var that = this;
      this.roleTags.splice(this.roleTags.indexOf(val), 1);
      this.tableObj.map((item, index) => {
        // console.log(item.id)
        if (val.id == item.id) {
          this.$nextTick(() => {
            that.$refs.multipleTable.toggleRowSelection(item);
          });
        }
      });
      if (this.roleTags == "") {
        this.$refs.multipleTable.clearSelection();
      }
    },
    clear() {
      this.roleTags = [];
      this.$refs.multipleTable.clearSelection();
    },
    closeDialog() {
      this.$emit("update:show", false);
      this.$emit("update:edit", false);
      this.$emit("Update");
      this.roleTags = [];
      this.form = {
        userRoleOuts: []
      };
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/DiaLog.scss";
</style>

