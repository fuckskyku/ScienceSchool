/*
 * File: GradeConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 5:05:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Thursday, 4th July 2019 2:38:46 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="SchoolRollChange">
    <div class="PublicTitle">
      <span>学籍异动</span>
    </div>
    <section>
      <div class="Button_Group">
        <div class="SearchGroup"></div>
        <div class="ButtonGroup">
          <el-button
            type="primary"
            @click="PopShowFlag=true"
            v-if="isAuthority('sys:studentChange:delete')"
          >添加</el-button>
        </div>
      </div>
      <el-table
        :data="tableObj.data"
        border
        stripe
        :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
        :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
      >
        <el-table-column :show-overflow-tooltip="true" label="异动日期" prop="ydrq">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.ydrq).format('yyyy-MM-dd')}}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="学籍号" prop="xjh"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="姓名" prop="name"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="异动类型" prop="ydlbmStr"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="原班级" prop="ybhStr"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="现班级" prop="xbhStr"></el-table-column>
      </el-table>
      <page :tabObj.sync="tableObj" :filterObj="filter" name="StudentChangePage"></page>
    </section>
    <DiaLog :Show.sync="PopShowFlag" :Edit.sync="PopEdit" :InfoObj="PopInfoObj" @Update="Update"></DiaLog>
  </main>
</template>

<script>
import DiaLog from "./DiaLog/SchoolRollChangeDiaLog";
import { StudentChangePage } from "^/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      PopShowFlag: false,
      PopShowFlagSearch: false,
      PopEdit: false,
      PopInfoObj: {},
      ParameterObj: {},
      type: "Class",
      filter: {},
      tableObj: [{}]
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      StudentChangePage().then(res => {
        this.tableObj = res.data.data;
      });
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
