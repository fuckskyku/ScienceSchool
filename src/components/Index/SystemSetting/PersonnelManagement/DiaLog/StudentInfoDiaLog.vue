/*
 * File: AppDiaLog.vue
 * Project: scienceschool
 * File Created: Monday, 27th May 2019 3:48:09 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Friday, 12th July 2019 1:54:09 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="StudentInfoDiaLog">
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
      @close="closeDialog"
    >
      <span slot="title" class="DiaLogTitle">{{Info?'学生信息':Edit?'编辑学生信息':'添加学生信息'}}</span>
      <main class="form">
        <div class="title">
          <span :class="{'active':step==1}" @click="Step(1)">基本信息</span>
          <i>-</i>
          <span :class="{'active':step==2}" @click="Step(2)">家庭情况</span>
          <i>-</i>
          <span :class="{'active':step==3}" @click="Step(3)">个人情况</span>
        </div>
        <el-form
          :model="form"
          ref="form"
          :rules="Verification.Student"
          label-width="120px"
          :disabled="Info"
        >
          <div class="inputGroup" v-if="step==1">
            <el-form-item label="照片：" class="WidthMax">
              <el-upload
                class="avatar-uploader"
                action="/api/file/uploadSingle"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <el-image class="avatar" v-if="imageUrl" :src="imageUrl"></el-image>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-button
                type="primary"
                @click="exportPhoto(form.xjh)"
                style="align-self: flex-end;height: 40px;margin-bottom: 15px;margin-left: 10px;"
              >导出照片</el-button>
              <!-- <a href="http://pic41.nipic.com/20140508/18609517_112216473140_2.jpg" download target="_blank" style="color:#ffffff">导出相片</a> -->
            </el-form-item>
            <el-form-item label="卡号：">
              <el-input v-model="form.icCard" placeholder="请输入卡号"></el-input>
            </el-form-item>
            <el-form-item label="学号：" prop="studentCode">
              <el-input v-model="form.studentCode" placeholder="请输入学号"></el-input>
            </el-form-item>
            <el-form-item label="学籍号：" prop="xjh">
              <el-input v-model="form.xjh" placeholder="请输入学籍号"></el-input>
            </el-form-item>
            <el-form-item label="编号：" prop="studentId">
              <el-input v-model="form.studentId" placeholder="请输入编号"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
              <el-radio
                v-model="form.sex"
                v-for="item in Dictionary.Sex"
                :key="item.val"
                :label="item.val"
              >{{item.label}}</el-radio>
            </el-form-item>
            <el-form-item label="出生日期：">
              <el-date-picker v-model="form.birthDay" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>

            <el-form-item label="校区：" prop="xqh">
              <el-select v-model="form.xqh" placeholder="请选择校区" @change="selCampus">
                <el-option
                  v-for="item in Dictionary.SubSchoolOptions"
                  :label="item.name"
                  :value="item.subschoolCode"
                  :key="item.subschoolCode"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="学年：" prop="schoolYearId">
              <el-select
                v-model="filter.schoolYearId"
                placeholder="请选择学年"
                @change="SchoolYearChange"
              >
                <el-option
                  v-for="item in Dictionary.SchoolYearOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年级：" prop="gradeId">
              <el-select v-model="form.gradeId" placeholder="请选择年级" @change="GradeChange">
                <el-option
                  v-for="item in gradeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班级：" prop="classId">
              <el-select v-model="form.classId" placeholder="请选择班级">
                <el-option
                  v-for="item in classOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件类型：">
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
              <el-input v-model="form.idCard" placeholder="请输入身份证件号"></el-input>
            </el-form-item>
            <el-form-item label="是否住宿：">
              <el-radio v-model="form.isStay" :label="true">是</el-radio>
              <el-radio v-model="form.isStay" :label="false">否</el-radio>
            </el-form-item>
            <el-form-item label="班内编号：">
              <el-input v-model="form.classOrder" placeholder="请输入班内编号"></el-input>
            </el-form-item>
            <el-form-item label="就读方式：">
              <el-select v-model="form.studyType" placeholder="请选择就读方式">
                <el-option
                  v-for="item in Dictionary.StudyMode"
                  :key="item.val"
                  :label="item.label"
                  :value="item.val"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="移动电话：" prop="tel">
              <el-input v-model="form.tel" placeholder="请输入移动电话"></el-input>
            </el-form-item>
            <el-form-item label="QQ：">
              <el-input v-model="form.qq" placeholder="请输入QQ号"></el-input>
            </el-form-item>
            <el-form-item label="入学方式：">
              <el-select v-model="form.enterType" placeholder="请选择入学方式">
                <el-option
                  v-for="item in Dictionary.AdmissionMode"
                  :key="item.val"
                  :label="item.label"
                  :value="item.val"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="来源地区：">
              <el-input v-model="form.card" placeholder="请输入卡号"></el-input>
            </el-form-item>-->
            <el-form-item label="家庭电话：">
              <el-input v-model="form.homeTel" placeholder="请输入家庭电话"></el-input>
            </el-form-item>
            <el-form-item label="家庭住址：">
              <el-input v-model="form.adress" placeholder="请输入地址"></el-input>
            </el-form-item>
            <el-form-item label="个人主页：">
              <el-input v-model="form.webSite" placeholder="请输入主页"></el-input>
            </el-form-item>
            <el-form-item label="E-mail：">
              <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="是否考勤：">
              <el-radio v-model="form.isClock" :label="true">是</el-radio>
              <el-radio v-model="form.isClock" :label="false">否</el-radio>
            </el-form-item>
            <el-form-item label="民族生：">
              <el-radio v-model="form.isNation" :label="true">是</el-radio>
              <el-radio v-model="form.isNation" :label="false">否</el-radio>
            </el-form-item>
            <el-form-item label="不考勤原因" class="WidthMax" v-if="!form.isClock">
              <el-input v-model="form.noclockRemark" placeholder="请输入不考勤原因"></el-input>
            </el-form-item>
          </div>

          <div class="inputGroup" v-if="step==2">
            <div
              class="inputGroup"
              v-for="(studentParentPinList,index) in form.studentParentPinList"
              :key="index"
              v-if="studentParentPinList.rowStatus !='delete'"
            >
              <div class="inputTitle">
                <div class="Title">家庭成员</div>
                <el-button type="text" class="red" v-if="!Info" @click="delParent(index)">删除</el-button>
              </div>
              <el-form-item label="成员姓名：" :prop="'studentParentPinList.'+index+'.parentName'" :rules="Verification.Student.parentName">
                <el-input v-model="studentParentPinList.parentName" placeholder="请输入成员姓名"></el-input>
              </el-form-item>
              <el-form-item label="证件类型：" :prop="'studentParentPinList.'+index+'.idCardType'">
                <el-select v-model="studentParentPinList.idCardType" placeholder="请选择证件类型">
                  <el-option
                    v-for="item in Dictionary.CredentialsType"
                    :key="item.val"
                    :label="item.label"
                    :value="item.val"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="身份证件号："
                :prop="'studentParentPinList.'+index+'.idCard'"
              >
                <el-input v-model="studentParentPinList.idCard" placeholder="请输入证件号"></el-input>
              </el-form-item>
              <el-form-item
                label="性别："
                :prop="'studentParentPinList.'+index+'.sex'"
              >
                <el-radio
                v-model="studentParentPinList.sex"
                v-for="item in Dictionary.Sex"
                :key="item.val"
                :label="item.val"
              >{{item.label}}</el-radio>
              </el-form-item>
              <el-form-item label="成员关系：" :prop="'studentParentPinList.'+index+'.gx'" :rules="Verification.Student.relation">
                <el-select v-model="studentParentPinList.gx" placeholder="请选择关系">
                  <el-option
                    v-for="item in Dictionary.DomesticRelation"
                    :key="item.val"
                    :label="item.label"
                    :value="item.val"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="户籍所在地：" :prop="'studentParentPinList.'+index+'.card'">
                <el-input v-model="studentParentPinList.card" placeholder="请输入户籍所在地"></el-input>
              </el-form-item>-->
              <el-form-item
                label="联系电话："
                :prop="'studentParentPinList.'+index+'.mobile'"
                :rules="Verification.Student.mobile"
              >
                <el-input v-model="studentParentPinList.mobile" placeholder="请输入联系电话"></el-input>
              </el-form-item>
              <el-form-item label="是否监护人：" :prop="'studentParentPinList.'+index+'.isPrimary'">
                <el-radio-group
                  v-model="studentParentPinList.isPrimary"
                  @change="radioChange($event,index)"
                >
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item v-if="!Info">
                <img
                  src="/static/img/add.png"
                  style="width:50px;height:50px;"
                  v-if="form.studentParentPinList.length==index+1"
                  @click="addDomain"
                  alt
                />
              </el-form-item>
            </div>
          </div>

          <div class="inputGroup" v-if="step==3">
            <el-form-item label="是否进城务工人员子女：" label-width="180px">
              <el-radio v-model="form.isCity" :label="true">是</el-radio>
              <el-radio v-model="form.isCity" :label="false">否</el-radio>
            </el-form-item>
            <el-form-item label="是否本地生源：">
              <el-radio v-model="form.isLocal" :label="true">是</el-radio>
              <el-radio v-model="form.isLocal" :label="false">否</el-radio>
            </el-form-item>
            <el-form-item label="曾用名：">
              <el-input v-model="form.cym" placeholder="请输入曾用名"></el-input>
            </el-form-item>
            <el-form-item label="出生地：">
              <el-input v-model="form.birthArea" placeholder="请输入出生地"></el-input>
            </el-form-item>
            <el-form-item label="港澳台侨外：">
              <el-select v-model="form.gatqwm" placeholder="请选择港澳台">
                <el-option
                  v-for="item in Dictionary.GATCode"
                  :key="item.val"
                  :label="item.label"
                  :value="item.val"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="籍贯：">
              <el-input v-model="form.jg" placeholder="请输入籍贯"></el-input>
            </el-form-item>
            <!-- <el-form-item label="国际（国别）：">
              <el-input v-model="form.card" placeholder="请输入卡号"></el-input>
            </el-form-item>-->
            <el-form-item label="健康状况：">
              <el-select v-model="form.jkzkm" placeholder="请选择健康状况">
                <el-option
                  v-for="item in Dictionary.HealthStatus"
                  :key="item.val"
                  :label="item.label"
                  :value="item.val"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="政治面貌：">
              <el-select v-model="form.zzmm" placeholder="请选择政治面貌">
                <el-option
                  v-for="item in Dictionary.PoliticalStatus"
                  :key="item.val"
                  :label="item.label"
                  :value="item.val"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="入团日期：">
              <el-input v-model="form.card" placeholder="请输入卡号"></el-input>
            </el-form-item>
            <el-form-item label="入团介绍人：">
              <el-input v-model="form.card" placeholder="请输入卡号"></el-input>
            </el-form-item>
            <el-form-item label="入党日期：">
              <el-input v-model="form.card" placeholder="请输入卡号"></el-input>
            </el-form-item>
            <el-form-item label="入党介绍人：">
              <el-input v-model="form.card" placeholder="请输入卡号"></el-input>
            </el-form-item>-->
          </div>
        </el-form>
      </main>
      <div slot="footer" class="dialog-footer" v-if="!Info">
        <!-- <el-button type="primary" v-if="step==2||step==3" @click="back">上一步</el-button> -->
        <!-- <el-button type="primary" v-if="step==2" @click="addDomain">添加成员</el-button> -->
        <el-button type="primary" @click="Save">{{step==3?'确 定':'下一步'}}</el-button>
      </div>
    </el-dialog>
  </main>
</template>
<script>
import {
  StudentInfo,
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
      step: 1,
      gradeOptions: [],
      classOptions: [],
      imageUrl: "",
      filter: {
        schoolYearId: this.Dictionary.SchoolYearDefault
      },
      form: {
        xqh: this.Dictionary.SubSchoolNameDefault,
        sex: 1,
        isStay: false,
        isClock: true,
        isNation: false,
        studyType: "1",
        enterType: 0,
        studentParentPinList: [
          {
            sex: 1,
            isPrimary: false
          }
        ]
      }
    };
  },
  watch: {
    Show(val) {
      this.form.enterType = 0,
      this.dialogVisible = val;
      // this.init();
    },
    Edit(val) {
      if (val) {
        this.Infoinit();
        // this.form = this.InfoObj;
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    Infoinit() {
      StudentInfo({ studentId: this.InfoObj.id }).then(res => {
        res.data.data.studentParentOuts.forEach(item => {
          item.rowStatus = "update";
        });
        this.form = res.data.data;
        this.form.enterType = Number(this.form.enterType);
        this.form.xqh = this.form.xqh? this.form.xqh: this.Dictionary.SubSchoolNameDefault;
        this.imageUrl = this.form.faceImg;
        this.filter.schoolYearId = this.form.schoolYearId;
        this.SchoolYearChange(this.form.schoolYearId);
        this.GradeChange(this.form.gradeId);
        if (this.form.studentParentOuts !=""){
          this.$set(
            this.form,
            "studentParentPinList",
            this.form.studentParentOuts
          );
        }else{
          var objList = [{
            isPrimary: this.Info?0:false,
            sex: this.Info?0:1,
          }];
          this.$set(
            this.form,
            "studentParentPinList",
            objList
          );
        }
        console.log("this.form",this.form)
      });
    },
    init() {
      GradeList({
        schoolYearId: this.filter.schoolYearId
      }).then(res => {
        this.gradeOptions = res.data.data;
      });
      // this.$refs["form"].clearValidate();
    },
    Step(type) {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.step = type;
          this.$refs["form"].clearValidate();
        } else {
          return false;
        }
      });
    },
    Save() {
      if (this.step == 1) {
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
            this.step = 3;
            this.$refs["form"].clearValidate();
          } else {
            return false;
          }
        });
      } else {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.$loadingRes("执行中");
            StudentSaveOrUpdate(this.form).then(res => {
              this.$loadingRes().close();
              this.closeDialog();
            });
          } else {
            return false;
          }
        });
      }
    },
    exportPhoto(val) {
      var $Href = this.form.faceImg
      var downloadElement = document.createElement("a");
        downloadElement.href = $Href;
        downloadElement.target = "_blank"
        downloadElement.download = val; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
    },
    back() {
      if (this.step == 3) {
        this.step = 2;
      } else if (this.step == 2) {
        this.step = 1;
      }
    },
    addDomain() {
      console.log('Info',this.Info)
      this.form.studentParentPinList.push({
        sex: 1,
        isPrimary: false,
        rowStatus: "create"
      });
      console.log('studentParentPinList',this.form.studentParentPinList)
    },
    delParent(index) {
      this.form.studentParentPinList[index].rowStatus = "delete";
    },
    selCampus(val) {
      if (!this.Info && !this.Edit) {
        this.$set(this.form, "classId", "");
      }
      this.GradeChange(this.form.gradeId);
    },
    SchoolYearChange(val) {
      if (!this.Info && !this.Edit) {
        this.form.gradeId = "";
        this.form.classId = "";
      }
      GradeList({
        schoolYearId: val
      }).then(res => {
        this.gradeOptions = res.data.data;
      });
    },
    GradeChange(val) {
      if (!this.Info && !this.Edit) {
        this.$set(this.form, "classId", "");
      }
      // this.form.classId = "";
      ClassList({ gradeId: val,subschoolCode:this.form.xqh }).then(res => {
        this.classOptions = res.data.data;
      });
    },
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
    },
    closeDialog() {
      this.$emit("update:show", false);
      this.$emit("update:edit", false);
      this.$emit("update:info", false);
      this.$emit("Update");
      this.step = 1;
      this.form = {
        xqh: this.Dictionary.SubSchoolNameDefault,
        sex: 1,
        isStay: false,
        isClock: true,
        isNation: false,
        studyType: "1",
        enterType: "0",
        studentParentPinList: [{ isPrimary: false,sex:1 }]
      };
    },
    radioChange(val, index) {
      if (val) {
        this.form.studentParentPinList.forEach((item, itemIndex) => {
          if (index != itemIndex) {
            item.isPrimary = false;
          }
        });
      }
      // console.log(val,index);
    }
  }
};
</script>

<style lang='scss'>
@import "&/scss/DiaLog.scss";
</style>

