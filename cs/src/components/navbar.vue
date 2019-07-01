<template>
  <div id="navbarbox">
    <mt-tabbar>
      <mt-tab-item id="news">
    <img slot="icon" src="../assets/img/news.png" @click="changepage('news')">
    资讯
  </mt-tab-item>
  <mt-tab-item id="home">
    <img slot="icon" src="../assets/img/goods.png" @click="changepage('home1')">
    市场
  </mt-tab-item>
  <mt-tab-item id="goods">
    <img slot="icon" src="../assets/img/home.png" @click="changepage('goods')">
    库存
  </mt-tab-item>
  <mt-tab-item id="mine">
    <img slot="icon" src="../assets/img/mine.png" @click="changepage('mine')">
    我的
  </mt-tab-item>
</mt-tabbar>
  </div>
</template>
<script>
import router from "vue-router";
export default {
  name: "navbar",
  data() {
    return {
      currentstate: 0
    };
  },
  methods: {
    changepage(page){
      this.$router.push({
        name:page,
        params:{
          // name:this.$route.params.name
          // 只有用Store获取才可以解决从news文章直接跳转到别的页面的Bug
          name:this.$store.state.username
        }
      });
    }
  }
};
</script>
<style scoped>
#navbarbox{
  height: 3.45em;
}
</style>
