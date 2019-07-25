/*
 * File: HelloWorld.vue
 * Project: scienceschool
 * File Created: Tuesday, 21st May 2019 1:34:23 pm
 * Author: LGH (1415684247@QQ.COM)
 * -----
 * Last Modified: Wednesday, 26th June 2019 2:16:24 pm
 * Modified By: LGH (1415684247@QQ.COM>)
 * -----
 * Copyright 2019 - 2019 Your Company, Your Company
 */
<template>
  <main id="Home">
    <transition
      mode="out-in"
      enter-active-class="animated flipInX"
      leave-active-class="animated flipOutX"
    >
      <Header v-show="ScrollShow"></Header>
    </transition>
    <!-- <main id="Home"> -->
    <!-- <el-scrollbar :native="false" id="section"> -->
    <router-view/>
    <!-- </el-scrollbar> -->
    <!-- </main> -->
    <Footer></Footer>
  </main>
</template>
<script>
import Header from "@/Templet/Header";
import Footer from "@/Templet/Footer";
import Home from "@/Index/Home";
export default {
  data() {
    return {
      ScrollShow: true
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    handleScroll(ev) {
      if (
        this.$parent.$el.querySelector(".el-scrollbar__wrap").scrollTop >= 200
      ) {
        this.ScrollShow = false;
      } else {
        this.ScrollShow = true;
      }
      // console.log();
    }
  },
  components: {
    Header,
    Footer,
    Home
  }
};
</script>
<style lang="scss">
@import "&/scss/Index.scss";
</style>

