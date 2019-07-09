/*
 * File: apiSetting.js
 * Project: scienceschool
 * File Created: Tuesday, 21st May 2019 3:30:59 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Thursday, 4th July 2019 11:39:46 am
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */

import Vue from "vue";
import Store from "../Store/Store";
// import router from '../router'
import axios from "axios";
import Qs from "qs";

import { Loading } from "element-ui";
// import util from '../util/util'
// Vue.use(util);
let _this = new Vue();

let cancel,
  promiseArr = {};
const CancelToken = axios.CancelToken;

axios.defaults.baseURL = "/api";

axios.defaults.headers = {
  "X-Requested-With": "XMLHttpRequest"
};

axios.defaults.withCredentials = true;

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 对请求数据做点什么
    // console.log(config, "请求拦截");
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    console.log(error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    // _this.$loadingRes("加载中");
    console.log(response, response.config.url);
    if (response.data.code == 403) {
      Store.commit("LoginIfShow", false);
      window.location.href = response.data.data;
    } else if (response.data.code == 200) {
      Store.commit("LoginIfShow", true);
      // _this.$loadingRes().close();
      if (response.data) {
        return response;
      }
    } else if (response.data.size) {
      // _this.$loadingRes().close();
      return response;
    } else {
      _this.elInfo(response.data.message, "error");
      _this.$loadingRes().close();
      // alert(response.data.message);
    }
  },
  function(error) {
    // 对响应错误做点什么
    console.log(error);
    return Promise.reject(error);
  }
);
// axios.defaults.timeout = 10000
// var instance = axios.create({
//     baseURL: 'https://some-domain.com/api/',
//     timeout: 1000,
//     headers: {'X-Custom-Header': 'foobar'}
//   });

export default {
  // get请求
  get(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url,
        params: param,
        headers: {
          // Authorization: TOKEN
        },
        cancelToken: new CancelToken(function(c) {
          cancel = c; // 记录当前请求的取消方法
        })
      }).then(res => {
        resolve(res);
      });
    });
  },

  //下载模块接口封装
  getFileDownload(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url,
        data: param,
        headers: {
          // Authorization: TOKEN,
          "Content-Type": "multipart/form-data"
        },
        responseType: "blob",
        cancelToken: new CancelToken(function(c) {
          cancel = c; // 记录当前请求的取消方法
        })
      }).then(res => {
        console.log(res);
        let FileName = decodeURI(
          res.headers["content-disposition"].split(";")[1].split("=")[1]
        );
        var blob = new Blob([res.data], {
          type: res.headers["content-type"]
        });
        var downloadElement = document.createElement("a");
        var href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.href = href;
        downloadElement.download = FileName; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
      });
      // resolve(res);
      // });
    });
  },

  //post请求
  post(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url,
        // transformRequest: [
        //   function(data) {
        //     return data;
        //     // 对 data 进行任意转换处理
        //     // return data;
        //     // return Qs.stringify(data);
        //   }
        // ],
        params: param,
        headers: {
          // Authorization: TOKEN
        },
        cancelToken: new CancelToken(function(c) {
          cancel = c; // 记录当前请求的取消方法
        })
      }).then(res => {
        resolve(res);
      });
    });
  },

  //postJson（）请求
  postJson(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url,
        data: param,
        headers: {
          //  Authorization: TOKEN,
          "Content-Type": "application/json"
        },
        cancelToken: new CancelToken(function(c) {
          cancel = c; // 记录当前请求的取消方法
        })
      }).then(res => {
        resolve(res);
      });
    });
  },

  //文件上传（下载）
  postFileDownload(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url,
        data: param,
        headers: {
          // Authorization: TOKEN,
          "Content-Type": "multipart/form-data"
        },
        responseType: "blob",
        cancelToken: new CancelToken(function(c) {
          cancel = c; // 记录当前请求的取消方法
        })
      }).then(res => {
        let FileName = decodeURI(
          res.headers["content-disposition"].split(";")[1].split("=")[1]
        );
        var blob = new Blob([res.data], {
          type: res.headers["content-type"]
        });
        var downloadElement = document.createElement("a");
        var href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.href = href;
        downloadElement.download = FileName; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
      });
    });
  },

  //文件上传(无下载)
  postFile(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url,
        data: param,
        headers: {
          // Authorization: TOKEN,
          "Content-Type": "multipart/form-data"
        },
        cancelToken: new CancelToken(function(c) {
          cancel = c; // 记录当前请求的取消方法
        })
      }).then(res => {
        resolve(res);
      });
    });
  }
};
