/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Friday, 12th July 2019 9:19:20 am
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
      <span slot="title" class="DiaLogTitle">{{Info?'家长信息':Edit?'编辑家长信息':'添加家长信息'}}</span>
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
                      <el-select v-model="scope.row.gx" placeholder="请选择关系" @change="checkRelation">
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
                    <el-button type="text" :class="{'red':!Info}" @click="delRow(scope.$index)">删除</el-button>
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
            <el-input placeholder="请输入学籍号/姓名/身份证号" v-model="keyWord" @change="search"></el-input>
            <!-- <el-input placeholder="请输入关键字" v-model="filter.name"></el-input> -->
          </div>
          <el-table
            :data="tableObj.data"
            border
            :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
            :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
            highlight-current-row
            @current-change="handleCurrentChange1"
          >
            <el-table-column :show-overflow-tooltip="true" label width="55">
              <template slot-scope="scope">
                <el-radio v-model="radio" @change="handleSelectionChange(scope.row)" :label="scope.row.id">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="学籍号" prop="xjh"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="姓名" prop="name"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="班级" prop="className"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="性别" prop="sex">
              <template slot-scope="scope">{{scope.row.sex == 1 ? '男' : '女'}}</template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="身份证号" prop="idCard"></el-table-column>
          </el-table>
          <div class="PageDiv">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="tableObj.pageNo"
              :page-sizes="[10, 20, 40,60,80,100]"
              :page-size.sync="tableObj.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableObj.totalCount"
            ></el-pagination>
          </div>
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
      filter: {
        schoolYearId: this.Dictionary.SchoolYearDefault,
        keyWord: "",
      },
      relationData: [],
      tempIndex: "",
      tempObj: {},
      tableObj: [],
      keyWord: '',
      radio: ''
    };
  },
  created() {
    
  },
  watch: {
    innerVisible(val) {
      if(!val) {
        this.radio = '';
        this.keyWord = '';
      }else{
        
        this.init(this.filter);
        
      }
    },
    
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
    init(obj) {
      StudentPage(obj).then(res => {
        this.tableObj = res.data.data;
        
      });
    },
    Infoinit() {
      ParentInfo({ parentId: this.InfoObj.id }).then(res => {
        this.form = res.data.data;
        this.$set(this.form, "studentParentIns", this.form.studentParentOuts);
      });
    },
    handleSizeChange(val) {
      this.$set(this.filter,"pageSize",val)
      this.init(this.filter);
    },
    handleCurrentChange(val) {
      this.$set(this.filter,"pageNo",val)
      this.init(this.filter);
    },
    checkRelation(val) {
      this.form.studentParentIns.map((item,index) => {
        if(index != 0){
          if(item.gx != this.form.studentParentIns[0].gx) {
            this.elInfo("成员关系选择错误","warning")
            this.form.studentParentIns[index].gx = ''
          }
        }
      })
    },
    search() {
      this.$set(this.filter,"keyWord",this.keyWord);
      this.init(this.filter)
    },
    saveStudent() {
      this.tableObj.data.map(item => {
        if(item.id == this.radio) {
          this.tempObj = item
        }
      })
      console.log("tempObj",this.tempObj)
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
      this.radio = this.form.studentParentIns[this.tempIndex].studentId
      
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
    searchStudent(val) {
      delete this.filter.pageNo;
      this.init(this.filter);
      this.radio = this.form.studentParentIns[this.tempIndex].studentId
    },
    handleSelectionChange(val) {
      this.tempName = val.name
    },
    // selectStudent(val) { 
    //   this.tempName = val.name
    //   // console.log(this.form.name,val)
    // },
    add() {
      this.$refs["form"].validate(valid => {
        if (valid) {
           this.form.studentParentIns.push({});
        } else {
          return false;
        }
      });
     
    },
    delRow(index) {
      if (this.form.studentParentIns.length != 1) {
        this.form.studentParentIns.splice(index, 1);
      } else {
        this.elInfo("最后一条不能删除", "warning");
      }
    },
    handleCurrentChange1(val) {
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

