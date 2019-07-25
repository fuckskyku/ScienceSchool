var verify = {
  idCard: (rule, value, callback) => {
    if (!value) {
      return callback(new Error("请输入身份证号码"));
    } else if (
      !value.match(
        /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
      )
    ) {
      return callback(new Error("请输入正确的身份证号码!"));
    } else {
      callback();
    }
    // if (
    //   value &&
    //   !value.match(
    //     /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
    //   )
    // ) {
    //   return callback(new Error("请输入正确的身份证号码!"));
    // } else {
    //   callback();
    // }
  },
  tel: (rule, value, callback) => {
    if (!value) {
      return callback(new Error("请输入移动号码"));
    } else if (
      !value.match(
        /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
      )
    ) {
      return callback(new Error("请输入正确的移动号码!"));
    } else {
      callback();
    }
  },
  telFalse: (rule, value, callback) => {
    if (
      value &&
      !value.match(
        /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
      )
    ) {
      return callback(new Error("请输入正确的移动号码!"));
    } else {
      callback();
    }
  },
  email: (rule, value, callback) => {
    if (
      value &&
      !value.match(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)
    ) {
      return callback(new Error("请输入正确的邮箱地址!"));
    } else {
      callback();
    }
  }
};

const Verification = {
  App: {
    name: [{ required: true, message: "请输入应用名称", trigger: "blur" }],
    permissionCode: [{ required: true, message: "请输入权限值", trigger: "blur" }],
    url: [{ required: true, message: "请输入跳转链接", trigger: "blur" }],
    userType: [{ required: true, message: "请选择用户类型", trigger: "blur" }],
    // logLink: [{ required: true, message: "请输入学年名称", trigger: "blur" }],
    logo: [
      {
        required: true,
        validator: (rule, value, callback) => {
          console.log(value)
          if (!value) {
            return callback(new Error("请上传LOGO!"));
          } else {
            callback();
          }
        },
        trigger: "blur"
      }
    ]
  },
  NoApp: {
    name: [{ required: true, message: "请输入应用名称", trigger: "blur" }],
    permissionCode: [{ required: true, message: "请输入权限值", trigger: "blur" }],
    url: [{ required: true, message: "请输入跳转链接", trigger: "blur" }],
    // logLink: [{ required: true, message: "请输入学年名称", trigger: "blur" }],
    logo: [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (!value) {
            return callback(new Error("请上传LOGO!"));
          } else {
            callback();
          }
        },
        trigger: "blur"
      }
    ]
  },
  SchoolInfoConfigVer: {},
  SchoolYearVer: {
    name: [{ required: true, message: "请输入学年名称", trigger: "blur" }],
    workStartDate: [
      { required: true, message: "请选择开始时间", trigger: "change" }
    ],
    workEndDate: [
      { required: true, message: "请选择结束时间", trigger: "change" }
    ],
    firstOpenDate: [
      { required: true, message: "请选择开始时间", trigger: "change" }
    ],
    firstCloseDate: [
      { required: true, message: "请选择结束时间", trigger: "change" }
    ],
    secondOpenDate: [
      { required: true, message: "请选择开始时间", trigger: "change" }
    ],
    secondCloseDate: [
      { required: true, message: "请选择结束时间", trigger: "change" }
    ]
  },
  Subject: {
    subjectCode: [{ required: true, message: "请输入代码", trigger: "blur" }],
    subjectType: [
      { required: true, message: "请选择学科类型", trigger: "change" }
    ],
    subjectChildrenName: [
      { required: true, message: "请输入子学科名称", trigger: "blur" }
    ]
  },
  Class: {
    name: [{ required: true, message: "请输入班级名称", trigger: "blur" }],
    gradeId: [{ required: true, message: "请选择年级", trigger: "change" }],
    studyLength: [{ required: true, message: "请输入学制", trigger: "blur" }],
    enterType: [
      { required: true, message: "请选择入学方式", trigger: "change" }
    ],
    classType: [
      { required: true, message: "请选择班级类型", trigger: "change" }
    ],
    subschoolCode: [
      { required: true, message: "请选择校区", trigger: "change" }
    ]
  },
  Job: {
    positionName: [
      { required: true, message: "请输入职位名称", trigger: "blur" }
    ]
  },
  Department: {
    name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
    parentName: [{ required: true, message: "请选择上级部门", trigger: "blur" }]
  },
  TeacherDepartment: {
    name: [{ required: true, message: "请输入教研组名称", trigger: "blur" }],
    parentName: [{ required: true, message: "请选择上级部门", trigger: "blur" }]
  },
  Teacher: {
    jobNo: [{ required: true, message: "请输入工号", trigger: "blur" }],
    name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    mobile: [{ required: true, validator: verify.tel, trigger: "blur" }],
    // idCard: [{ validator: verify.idCard, trigger: "blur" }],
    // roleIdList: [{ required: true, message: "请选择角色", trigger: "blur" }]
    roleStatus: [{ required: true, message: "请选择角色", trigger: "blur" }]
  },
  Student: {
    studentCode: [{ required: true, message: "请输入学号", trigger: "blur" }],
    xjh: [{ required: true, message: "请输入学籍号", trigger: "blur" }],
    studentId: [{ required: true, message: "请输入学生编号", trigger: "blur" }],
    name: [{ required: true, message: "请输入学生姓名", trigger: "blur" }],
    gradeId: [{ required: true, message: "请选择年级", trigger: "change" }],
    classId: [{ required: true, message: "请选择班级", trigger: "change" }],
    //tel: [{ required: true, validator: verify.tel, trigger: "blur" }],
    mobile: [{ required: true, validator: verify.tel, trigger: "blur" }],
    //idCard: [{ required: true,validator: verify.idCard, trigger: "blur" }],
    idCard2: [{ required: true,validator: verify.idCard, trigger: "blur" }],
    relation: [{ required: true, message: "请选择成员关系", trigger: "change" }],
    parentName: [{ required: true, message: "请输入家属姓名", trigger: "blur" }]
  },
  GradeCurriculum: {
    schoolYearId: [
      { required: true, message: "请选择学年", trigger: "change" }
    ],
    semester: [{ required: true, message: "请选择学期", trigger: "change" }],
    gradeId: [{ required: true, message: "请选择年级", trigger: "change" }],
    subjectId: [{ required: true, message: "请选择科目", trigger: "change" }]
  },
  ClassCurriculum: {
    schoolYearId: [
      { required: true, message: "请选择学年", trigger: "change" }
    ],
    semester: [{ required: true, message: "请选择学期", trigger: "change" }],
    gradeId: [{ required: true, message: "请选择年级", trigger: "change" }],
    classId: [{ required: true, message: "请选择班级", trigger: "change" }],
    subjectId: [{ required: true, message: "请选择课程", trigger: "change" }],
    teacherName: [{ required: true, message: "请选择任课老师", trigger: "blur" }],
    // teacherName: [
    //   {
    //     required: true,
    //     validator: (rule, value, callback) => {
    //       if (!value) {
    //         return callback(new Error("请选择任课老师!"));
    //       } else {
    //         callback();
    //       }
    //     },
    //     trigger: "blur"
    //   }
    // ]
  },
  RoleManagement: {
    roleName: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
  },
  ParentManagement: {
    userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    sex: [{ required: true, message: "请选择性别", trigger: "change" }],
    mobile: [{ required: true, validator: verify.tel, trigger: "blur" }],
    email: [{ validator: verify.email, trigger: "blur" }]
  },
  ParentManagementUser: {
    studentName: [{ required: true, message: "请选择姓名", trigger: "blur" }],
    gx: [{ required: true, message: "请选择关系", trigger: "change" }]
  },
  WorkerManagement: {
    userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    jobNo: [{ required: true, message: "请输入工号", trigger: "blur" }],
    mobile: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
    roleStatus: [{ required: true, message: "请选择角色", trigger: "blur" }]
  },
  SchoolRollChange: {
    name: [{ required: true, message: "请选择学生", trigger: "blur" }],
    zxzt: [{ required: true, message: "请选择在校状态", trigger: "blur" }],
    ydlbm: [{ required: true, message: "请选择异动类型", trigger: "change" }],
    ydrq: [{ required: true, message: "请选择异动日期", trigger: "blur" }]
  },
  ChangePwd: {
    oldPwd: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
    pwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
    rePwd: [{ required: true, message: "请确认密码", trigger: "blur" }],  
  },
  SetEncrypted: {
    question1: [{ required: true, message: "请设置问题1", trigger: "blur" }],
    answer1: [{ required: true, message: "请设置答案1", trigger: "blur" }],
    question2: [{ required: true, message: "请设置问题2", trigger: "blur" }],
    answer2: [{ required: true, message: "请设置答案2", trigger: "blur" }],
    question3: [{ required: true, message: "请设置问题3", trigger: "blur" }],
    answer3: [{ required: true, message: "请设置答案3", trigger: "blur" }]
  },
  isDateLt: function(countTime) {
    return {
      disabledDate(time) {
        return countTime ? time.getTime() < countTime : null;
      }
    };
  },
  isDateGt: function(countTime) {
    return {
      disabledDate(time) {
        return countTime ? time.getTime() > countTime : null;
      }
    };
  }
};

export default Verification;
