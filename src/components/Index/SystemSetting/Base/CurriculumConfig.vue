/*
 * File: GradeConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 5:05:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Thursday, 4th July 2019 5:50:40 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="CurriculumConfig">
    <div class="PublicTitle">
      <span>课程时间设置</span>
      <!-- <el-button>编辑</el-button> -->
    </div>
    <section>
      <div class="Button_Group">
        <div class="SearchGroup">
          <el-select v-model="filter.timeType" placeholder="请选择时令" @change="filterChange">
            <el-option
              v-for="item in Dictionary.Season"
              :key="item.val"
              :label="item.label"
              :value="item.val"
            ></el-option>
          </el-select>
        </div>
        <div class="ButtonGroup">
          <el-button type="primary" @click="add" v-if="isAuthority('sys:classTime:create')">添加</el-button>
          <el-button type="primary" @click="allValid" v-if="isAuthority('sys:classTime:valid')">设为有效</el-button>
        </div>
      </div>
      <el-table
        :data="tableObj"
        border
        stripe
        :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
        :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
      >
        <el-table-column :show-overflow-tooltip="true" label="时令" prop="timeType">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.timeType"
              placeholder="请选择时令"
              v-if="scope.row.edit"
              :disabled="scope.row.edit"
            >
              <el-option
                v-for="item in Dictionary.Season"
                :key="item.val"
                :label="item.label"
                :value="item.val"
              ></el-option>
            </el-select>
            <div v-if="!scope.row.edit">{{scope.row.timeType==1?'冬令制':'夏令制'}}</div>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="课节" prop="name">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" placeholder="请输入课节(如:1)" v-if="scope.row.edit"></el-input>
            <div v-if="!scope.row.edit">第{{scope.row.name}}节</div>
            <!-- <div>{{scope.row.name}}</div> -->
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="开始时间" prop="startTime">
          <template slot-scope="scope">
            <el-time-picker
              :arrow-control="false"
              style="width:auto;"
              v-model="scope.row.startTime"
              format="HH:mm"
              placeholder="开始时间"
              value-format="timestamp"
              v-if="scope.row.edit"
            ></el-time-picker>
            <div v-if="!scope.row.edit">{{new Date(scope.row.startTime).format('hh:mm')}}</div>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="结束时间" prop="endTime">
          <template slot-scope="scope">
            <el-time-picker
              :arrow-control="false"
              style="width:auto;"
              v-model="scope.row.endTime"
              format="HH:mm"
              placeholder="结束时间"
              value-format="timestamp"
              :picker-options="{
                selectableRange:scope.row.startTime?new Date(scope.row.startTime+60000).format('hh:mm:ss')+'-20:30:00':'00:00:00'+'-20:30:00'
              }"
              v-if="scope.row.edit"
            ></el-time-picker>
            <div v-if="!scope.row.edit">{{new Date(scope.row.endTime).format('hh:mm')}}</div>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="时段" prop="intervalType">
          <template slot-scope="scope">
            <el-select v-model="scope.row.intervalType" placeholder="请选择" v-if="scope.row.edit">
              <el-option
                v-for="item in Dictionary.TimeInterval"
                :key="item.val"
                :label="item.label"
                :value="item.val"
              ></el-option>
            </el-select>
            <div
              v-if="!scope.row.edit"
            >{{scope.row.intervalType==1?'上午':scope.row.intervalType==2?'下午':'晚上'}}</div>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="状态" prop="isValid">
          <template slot-scope="scope">
            <span>{{scope.row.isValid?'有效':'无效'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.edit" @click="Save(scope.row)">保存</el-button>
            <el-button
              type="text"
              v-if="isAuthority('sys:classTime:update')&&!scope.row.edit"
              @click="scope.row.edit=true"
            >编辑</el-button>
            <el-button
              type="text"
              class="red"
              v-if="isAuthority('sys:classTime:delete')"
              @click="del(scope.$index,scope.row.id)"
            >删除</el-button>
            <!-- <el-button
              type="text"
              @click="disabled(scope.row)"
              v-if="scope.row.addFlag"
            >{{scope.row.isValid?'禁用':'启用'}}</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </section>
  </main>
</template>

<script>
import {
  ClassTimeList,
  ClassTimeDelete,
  ClassTimeSaveOrUpdate,
  ClassTimeSetValid,
  ClassTimeSetAllValid
} from "^/api/api";
import { mapActions } from "vuex";
export default {
  inject: ["reload"],
  data() {
    return {
      PopShowFlag: false,
      defaultTimeType: "",
      defaultLength: "",
      filter: {
        timeType: null
      },
      tableObj: [{}],
      tempObj: null
    };
  },
  created() {
    ClassTimeList().then(res => {
      this.defaultTimeType = res.data.data.timeType;
      this.filter.timeType = this.defaultTimeType;
      this.init(this.filter);
    });
  },
  methods: {
    ...mapActions(["setSettingConfig"]),
    init(obj) {
      ClassTimeList(obj).then(res => {
        this.tableEdit(res.data.data.list);
        this.tableObj = res.data.data.list;
        this.defaultLength = res.data.data.list.length;
      });
    },
    Save(row) {
      if (!row.name) {
        this.elInfo("请输入课节", "warning");
        return;
      }
      if (!row.name.match(/^[0-9]*$/)) {
        this.elInfo("课节只能输入数字", "warning");
      }
      if (!row.startTime) {
        this.elInfo("请选择开始时间", "warning");
        return;
      }
      if (!row.endTime) {
        this.elInfo("请选择结束时间", "warning");
        return;
      }
      if (!row.intervalType) {
        this.elInfo("请选择时段", "warning");
        return;
      }
      this.$loadingRes("执行中");
      row.edit = false;
      ClassTimeSaveOrUpdate(row).then(res => {
        this.$loadingRes().close();
        this.init(this.filter);
      });
    },

    filterChange(val) {
      this.init({ timeType: val });
    },
    // disabled(row) {
    //   ClassTimeSetValid({
    //     classTimeId: row.id,
    //     isValid: !row.isValid
    //   }).then(res => {
    //     row.isValid = !row.isValid;
    //     // this.reload();
    //   });
    // },
    del(index, id) {
      if (id) {
        this.OpenDel(
          null,
          "warning",
          function() {
            ClassTimeDelete({ classTimeId: id }).then(res => {
              this.init(this.filter);
            });
          }.bind(this)
        );
      } else {
        this.tableObj.splice(index, 1);
      }
    },
    add() {
      // console.log(this.tableObj);
      this.tableObj.push({
        timeType: this.filter.timeType,
        isValid: this.defaultTimeType == this.filter.timeType ? 1 : 0,
        edit: true,
        addFlag: false
      });
    },
    allValid() {
      if (this.filter.timeType) {
        ClassTimeSetAllValid({ timeType: this.filter.timeType }).then(res => {
          this.defaultTimeType = res.data.data;
          this.elInfo(res.data.message, "success");
          this.init(this.filter);
        });
      } else {
        this.elInfo("没有选择时令", "warning");
      }
    }
  },
  // 导航离开该组件的对应路由时调用
  // 可以访问组件实例 `this`
  beforeRouteLeave(to, from, next) {
    if (this.defaultLength != this.tableObj.length) {
      this.$confirm(
        "您修改的内容尚未保存，请手动保存后再离开该界面！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "直接离开",
          closeOnClickModal: false,
          closeOnPressEscape: false,
          type: "warning"
        }
      )
        .then(() => {
          this.setSettingConfig(from.name);
        })
        .catch(() => {
          next();
        });
    } else {
      next();
    }
  },
  components: {
    // DiaLog
  }
};
</script>

<style>
</style>
