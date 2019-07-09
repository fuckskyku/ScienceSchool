/*
 * File: index.js
 * Project: scienceschool
 * File Created: Tuesday, 21st May 2019 1:34:23 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Tuesday, 25th June 2019 2:15:20 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      redirect: "/Home",
      component: resolve => require(["@/Templet/Index"], resolve),
      children: [
        {path: "/Home", name: "Home", component: resolve => require(["@/Index/Home"], resolve),meta: { title: "首页" }},
        {path: "/ChangePwd", name: "ChangePwd", component: resolve => require(["@/Index/ChangePwd/ChangePwd"], resolve),meta: { title: "修改密码" }},
        {path: "/ApplyManage",name: "ApplyManage",component: resolve => require(["@/Index/ApplyManage/ApplyManage"], resolve),meta: { title: "应用管理" }},
        {path: "/SettingLog",name: "SettingLog",component: resolve => require(["@/Index/SettingLog/SettingLog"], resolve),meta: { title: "系统日志" }},
        {
          path: "/NavHome",
          name: "NavHome",
          redirect: "/SchoolInfoConfig",
          component: resolve => require(["@/Index/SystemSetting/NavHome"], resolve),
          meta: { title: "系统设置" },
          children:[
            {path: "/SchoolInfoConfig", name: "SchoolInfoConfig", component: resolve => require(["@/Index/SystemSetting/Base/SchoolInfoConfig"], resolve),meta: { title: "学校信息配置" }},
            {path: "/GradeConfig", name: "GradeConfig", component: resolve => require(["@/Index/SystemSetting/Base/GradeConfig"], resolve),meta: { title: "学年设置" }},
            {path: "/CurriculumConfig", name: "CurriculumConfig", component: resolve => require(["@/Index/SystemSetting/Base/CurriculumConfig"], resolve),meta: { title: "课程时间设置" }},
            {path: "/SubjectConfig", name: "SubjectConfig", component: resolve => require(["@/Index/SystemSetting/Base/SubjectConfig"], resolve),meta: { title: "学科设置" }},
            {path: "/GradeSetting", name: "GradeSetting", component: resolve => require(["@/Index/SystemSetting/Base/GradeSetting"], resolve),meta: { title: "年级设置" }},
            {path: "/ClassConfig", name: "ClassConfig", component: resolve => require(["@/Index/SystemSetting/Base/ClassConfig"], resolve),meta: { title: "班级设置" }},
            {path: "/JobConfig", name: "JobConfig", component: resolve => require(["@/Index/SystemSetting/Base/JobConfig"], resolve),meta: { title: "职位管理" }},
            {path: "/TeacherGroupConfig", name: "TeacherGroupConfig", component: resolve => require(["@/Index/SystemSetting/Base/TeacherGroupConfig"], resolve),meta: { title: "教研组管理" }},
            {path: "/DepartmentConfig", name: "DepartmentConfig", component: resolve => require(["@/Index/SystemSetting/Base/DepartmentConfig"], resolve),meta: { title: "部门管理" }},
            
            {path: "/GradeUpgrade", name: "GradeUpgrade", component: resolve => require(["@/Index/SystemSetting/PromotedManagement/GradeUpgrade"], resolve),meta: { title: "年级升级" }},
            {path: "/BatchChangeShift", name: "BatchChangeShift", component: resolve => require(["@/Index/SystemSetting/PromotedManagement/BatchChangeShift"], resolve),meta: { title: "批量调班" }},
            {path: "/SchoolRollChange", name: "SchoolRollChange", component: resolve => require(["@/Index/SystemSetting/PromotedManagement/SchoolRollChange"], resolve),meta: { title: "学籍异动" }},
            
            {path: "/TeacherInfo", name: "TeacherInfo", component: resolve => require(["@/Index/SystemSetting/PersonnelManagement/TeacherInfo"], resolve),meta: { title: "教师信息管理" }},
            {path: "/StudentInfo", name: "StudentInfo", component: resolve => require(["@/Index/SystemSetting/PersonnelManagement/StudentInfo"], resolve),meta: { title: "学生信息管理" }},
            {path: "/GradeCurriculum", name: "GradeCurriculum", component: resolve => require(["@/Index/SystemSetting/CurriculumSetting/GradeCurriculum"], resolve),meta: { title: "年级课程设置" }},
            {path: "/ClassCurriculum", name: "ClassCurriculum", component: resolve => require(["@/Index/SystemSetting/CurriculumSetting/ClassCurriculum"], resolve),meta: { title: "班级课程设置" }},
            {path: "/Timetable", name: "Timetable", component: resolve => require(["@/Index/SystemSetting/CurriculumSetting/Timetable"], resolve),meta: { title: "课程表" }},
            {path: "/RoleManagement", name: "RoleManagement", component: resolve => require(["@/Index/SystemSetting/Permission/RoleManagement"], resolve),meta: { title: "角色管理" }},
            {path: "/ParentsManagement", name: "ParentsManagement", component: resolve => require(["@/Index/SystemSetting/Permission/ParentsManagement"], resolve),meta: { title: "家长管理" }},
            {path: "/StudentsManagement", name: "StudentsManagement", component: resolve => require(["@/Index/SystemSetting/Permission/StudentsManagement"], resolve),meta: { title: "学生管理" }},
            {path: "/WorkerManagement", name: "WorkerManagement", component: resolve => require(["@/Index/SystemSetting/Permission/WorkerManagement"], resolve),meta: { title: "职工管理" }},
            
          ]
        }
      ]
    },
    {
      path: "/ForgetPwd", 
      name: "ForgetPwd", 
      component: resolve => require(["@/ForgetPwd/ForgetPwd"], resolve),meta: { title: "忘记密码" },
      children: []
    }
  ]
});
