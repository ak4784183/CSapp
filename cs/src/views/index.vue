<template>
  <div class="wrapper">
      <topbar></topbar>
      <section>
        <router-view></router-view>
      </section>
      <navbar></navbar>
  </div>

</template>

<script>
import { Indicator } from 'mint-ui';
import navbar from "@/components/navbar";
import topbar from "@/components/topbar";
export default {
  name: 'index',
  components:{
    navbar:navbar,
    topbar:topbar
  }
}
</script>

<style>
</style>
