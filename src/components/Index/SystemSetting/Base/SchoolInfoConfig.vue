/*
 * File: SchoolInfoConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 1:55:20 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Thursday, 4th July 2019 5:47:38 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="SchoolInfoConfig">
    <div class="PublicTitle">
      <span>学校信息配置</span>
      <el-button
        type="primary"
        @click="edit"
        v-if="isAuthority('sys:school:update')"
      >{{editFlag?'保存':'编辑'}}</el-button>
    </div>
    <section>
      <div class="el-form-div" v-if="!editFlag">
        <div
          class="el-form-item-div"
          v-for="(item,index) in FormObjItem.SchoolForm"
          :label="item.label"
          :key="index"
        >
          <div class="label-div">{{item.label}}</div>
          <div
            class="input-div"
          >{{item.time?new Date(form[item.key]).format('yyyy-MM-dd'):form[item.key]}}</div>
        </div>
      </div>
      <el-form :model="form" ref="form" label-width="180px" :disabled="false" v-if="editFlag">
        <el-form-item
          v-for="(item,index) in FormObjItem.SchoolForm"
          :label="item.label"
          :key="index"
          :prop="item.key"
        >
          <el-input v-model="form[item.key]" v-if="item.inputShow"></el-input>
          <el-select v-if="item.select" v-model="form[item.key]" placeholder="请选择办学类型">
            <el-option
              v-for="item in item.key=='schoolType'?Dictionary.SchoolType:item.key=='schoolAttr'?Dictionary.SchoolProperty:SchoolClassify"
              :key="item.val"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
          <el-cascader
            v-if="item.cascader"
            size="large"
            :options="regionList"
            v-model="selectedOptions"
            @change="handleChange"
          ></el-cascader>
          <el-date-picker
            v-if="item.time"
            v-model="form[item.key]"
            type="date"
            value-format="timestamp"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </section>
    <div class="PublicTitle">
      <span>校长信息</span>
      <el-button
        @click="editTwo"
        type="primary"
        v-if="isAuthority('sys:school:principal:update')"
      >{{editFlagTwo?'保存':'编辑'}}</el-button>
    </div>
    <section>
      <div class="el-form-div" v-if="!editFlagTwo">
        <div
          class="el-form-item-div"
          v-for="(item,index) in FormObjItem.HeadmasterForm"
          :label="item.label"
          :key="index"
        >
          <div class="label-div">{{item.label}}</div>
          <div class="input-div">{{form[item.key]}}</div>
        </div>
      </div>
      <el-form :model="form" ref="formTwo" label-width="180px" :disabled="false" v-if="editFlagTwo">
        <el-form-item
          v-for="(item,index) in FormObjItem.HeadmasterForm"
          :label="item.label"
          :key="index"
          :prop="item.key"
        >
          <el-input v-model="form[item.key]" v-if="item.key"></el-input>
        </el-form-item>
      </el-form>
    </section>
  </main>
</template>
<script>
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
import { SchoolSchoolInfo, SchoolEditSchoolInfo } from "^/api/api";
export default {
  data() {
    return {
      regionList: regionData,
      selectedOptions: [],
      form: {},
      editFlag: false,
      editFlagTwo: false,
      SchoolClassify: [
        { label: "市教育局直属", value: "350201" },
        { label: "思明区教育局", value: "350203" },
        { label: "海沧区教育局", value: "350205" },
        { label: "湖里区教育局", value: "350206" },
        { label: "集美区教育局", value: "350211" },
        { label: "同安区教育局", value: "350212" },
        { label: "翔安区教育局", value: "350213" }
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      SchoolSchoolInfo().then(res => {
        this.form = res.data.data;
        let tempList = res.data.data.schoolLevel.split(",");
        this.selectedOptions.push(TextToCode[tempList[0]].code);
        this.selectedOptions.push(TextToCode[tempList[0]][tempList[1]].code);
        this.selectedOptions.push(
          TextToCode[tempList[0]][tempList[1]][tempList[2]].code
        );
      });
    },
    onSubmit() {},
    handleChange(val) {
      this.form.schoolLevel =
        CodeToText[val[0]] +
        "," +
        CodeToText[val[1]] +
        "," +
        CodeToText[val[2]];
    },
    edit() {
      if (this.editFlag) {
        this.$loadingRes("执行中");
        SchoolEditSchoolInfo(this.form).then(res => {
          this.editFlag = false;
          // this.elInfo('执行成功','success')
          this.$loadingRes().close();
        });
      } else {
        this.editFlag = true;
      }
    },
    editTwo() {
      if (this.editFlagTwo) {
        this.$loadingRes("执行中");
        SchoolEditSchoolInfo(this.form).then(res => {
          this.editFlagTwo = false;
          this.$loadingRes().close();
        });
      } else {
        this.editFlagTwo = true;
      }
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   if (this.editFlag || this.editFlagTwo) {
  //     this.$confirm("您修改的内容尚未保存，是否保存后再离开该界面?", "提示", {
  //       confirmButtonText: "保存并离开",
  //       cancelButtonText: "直接离开",
  //       closeOnClickModal: false,
  //       closeOnPressEscape: false,
  //       type: "warning"
  //     })
  //       .then(() => {
  //         this.edit();
  //         this.editTwo();
  //         next();
  //       })
  //       .catch(() => {
  //         next();
  //       });
  //   } else {
  //     next();
  //   }
  //   // 导航离开该组件的对应路由时调用
  //   // 可以访问组件实例 `this`
  // }
};
</script>

<style lang='scss'>
// @import "&/scss/Index.scss";
</style>
