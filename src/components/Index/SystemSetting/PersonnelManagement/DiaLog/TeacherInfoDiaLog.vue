/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Friday, 5th July 2019 2:21:13 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="TeacherInfoDiaLog">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
      @close="closeDialog"
    >
      <span slot="title" class="DiaLogTitle">{{Info?'教师信息':Edit?'编辑教师信息':'新增教师信息'}}</span>
      <main class="form">
        <div class="title">
          <span :class="{'active':step==1}" @click="step=1">基本信息</span>
          <i>-</i>
          <span :class="{'active':step==2}" @click="step=2">个人情况</span>
        </div>
        <el-form
          :model="form"
          ref="form"
          :rules="Verification.Teacher"
          label-width="120px"
          :disabled="Info"
        >
          <div class="inputGroup" v-if="step==1">
            <el-form-item label="照片" prop="faceImg" class="WidthMax">
              <el-upload
                class="avatar-uploader"
                action="/api/file/uploadSingle"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <!-- <el-button type="primary" @click="exportPhoto">导出相片</el-button> -->
              <el-button
                type="primary"
                @click="exportPhoto"
                style="align-self: flex-end;height: 40px;margin-bottom: 15px;margin-left: 10px;"
              >导出相片</el-button>
            </el-form-item>
            <el-form-item label="卡号：" prop="icCard">
              <el-input v-model="form.icCard" placeholder="请输入卡号"></el-input>
            </el-form-item>
            <el-form-item label="工号：" prop="jobNo">
              <el-input v-model="form.jobNo" placeholder="请输入卡号"></el-input>
            </el-form-item>
            <el-form-item label="教研组：" prop="teacherGroupName">
              <!-- <el-select @change="teacherGroupCheck" v-model="teacherGroupName" placeholder="请选择组"> -->
              <el-select
                @change="teacherGroupCheck"
                v-model="form.teacherGroupRelationOut.teacherGroupName"
                placeholder="请选择组"
              >
                <el-option
                  v-for="(item,index) in teacherGroupOptions"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <!-- <el-select v-model="form.enteryear" placeholder="请选择组">teacherGroupOptions
                <el-option label="数学组" value="1"></el-option>
                <el-option label="语文组" value="2"></el-option>
              </el-select>-->
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="职位顺序：" prop="orderId">
              <el-input v-model="form.orderId" placeholder></el-input>
            </el-form-item>
            <el-form-item label="角色：" prop="roleStatus">
              <el-input v-model="form.roleStatus" style="display:none"></el-input>
              <el-tag
                v-if="InfoObj.worker != true"
                v-for="tag in RroleTags"
                :key="tag.id"
                style="margin-right:5px"
                closable
                @close="tagClose2(tag)"
              >{{tag.roleName}}</el-tag>
              <el-tag
                v-if="InfoObj.worker"
                v-for="tag in RroleTags"
                :key="tag.id"
                style="margin-right:5px"
                @close="tagClose2(tag)"
              >{{tag.roleName}}</el-tag>
              <el-button type="primary" style="width:80px;" @click="selectRole()">选择</el-button>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
              <el-radio-group v-model="form.sex" @change="sexChange">
                <el-radio
                  v-for="(item,index) in Dictionary.Sex"
                  :key="index"
                  :label="item.val"
                >{{item.label}}</el-radio>
                <!-- <el-radio :label="'女'">女</el-radio> -->
              </el-radio-group>
            </el-form-item>
            <el-form-item label="住址：" prop="adress">
              <el-input v-model="form.adress" placeholder></el-input>
            </el-form-item>
            <el-form-item label="移动电话：" prop="mobile">
              <el-input v-model="form.mobile" placeholder></el-input>
            </el-form-item>
            <!-- <el-form-item label="学年：">
              <el-select v-model="form.schoolYearId" placeholder="请选择学年" @change="SchoolYearChange">
                <el-option
                  v-for="item in Dictionary.SchoolYearOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属年级：">
              <el-select v-model="form.grade" placeholder="请选择年级">
                <el-option-group>
                  <el-option
                    v-for="(item,index) in gradeOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-option-group>
              </el-select>
            </el-form-item>-->
            <el-form-item label="证件类型：" prop="idCardType">
              <el-select v-model="form.idCardType" placeholder="请选择证件类型">
                <el-option
                  v-for="item in Dictionary.CredentialsType"
                  :key="item.val"
                  :label="item.label"
                  :value="item.val"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="身份证件号：" prop="idCard">
              <el-input v-model="form.idCard" placeholder></el-input>
            </el-form-item>
            <el-form-item label="民族：" prop="mz">
              <!-- <el-input v-model="form.mz" placeholder=""></el-input> -->
              <el-select v-model="form.mz" placeholder="请选择民族">
                <el-option
                  v-for="(item,index) in Dictionary.Nation"
                  :key="index"
                  :label="item.label"
                  :value="item.val"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职务：">
              <el-select
                v-model="positionValue"
                @change="positionCheck"
                multiple
                placeholder="请选择职务"
              >
                <el-option
                  v-for="(item,index) in PositionOptions"
                  :key="index"
                  :label="item.positionName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门：">
              <el-select
                v-model="departmentValue"
                multiple
                @change="departmentCheck"
                placeholder="请选择部门"
              >
                <el-option
                  v-for="(item,index) in departmentOptions"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="办公电话：" prop="officeTel">
              <el-input v-model="form.officeTel" placeholder></el-input>
            </el-form-item>
            <el-form-item label="政治面貌：" prop="zzmm">
              <el-select v-model="form.teacherDetailIn.zzmm" placeholder="请选择政治面貌">
                <el-option
                  v-for="(item,index) in Dictionary.PoliticalStatus"
                  :key="index"
                  :label="item.label"
                  :value="item.val"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="家庭电话：" prop="homeTel">
              <el-input v-model="form.homeTel" placeholder></el-input>
            </el-form-item>
            <el-form-item label="E-mail：" prop="email">
              <el-input v-model="form.email" placeholder></el-input>
            </el-form-item>
            <el-form-item label="QQ：" prop="qq">
              <el-input v-model="form.qq" placeholder></el-input>
            </el-form-item>
            <el-form-item label="籍贯：" prop="jg">
              <el-input v-model="form.jg" placeholder></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="state">
              <el-radio-group v-model="form.state">
                <el-radio
                  v-for="(item,index) in Dictionary.TeacherType"
                  :key="index"
                  :label="item.val"
                >{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item label="备注：" class="WidthMax" prop="remark">
              <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>-->
          </div>
          <div class="inputGroup" v-if="step==2">
            <el-form-item label="参加工作年月：" prop="cjgzny">
              <el-date-picker
                v-model="form.teacherDetailIn.cjgzny"
                type="month"
                value-format="yyyyMM"
                @change="getDate"
                placeholder="选择参加工作年月"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="婚姻状况：" prop="hyzk">
              <el-radio-group v-model="form.teacherDetailIn.hyzk">
                <el-radio
                  v-for="(item,index) in Dictionary.MaritalStatus"
                  :key="index"
                  :label="item.val"
                >{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="进本校年月：" prop="jbxny">
              <el-date-picker
                v-model="form.teacherDetailIn.jbxny"
                type="month"
                @change="getDate"
                value-format="yyyyMM"
                placeholder="选择进校年月"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="健康状况：" prop="jkzk">
              <el-radio-group v-model="form.teacherDetailIn.jkzk">
                <el-radio
                  v-for="(item,index) in Dictionary.HealthStatus"
                  :key="index"
                  :label="item.val"
                >{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="现任岗位类别：" prop="xrzyjszw">
              <el-select v-model="form.teacherDetailIn.xrzyjszw" placeholder="请选择现任岗位">
                <el-option
                  v-for="(item,index) in Dictionary.Formation"
                  :key="index"
                  :label="item.label"
                  :value="item.val"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="最高学历：" prop="zgxl">
              <el-select v-model="form.teacherDetailIn.zgxl" placeholder="请选择最高学历">
                <el-option
                  v-for="(item,index) in Dictionary.Schooling"
                  :key="index"
                  :label="item.label"
                  :value="item.val"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="现任专业技术职务：" prop="xrgwlb">
              <el-select v-model="form.teacherDetailIn.xrgwlb" placeholder="请选择现任专业技术职务">
                <el-option
                  v-for="(item,index) in Dictionary.Specialty"
                  :key="index"
                  :label="item.label"
                  :value="item.val"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="获得最高学历的院校或机构：" prop="hdzgxldyx">
              <el-input v-model="form.teacherDetailIn.hdzgxldyx" placeholder></el-input>
            </el-form-item>
            <el-form-item label="最高学位层次：" prop="zgxwmc">
              <el-select v-model="form.teacherDetailIn.zgxwmc" placeholder="请选择最高学位层次">
                <el-option
                  v-for="(item,index) in Dictionary.AcademicDegree"
                  :key="index"
                  :label="item.label"
                  :value="item.val"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否全日制师范专业毕业：" prop="sfqrzsfzyby">
              <el-radio-group v-model="form.teacherDetailIn.sfqrzsfzyby">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'0'">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否有特殊教育从业证书：" prop="sfytsjycyzs">
              <el-radio-group v-model="form.teacherDetailIn.sfytsjycyzs">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'0'">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否受过特教专业培养培训：" prop="sfsgtjzypypx">
              <el-radio-group v-model="form.teacherDetailIn.sfsgtjzypypx">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'0'">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否是特级教师：" prop="sfstjjs">
              <el-radio-group v-model="form.teacherDetailIn.sfstjjs">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'0'">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否县级及以上骨干教师：" prop="sfxjjysggjs">
              <el-radio-group v-model="form.teacherDetailIn.sfxjjysggjs">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'0'">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否心里健康教育教师：" prop="ssfxljkjyjs">
              <el-radio-group v-model="form.teacherDetailIn.ssfxljkjyjs">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'0'">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-form>
      </main>
      <el-dialog
        width="60%"
        title="角色"
        :visible.sync="innerVisible"
        :close-on-click-modal="false"
        append-to-body
      >
        <main class="form">
          <div style="margin-bottom:10px;">
            <el-input
              placeholder="请输入角色"
              v-model="form.RName"
              clearable
              @change=" searchRole(form.RName)"
            ></el-input>
            <!-- <el-button type="primary" @click="search" style="float:right">搜索</el-button> -->
          </div>
          <div class="tag" style="margin-bottom:20px">
            <el-tag
              style="margin-right:5px"
              v-for="tag in roleTags"
              :key="tag.id"
              closable
              @close="tagClose(tag)"
            >{{tag.roleName}}</el-tag>
            <el-button style="float:right" v-if="roleTags.length" type="text" @click="clear()">清空</el-button>
          </div>
          <el-table
            :data="tableObj"
            ref="multipleTable"
            border
            stripe
            :header-cell-style="{textAlign:'center',background:'#EEEEEE'}"
            :cell-style="{textAlign:'center',color:'#606266',padding:'4px 0'}"
            @select="handleSelectionChange"
            @select-all="handleSelectionChange"
          >
            <el-table-column :show-overflow-tooltip="true" type="selection" width="55"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="角色名称" prop="roleName"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="角色描述" prop="remark"></el-table-column>
          </el-table>
        </main>
        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button @click="cancel()">取 消</el-button>
          <el-button type="primary" @click="confirmRole()">确 定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer" v-if="!Info">
        <el-button type="primary" v-if="step==2" @click="back">上一步</el-button>
        <el-button type="primary" @click="Save">确 定</el-button>
      </div>
    </el-dialog>
  </main>
</template>
<script>
import {
  teacherInfo,
  TeacherSaveOrUpdate,
  GradeList,
  DepartmentPage,
  RolePage,
  PositionPage,
  TeacherGroupPage
} from "^/api/api";
import { setTimeout } from "timers";
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
      positionValue: [],
      departmentValue: [],
      teacherGroupValue: [],
      departmentValueList: [],
      positionValueList: [],
      dialogVisible: false,
      innerVisible: false,
      step: 1,
      imageUrl: "",
      teacherGroupName: "",
      form: {
        sex: 1,
        state: 1,
        teacherDetailIn: {
          hyzk: 90,
          jkzk: 1,
          sfqrzsfzyby: "0",
          sfytsjycyzs: "0",
          sfsgtjzypypx: "0",
          sfstjjs: "0",
          sfxjjysggjs: "0",
          ssfxljkjyjs: "0"
        },
        teacherGroupRelationOut: { teacherGroupName: "" },
        teacherGroupIds: [], //教研组
        departmentIds: [], //部门
        positionIds: [], //职位
        roleIdList: [], //角色
        roleStatus: ""
      },
      tableObj: [],
      roleTags: [],
      RroleTags: [],
      departmentOptions: [],
      PositionOptions: [],
      teacherGroupOptions: []
    };
  },
  watch: {
    innerVisible(val) {
      if (val) {
        [...this.roleTags] = this.RroleTags;
        // console.log('roleTags',this.roleTags,'RroleTags',this.RroleTags)
        var that = this;
        that.tableObj.map((item, index) => {
          that.roleTags.map(list => {
            if (list.roleId == item.id) {
              console.log("item", item);
              that.$nextTick(() => {
                that.$refs.multipleTable.toggleRowSelection(item);
              });
            }
          });
        });
      }
    },
    Show(val) {
      this.dialogVisible = val;
    },
    Edit(val) {
      if (val) {
        this.init();
      }
    }
  },
  mounted() {
    TeacherGroupPage({}).then(res => {
      this.teacherGroupOptions = res.data.data.data;
    });
    // 获取角色列表
    RolePage().then(res => {
      this.tableObj = res.data.data.data;
      this.checkRole();
    });
    DepartmentPage({}).then(res => {
      res.data.data.data.map(item => {
        this.departmentOptions.push({ id: item.id, name: item.name });
      });
    });
    PositionPage({}).then(res => {
      // this.PositionOptions = res.data.data.data;
      res.data.data.data.map(item => {
        this.PositionOptions.push({
          id: item.id,
          name: item.name,
          positionName: item.positionName
        });
      });
    });
  },
  methods: {
    teacherGroupCheck(val) {
      this.form.teacherGroupIds = [val];
    },
    positionCheck(val) {
      this.positionValueList = val;
    },
    departmentCheck(val) {
      this.departmentValueList = val;
    },
    handleSelectionChange(row) {
      // this.roleTags = row;
      this.roleTags = [];
      row.map(item => {
        this.roleTags.push({
          roleId: item.id,
          id: item.id,
          roleName: item.roleName
        });
      });
      console.log("handleSelectionChange", this.roleTags);
    },
    selectRole() {
      this.innerVisible = true;
      this.checkRole();
    },
    confirmRole() {
      this.form.roleIdList = [];
      [...this.RroleTags] = this.roleTags;
      this.RroleTags.map(item => {
        this.form.roleIdList.push(item.roleId);
      });
      console.log(this.RroleTags);
      this.innerVisible = false;
    },
    checkRole() {
      var that = this;
      this.roleTags.map(item => {});
      this.tableObj.map((item, index) => {
        this.roleTags.map(list => {
          if (list.roleId == item.id) {
            this.$nextTick(() => {
              that.$refs.multipleTable.toggleRowSelection(item);
            });
          }
        });
      });
    },
    tagClose(val) {
      var that = this;
      this.roleTags.splice(this.roleTags.indexOf(val), 1);
      this.tableObj.map((item, index) => {
        if (val.roleId == item.id) {
          this.$nextTick(() => {
            that.$refs.multipleTable.toggleRowSelection(item);
          });
        }
      });
      if (this.roleTags.length == 0) {
        this.$refs.multipleTable.clearSelection();
      }
    },
    tagClose2(val) {
      this.RroleTags.splice(this.RroleTags.indexOf(val), 1);
      this.form.roleIdList = [];
      this.RroleTags.map(item => {
        this.form.roleIdList.push(item.id);
      });
      // console.log(this.RroleTags,'this.form.roleIdList',this.form.roleIdList)
    },
    clear() {
      this.roleTags = [];
      this.$refs.multipleTable.clearSelection();
    },
    back() {
      if (this.step == 3) {
        this.step = 2;
      } else if (this.step == 2) {
        this.step = 1;
      }
    },
    searchRole(val) {
      // 获取角色列表
      RolePage({
        roleName: val
      }).then(res => {
        this.tableObj = res.data.data.data;
        // console.log("this.tableObj", this.tableObj);
        this.checkRole();
      });
    },
    init() {
      var that = this;
      teacherInfo({
        teacherId: this.InfoObj.worker
          ? this.InfoObj.teacherId
          : this.InfoObj.id
      }).then(res => {
        if (res.data.data == "") {
          this.RroleTags = [];
        }
        this.form = res.data.data;
        this.form.roleIdList = [];
        this.RroleTags = this.form.userRoleExList;
        this.imageUrl = this.form.faceImg;
        this.$set(this.form, "teacherDetailIn", this.form.teacherDetail);
        if (that.form.teacherGroupRelationOut == null) {
          that.$set(that.form, "teacherGroupRelationOut", {
            teacherGroupName: ""
          });
        } else {
          that.form.teacherGroupIds = [that.form.teacherGroupRelationOut.id];
        }

        this.form.userRoleExList.map(item => {
          this.form.roleIdList.push(item.id);
        });
        //console.log('this.form.roleIdList',this.form.roleIdList)
        this.form.teacherPositionExList.map(item => {
          this.positionValueList.push(item.positionId);
          this.positionValue.push(item.positionId);
        });
        this.form.departmentTeacherOutList.map(item => {
          this.departmentValueList.push(item.departmentId);
          this.departmentValue.push(item.departmentId);
        });
      });
    },
    getDate(val) {
      // console.log(val);
    },
    sexChange(val) {
      // console.log(val);
    },
    Save() {
      if (this.form.roleIdList.length != 0) {
        this.$set(this.form, "roleStatus", 1);
      } else {
        this.$set(this.form, "roleStatus", "");
      }
      if (this.step == 1) {
        // console.log(this.form.roleIdList)
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.step = 2;
            this.$refs["form"].clearValidate();
          } else {
            return false;
          }
        });
      } else if (this.step == 2) {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.$loadingRes("执行中");
            this.form.positionIds = this.positionValueList;
            this.form.departmentIds = this.departmentValueList;
            TeacherSaveOrUpdate(this.form).then(res => {
              this.$loadingRes().close();
              this.closeDialog();
            });
          } else {
            return false;
          }
        });
      }
    },
    cancel() {
      this.innerVisible = false;
      this.roleTags = [];
      this.$refs.multipleTable.clearSelection();
    },
    closeDialog() {
      this.$emit("update:show", false);
      this.$emit("update:edit", false);
      this.$emit("update:info", false);
      this.$emit("Update");
      this.step = 1;
      this.form = {
        sex: 1,
        state: 1,
        teacherGroupRelationOut: {
          teacherGroupName: ""
        },
        teacherDetailIn: {
          hyzk: "90",
          jkzk: "1",
          sfqrzsfzyby: "0",
          sfytsjycyzs: "0",
          sfsgtjzypypx: "0",
          sfstjjs: "0",
          sfxjjysggjs: "0",
          ssfxljkjyjs: "0"
        },
        teacherGroupIds: [], //教研组
        departmentIds: [], //部门
        positionIds: [], //职位
        roleIdList: [] //角色
      };
      this.roleTags = [],
      this.RroleTags = [],
      this.positionValue = [];
      this.departmentValue = [];
      this.teacherGroupValue = [];
      this.departmentValueList = [];
      this.positionValueList = [];
    },
    exportPhoto() {},
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.faceImg = res.data.url;
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
      // return isJPG && isLt2M;
    }
  }
};
</script>

<style lang='scss'>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
@import "&/scss/DiaLog.scss";
</style>

