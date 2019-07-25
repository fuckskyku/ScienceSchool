/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Friday, 12th July 2019 9:21:58 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="TeacherGroupConfigInfoDiaLog">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
      @close="closeDialog"
    >
      <span slot="title" class="DiaLogTitle">{{Type==1?'教研组相关人员':'部门相关人员'}}</span>
      <main class="form">
        <div class="Title_Group">
          <div class="Title">
            <span style="padding-right:25px;">{{Type==1?'教研组名称：':'部门名称：'}}{{InfoObj.name}}</span>
            <span>分管领导：{{InfoObj.masterName}}</span>
          </div>
          <div class="ButtonGroup">
            <el-button type="primary" @click="innerVisible=true">添加</el-button>
            <!-- <el-button type="danger" @click="del">批量删除</el-button> -->
          </div>
        </div>
        <div class="Mark">
          <span>描述：{{InfoObj.remark}}</span>
        </div>

        <el-table
          :data="tableObj.data"
          border
          stripe
          :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
          :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
          @select="checkedDel"
          @select-all="checkedDel"
        >
          <el-table-column :show-overflow-tooltip="true" type="selection"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" label="姓名" prop="name"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" label="性别" prop="sex">
            <template slot-scope="scope">
              <span>{{scope.row.sex==1?"男":'女'}}</span>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="Type==2" label="教研组" prop="teacherGroupName"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" v-if="Type==1" label="部门" prop="departmentName"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" label="职位" prop="positionName"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" label="手机号码" prop="mobile"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" label="是否领导" prop="master">
            <template slot-scope="scope">
              <span>{{scope.row.master?'是':'否'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="edit">编辑</el-button> -->
              <el-button type="text" @click="isLead(scope.row)">设置为领导</el-button>
              <el-button type="text" @click="del(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <page :tabObj.sync="tableObj" :filterObj="filter" name="DepartmentDepartmentUserPage"></page>
      </main>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Submit">确 定</el-button>
      </div>

      <el-dialog
        width="60%"
        :visible.sync="innerVisible"
        append-to-body
        class="innerDiaLog"
        :close-on-click-modal="false"
        @close="filter={}"
      >
        <span slot="title" class="DiaLogTitle">添加</span>
        <main class="form">
          <div class="input">
            <el-input
              v-model="filter.keyWord"
              placeholder="请输入查找条件"
              clearable
              @change="filterChange"
            ></el-input>
            <el-button slot="append" @click="filterChange" icon="el-icon-search"></el-button>
          </div>
          <el-scrollbar :native="false" id="section">
            <div class="tag">
              <el-tag v-for="tag in tags" :key="tag.name">{{tag.name}}</el-tag>
              <el-button v-if="tags.length" type="text" @click="empty">清空</el-button>
            </div>
          </el-scrollbar>
          <el-table
            ref="tag"
            :data="tableMemberObj.data"
            border
            stripe
            :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
            :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
            @select="checked"
            @select-all="checked"
          >
            <el-table-column :show-overflow-tooltip="true" type="selection"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="姓名" prop="name"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="手机" prop="mobile"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="部门" prop="departmentName"></el-table-column>
          </el-table>
          <page :tabObj.sync="tableMemberObj" name="TeacherPage" :filterObj="filter"></page>
        </main>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="SubmitSelect">确 定</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </main>
</template>
<script>
import {
  TeacherGroupTeacherGroupUserList,
  TeacherPage,
  TeacherGroupUpdateIsMaster,
  TeacherGroupSaveTeacherGroupUser,
  TeacherGroupDelTeacherGroupRelation,
  DepartmentDepartmentUserPage,
  DepartmentSaveDepartmentTeacher,
  DepartmentDelDepartmentTeacher,
  DepartmentUpdateIsMaster
} from "^/api/api";

export default {
  inject: ["reload"],
  props: {
    Show: Boolean,
    Edit: Boolean,
    InfoObj: Object,
    Type: Number
  },
  data() {
    return {
      dialogVisible: false,
      innerVisible: false,
      tags: [],
      filter: {},
      form: {},
      delTableList: [],
      tableObj: [{}],
      tableMemberObj: [{}]
    };
  },
  watch: {
    Show(val) {
      this.dialogVisible = val;
    },
    Edit(val) {
      if (val) {
        this.init();
        console.log(this.InfoObj);
        this.$set(this.filter, "id", this.InfoObj.id);
      }
    },
    innerVisible(val) {
      if (val) {
        this.init();
      }
    }
  },
  methods: {
    init(obj) {
      if (this.Type == 1) {
        TeacherGroupTeacherGroupUserList({ id: this.InfoObj.id }).then(res => {
          this.tableObj = res.data.data;
        });
      } else {
        DepartmentDepartmentUserPage({ id: this.InfoObj.id }).then(res => {
          this.tableObj = res.data.data;
        });
      }
      TeacherPage(obj).then(res => {
        this.tableMemberObj = res.data.data;
      });
    },
    filterChange() {
      this.init(this.filter);
    },
    Submit() {
      this.closeDialog();
      // this.$loadingRes("执行中");
      // if (this.Edit) {
      //   PositionUpdate(this.form).then(res => {
      //     this.$loadingRes().close();
      //     this.closeDialog();
      //     // this.reload();
      //   });
      // } else {
      //   PositionSave(this.form).then(res => {
      //     this.$loadingRes().close();
      //     this.closeDialog();
      //   });
      // }
    },
    SubmitSelect() {
      this.$loadingRes("执行中");
      if (this.Type == 1) {
        TeacherGroupSaveTeacherGroupUser({
          teacherGroupId: this.InfoObj.id,
          teacherIds: this.tags
            .map((item, index, array) => {
              return item.id;
            })
            .toString()
        }).then(res => {
          this.$loadingRes().close();
          this.innerVisible = false;
          this.init();
        });
      } else {
        DepartmentSaveDepartmentTeacher({
          departmentId: this.InfoObj.id,
          teacherIds: this.tags
            .map((item, index, array) => {
              return item.id;
            })
            .toString()
        }).then(res => {
          this.$loadingRes().close();
          this.innerVisible = false;
          this.init();
        });
      }
    },
    checked(selection, row) {
      this.tags = selection;
    },
    checkedDel(selection, row) {
      this.delTableList = selection.map((item, index, array) => {
        return item.id;
      });
    },
    del(id) {
      if (this.Type == 1) {
        TeacherGroupDelTeacherGroupRelation({
          teacherGroupId: this.InfoObj.id,
          teacherId: id
        }).then(res => {
          this.init();
        });
      } else {
        DepartmentDelDepartmentTeacher({
          departmentId: this.InfoObj.id,
          teacherId: id
        }).then(res => {
          this.init();
        });
      }
    },
    isLead(row) {
      if (this.Type == 2) {
        TeacherGroupUpdateIsMaster({
          departmentId: this.InfoObj.id,
          teacherId: row.id
        }).then(res => {
          this.$set(this.InfoObj, "masterName", row.name);
          this.$set(this.InfoObj, "masterId", row.masterId);
          this.elInfo(res.data.message, "success");
          this.init();
        });
      } else {
        TeacherGroupUpdateIsMaster({
          departmentId: this.InfoObj.id,
          teacherId: row.id
        }).then(res => {
          this.$set(this.InfoObj, "masterName", row.name);
          this.$set(this.InfoObj, "masterId", row.masterId);
          this.elInfo(res.data.message, "success");
          this.init();
        });
      }
    },
    empty() {
      this.tags = [];
      this.$refs.tag.clearSelection();
    },
    closeDialog() {
      this.$emit("update:show", false);
      this.$emit("update:edit", false);
      this.$emit("Update");
      this.tags = [];
      this.filter = {};
      this.form = {};
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/DiaLog.scss";
</style>

