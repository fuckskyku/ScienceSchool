//混入使用控制权限
import store from "../Store/Store";

function recurrenceMenu(item, val) {
  if (item) {
    return item.some((item, index, array) => {
      // return item === val;
      //测试使用
      return true;
    });
  }
}

export default {
  data() {
    return {};
  },
  methods: {
    isAuthority(val) {
      // console.log(recurrenceMenu(store.state.Authority.userAuthority, val));
      return recurrenceMenu(store.state.Authority.userAuthority, val);
    }
  }
};
