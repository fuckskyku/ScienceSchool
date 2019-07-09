//数据
const AuthorityShow = {
  state: {
    Authority: [
      "sys:app:menu",
      "sys:app:create",
      "sys:app:update",
      "sys:app:delete",

      "sys:setting:menu",
      "sys:log:menu",
      "sys:setting:basic",
      "sys:setting:update",
      "sys:setting:update",
      "sys:setting:class",
      "sys:setting:user",

      "sys:school:menu",
      "sys:school:update",
      "sys:school:principal:update",
      "sys:schoolYear:menu",
      "sys:schoolYear:create",
      "sys:schoolYear:update",
      "sys:schoolYear:delete",
      "sys:schoolYear:valid",
      "sys:classTime:menu",
      "sys:classTime:create",
      "sys:classTime:update",
      "sys:classTime:delete",
      "sys:classTime:valid",
      "sys:subejct:menu",
      "sys:subejct:create",
      "sys:subejct:update",
      "sys:subejct:delete",
      "sys:subejct:valid",
      "sys:grade:menu",
      "sys:class:menu",
      "sys:class:create",
      "sys:class:update",
      "sys:class:delete",
      "sys:class:export",
      "sys:class:import",
      "sys:position:menu",
      "sys:position:create",
      "sys:position:update",
      "sys:position:delete",
      "sys:teacherGroup:menu",
      "sys:teacherGroup:create",
      "sys:teacherGroup:update",
      "sys:teacherGroup:delete",
      "sys:teacherGroup:teacherList",
      "sys:department:menu",
      "sys:department:create",
      "sys:department:update",
      "sys:department:delete",
      "sys:department:teacherList",
      "sys:teacher:menu",
      "sys:teacher:create",
      "sys:teacher:update",
      "sys:teacher:delete",
      "sys:teacher:export",
      "sys:teacher:import",
      "sys:teacher:importImg",
      "sys:teacher:modifyPwd",
      "sys:teacher:info",
      "sys:student:menu",
      "sys:student:create",
      "sys:student:update",
      "sys:student:delete",
      "sys:student:export",
      "sys:student:import",
      "sys:student:importImg",
      "sys:student:modifyPwd",
      "sys:student:info",
      "sys:updateSchoolYear:menu",
      "sys:studentChange:betchChangeMenu",
      "sys:studentChange:change",
      "sys:studentChange:menu",
      "sys:studentChange:delete",
      "sys:gradeSubject:menu",
      "sys:gradeSubject:create",
      "sys:gradeSubject:update",
      "sys:gradeSubject:delete",
      "sys:classSubject:menu",
      "sys:classSubject:create",
      "sys:classSubject:update",
      "sys:classSubject:delete",
      "sys:classSubject:export",
      "sys:classSubject:import",
      "sys:classTime:menu",
      "sys:classTime:create",
      "sys:classTime:update",
      "sys:classTime:delete",
      "sys:classTime:valid",
      "sys:subejctTeacher:menu",
      "sys:subejctTeacher:export",
      "sys:subejctTeacher:import",
      "sys:role:menu",
      "sys:role:create",
      "sys:role:update",
      "sys:role:detail",
      "sys:role:delete",
      "sys:parent:menu",
      "sys:parent:create",
      "sys:parent:update",
      "sys:parent:modifyPwd",
      "sys:parent:valid",
      "sys:parent:export",
      "sys:parent:import",
      "sys:parent:delete",
      "sys:parent:info",
      "sys:studentUser:menu",
      "sys:studentUser:update",
      "sys:studentUser:modifyPwd",
      "sys:studentUser:valid",
      "sys:studentUser:info",
      "sys:teacherUser:menu",
      "sys:teacherUser:update",
      "sys:teacherUser:modifyPwd",
      "sys:teacherUser:valid",
      "sys:teacherUser:info",
      "sys:teacherUser:delete"
    ],
    userAuthority: ""
  },
  //提交方法
  mutations: {
    userAuthority(state, change) {
      state.userAuthority = change;
    }
  },

  actions: {
    setUserAuthority(state, change) {
      state.commit("userAuthority", change);
    }
  }
};

export default AuthorityShow;