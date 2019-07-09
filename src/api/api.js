/*
 * File: api.js
 * Project: scienceschool
 * File Created: Tuesday, 21st May 2019 3:30:50 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Monday, 8th July 2019 9:46:21 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */

import req from "./apiSetting";

//一键跳过
// export const skipLogin = param=>{return req.getNo('http://10.10.101.213:8099/api/classTime/list',param)}

// 修改密码
export const UserModifyPw = param=>{return req.post('user/modifyPw',param)}

//校区列表
export const SubSchoolList = param=>{return req.post('subSchool/list',param)}



// export const skipLogin = param=>{return req.get('/classTime/list',param)}
//首页统一账号应用Tab
export const UniformAccountList = param=>{return req.post('index/uniformAccountList',param)}

//首页统一账号APP
export const NonUniformAccountList = param=>{return req.post('index/nonUniformAccountList',param)}


//应用管理-列表
export const AppUniformAccountList = param =>{return req.post('app/uniformAccountList',param)}
//应用管理-添加应用
export const AppSave = param =>{return req.post('app/save',param)}
//应用管理-删除应用 
export const AppDelete = param=>{return req.post('app/delete',param)}
//应用管理-详情
export const AppInfo = param =>{return req.post('app/info',param)}
//应用管理-修改
export const AppUpdate = param=>{return req.post('app/update',param)}



//学校信息配置-详情
export const SchoolSchoolInfo = param =>{return req.post('school/schoolInfo',param)}
//学校信息配置-编辑
export const SchoolEditSchoolInfo = param =>{return req.post('school/editSchoolInfo',param)}

//学年设置-列表
export const SchoolYearPage = param =>{return req.post('schoolYear/page',param)}
//学年设置-是否有效
export const SchoolYearSetIsValid = param =>{return req.post('schoolYear/setIsValid',param)}
//学年下拉列表
export const SchoolYearList = param =>{return req.post('schoolYear/list',param)}
//学年设置-新增
export const SchoolYearSave = param =>{return req.post('schoolYear/save',param)}
//学年设置-编辑
export const SchoolYearUpdate = param =>{return req.post('schoolYear/update',param)}
//学年设置-删除
export const SchoolYearDelete = param =>{return req.post('schoolYear/delete',param)}
//学年设置-详情
export const SchoolYearInfo = param =>{return req.post('schoolYear/info',param)}

//课程时间设置-列表
export const ClassTimeList = param =>{return req.get('classTime/list',param)}
//课程时间设置-删除
export const ClassTimeDelete = param =>{return req.post('classTime/delete',param)}
//课程时间设置-添加修改
export const ClassTimeSaveOrUpdate = param =>{return req.post('classTime/saveOrUpdate',param)}
//课程时间设置-设置有效无效
export const ClassTimeSetValid = param =>{return req.post('classTime/setValid',param)}
//课程时间设置-全部有效
export const ClassTimeSetAllValid = param=>{return req.post('classTime/setAllValid',param)}



//学科管理-列表
export const SubjectPage = param=>{return req.post('subject/page',param)}
//学科管理-下拉列表
export const SubjectList = param =>{return req.post('subject/list',param)}
//学科管理-删除
export const SubjectDelete = param=>{return req.post('subject/delete',param)}
//学科管理-禁用启用
export const SubjectUpdateStatus = param =>{return req.post('subject/updateStatus',param)}
//学科管理-保存和修改
export const SubjectSaveOrUpdate = param=>{return req.post('subject/saveOrUpdate',param)}


//年级设置 -列表
export const GradeList = param=>{return req.post('grade/list',param)}
//年级设置-更新
export const GradeUpdate = param =>{return req.post('grade/update',param)}


//班级设置-列表
export const ClassPage = param=>{return req.post('class/page',param)}
//班级设置-下拉列表
export const ClassList = param=>{return req.post('class/list',param)}
//班级设置-新增
export const ClassSave = param=>{return req.post('class/save',param)}
//班级设置-编辑，更新
export const ClassUpdate =param=>{return req.post('class/update',param)}
//班级设置-删除
export const ClassDelete =param=>{return req.post('class/delete',param)}
//班级设置-导出
export const ClassExportClassData = param=>{return req.getFileDownload('class/exportClassData',param)}


