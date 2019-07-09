/*
 * File: GradeConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 5:05:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Friday, 5th July 2019 5:36:39 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="JobConfig">
    <div class="PublicTitle">
      <span>职位管理</span>
      <!-- <el-button>编辑</el-button> -->
    </div>
    <section>
      <div class="Button_Group">
        <div class="SearchGroup">
          <el-input
            v-model="filter.positionName"
            clearable
            placeholder="请输入职位名称"
            @change="filterChange"
          ></el-input>
          <el-button slot="append" @click="filterChange" icon="el-icon-search"></el-button>
        </div>
        <div class="ButtonGroup">
          <el-button
            type="primary"
            @click="PopShowFlag=true"
            v-if="isAuthority('sys:position:create')"
          >添加职位</el-button>
          <el-button
            type="danger"
            @click="del(false)"
            v-if="isAuthority('sys:position:delete')"
          >批量删除</el-button>
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
        <el-table-column :show-overflow-tooltip="true" type="selection"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="职位" prop="positionName"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="职位描述" prop="remark"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="edit(scope.row)"
              v-if="isAuthority('sys:position:update')"
            >编辑</el-button>
            <el-button
              type="text"
              class="red"
              @click="del(scope.row.id)"
              v-if="isAuthority('sys:position:delete')"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page :tabObj.sync="tableObj" :filterObj="filter" name="PositionPage"></page>
    </section>
    <DiaLog :Show.sync="PopShowFlag" :Edit.sync="PopEdit" :InfoObj="PopInfoObj" @Update="Update"></DiaLog>
  </main>
</template>

<script>
import DiaLog from "./DiaLog/JobConfigDiaLog";
import { PositionPage, PositionDlete } from "^/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      PopShowFlag: false,
      PopInfoObj: {},
      PopEdit: false,
      filter: {},
      tableObj: [{}],
      delTableList: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init(obj) {
      PositionPage(obj).then(res => {
        this.tableObj = res.data.data;
      });
    },
    filterChange() {
      this.init(this.filter);
    },
    del(id) {
      let AllFlag = false;
      if (!id) {
        if (!this.delTableList.length) {
          this.elInfo("请选择需要批量删除的数据", "warning");
        } else {
          AllFlag = true;
        }
      } else {
        AllFlag = true;
      }
      if (AllFlag)
        this.OpenDel(
          id ? null : "是否批量删除已选数据",
          "warning",
          function() {
            PositionDlete({ ids: id ? id : this.delTableList.toString() }).then(
              res => {
                this.init(this.filter);
              }
            );
          }.bind(this)
        );
    },
    edit(row) {
      this.PopShowFlag = true;
      this.PopEdit = true;
      this.PopInfoObj = row;
    },
    checked(selection, row) {
      this.delTableList = selection.map((item, index, array) => {
        return item.id;
      });
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
