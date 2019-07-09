/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Wednesday, 3rd July 2019 1:20:24 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="TeacherGroupConfigDiaLog">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
      @close="closeDialog"
    >
      <span slot="title" class="DiaLogTitle">{{Type==1?Edit?"编辑教研组":'新增教研组':Edit?'编辑组织部门':'添加组织部门'}}</span>
      <main class="form">
        <el-form
          :model="form"
          ref="form"
          :rules="Verification.TeacherDepartment"
          label-width="120px"
          v-if="Type==1"
        >
          <el-form-item label="教研组名称：" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="分管领导：" class="flex" prop="masterName">
            <el-input type="test" v-model="form.masterName"></el-input>
            <el-button type="primary" @click="innerVisibleTwo=true;">选择</el-button>
          </el-form-item>
          <el-form-item label="上级部门：" class="flex" prop="parentName">
            <el-input type="text" v-model="form.parentName"></el-input>
            <el-button type="primary" @click="innerVisible=true;">选择</el-button>
          </el-form-item>
          <el-form-item label="组织描述：" prop="remark">
            <el-input type="textarea" v-model="form.remark" maxlength="100" show-word-limit></el-input>
          </el-form-item>
        </el-form>

        <el-form
          :model="form"
          ref="formTwo"
          :rules="Verification.Department"
          label-width="120px"
          v-if="Type==2"
        >
          <el-form-item label="部门名称：" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="分管领导：" class="flex" prop="masterName">
            <el-input type="test" v-model="form.masterName"></el-input>
            <el-button type="primary" @click="innerVisibleTwo=true;">选择</el-button>
          </el-form-item>
          <el-form-item label="上级部门：" class="flex" prop="parentName">
            <el-input type="text" v-model="form.parentName"></el-input>
            <el-button type="primary" @click="innerVisible=true;">选择</el-button>
          </el-form-item>
          <el-form-item label="部门描述：" prop="remark">
            <el-input type="textarea" v-model="form.remark" maxlength="100" show-word-limit></el-input>
          </el-form-item>
        </el-form>
      </main>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Submit">确 定</el-button>
      </div>

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

      <el-dialog
        width="60%"
        :visible.sync="innerVisibleTwo"
        append-to-body
        class="innerDiaLog"
        :close-on-click-modal="false"
        @close="filter={}"
      >
        <span slot="title" class="DiaLogTitle">选择人员</span>
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
                <el-radio v-model="radio" :label="scope.row.id">&nbsp</el-radio>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="姓名" prop="name"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="手机" prop="mobile"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="部门" prop="departmentName"></el-table-column>
          </el-table>
          <page :tabObj.sync="tableObj" :filterObj="filter" name="TeacherPage"></page>
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
  TeacherGroupTeacherGroupTree,
  TeacherPage,
  TeacherGroupSave,
  TeacherGroupUpdate,
  DepartmentDepartmentTree,
  DepartmentSave,
  DepartmentUpdate
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
      innerVisibleTwo: false,
      treeText: "",
      filter: {},
      tableObj: [{}],
      radio: "",
      defaultProps: {
        children: "childTreeList",
        label: "name"
      },
      tree: [],
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
      } else {
        this.form = {};
      }
    },
    treeText(val) {
      this.$refs.tree.filter(val);
    },
    innerVisibleTwo(val) {
      if (val) {
        this.init();
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init(obj) {
      if (this.Type == 1) {
        TeacherGroupTeacherGroupTree().then(res => {
          this.form.parentId = res.data.data[0].id;
          this.form.parentName = res.data.data[0].name;
          this.tree = res.data.data;
        });
      } else {
        DepartmentDepartmentTree().then(res => {
          this.form.parentId = res.data.data[0].id;
          this.form.parentName = res.data.data[0].name;
          this.tree = res.data.data;
        });
      }
      TeacherPage(obj).then(res => {
        this.tableObj = res.data.data;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    filterChange() {
      this.init(this.filter);
    },
    Submit() {
      if (this.Edit) {
        if (this.Type == 1) {
          this.$refs["form"].validate(valid => {
            if (valid) {
              this.$loadingRes("执行中");
              TeacherGroupUpdate(this.form).then(res => {
                this.$loadingRes().close();
                this.closeDialog();
                this.init();
              });
            } else {
              return false;
            }
          });
        } else {
          this.$refs["formTwo"].validate(valid => {
            if (valid) {
              this.$loadingRes("执行中");
              DepartmentUpdate(this.form).then(res => {
                this.$loadingRes().close();
                this.closeDialog();
                this.init();
              });
            } else {
              return false;
            }
          });
        }
      } else {
        if (this.Type == 1) {
          this.$refs["form"].validate(valid => {
            if (valid) {
              this.$loadingRes("执行中");
              TeacherGroupSave(this.form).then(res => {
                this.$loadingRes().close();
                this.closeDialog();
                this.init();
              });
            } else {
              return false;
            }
          });
        } else {
          this.$refs["formTwo"].validate(valid => {
            if (valid) {
              this.$loadingRes("执行中");
              DepartmentSave(this.form).then(res => {
                this.$loadingRes().close();
                this.closeDialog();
                this.init();
              });
            } else {
              return false;
            }
          });
        }
      }
    },
    SubmitSelect() {
      this.form.masterId = this.radio;
      this.tableObj.data.forEach(item => {
        if (this.radio == item.id) {
          this.form.masterName = item.name;
        }
      });
      this.innerVisibleTwo = false;
    },
    handleNodeClick(data, node, ev) {
      this.innerVisible = false;
      this.form.parentId = data.id;
      this.form.parentName = data.name;
    },
    closeDialog() {
      this.$emit("update:show", false);
      this.$emit("update:edit", false);
      this.$emit("Update");
      this.radio = "";
      this.filter = {};
      this.form = {
        parentId: 0,
        parentName: "科技中学"
      };
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/DiaLog.scss";
</style>