//职位管理-列表
export const PositionPage = param =>{return req.post('position/page',param)}
//职位管理-添加
export const PositionSave = param =>{return req.post('position/save',param)}
//职位管理-编辑
export const PositionUpdate = param =>{return req.post('position/update',param)}
//职位管理-删除
export const PositionDlete = param =>{return req.post('position/delete',param)}


//教研组管理-列表
export const TeacherGroupPage = param =>{return req.post('teacherGroup/page',param)}
//教研组管理-树结构
export const TeacherGroupTeacherGroupTree = param =>{return req.post('teacherGroup/teacherGroupTree',param)}
//教研组管理-编辑
export const TeacherGroupUpdate = param =>{return req.post('teacherGroup/update',param)}
//教研组管理-添加
export const TeacherGroupSave = param =>{return req.post('teacherGroup/save',param)}
//教研组管理-添加人员
export const TeacherGroupSaveTeacherGroupUser = param =>{return req.post('teacherGroup/saveTeacherGroupUser',param)}
//教研组管理-删除组
export const TeacherGroupDelete = param =>{return req.post('teacherGroup/delete',param)}
//教研组管理-删除成员
export const TeacherGroupDelTeacherGroupRelation = param =>{return req.post('teacherGroup/delTeacherGroupRelation',param)}
//教研组管理-相关人员
export const TeacherGroupTeacherGroupUserList = param=>{return req.post('teacherGroup/teacherGroupUserList',param)}



//部门管理-列表
export const DepartmentPage = param =>{return req.post('department/page',param)}
//部门管理-树结构
export const DepartmentDepartmentTree = param =>{return req.post('department/departmentTree',param)}
//部门管理-编辑
export const DepartmentUpdate = param =>{return req.post('department/update',param)}
//部门管理-删除
export const DepartmentDelete = param =>{return req.post('department/delete',param)}
//部门管理-删除成员
export const DepartmentDelDepartmentTeacher = param =>{return req.post('department/delDepartmentTeacher',param)}
//部门管理-设置是否领导
export const DepartmentUpdateIsMaster = param =>{return req.post('department/updateIsMaster',param)}
//部门管理-添加
export const DepartmentSave = param =>{return req.post('department/save',param)}
//部门管理-添加成员
export const DepartmentSaveDepartmentTeacher = param =>{return req.post('department/saveDepartmentTeacher',param)}
//部门管理-相关人员
export const DepartmentDepartmentUserPage = param =>{return req.post('department/departmentUserPage',param)}


//人员管理-教师列表
export const TeacherPage = param=>{return req.get('teacher/page',param)}
//人员管理-教师导出
export const TeacherExportData = param=>{return req.getFileDownload('teacher/exportData',param)}
//人员管理-教师详情
export const teacherInfo = param=>{return req.get('teacher/info',param)}

//人员管理-学生详情
export const StudentInfo = param =>{return req.get('student/info',param)}
//人员管理-学生列表
export const StudentPage = param=>{return req.get('student/page',param)}
//人员管理-学生删除
export const StudentDelete = param=>{return req.post('student/delete',param)}
//人员管理-学生保存
export const StudentSaveOrUpdate = param=>{return req.postJson('student/saveOrUpdate',param)}

//人员管理 学生导出
export const  StudentExportData = param =>{return req.getFileDownload('student/exportData',param)}

//人员管理-教师保存或更新
export const TeacherSaveOrUpdate = param=>{return req.postJson('teacher/saveOrUpdate',param)}

//删除 教师数据
export const TeacherDelete = param=>{return req.post('teacher/delete',param)}

//年级课程设置-列表
export const GradeSubjectPage = param =>{return req.get('gradeSubject/page',param)}
//年级课程设置-详情
export const GradeSubjectInfo = param=>{return req.get('gradeSubject/info',param)}
//年级课程设置-保存-更新
export const GradeSubjectSaveOrUpdate = param=>{return req.post('gradeSubject/saveOrUpdate',param)}
//年级课程设置-删除
export const GradeSubjectDelete = param=>{return req.post('gradeSubject/delete',param)}


//班级课程设置-列表
export const SubjectTeacherPage = param=>{return req.get('subjectTeacher/page',param)}
//班级课程设置-导出
export const SubjectTeacherExportData = param=>{return req.getFileDownload('subjectTeacher/exportData',param)}
//班级课程设置-删除
export const SubjectTeacherDelete = param =>{return req.post('subjectTeacher/delete',param)}
//班级课程设置-保存更新
export const SubjectTeacherSaveOrUpdate = param=>{return req.post('subjectTeacher/saveOrUpdate',param)}



