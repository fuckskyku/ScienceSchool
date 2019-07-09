/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Thursday, 4th July 2019 3:43:09 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="ParentsManagementDiaLog">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="70%"
      @close="closeDialog"
    >
      <span slot="title" class="DiaLogTitle">{{Info?'家长信息':Edit?'编辑家长信息':'新增家长信息'}}</span>
      <main class="form">
        <el-form
          :model="form"
          ref="form"
          :rules="Verification.ParentManagement"
          label-width="120px"
          :disabled="Info"
        >
          <div class="block">
            <el-form-item label="用户名：" prop="userName">
              <el-input placeholder="请输入用户名（一般为手机号码）" v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
              <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
              <el-radio
                v-model="form.sex"
                v-for="item in Dictionary.Sex"
                :key="item.val"
                :label="item.val"
              >{{item.label}}</el-radio>
            </el-form-item>
            <el-form-item label="手机号码：" prop="mobile">
              <el-input placeholder="请输入手机号码" v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱：" prop="email">
              <el-input placeholder="请输入电子邮箱" v-model="form.email"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="学生关系：" required>
            <template>
              <el-table
                :data="form.studentParentIns"
                border
                :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
                :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
              >
                <el-table-column :show-overflow-tooltip="true" type="index" width="50" label="序号"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="name" label="学生姓名">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'studentParentIns.'+scope.$index+'.studentName'"
                      :rules="Verification.ParentManagementUser.studentName"
                    >
                      <el-input v-model="scope.row.studentName" placeholder v-show="false"></el-input>
                    </el-form-item>
                    <span>{{scope.row.studentName}}</span>
                    <el-button type="text" @click="selectStudent(scope.$index)">选择</el-button>
                  </template>
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="gx" label="关系">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'studentParentIns.'+scope.$index+'.gx'"
                      :rules="Verification.ParentManagementUser.gx"
                    >
                      <el-select v-model="scope.row.gx" placeholder="请选择关系">
                        <el-option
                          v-for="item in Dictionary.DomesticRelation"
                          :key="item.val"
                          :label="item.label"
                          :value="item.val"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="className" label="班级"></el-table-column>
                <el-table-column label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button type="text" @click="add()">添加</el-button>
                    <el-button type="text" class="red" @click="delRow(scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-form-item>
        </el-form>
      </main>

      <el-dialog
        width="60%"
        :visible.sync="innerVisible"
        :close-on-click-modal="false"
        append-to-body
      >
        <span slot="title" class="DiaLogTitle">选择学生</span>
        <main class="form">
          <div style="margin-bottom:40px;">
            <el-input placeholder="请输入学生" v-model="filter.name"></el-input>
          </div>
          <el-table
            :data="tableObj.data"
            border
            :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
            :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
            highlight-current-row
            @current-change="handleCurrentChange"
          >
            <el-table-column :show-overflow-tooltip="true" label="编号" prop="xjh"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="姓名" prop="name"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="班级" prop="className"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="性别" prop="sex">
              <template slot-scope="scope">{{scope.row.sex == 1 ? '男' : '女'}}</template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="身份证号" prop="idCard"></el-table-column>
          </el-table>
        </main>
        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button @click="innerVisible=false">取 消</el-button>
          <el-button type="primary" @click="saveStudent">确 定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer" style="text-align:center" v-if="!Info">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="Save">确 定</el-button>
      </div>
    </el-dialog>
  </main>
</template>
<script>
import { ParentSaveOrUpdate, StudentPage, ParentInfo } from "^/api/api";
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
        sex: 1,
        studentParentIns: [{}]
      },
      filter: {},
      relationData: [],
      tempIndex: "",
      tempObj: {},
      tableObj: []
    };
  },
  created() {
    this.init();
  },
  watch: {
    Show(val) {
      this.dialogVisible = val;
    },
    Edit(val) {
      if (val) {
        this.Infoinit();
      }
    }
  },
  methods: {
    init() {
      StudentPage().then(res => {
        this.tableObj = res.data.data;
      });
    },
    Infoinit() {
      ParentInfo({ parentId: this.InfoObj.id }).then(res => {
        this.form = res.data.data;
        this.$set(this.form, "studentParentIns", this.form.studentParentOuts);
      });
    },
    saveStudent() {
      this.form.studentParentIns[
        this.tempIndex
      ].studentName = this.tempObj.name;
      this.form.studentParentIns[this.tempIndex].studentId = this.tempObj.id;
      this.form.studentParentIns[
        this.tempIndex
      ].className = this.tempObj.className;
      this.innerVisible = false;
    },
    selectStudent(index) {
      this.tempIndex = index;
      this.innerVisible = true;
    },
    Save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$loadingRes("执行中");
          ParentSaveOrUpdate(this.form).then(res => {
            this.$loadingRes().close();
            this.closeDialog();
          });
        } else {
          return false;
        }
      });
    },
    add() {
      this.form.studentParentIns.push({});
    },
    delRow(index) {
      if (this.form.studentParentIns.length != 1) {
        this.form.studentParentIns.splice(index, 1);
      } else {
        this.elInfo("最后一条不能删除", "warning");
      }
    },
    handleCurrentChange(val) {
      this.tempObj = val;
    },
    closeDialog() {
      this.$emit("update:show", false);
      this.$emit("update:edit", false);
      this.$emit("update:info", false);
      this.$emit("Update");
      this.form = {
        studentParentIns: [{}]
      };
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/DiaLog.scss";
</style>

