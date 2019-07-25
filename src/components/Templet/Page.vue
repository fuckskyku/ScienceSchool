<template>
  <div class="PageDiv">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageObj.pageNo"
      :page-sizes="[10, 20, 40,60,80,100]"
      :page-size.sync="pageObj.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageObj.totalCount"
    ></el-pagination>
  </div>
</template>
<script>
import * as tabApi from "^/api/api";
export default {
  props: {
    editor: Boolean,
    edit: Boolean,
    tabObj: null,
    filterObj: null,
    name: null,
    // tabObj: { default: null }, //表格数据
    // filterObj: { default: null },
    // name: { default: null }, //接口名称
    // edit: { default: false } //是否对返回数据进行添加状态控制
  },
  data() {
    return {
      // pageNo: 0,
      // pageSize: 0,
      // totalCount: 0,
      pageObj: {},
      tableData: []
    };
  },
  watch: {
    editor(val) {
      if(val) {
        console.log(val);
      }
    },
    Edit(val) {
      console.log(val)
      if(val) {
      }
    },
    filterObj(val) {
      console.log('PagefilterObj',val)
      this.pageObj = '';
      this.pageObj = val;
      this.$set(this.pageObj, "pageNo", val.pageNo);
    },
    tabObj(val) {
      this.$set(this.pageObj, "pageNo", val.pageNo);
      this.$set(
        this.pageObj,
        "pageSize",
        val.pageSize == 10000 ? 10 : val.pageSize
      );
      this.$set(this.pageObj, "totalCount", val.totalCount);
      // this.pageNo = val.pageNo;
      // this.pageSize = val.pageSize;
      // this.totalCount = val.totalCount;
      this.tableData = val;
      console.log("PagetableData",this.tableData)
    }
  },
  methods: {
    //分页事件
    getMessage(val) {
      // alert(val)
      // console.log('PagefilterObj',this.filterObj)
    },
    handleSizeChange(val) {
      console.log("handleSizeChange",val)
      this.filterObj.pageSize = val;
      // console.log(val)
      tabApi[this.name](this.filterObj).then(res => {
        // if (res.data.code == 200) {
        //   if (!this.edit) {
        //     this.tableData = res.data.data;
        //   } else {
        //     res.data.data.data.forEach(item => {
        //       item.editFlag = false;
        //     });
        //     this.tableData = res.data.data;
        //   }
        // console.log(res.data.data)
        this.tableData = res.data.data;
        this.$emit("update:tabObj", this.tableData);
        // }
      });
      this.pageSize = val;
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log("handleCurrentChange",val)
      this.filterObj.pageNo = val;
      tabApi[this.name](this.filterObj).then(res => {
        // if (res.data.code == 200) {
        //   if (!this.edit) {
        //     this.tableData = res.data.data;
        //   } else {
        //     res.data.data.data.forEach(item => {
        //       item.editFlag = false;
        //     });
        //     this.tableData = res.data.data;
        //   }
        // this.tableData = res.data.data
        this.tableData = res.data.data;
        this.$emit("update:tabObj", this.tableData);
        // }
      });
      this.pageNo = val;
      // console.log(`当前页: ${val}`)
    }
  }
};
</script>

<style>
</style>
