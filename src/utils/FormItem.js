/*
 * File: FormItem.js
 * Project: scienceschool
 * File Created: Wednesday, 5th June 2019 11:20:23 am
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Wednesday, 3rd July 2019 1:53:38 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
const FormObjItem = {
  //首页固定分类
  IndexTabTag: [
    // { label: "最近使用", key: "", val: 0 },
    { label: "学校应用", key: "", val: 1 },
    { label: "市级应用", key: "", val: 2 },
    { label: "省级应用", key: "", val: 3 },
    { label: "国家应用", key: "", val: 4 }
  ],
  //学校信息配置
  SchoolForm: [
    { label: "学校名称：", key: "name", inputShow: true },
    { label: "办学类型：", key: "schoolType", inputShow: false, select: true },
    { label: "附设班：", key: "fusheClass", inputShow: true },

    { label: "学校属性：", key: "schoolAttr", inputShow: false, select: true },
    {
      label: "学校层次：",
      key: "schoolLevel",
      inputShow: false,
      cascader: true
    },
    { label: "行政区划：", key: "area", inputShow: false, select: true },
    { label: "学校地址：", key: "address", inputShow: true },
    { label: "党负责人：", key: "partyHead", inputShow: true },
    // { label: "学校驻地城乡类型：", key: "SchoolName" },
    { label: "学校域名代码：", key: "urlCode", inputShow: true },
    // { label: "学校状态：", key: "SchoolName" },
    { label: "属地行政教育名称：", key: "ownerEduName", inputShow: true },
    { label: "属地行政教育代码：", key: "ownerEduCode", inputShow: true },
    {
      label: "主管教育行政部门名称：",
      key: "ownerDepartment",
      inputShow: true
    },
    {
      label: "主管教育行政部门代码：",
      key: "ownerDepartmentCode",
      inputShow: true
    },
    { label: "创办时间：", key: "createDay", inputShow: false, time: true },
    { label: "学校标识码：", key: "schoolCode", inputShow: true }
  ],
  HeadmasterForm: [
    { label: "校长：", key: "masterName", inputShow: true },
    { label: "校长联系电话：", key: "tel", inputShow: true },
    { label: "校长办公室电话：", key: "fax", inputShow: true }
  ]
  //学年设置
  //   SchoolYearTableHeader: [
  //     { label: "学校名称", key: "SchoolName" },
  //     { label: "工作日开始日", key: "SchoolName" },
  //     { label: "第一学期", key: "SchoolName" },
  //     { label: "第二学区", key: "SchoolName" },
  //     { label: "工作结束日", key: "SchoolName" },
  //     { label: "状态", key: "SchoolName" },
  //     { label: "操作", key: "SchoolName" }
  //   ]
};

export default FormObjItem;
