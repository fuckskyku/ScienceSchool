/*
 * File: GradeConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 5:05:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Tuesday, 9th July 2019 5:22:36 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="BatchChangeShift">
    <div class="PublicTitle">
      <span>批量调班</span>
    </div>
    <section class="section">
      <p class="sub_title">源班级</p>
      <div class="select">
        <span>选择年级</span>
        <el-select v-model="gradeValue" @change="checkSourceGrade" clearable placeholder="请选择年级">
          <el-option
            v-for="item in gradeOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <span>选择班级</span>
        <el-select v-model="classValue" @change="checkSourceClass" clearable placeholder="请选择班级">
          <el-option
            v-for="item in classOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <hr style="margin: 20px 0;">
      <p class="sub_title">目标班级</p>
      <div style="text-align:center;">
        <span>选择年级</span>
        <el-select v-model="gradeValue2" @change="checkGoalGrade" clearable placeholder="请选择年级">
          <el-option
            v-for="item in gradeOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <span>选择班级</span>
        <el-select v-model="classValue2" @change="checkGoalClass" clearable placeholder="请选择班级">
          <el-option
            v-for="item in classOptions2"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
    </section>
    <div class="PublicTitle">
      <span>学生信息</span>
    </div>
    <section>
      <el-table
        :data="tableObj.data"
        border=""
        stripe
        :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
        :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column :show-overflow-tooltip="true" type="selection" width="55"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="学籍号" prop="xjh"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="姓名" prop="name"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="性别" prop="sex">
          <template slot-scope="scope">{{scope.row.sex == 1 ? '男' : '女'}}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="年级" prop="gradeName"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="班级" prop="className"></el-table-column>
        <!-- <el-table-column :show-overflow-tooltip="true" label="入学时间" prop="enterYear"></el-table-column> -->
        <el-table-column :show-overflow-tooltip="true" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn">
        <el-button type="primary" @click="save" v-if="isAuthority('sys:studentChange:change')">确认移班</el-button>
      </div>
    </section>
    <DiaLog :Show.sync="PopShowFlag" :Edit.sync="PopEdit" :InfoObj="PopInfoObj" @Update="Update"></DiaLog>
  </main>
</template>

<script>
import DiaLog from "./Dialog/BatchChangeShiftDiaLog";
import {
  ClassList,
  StudentPage,
  GradeList,
  StudentMoveToOtherClass
} from "^/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      gradeValue: "",
      classValue: "",
      gradeValue2: "",
      classValue2: "",
      PopShowFlag: false,
      PopEdit: false,
      PopShowPwFlag: false,
      goalClassId: "",
      gradeId: "",
      goalGradeId: "",
      PopInfoObj: {},
      gradeOptions: [],
      classOptions: [],
      classOptions2: [],
      type: "Class",
      filter: {
        schoolYearId: this.Dictionary.SchoolYearDefault
      },
      tableObj: [{}],
      studentIdList: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      GradeList({
        schoolYearId: this.filter.schoolYearId
      }).then(res => {
        this.gradeOptions = res.data.data;
        console.log(
          "filter",
          this.filter.schoolYearId,
          "nianji",
          res.data.data
        );
      });
    },
    checkSourceGrade(val) {
      this.gradeId = val;
      this.classValue = "";
      ClassList({
        gradeId: val
      }).then(res => {
        this.classOptions = res.data.data;
      });
    },
    checkGoalGrade(val) {
      this.goalGradeId = val;
      this.classValue2 = "";
      // console.log("this.goalGradeId ", this.goalGradeId);
      ClassList({
        gradeId: val
      }).then(res => {
        this.classOptions2 = res.data.data;
      });
    },
    checkSourceClass(val) {
      StudentPage({
        gradeId: this.gradeId,
        classId: val,
        pageSize: 10000
      }).then(res => {
        this.tableObj = res.data.data;
      });
    },
    checkGoalClass(val) {
      this.goalClassId = val;
      console.log("this.goalClassId ", this.goalClassId);
    },
    confirmClass() {},
    handleSelectionChange(val) {
      this.studentIdList = [];
      val.map(item => {
        this.studentIdList.push(item.id);
      });
      console.log("handleSelectionChange", val, this.studentIdList);
    },
    save() {
      // console.log([2, 3], "handleSelectionChange", this.studentIdList);

      if (this.goalClassId) {
        if (this.studentIdList != "") {
          this.$confirm("是否确认移班？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnClickModal: false,
            closeOnPressEscape: false,
            type: "success"
          }).then(() => {
            this.$loadingRes("执行中");
            StudentMoveToOtherClass({
              gradeId: this.goalGradeId,
              classId: this.goalClassId,
              studentIdList: this.studentIdList
            }).then(res => {
              StudentPage({
                gradeId: this.goalGradeId,
                classId: this.goalClassId,
                pageSize: 10000
              }).then(res => {
                this.elInfo(res.data.message, "success");
                this.tableObj = res.data.data;
              });
              this.$loadingRes().close();
            });
          })
          .catch(() => {});
        }else {
          this.elInfo("请选择需要移班的学生", "warning");
        }
      }else {
        this.elInfo("请先选择源班级与目标班级", "error");
      }
    },
    edit(row) {
      this.PopInfoObj = row;
      this.PopShowFlag = true;
      this.PopEdit = true;
    },
    add() {
      this.tableObj.push({});
    },
    Update() {
      this.init();
    }
  },
  components: {
    DiaLog
  }
};
</script>

<style>
</style>
