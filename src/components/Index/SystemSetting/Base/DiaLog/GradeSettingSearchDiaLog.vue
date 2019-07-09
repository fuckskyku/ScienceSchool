/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Friday, 5th July 2019 3:05:02 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="GradeSettingSearchDiaLog">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
      @close="closeDialog"
    >
      <span slot="title" class="DiaLogTitle">查找老师</span>

      <main class="form">
        <div class="input">
          <el-input v-model="filter.keyWord" placeholder="请输入查找条件" clearable @change="filterChange"></el-input>
          <el-button slot="append" @click="filterChange" icon="el-icon-search"></el-button>
        </div>
        <el-table
          :data="tableObj.data"
          border
          stripe
          :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
          :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
        >
          <el-table-column :show-overflow-tooltip="true" label width="80">
            <template slot-scope="scope">
              <!-- <el-checkbox v-model="scope.row." @change="classShow(scope.row.id)" label></el-checkbox>  -->
              <el-radio v-model="radio" :label="type=='Teacher'?scope.row.id:scope.row.jobNo">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="name" label="姓名"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="mobile" label="手机"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="departmentMame" label="部门"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="teacherGroupName" label="教研组"></el-table-column>
        </el-table>
        <page :tabObj.sync="tableObj" :filterObj="filter" name="TeacherPage"></page>
      </main>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Save">确 定</el-button>
      </div>
    </el-dialog>
  </main>
</template>
<script>
import { TeacherPage, GradeUpdate, ClassUpdate } from "^/api/api";
export default {
  inject: ["reload"],
  props: {
    Show: Boolean,
    ParameterObj: Object,
    type: null
  },
  data() {
    return {
      dialogVisible: false,
      tableObj: [],
      radio: null,
      filter: {}
    };
  },
  created() {},
  watch: {
    Show(val) {
      if (val) {
        this.init();
      }
      this.dialogVisible = val;
      if (this.type == "Teacher") {
        this.radio = Number(this.ParameterObj.gradeMasterId);
      } else {
        this.radio = this.ParameterObj.classMasterNo;
      }
    }
  },
  methods: {
    init(obj) {
      TeacherPage(obj).then(res => {
        this.tableObj = res.data.data;
      });
    },
    Save() {
      this.$loadingRes("执行中");
      if (this.type == "Teacher") {
        GradeUpdate({
          id: this.ParameterObj.id,
          gradeMasterId: this.radio
        }).then(res => {
          this.$loadingRes().close();
          this.closeDialog();
        });
      } else {
        ClassUpdate({
          id: this.ParameterObj.id,
          classMasterNo: this.radio
        }).then(res => {
          this.$loadingRes().close();
          this.closeDialog();
        });
      }
    },
    filterChange() {
      this.init(this.filter);
    },
    closeDialog() {
      this.$emit("update:show", false);
      this.$emit("Update");
      this.filter = {};
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/DiaLog.scss";
</style>

