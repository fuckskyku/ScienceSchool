/*
 * File: FormItem.js
 * Project: scienceschool
 * File Created: Wednesday, 5th June 2019 11:20:23 am
 * Author: LGH {val:1415684247@QQ.COM}
 * -----
 * Last Modified: Monday, 8th July 2019 10:20:50 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */

import {
  SchoolYearList,
  SubSchoolList,
  SubjectList,
  UserUserPermission,
  GradeList,
  ClassList
} from "^/api/api";

import store from "../Store/Store";

const data = {
  //性别类型
  Sex: [{ val: 1, label: "男" }, { val: 2, label: "女" }],

  //学校类型
  SchoolType: [
    { val: "21", label: "小学" },
    { val: "31", label: "普通初中" },
    { val: "34", label: "普通高中" },
    { val: "36", label: "中等职业学校" }
  ],
  //学校性质
  SchoolProperty: [
    { val: "1", label: "公办学校" },
    { val: "2", label: "民办学校" }
  ],

  //证件类型
  CredentialsType: [
    { val: "1", label: "居民身份证" },
    { val: "6", label: "香港特区护照" },
    { val: "7", label: "澳门特区护照" },
    { val: "8", label: "台湾居民往来大陆通行证" },
    { val: "A", label: "护照" },
    { val: "B", label: "户口簿" },
    { val: "Z", label: "其他" }
  ],

  //政治面貌
  PoliticalStatus: [
    { val: "01", label: "中共党员" },
    { val: "02", label: "中共预备党员" },
    { val: "03", label: "共青团员" },
    { val: "04", label: "民革会员" },
    { val: "05", label: "民盟盟员" },
    { val: "06", label: "民建会员" },
    { val: "07", label: "民进会员" },
    { val: "08", label: "农工党党员" },
    { val: "09", label: "致公党党员" },
    { val: "10", label: "九三学社社员" },
    { val: "11", label: "台盟盟员" },
    { val: "12", label: "无党派民主人士" },
    { val: "13", label: "群众" }
  ],

  //编制
  Formation: [
    { val: "1", label: "教师岗位" },
    { val: "2", label: "其他专业技能岗位" },
    { val: "3", label: "管理岗位" },
    { val: "4", label: "工勤技能岗位" }
  ],

  //学历
  Schooling: [
    { val: "0", label: "研究生" },
    { val: "10", label: "大学本科" },
    { val: "20", label: "大学专科和专科学校" },
    { val: "30", label: "中等专业学校或中等技术学校" },
    { val: "40", label: "技工学校" },
    { val: "50", label: "高中" }
  ],

  //班级类别
  ClassType: [
    { val: 0, label: "普通班级" },
    { val: 1, label: "文科班" },
    { val: 2, label: "理科班" }
  ],

  //入学方式
  AdmissionMode: [
    { val: 0, label: "普通入学" },
    { val: 1, label: "民族班" },
    { val: 2, label: "体育特招生" },
    { val: 3, label: "外校转入" },
    { val: 4, label: "恢复入学资格" },
    { val: 5, label: "其他" }
  ],

  //时令
  Season: [{ val: 1, label: "冬令制" }, { val: 2, label: "夏令制" }],

  //时段
  TimeInterval: [
    { val: 1, label: "上午" },
    { val: 2, label: "下午" },
    { val: 3, label: "晚上" }
  ],

  //学科类型
  SubjectType: [{ val: 1, label: "必修" }, { val: 2, label: "选修" }],

  //港澳台侨外码
  GATCode: [
    { val: "01", label: "香港同胞" },
    { val: "03", label: "澳门同胞" },
    { val: "05", label: "台湾同胞" },
    { val: "11", label: "华侨" },
    { val: "12", label: "侨眷" },
    { val: "14", label: "归侨子女" },
    { val: "41", label: "外籍华裔人" },
    { val: "51", label: "外国人" },
    { val: "99", label: "其他" }
  ],

  //学期
  SchoolTerm: [{ val: 1, label: "第一学期" }, { val: 2, label: "第二学期" }],

  //民族
  Nation: [
    { val: "1", label: "汉族" },
    { val: "2", label: "蒙古族" },
    { val: "3", label: "回族" },
    { val: "4", label: "藏族" },
    { val: "5", label: "维吾尔族" },
    { val: "6", label: "苗族" },
    { val: "7", label: "彝族" },
    { val: "8", label: "壮族" },
    { val: "9", label: "布依族" },
    { val: "10", label: "朝鲜族" },
    { val: "11", label: "满族" },
    { val: "12", label: "侗族" },
    { val: "13", label: "瑶族" },
    { val: "14", label: "白族" },
    { val: "15", label: "土家族" },
    { val: "16", label: "哈尼族" },
    { val: "17", label: "哈萨克族" },
    { val: "18", label: "傣族" },
    { val: "19", label: "黎族" },
    { val: "20", label: "傈僳族" },
    { val: "21", label: "佤族" },
    { val: "22", label: "畲族" },
    { val: "23", label: "高山族" },
    { val: "24", label: "拉枯族" },
    { val: "25", label: "水族" },
    { val: "26", label: "东乡族" },
    { val: "27", label: "纳西族" },
    { val: "28", label: "景颇族" },
    { val: "29", label: "柯尔克牧族" },
    { val: "30", label: "土族" },
    { val: "31", label: "达斡尔族" },
    { val: "32", label: "仫佬族" },
    { val: "33", label: "羌族" },
    { val: "34", label: "布朗族" },
    { val: "35", label: "撒拉族" },
    { val: "36", label: "毛南族" },
    { val: "37", label: "仡佬族" },
    { val: "38", label: "锡伯族" },
    { val: "39", label: "阿昌族" },
    { val: "40", label: "普米族" },
    { val: "41", label: "塔吉克族" },
    { val: "42", label: "怒族" },
    { val: "43", label: "乌孜别克族" },
    { val: "44", label: "俄罗斯族" },
    { val: "45", label: "鄂温克族" },
    { val: "46", label: "德昂族" },
    { val: "47", label: "保安族" },
    { val: "48", label: "裕固族" },
    { val: "49", label: "京族" },
    { val: "50", label: "塔塔尔族" },
    { val: "51", label: "独龙族" },
    { val: "52", label: "鄂伦春族" },
    { val: "53", label: "赫哲族" },
    { val: "54", label: "门巴族" },
    { val: "55", label: "珞巴族" },
    { val: "56", label: "基诺族" },
    { val: "57", label: "其他" },
    { val: "58", label: "外国血统" }
  ],

  //教师状态
  TeacherType: [{ val: 1, label: "在职" }, { val: 2, label: "离职/退休" }],

  //婚姻状况
  MaritalStatus: [
    { val: "10", label: "未婚" },
    { val: "20", label: "已婚" },
    { val: "30", label: "丧偶" },
    { val: "40", label: "离婚" },
    { val: "90", label: "未说明的婚姻状况" }
  ],

  //健康状况
  HealthStatus: [
    { val: "1", label: "健康或良好" },
    { val: "2", label: "一般或较弱" },
    { val: "3", label: "有慢性病" },
    { val: "6", label: "残疾" }
  ],

  //就读方式
  StudyMode: [
    { val: "1", label: "统招生(正常入学)" },
    { val: "2", label: "外校生借读本校" },
    { val: "3", label: "本校生借读外校" },
    { val: "4", label: "随班就读" }
  ],

  //最高学位层次
  AcademicDegree: [
    { val: "2", label: "博士" },
    { val: "3", label: "硕士" },
    { val: "4", label: "学士" },
    { val: "0", label: "无" }
  ],

  //专业技术职务
  Specialty: [
    { val: 52, label: "高级教师" },
    { val: 53, label: "一级教师" },
    { val: 54, label: "二级教师" },
    { val: 55, label: "三级教师" }
  ],

  //亲属关系
  DomesticRelation: [
    { val: "1", label: "父" },
    { val: "2", label: "母" },
    { val: "0", label: "其他" }
  ],

  //用户类型
  UserType: [
    { val: "1", label: "教师" },
    { val: "2", label: "家长" },
    { val: "3", label: "学生" }
  ],

  //就读状态
  stateSchool: [{ val: 0, label: "在校" }, { val: 1, label: "离校" }],

  //应用类型
  AppType: [
    { val: "1", label: "学校应用" },
    { val: "2", label: "市级应用" },
    { val: "3", label: "省级应用" },
    { val: "4", label: "国家应用" },
    { val: "5", label: "新OA" },
    { val: "6", label: "旧OA" },
    { val: "7", label: "其他" }
  ],

  //学籍异动类型
  ShiftType: [
    { val: "04", label: "跳级" },
    { val: "11", label: "休学" },
    { val: "12", label: "复学" },
    { val: "13", label: "停学" },
    { val: "17", label: "恢复学籍" },
    { val: "18", label: "取消学籍" },
    { val: "19", label: "保留学籍" },
    { val: "21", label: "转学(输出)" },
    { val: "22", label: "转学(转入)" },
    { val: "29", label: "转班级" },
    { val: "31", label: "退学" },
    { val: "42", label: "开除学籍" },
    { val: "99", label: "其他" }
  ],

  //异动原因
  ShiftCause: [
    { val: "10", label: "疾病" },
    { val: "21", label: "自动退学" },
    { val: "39", label: "其他原因退学" }
  ],

  SchoolYearOptions: [],
  SchoolYearDefault: "",
  SchoolYearNameDefault: "",
  GradeOptions: [],
  ClassOptions: [],
  SubSchoolOptions: [],
  SubjectOptions: [],
  //学年
  DictionaryInit: function() {
    SchoolYearList().then(res => {
      res.data.data.forEach(item => {
        if (item.isValid) {
          data.SchoolYearDefault = item.id;
          data.SchoolYearNameDefault = item.name;
        }
      });
      data.SchoolYearOptions = res.data.data;
    });

    //校区
    SubSchoolList().then(res => {
      data.SubSchoolOptions = res.data.data;
    });

    //学科
    SubjectList().then(res => {
      data.SubjectOptions = res.data.data;
    });

    //用户权限
    UserUserPermission().then(res => {
      store.commit("userAuthority", res.data.data);
    });
  }
};
// console.log(store.state.Authority.Authority);

if (window.location.pathname != "/ForgetPwd") data.DictionaryInit();

export default data;
