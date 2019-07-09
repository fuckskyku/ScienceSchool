/*
 * File: GradeConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 5:05:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Friday, 5th July 2019 10:50:58 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="SubjectConfig">
    <div class="PublicTitle">
      <span>学科设置</span>
      <!-- <el-button>编辑</el-button> -->
    </div>
    <section>
      <div class="Button_Group">
        <div class="SearchGroup">
          <el-select
            v-model="filter.subjectType"
            clearable
            placeholder="请选择学科类型"
            @change="filterChange"
          >
            <el-option
              v-for="item in Dictionary.SubjectType"
              :key="item.val"
              :label="item.label"
              :value="item.val"
            ></el-option>
          </el-select>
        </div>
        <div class="ButtonGroup">
          <el-button type="primary" @click="add" v-if="isAuthority('sys:subejct:create')">添加</el-button>
        </div>
      </div>
      <el-table
        :data="tableObj.data"
        border
        stripe
        :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
        :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
      >
        <el-table-column :show-overflow-tooltip="true" label="排序" prop="orderid">
          <template slot-scope="scope">
            <el-input v-model="scope.row.orderid" placeholder="序号" v-if="scope.row.edit"></el-input>
            <div v-if="!scope.row.edit">{{scope.row.orderid}}</div>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="学科代码" prop="subjectCode">
          <template slot-scope="scope">
            <el-input v-model="scope.row.subjectCode" placeholder="代码" v-if="scope.row.edit"></el-input>
            <div v-if="!scope.row.edit">{{scope.row.subjectCode}}</div>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="学科名称" prop="name">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" placeholder="学科名称" v-if="scope.row.edit"></el-input>
            <div v-if="!scope.row.edit">{{scope.row.name}}</div>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="学科类型" prop="subjectType">
          <template slot-scope="scope">
            <el-select v-model="scope.row.subjectType" placeholder="选择学科类型" v-if="scope.row.edit">
              <el-option
                v-for="item in Dictionary.SubjectType"
                :key="item.val"
                :label="item.label"
                :value="item.val"
              ></el-option>
            </el-select>
            <div
              v-if="!scope.row.edit"
            >{{returnSelectVal(scope.row.subjectType,Dictionary.SubjectType,'val','label')}}</div>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="学分" prop="credit">
          <template slot-scope="scope">
            <el-input v-model="scope.row.credit" placeholder="学分" v-if="scope.row.edit"></el-input>
            <div v-if="!scope.row.edit">{{scope.row.credit}}</div>
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
              v-if="isAuthority('sys:subejct:update')&&!scope.row.edit"
              @click="scope.row.edit=true"
            >编辑</el-button>
            <el-button
              type="text"
              :class="[scope.row.isValid?'orange':'green']"
              @click="disabled(scope.row)"
              v-if="isAuthority('sys:subejct:valid')&&scope.row.addFlag"
            >{{scope.row.isValid?'禁用':'启用'}}</el-button>
            <el-button
              type="text"
              class="red"
              @click="del(scope.$index,scope.row.id)"
              v-if="isAuthority('sys:subejct:delete')"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page :tabObj.sync="tableObj" :filterObj="filter" name="SubjectPage"></page>
    </section>
  </main>
</template>

<script>
import {
  SubjectPage,
  SubjectDelete,
  SubjectUpdateStatus,
  SubjectSaveOrUpdate
} from "^/api/api";
import { mapActions } from "vuex";
export default {
  inject: ["reload"],
  data() {
    return {
      PopShowFlag: false,
      tableObj: [{}],
      filter: {},
      defaultLength: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["setSettingConfig"]),
    init(obj) {
      SubjectPage(obj).then(res => {
        this.tableEdit(res.data.data.data);
        this.tableObj = res.data.data;

        this.defaultLength = res.data.data.data.length;
      });
    },
    Save(row) {
      console.log(row);

      if (!row.orderid) {
        this.elInfo("请输入序号", "warning");
        return;
      }
      if (!row.name) {
        this.elInfo("学科名称不能为空", "warning");
      }
      if (!row.orderid.toString().match(/^[0-9]*$/)) {
        this.elInfo("序号只能输入数字", "warning");
      }
      if (!row.subjectCode) {
        this.elInfo("请输入代码", "warning");
        return;
      }
      if (!row.subjectCode.match(/^[A-Za-z0-9]+$/)) {
        this.elInfo("代码只能输入数字和字母", "warning");
      }

      this.$loadingRes("执行中");
      row.edit = false;
      SubjectSaveOrUpdate(row).then(res => {
        this.$loadingRes().close();
        this.init(this.filter);
      });
    },
    filterChange() {
      this.init(this.filter);
    },
    del(index, id) {
      if (id) {
        this.OpenDel(
          null,
          "warning",
          function() {
            SubjectDelete({ id: id }).then(res => {
              this.init(this.filter);
            });
          }.bind(this)
        );
      } else {
        this.tableObj.data.splice(index, 1);
      }
    },
    disabled(row) {
      SubjectUpdateStatus({
        id: row.id,
        isValid: !row.isValid
      }).then(res => {
        row.isValid = !row.isValid;
        this.elInfo(res.data.message, "success");
        this.Dictionary.DictionaryInit();
        // this.reload();
      });
    },
    add() {
      this.tableObj.data.push({
        credit: "",
        edit: true,
        addFlag: false,
        isValid: true,
        name: "",
        orderid: "",
        subjectCode: "",
        subjectType: 1,
        updateTime: ""
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.defaultLength != this.tableObj.data.length) {
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
