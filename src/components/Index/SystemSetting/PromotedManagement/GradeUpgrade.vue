/*
 * File: GradeConfig.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 5:05:34 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Wednesday, 19th June 2019 2:29:27 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="GradeUpgrade">
    <div class="PublicTitle">
      <span>年级升级</span>
      <!-- <el-button>编辑</el-button> -->
    </div>
    <section>
      <fieldset class="warp">
        <legend class="title">学年学期升级</legend>
        <div class="schoolYear">
          <p v-if="lastSchoolYear"><span>当前学年</span>：{{lastSchoolYear.name + "学年"}}</p>
          <p v-if="newSchoolYear"><span><i>=></i></span><span>新学年</span>：{{newSchoolYear.name + "学年"}}</p>
        </div>
        <main class="content">
          <p class="tip">1.强烈建议使用数据库自带的备份工具，对数据库进行预先备份；确保升级中不中途退出。</p>
          <p class="tip">2.学年学期升级，所生成的数据不可逆，请管理员选择适当选项后在使用。</p>
          <p class="tip">3.升级前需先创建新学年，并把该学年设置为有效学年。</p>
          <p class="">学年学期升级功能包括：</p>
          <div class="hint">
            <p>a.毕业生自动禁用账号</p>
            <p>b.各年级班级自动升级</p>
            <p>c.保留学年教师任教信息和班主任信息</p>
          </div>
        </main>
      </fieldset>
      <div class="btn" v-if="btnVisibility">
        <el-button type="primary"  @click="save">确认升级</el-button>
      </div>
    </section>
  </main>
</template>

<script>
import { SchoolYearUpgradeSchoolYearInfo, SchoolYearUpgradeSchoolYear } from "^/api/api";
export default {
  inject: ["reload"],
  data() {
    return {
      a: 1,
      type: "Class",
      filter: {},
      btnVisibility: false,
      tableObj: [{}],
      lastSchoolYear: "",
      newSchoolYear: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // this.timeHorizon('08-01 00:00:00','09-01 00:00:00') //设置升级按钮显示时间
      this.timeHorizon('07-01 00:00:00','09-01 00:00:00') //设置升级按钮显示时间
      SchoolYearUpgradeSchoolYearInfo().then(res =>{
        console.log(res.data.data.byLastSchoolYear)
        if(res.data.code == 200) {
          this.lastSchoolYear = res.data.data.byLastSchoolYear
          this.newSchoolYear = res.data.data.byNewSchoolYear
        }
        
      })
    },
    save() {
      this.OpenDel(
        "是否执行学年学期升级？",
        "warning",
        function() {
          SchoolYearUpgradeSchoolYear().then(res =>{
            this.elInfo("升级成功", "success");
            
          })
        }.bind(this)
      );
      
    },
    // 判断时间范围
    timeHorizon(start,end) {
      var timer = new Date();
      var currYear = timer.getFullYear() + '-';
      start = new Date(currYear + start).getTime();//开始时间戳
      end = new Date(currYear + end).getTime();//结束时间戳
      var timestamp = new Date().getTime();//当前时间戳
      if(start <= timestamp && timestamp <= end) {
        this.btnVisibility = true
      }
    },
    toTime(timestamp) {
      //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      timestamp = timestamp + ''
      if(timestamp.length == 10){
        var date = new Date(timestamp * 1000);
      }
      if(timestamp.length == 13){
        var date = new Date(timestamp * 1000 / 1000);
      }
      var Y = date.getFullYear() + "-";
      var M = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) + "-" : date.getMonth() + 1 + "-";
      var D = date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      var h = date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":";
      var m = date.getMinutes() < 10 ? "0" + date.getMinutes() + ":": date.getMinutes() + ":";
      var s = date.getSeconds() < 10 ? "0" + date.getSeconds(): date.getSeconds();
      return Y + M + D + h + m + s;
    }
  },
  components: {
  }
};
</script>

<style>
</style>
