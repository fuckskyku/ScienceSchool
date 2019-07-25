/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Friday, 12th July 2019 1:39:05 pm
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
          ref="multipleTable"
          border
          stripe
          :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
          :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
          @select="handleSelectionChange"
          @select-all="handleSelectionChange"
        >
          <!-- <el-table-column :show-overflow-tooltip="true" label width="80">
            <template slot-scope="scope">
              <el-radio v-model="radio" :label="type=='Teacher'?scope.row.id:scope.row.jobNo">&nbsp;</el-radio>
            </template>
          </el-table-column> -->
          <el-table-column :show-overflow-tooltip="true" type="selection" width="80"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="name" label="姓名"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="mobile" label="手机"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="departmentMame" label="部门"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="teacherGroupName" label="教研组"></el-table-column>
        </el-table>
        <div class="PageDiv">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="tableObj.pageNo"
            :page-sizes="[10, 20, 40,60,80,100]"
            :page-size="tableObj.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableObj.totalCount"
          ></el-pagination>
        </div>
        <!-- <page :tabObj.sync="tableObj" :filterObj="filter" name="TeacherPage"></page> -->
      </main>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Save">确 定</el-button>
      </div>
    </el-dialog>
  </main>
</template>
<script>
import { TeacherPage, GradeUpdate, ClassUpdate,ClassUpdateClassMaster } from "^/api/api";
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
      teacherIdList: [],
      teacherNoList: [],
      teacherIdtempList: [],
      teacherNotempList: [],
      filter: {
        schoolYearId: this.Dictionary.SchoolYearDefault
      },

    };
  },
  created() {},
  watch: {
    
    Show(val) {
      if (val) {
        if (this.type == "Teacher") {
          this.teacherIdList = this.ParameterObj.gradeMasterId
          this.teacherNoList = this.ParameterObj.gradeMasterNo
        } else {
          this.teacherIdList = this.ParameterObj.classMasterId
          this.teacherNoList = this.ParameterObj.classMasterNo
        }
        this.init(this.filter);
        
      }else{
        this.teacherIdList = [];
        this.teacherNoList = [];
        this.teacherIdtempList = [];
        this.teacherNotempList = [],
        this.$refs.multipleTable.clearSelection();
        
      }
      this.dialogVisible = val;
      
    }
  },
  methods: {
    init(obj) {
      var that = this
      
      TeacherPage(obj).then(res => {
        this.tableObj = res.data.data;
        // 数据回显
        if(this.teacherIdList) {
          var teacherIdtempList = this.teacherIdList.split(',');
          teacherIdtempList.map(item => {
            this.teacherIdtempList.push(parseInt(item));
            
          })
        }
        if(this.teacherNoList) {
          this.teacherNotempList = this.teacherNoList.split(',');
          // teacherNoList.map(item => {
          //   // this.teacherNotempList.push(parseInt(item));
            
          // })
        }
        console.log(this.teacherIdList,'==',this.teacherNotempList)
        this.tableObj.data.map((item) => {
          this.teacherIdtempList.map(list => {
            if (list == item.id) {
              that.$nextTick(() => {
                that.$refs.multipleTable.toggleRowSelection(item);
              });
            }
          });
        })
      });
    },
    handleSizeChange(val) {
      this.$set(this.filter,"pageSize",val)
      this.init(this.filter);
    },
    handleCurrentChange(val) {
      this.$set(this.filter,"pageNo",val)
      var that = this
      this.teacherIdtempList = []
      TeacherPage(this.filter).then(res => {
        this.tableObj = res.data.data;
        // 数据回显
        if(this.teacherIdList) {
          console.log(this.teacherIdList)
          var teacherIdtempList = this.teacherIdList.split(',');
          teacherIdtempList.map(item => {
            this.teacherIdtempList.push(parseInt(item));
          })
        }
        if(this.teacherNoList) {
          var teacherNoList = this.teacherNoList.split(',');
          teacherNoList.map(item => {
            this.teacherNotempList.push(parseInt(item));
          })
        }
        this.tableObj.data.map((item) => {
            this.teacherIdtempList.map(list => {
              if (list == item.id) {
                that.$nextTick(() => {
                  that.$refs.multipleTable.toggleRowSelection(item);
                });
              }
            });
          })
      })
    },
    handleSelectionChange(row) {
      var arr1 = [];
      var arr2 = [];
      row.map(item => {
        // this.teacherIdtempList.push(item.id);
        this.teacherIdtempList.push(item.id);
        this.teacherNotempList.push(item.jobNo);
      });
       console.log(this.unique(this.teacherNotempList))
      this.teacherIdList = this.unique(this.teacherIdtempList).join(','); 
      this.teacherNoList = this.unique(this.teacherNotempList).join(','); 
      console.log(this.teacherIdList,this.teacherNoList)
    },
    unique(arr) {
      if (!Array.isArray(arr)) {
        console.log('type error!')
        return
      }
      return [...new Set(arr)]
    },
    Save() {
      this.$loadingRes("执行中");
      if (this.type == "Teacher") {
        GradeUpdate({
          id: this.ParameterObj.id,
          gradeMasterId: this.teacherIdList,
          gradeMasterNo: this.teacherNoList
        }).then(res => {
          this.$loadingRes().close();
          this.closeDialog();
        });
      } else {
        ClassUpdateClassMaster({
          id: this.ParameterObj.id,
          classMasterId: this.teacherIdList,
          classMasterNo: this.teacherNoList
        }).then(res => {
          this.$loadingRes().close();
          this.closeDialog();
        });
      }
    },
    filterChange() {
      delete this.filter.pageNo;
      this.init(this.filter);
    },
    closeDialog() {
      this.$emit("update:show", false);
      this.$emit("Update");
      this.filter = {};
      this.teacherIdList = '';      
      this.teacherNoList = '';      
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/DiaLog.scss";
</style>