//课程表-列表
export const ClassSubjectList = param=>{return req.get('classSubject/list',param)}
//课程表-更新
export const ClassSubjectSaveOrUpdate = param =>{return req.post('classSubject/saveOrUpdate',param)}
//课程表-导出
export const ClassSubjectExportData = param=>{return req.getFileDownload('classSubject/exportData',param)}



//角色管理-列表
export const RolePage = param=>{return req.get('role/page',param)}
//角色管理-删除
export const RoleDelete = param=>{return req.post('role/delete',param)}
//角色管理-详情
export const RoleInfo = param =>{return req.get('role/info',param)}
//角色管理-权限列表
export const PermissionTreeList = param =>{return req.get('permission/treeList',param)}
//角色管理-角色委派
export const RoleBetchSetTeacherRole = param=>{return req.postJson('role/betchSetTeacherRole',param)}
//角色管理-角色委派详情
export const RoleTeacherRoleList = param=>{return req.get('role/teacherRoleList',param)}
//角色管理-保存更新
export const RoleSaveOrUpdate = param =>{return req.postJson('role/saveOrUpdate',param)}


//家长管理-列表
export const ParentPage = param=>{return req.get('parent/page',param)}
//家长管理-导出
export const ParentExportParentUserData = param=>{return req.getFileDownload('parent/exportParentUserData',param)}
//家长管理-详情
export const ParentInfo = param=>{return req.get('parent/info',param)}
//家长管理-保存-更新
export const ParentSaveOrUpdate = param=>{return req.postJson('parent/saveOrUpdate',param)}
//家长管理-删除
export const ParentDelete = param =>{return req.post('parent/delete',param)}


//用户管理-列表
export const StudentUserPage = param=>{return req.get('student/page',param)}
//职工管理-列表
export const UserTeacherUserPage = param=>{return req.get('user/teacherUserPage',param)}
//职工管理-导出
export const TeacherExportTeacherUserData = param=>{return req.getFileDownload('teacher/exportTeacherUserData',param)}
//用户-删除
export const UserDelete = param=>{return req.post('user/delete',param)}
//用户详情
export const UserInfo = param=>{return req.get('user/info',param)}
//用户 保存或更新
export const UserSaveOrUpdate = param=>{return req.postJson('user/saveOrUpdate',param)}
//用户与权限 启用禁用
export const UserSetValid = param=>{return req.post('user/setValid',param)}

//用户所有权限
export const UserUserPermission = param=>{return req.get('user/userPermission',param)}


//系统日志
export const SystemLogPage = param =>{return req.get('systemLog/page',param)}
//系统日志-应用列表
export const AppLogPage = param =>{return req.get('app/logPage',param)}


// 设置密保
export const PasswordQaCavePasswordQa = param =>{return req.post('passwordQa/savePasswordQa',param)}

// 密保验证
export const PasswordQaCheckPasswordQa = param =>{return req.post('passwordQa/checkPasswordQa',param)}

//查询用户密保问题
export const PasswordQaQaAnswer = param =>{return req.post('passwordQa/qaAnswer',param)}

//检验用户密码是否有修改
export const UserCheckPassword = param =>{return req.post('user/checkPassword',param)}

//通过旧密码修改密码
export const UserModifyPass = param =>{return req.post('user/modifyPass',param)}

//修改密码
export const PasswordQaModifyPw = param =>{return req.post('passwordQa/modifyPw',param)}

//用户名查找用户
export const PasswordQaGetUser = param =>{return req.post('passwordQa/getUser',param)}

// 学生批量移班
export const StudentMoveToOtherClass = param =>{return req.postJson('student/moveToOtherClass',param)}

//用户登出
export const UserLogout = param =>{return req.get('user/logout',param)}

// 获取升学期---两个学期 详情
export const SchoolYearUpgradeSchoolYearInfo = param =>{return req.get('schoolYear/upgradeSchoolYearInfo',param)}

// 升级学年
export const SchoolYearUpgradeSchoolYear = param =>{return req.post('schoolYear/upgradeSchoolYear',param)}

// 分页查询 学籍异动
export const StudentChangePage = param =>{return req.get('studentChange/page',param)}

//学籍异动 查看详情
export const StudentChangeInfo = param =>{return req.get('studentChange/info',param)}

//学籍异动 保存或更新
export const StudentChangeSaveOrUpdate = param =>{return req.post('studentChange/saveOrUpdate',param)}