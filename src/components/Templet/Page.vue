<template>
  <div class="PageDiv">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageObj.pageNo"
      :page-sizes="[10, 20, 40,60,80,100]"
      :page-size="pageObj.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageObj.totalCount"
    ></el-pagination>
  </div>
</template>
<script>
import * as tabApi from "^/api/api";
export default {
  // ['tabObj', 'name', 'type', 'otherType','keywords'],
  props: {
    tabObj: { default: null }, //表格数据
    filterObj: { default: null },
    name: { default: null }, //接口名称
    edit: { default: false } //是否对返回数据进行添加状态控制
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
    filterObj(val) {
      this.pageObj = val;
    },
    tabObj(val) {
      this.$set(this.pageObj, "pageNo", val.pageNo);
      this.$set(this.pageObj, "pageSize", val.pageSize);
      this.$set(this.pageObj, "totalCount", val.totalCount);
      // this.pageNo = val.pageNo;
      // this.pageSize = val.pageSize;
      // this.totalCount = val.totalCount;
      this.tableData = val;
    }
  },
  methods: {
    //分页事件
    handleSizeChange(val) {
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
