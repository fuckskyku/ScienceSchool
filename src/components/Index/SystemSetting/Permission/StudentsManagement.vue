/*
 * File: GradeConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 5:05:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Wednesday, 10th July 2019 5:41:00 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="StudentsManagement">
    <div class="PublicTitle">
      <span>学生管理</span>
      <!-- <el-button>编辑</el-button> -->
    </div>
    <section>
      <div class="Button_Group">
        <div class="SearchGroup">
          <el-select v-model="filter.schoolYearId" placeholder="请选择学年" @change="SchoolYearChange">
            <el-option
              v-for="item in Dictionary.SchoolYearOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>

          <el-select placeholder="年级" clearable v-model="filter.gradeId" @change="GradeChange">
            <el-option
              v-for="item in gradeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select placeholder="班级" clearable v-model="filter.classId" @change="filterChange">
            <el-option
              v-for="item in classOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="ButtonGroup">
          <el-button type="primary" @click="disabled(null,false)">批量启用</el-button>
          <el-button type="primary" @click="disabled(null,true)">批量禁用</el-button>
          <!-- <el-button>批量删除</el-button> -->
          <!-- <el-button>启用</el-button>
          <el-button>禁用</el-button>-->
        </div>
      </div>
      <el-table
        :data="tableObj.data"
        border
        stripe
        :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
        :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
        @select="checked"
        @select-all="checked"
      >
        <el-table-column :show-overflow-tooltip="true" type="selection" width="55"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="用户名" prop="userName"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="学籍号" prop="xjh"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="姓名" prop="name"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="性别" prop="sex">
          <template slot-scope="scope">{{scope.row.sex == 1 ? '男' : '女'}}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="证件号码" prop="idCard"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="状态">
          <template slot-scope="scope">{{scope.row.disabled==0? "启用" : "禁用"}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="green"
              @click="info(scope.row)"
              v-if="isAuthority('sys:studentUser:info')"
            >详情</el-button>
            <el-button
              type="text"
              @click="changePwd(scope.row)"
              v-if="isAuthority('sys:studentUser:modifyPwd')"
            >修改密码</el-button>
            <el-button
              type="text"
              v-if="isAuthority('sys:studentUser:valid')"
              :class="[scope.row.disabled?'green':'orange']"
              @click="disabled(scope.row.userId,scope.row.disabled?false:true)"
            >{{scope.row.disabled==0?'禁用':'启用'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <p class="tip">*添加学生用户请到【人员管理】->【学生信息管理】中添加</p>
      <!-- 分页 -->
      <!-- <div class="PageDiv">
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
      </div> -->
      <page :tabObj.sync="tableObj" :filterObj.sync="filter" :Edit.sync="edit" name="StudentUserPage"></page>
    </section>
    <DiaLog
      :Show.sync="PopShowFlag"
      :Edit.sync="PopEdit"
      :InfoObj="PopInfoObj"
      @Update="Update"
      :Info.sync="PopInfo"
    ></DiaLog>
    <ChangePwDiaLog :Show.sync="PopShowPwFlag" :InfoObj="PopInfoObj"></ChangePwDiaLog>
  </main>
</template>

<script>
import Page from "../../../Templet/Page";
import DiaLog from "../PersonnelManagement/DiaLog/StudentInfoDiaLog";
import ChangePwDiaLog from "../../../Templet/ChangePwDiaLog";
import { StudentUserPage, GradeList, ClassList, UserSetValid } from "^/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      PopShowFlag: false,
      PopShowPwFlag: false,
      PopShowFlagSearch: false,
      edit: false,
      PopEdit: false,
      PopInfo: false,
      PopInfoObj: {},
      delTableUserIdList: [],
      filter: {
        schoolYearId: this.Dictionary.SchoolYearDefault
      },
      gradeOptions: [],
      classOptions: [],
      tableObj: [{}]
    };
  },
  created() {
    this.SchoolYearChange(this.filter.schoolYearId);
    this.init();
  },
  methods: {
    init(obj) {
      StudentUserPage(obj).then(res => {
        this.tableObj = res.data.data;
        // console.log('tableObj',this.tableObj)
      });
    },
    info(row) {
      this.PopShowFlag = true;
      this.PopEdit = true;
      this.PopInfo = true;
      this.edit = true;
      this.PopInfoObj = row;
    },
    handleSizeChange(val) {
      this.$set(this.filter,"pageSize",val)
      // this.filter.pageSize = val
      this.init(this.filter);
      console.log(val)
    },
    handleCurrentChange(val) {
      this.$set(this.filter,"pageNo",val)
      // this.filter.pageNo = val
      this.init(this.filter);
    },
    changePwd(row) {
      this.PopInfoObj = row;
      this.PopShowPwFlag = true;
    },
    SchoolYearChange(val) {
      this.$set(this.filter, "gradeId", "");
      this.$set(this.filter, "classId", "");
      delete this.filter.pageNo;
      this.classOptions = [];
      GradeList({ schoolYearId: val }).then(res => {
        this.gradeOptions = res.data.data;
        this.init(this.filter);
      });
    },
    GradeChange(val) {
      delete this.filter.pageNo;
      this.$set(this.filter, "classId", "");
      ClassList({ gradeId: val }).then(res => {
        this.classOptions = res.data.data;
        this.init(this.filter);
      });
    },
    filterChange(val) {
      delete this.filter.pageNo;
      this.tableObj = {}
      this.$set(this.filter, "classId", val);
      this.init(this.filter);
    },

    checked(selection, row) {
      this.delTableUserIdList = selection.map((item, index, array) => {
        return item.userId;
      });
    },
    disabled(id, flag) {
      let AllFlag = false;
      if (!id) {
        if (!this.delTableUserIdList.length) {
          this.elInfo("请选择需要批量操作的数据", "warning");
        } else {
          AllFlag = true;
        }
      } else {
        AllFlag = true;
      }
      if (AllFlag)
        UserSetValid({
          disabled: flag,
          userIds: id ? id : this.delTableUserIdList.toString()
        }).then(res => {
          this.delTableUserIdList = [];
          this.elInfo(res.data.message, "success");
          this.init(this.filter);
        });
      // UserSetValid({
      //   userIds: row.userId,
      //   disabled: row.disabled ? 0 : 1
      // }).then(res => {
      //   // this.init();
      //   row.disabled = row.disabled ? 0 : 1;
      // });
    },
    Update() {
      this.init(this.filter);
    }
  },
  components: {
    DiaLog,
    ChangePwDiaLog,
    Page
  }
};
</script>

<style>
</style>
