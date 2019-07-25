/*
 * File: util.js
 * Project: scienceschool
 * File Created: Tuesday, 28th May 2019 5:09:41 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Friday, 28th June 2019 4:29:33 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
//引入Form表单字段渲染
import FormObjItem from "./FormItem";

//引入手动数据字典
import Dictionary from "./Dictionary";

//引入表单验证
import Verification from "./Verification";

export default {
  install(Vue, options) {
    Vue.prototype.Dictionary = Dictionary;
    Vue.prototype.FormObjItem = FormObjItem;
    Vue.prototype.Verification = Verification;

    //obj需要的对象，key存储的key，needkey需要那些值，如果不传入则存储整个对象
    Vue.prototype.saveAllLocalStorage = function(obj, key, needkey) {
      var saveObj = {};
      if (needkey) {
        for (const objitem in obj) {
          needkey.forEach((item, index) => {
            if (objitem === item) {
              saveObj[objitem] = obj[objitem];
            }
          });
        }
        window.localStorage.setItem(key, JSON.stringify(saveObj));
      } else {
        window.localStorage.setItem(key, JSON.stringify(obj));
      }
    };

    //存储单个
    Vue.prototype.saveLocalStorage = function(key, vlaue) {
      window.localStorage.setItem(key, vlaue);
    };

    //获取单个
    Vue.prototype.getLocalStorage = function(key) {
      if (window.localStorage.getItem(key) == "undefined") {
        return false;
      } else {
        if (typeof window.localStorage.getItem(key) == "Object") {
          return JSON.parse(window.localStorage.getItem(key));
        } else {
          return window.localStorage.getItem(key);
        }
      }
    };

    //移除单个localStorage
    Vue.prototype.removeItem = function(key) {
      window.localStorage.removeItem(key);
    };

    //移除全部localStorage
    Vue.prototype.clearLocalStorage = function() {
      window.localStorage.clear();
    };

    //重构element加载
    Vue.prototype.$loadingRes = function(str) {
      var login = this.$loading({
        lock: true,
        text: str,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      return login;
    };
    // 删除
    Vue.prototype.OpenDel = function(str, type, fun) {
      this.$confirm(str ? str : "是否删除数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: type
      })
        .then(() => {
          // console.log(fun)
          fun();
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
    };

    //重构TOKEN
    Vue.prototype.getToken = function() {
      if (TOKEN) {
        return {
          Authorization: TOKEN
        };
      }
    };

    //报错提醒设置
    Vue.prototype.elInfo = function(str, type) {
      this.$message({
        message: str,
        type: type
      });
    };

    /**
     *
     *
     * @param {*被处理的对象} obj
     */
    Vue.prototype.tableEdit = function(obj) {
      for (const key in obj) {
        obj[key].edit = false;
        obj[key].addFlag = true;
      }
    };

    /**
     *
     *
     * @param {*需要对比的值} id
     * @param {*需要循环的List} list
     * @param {*需要循环List中对象的name} val
     * @param {*需要返回List中对象的文字值} label
     * @returns
     */
    Vue.prototype.returnSelectVal = function(id, list, val, label) {
      if (id && list && val && label) {
        let indexTemp;
        list.forEach((item, index) => {
          if (item[val] == id) {
            indexTemp = index;
          }
        });
        return list[indexTemp][label];
      } else {
        return null;
      }
    };

    /**
     *使用Js正则获取url参数
     * @param {*需要获取的name} name
     * @returns 返回url参数值
     */
    Vue.prototype.getQueryString = function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };

    /**
     * @param {*标识} id
     * @param {*标识对比的对象key} objKey
     * @param {*对比对象} obj
     * @param {*对比对象所需要的文字值} val
     * @returns 返回一个对象，flag为其中是否有匹配的值，val为转化的文字
     */
    Vue.prototype.transform = function(id, objKey, obj, val) {
      let ObjTemp = { flag: false, val: "" };
      ObjTemp.flag = obj.some((item, index, array) => {
        if (item[objKey] == id) ObjTemp.val = item[val];
        return item[objKey] == id;
      });
      return ObjTemp;
    };

    //后台图片路径配置
    /**
     * @returns 返回一个后台路径配置
     */
    Vue.prototype.imgJoInUrl = function() {
      // return "http://upload.mseenet.com";
      // return "http://test.admin.teacher.ms.com:8095";
      return "http://upload2.mseenet.com";

      // return "http://upload.mseenet.com";
    };

    /**
     *
     *
     * @param {*路由路径} pathName
     * @param {*url参数} obj
     */
    Vue.prototype.skip = function(pathName, obj) {
      this.$router.push({
        name: pathName,
        query: obj
      });
    };
  }
};
