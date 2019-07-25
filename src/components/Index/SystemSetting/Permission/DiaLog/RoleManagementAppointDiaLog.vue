/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Wednesday, 10th July 2019 4:34:53 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="RoleManagementAppointDiaLog">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
      @close="closeDialog"
    >
      <span slot="title" class="DiaLogTitle">角色委派</span>
      <main class="form">
        <div class="filter">
          <div class="filter_item speial">
            <el-input v-model="filter.keyWord" placeholder="请输入姓名" @change="filterChange"></el-input>
          </div>
          <div class="filter_item">
            <el-button slot="append" @click="filterChange" icon="el-icon-search"></el-button>
          </div>
          <div class="filter_item speial">
            <el-input v-model="filter.departmentName" placeholder="请选择部门" :disabled="true"></el-input>
            <el-button
              type="text"
              @click="innerVisibleShow(true)"
            >{{filter.departmentName?'清空':'选择'}}</el-button>
          </div>
          <div class="filter_item speial">
            <el-input v-model="filter.teacherGroupName" placeholder="请选择教研组" :disabled="true"></el-input>
            <el-button
              type="text"
              @click="innerVisibleShow(false)"
            >{{filter.teacherGroupName?'清空':'选择'}}</el-button>
          </div>
        </div>
        <div class="transfer">
          <el-transfer
            v-model="appointList"
            :titles="['人员列表', '已选择']"
            :button-texts="['到左边', '到右边']"
            @change="transfer"
            :data="data"
          ></el-transfer>
        </div>
      </main>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="Save">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      width="40%"
      :visible.sync="innerVisible"
      append-to-body
      class="innerDiaLog"
      :close-on-click-modal="false"
      @close="treeText=''"
    >
      <span slot="title" class="DiaLogTitle">选择</span>
      <main class="form">
        <el-input placeholder="输入关键字进行过滤" v-model="treeText" clearable></el-input>
        <el-tree
          ref="tree"
          :data="tree"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          accordion
          @node-click="handleNodeClick"
        ></el-tree>
      </main>
    </el-dialog>
  </main>
</template>
<script>
import {
  PermissionTreeList,
  RoleSaveOrUpdate,
  RoleInfo,
  TeacherPage,
  DepartmentDepartmentTree,
  TeacherGroupTeacherGroupTree,
  RoleBetchSetTeacherRole,
  RoleTeacherRoleList
} from "^/api/api";
import { constants } from "fs";
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
      data: [],
      appointList: [],
      delAppointList: [],
      tempAppintList: [],
      addAppintList: [],
      tree: [],
      treeText: "",
      typeFlag: Boolean,
      form: {},
      filter: {
        pageSize: 10000
      },
      defaultProps: {
        children: "childTreeList",
        label: "name"
      }
    };
  },
  watch: {
    treeText(val) {
      this.$refs.tree.filter(val);
    },
    Show(val) {
      this.dialogVisible = val;
    },
    Edit(val) {
      if (val) {
        // this.form = this.InfoObj;
        // console.log(this.form);
        RoleTeacherRoleList({ id: this.InfoObj.id }).then(res => {
          this.appointList = res.data.data;
          this.tempAppintList = res.data.data;
        });
        this.init();
      }
    }
  },
  created() {
    // this.init();
  },
  methods: {
    init(obj) {
      let data = [];
      let cities = [];
      TeacherPage(obj).then(res => {
        cities = res.data.data.data;
        cities.forEach((city, index) => {
          data.push({
            label: city.name,
            key: city.userId
            // pinyin: pinyin[index]
          });
        });
        this.data = data;
      });
    },
    Save() {
      // if (this.appointList.length) {
        
      RoleBetchSetTeacherRole({
        id: this.InfoObj.id,
        teacherAddList: this.addAppintList,
        teacherDelList: this.delAppointList
      }).then(res => {
        // console.log(res);
        this.elInfo(res.data.message, "success");
        this.closeDialog();
      });

      // } else {
      // this.elInfo("至少选择一个进行操作", "warning");
      // }
    },
    innerVisibleShow(flag) {
      if (flag) {
        if (this.filter.departmentName) {
          this.$set(this.filter, "departmentId", null);
          this.$set(this.filter, "departmentName", null);
          this.init(this.filter);
        } else {
          this.innerVisible = true;
          this.typeFlag = flag;
          DepartmentDepartmentTree().then(res => {
            this.tree = res.data.data;
          });
        }
      } else {
        if (this.filter.teacherGroupName) {
          this.$set(this.filter, "teacherGroupId", null);
          this.$set(this.filter, "teacherGroupName", null);
          this.init(this.filter);
        } else {
          this.innerVisible = true;
          this.typeFlag = flag;
          TeacherGroupTeacherGroupTree().then(res => {
            this.tree = res.data.data;
          });
        }
      }
    },

    transfer(val) {
      let delList = [];

      this.tempAppintList.forEach(item => {
        if (val.indexOf(item) == -1) {
          delList.push(item);
        }
      });
      this.delAppointList = delList.splice(0, delList.length);

      let addList = [];

      val.forEach(item => {
        if (this.tempAppintList.indexOf(item) == -1) {
          addList.push(item);
        }
      });
      this.addAppintList = addList.splice(0, addList.length);
    },

    filterChange() {
      this.init(this.filter);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleNodeClick(data, node, ev) {
      this.innerVisible = false;
      if (this.typeFlag) {
        this.$set(this.filter, "departmentId", data.id);
        this.$set(this.filter, "departmentName", data.name);
        this.init(this.filter);
      } else {
        this.$set(this.filter, "teacherGroupId", data.id);
        this.$set(this.filter, "teacherGroupName", data.name);
        this.init(this.filter);
      }
      // this.form.parentId = data.id;
      // this.form.parentName = data.name;
    },
    closeDialog() {
      this.$emit("update:show", false);
      this.$emit("update:edit", false);
      this.$emit("Update");
      this.filter = {
        pageSize: 10000
      };
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/DiaLog.scss";
</style>

