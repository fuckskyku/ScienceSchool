/*
 * File: NavHome.vue
 * Project: scienceschool
 * File Created: Monday, 3rd June 2019 1:50:53 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Friday, 5th July 2019 1:40:08 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="NavHome" class="MAXWIDTH" :style="{'minHeight':H+'px'}">
    <el-menu
      :router="true"
      :unique-opened="true"
      :default-active="InterfaceState.SettingConfig"
      class="el-menu-vertical-demo"
      background-color="#ECF7FC"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    >
      <el-submenu
        v-for="item in nav"
        :key="item.key"
        :index="item.key"
        v-show="item.children.length"
        v-if="isAuthority(item.authorityKey)"
      >
        <template slot="title" v-if="item.children.length">
          <div>
            <img :src="item.icon" alt style="margin-right:10px;" />
            <span>{{item.title}}</span>
          </div>
        </template>
        <el-menu-item
          v-for="itemChildren in item.children"
          :key="itemChildren.key"
          :index="itemChildren.key"
          v-if="isAuthority(itemChildren.authorityKey)"
        >{{itemChildren.title}}</el-menu-item>
      </el-submenu>
    </el-menu>
    <section class="section">
      <nav>
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="(item,index) in realList?realList:null"
            :to="item.path"
            :key="index"
          >{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>-->
      </nav>
      <main class="content">
        <router-view />
      </main>
    </section>
  </main>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      nav: [
        {
          title: "基础设置",
          key: "1",
          icon: "/static/img/Time.png",
          authorityKey: "sys:setting:basic",
          children: [
            {
              title: "学校信息配置",
              children: [],
              key: "SchoolInfoConfig",
              authorityKey: "sys:school:menu"
            },
            {
              title: "学年设置",
              children: [],
              key: "GradeConfig",
              authorityKey: "sys:schoolYear:menu"
            },
            {
              title: "课程时间设置",
              children: [],
              key: "CurriculumConfig",
              authorityKey: "sys:classTime:menu"
            },
            {
              title: "学科管理",
              children: [],
              key: "SubjectConfig",
              authorityKey: "sys:subejct:menu"
            },
            {
              title: "年级设置",
              children: [],
              key: "GradeSetting",
              authorityKey: "sys:grade:menu"
            },
            {
              title: "班级设置",
              children: [],
              key: "ClassConfig",
              authorityKey: "sys:class:menu"
            },
            {
              title: "职位管理",
              children: [],
              key: "JobConfig",
              authorityKey: "sys:position:menu"
            },
            {
              title: "部门管理",
              children: [],
              key: "DepartmentConfig",
              authorityKey: "sys:department:menu"
            },
            {
              title: "教研组管理",
              children: [],
              key: "TeacherGroupConfig",
              authorityKey: "sys:teacherGroup:menu"
            }
          ]
        },
        {
          title: "升班管理",
          authorityKey: "sys:setting:update",
          icon: "/static/img/goUpClass.png",
          children: [
            {
              title: "年级升级",
              children: [],
              key: "GradeUpgrade",
              authorityKey: "sys:updateSchoolYear:menu"
            },
            {
              title: "批量调班",
              children: [],
              key: "BatchChangeShift",
              authorityKey: "sys:studentChange:betchChangeMenu"
            },
            {
              title: "学籍异动",
              children: [],
              key: "SchoolRollChange",
              authorityKey: "sys:studentChange:menu"
            }
          ],
          key: "2"
        },
        {
          title: "人员管理",
          icon: "/static/img/personnel.png",
          authorityKey: "sys:setting:update",
          children: [
            {
              title: "教师信息管理",
              children: [],
              key: "TeacherInfo",
              authorityKey: "sys:teacher:menu"
            },
            {
              title: "学生信息管理",
              children: [],
              key: "StudentInfo",
              authorityKey: "sys:student:menu"
            }
          ],
          key: "3"
        },
        {
          title: "课程设置",
          key: "4",
          authorityKey: "sys:setting:class",
          icon: "/static/img/curriculum.png",
          children: [
            {
              title: "年级课程设置",
              children: [],
              key: "GradeCurriculum",
              authorityKey: "sys:gradeSubject:menu"
            },
            {
              title: "班级课程设置",
              children: [],
              key: "ClassCurriculum",
              authorityKey: "sys:classSubject:menu"
            },
            {
              title: "课程表",
              children: [],
              key: "Timetable",
              authorityKey: "sys:subejctTeacher:menu"
            }
          ]
        },
        {
          title: "用户与权限",
          key: "5",
          authorityKey: "sys:setting:user",
          icon: "/static/img/User.png",
          children: [
            {
              title: "角色管理",
              children: [],
              key: "RoleManagement",
              authorityKey: "sys:role:menu"
            },
            {
              title: "家长管理",
              children: [],
              key: "ParentsManagement",
              authorityKey: "sys:parent:menu"
            },
            {
              title: "学生管理",
              children: [],
              key: "StudentsManagement",
              authorityKey: "sys:studentUser:menu"
            },
            {
              title: "职工管理",
              children: [],
              key: "WorkerManagement",
              authorityKey: "sys:teacherUser:menu"
            }
          ]
        }
      ],
      H: "",
      realList: this.$route.meta.routeList
    };
  },
  computed: { ...mapState(["InterfaceState"]) },
  created() {
    let H = document.documentElement.clientHeight || document.body.clientHeight;
    // this.H = H - 60 - 231;
    this.H = H - 60 - 142;
    // console.log(this.isAuthority(1))
  },
  methods: {
    ...mapActions(["setSettingConfig"]),
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      // console.log(key,keyPath)
      this.setSettingConfig(key);
    }
  }
};
</script>

<style lang='scss'>
// @import "&/scss/Index.scss";
</style>
