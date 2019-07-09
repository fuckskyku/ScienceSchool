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
  <main id="SchoolRollChangeDiaLog">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
      @close="closeDialog"
    >
      <span slot="title" class="DiaLogTitle">添加学籍异动</span>
      <main class="form">
        <el-form :model="form" :rules="Verification.SchoolRollChange" ref="form" label-width="120px">
          <div class="inputGroup">
            <el-form-item label="学生姓名：" prop="name">
              <!-- <span>{{form.name}}</span> -->
              <el-input
                v-model="form.name"
                disabled
                clearable
                class="stuName"
                style="width:100px;"
              ></el-input>
              <el-button style="width:80px;" type="primary" @click="innerVisible = true">选择</el-button>
              
            </el-form-item>
            <el-form-item label="在校状态：" prop="zxzt">
              <el-radio
                v-model="form.zxzt"
                v-for="item in Dictionary.stateSchool"
                :key="item.val"
                :label="item.val"
              >{{item.label}}</el-radio>
            </el-form-item>
            <el-form-item label="异动类型：" prop="ydlbm">
              <el-select v-model="form.ydlbm" >
                <el-option
                  v-for="item in Dictionary.ShiftType"
                  :key="item.id"
                  :label="item.label"
                  :value="item.val"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="异动日期：" prop="ydrq">
              <el-date-picker
              @change="pickerDate"
                v-model="form.ydrq"
                type="datetime"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </div>
          <p class="sub_title">目标班级</p>
          <div class="inputGroup">
            <el-form-item label="年级：">
              <el-select v-model="form.xnj" @change="selectClass">
                <el-option
                  v-for="item in gradeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班级：">
              <el-select v-model="form.xbh">
                <el-option
                  v-for="item in classOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </main>
      <el-dialog
        width="80%"
        title="学生信息"
        :visible.sync="innerVisible"
        :close-on-click-modal="false"
        append-to-body
      >
        <main class="form">
          <div style="margin-bottom:10px;">
            <el-input
              placeholder="请输入学生"
              v-model="tempName"
              clearable
              style="width:92%"
            ></el-input>
            <el-button slot="append" @click="searchStudent(tempName)" style="float:right" icon="el-icon-search"></el-button>
            <!-- <el-button type="primary" @click="search" style="float:right">搜索</el-button> -->
          </div>
          
          <el-table
            :data="tableObj.data"
            ref="multipleTable"
            border
            stripe
            :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
            :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
          >
            <el-table-column :show-overflow-tooltip="true" label width="55">
            <template slot-scope="scope">
              <el-radio v-model="radio" @change="handleSelectionChange(scope.row)" :label="scope.row.id">&nbsp</el-radio>
            </template>
          </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="学籍号" prop="xjh"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="姓名" prop="name"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="性别" prop="sex">
              <template slot-scope="scope">{{scope.row.sex == 1 ? '男' : '女'}}</template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="年级" prop="gradeName"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="班级" prop="className"></el-table-column>
          </el-table>
          <page :tabObj.sync="tableObj" :filterObj="filter" name="StudentPage"></page>
        </main>
        <div slot="footer" class="dialog-footer" style="text-align:center">
          <!-- <el-button @click="cancel()">取 消</el-button> -->
          <el-button type="primary" @click="confirm()">确 定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </main>
</template>
<script>
import {
  StudentChangeSaveOrUpdate,
  StudentPage,
  GradeList,
  ClassList,
  StudentSaveOrUpdate
} from "^/api/api";
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
      studentOptions: [],
      gradeOptions: [],
      classOptions: [],
      form: {name: '',zxzt: 0,studentId: ''},
      tempName: '',
      tableObj: [{}],
      filter: {
        schoolYearId: this.Dictionary.SchoolYearDefault
      },
      radio: ''
    };
  },
  mounted() {
    
  },
  watch: {
    innerVisible(val) {
      if(val) {
        this.tempName = ''
      }
    },
    Show(val) {
      this.dialogVisible = val;
      this.init();
    },
    Edit(val) {
      if (val) {
        this.form = this.InfoObj;
        this.form.ybh = this.form.classId
        this.form.ynj = this.form.gradeId
        //console.log(this.form)
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      StudentPage().then(res => {
        //console.log(res.data.data.data)
        this.studentOptions = res.data.data.data
        this.tableObj = res.data.data
      })
      GradeList({
        schoolYearId: this.Dictionary.SchoolYearDefault
      }).then(res => {
        this.gradeOptions = res.data.data
      })
    },
    pickerDate() {
      this.form.ydrq = new Date(this.form.ydrq).format("yyyy-MM-dd hh:mm:ss")
      //console.log('this.form.ydrq',this.form.ydrq)
    },
    selectClass(val) {
      this.classOptions = []
      ClassList({
        gradeId: val
      }).then(res => {
        this.classOptions = res.data.data
      })
    },
    confirm() {
      // this.form.name == this.tempName; 
      this.form.name = JSON.parse(JSON.stringify(this.tempName))
      this.studentOptions.map(item => {
        if(item.name == this.form.name) {
          this.form.studentId = item.id 
          this.form.ybh = item.classId
          this.form.ynj = item.gradeId
        }
      })
      this.tempName = '';
      this.radio = '';
      this.innerVisible = false
    },
    searchStudent(val) {
      // StudentPage({

      // }).then(res => {
      //   console.log(res.data.data.data)
      //   this.studentOptions = res.data.data.data
      //   this.tableObj = res.data.data
      // })
    },
    handleSelectionChange(val) {
      this.tempName = val.name
      // this.tableObj.data.map(item => {
      //   if(item.id == val.id) {
      //     this.form.name = item.name
      //     this.form.ybh = item.classId
      //     this.form.ynj = item.gradeId
      //   }
      // })
    },
    selectStudent(val) { 
      this.tempName = val.name
      // console.log(this.form.name,val)
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$loadingRes("执行中");
          StudentChangeSaveOrUpdate(this.form).then(res => {
            console.log(res.data)
            this.$loadingRes().close();
            this.closeDialog();
          })
        } else {
          return false;
        }
      });
      
    },
    closeDialog() {
      this.$emit("update:show", false);
      this.$emit("update:edit", false);
      this.$emit("update:info", false);
      this.$emit("Update");
      this.form = {};
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/DiaLog.scss";
.stuName{
  input{
    text-align:center;
    padding: 0 !important;
  }
}
</style>

