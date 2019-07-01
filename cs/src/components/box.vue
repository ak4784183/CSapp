<template>
    <div class="skin_box">
          <img src="@/assets/img/cs/g1.png" alt="">
          <div class="skin_name">
            <span id="span1">$11700</span>
            <span id="span2">AK47|火神</span>
          </div>
          <div class="skin_opera">
            <form action="" method="get">
              <mt-button type="danger" id="skin_btn" style="float:left;" @click="collect()">收藏</mt-button>
              <mt-button type="primary" id="skin_btn" style="float:right;">购买</mt-button>
            </form>
          </div>
        </div>
</template>
<script>
export default {
    name:"box",
    data(){
      return {

      }
    },
    methods:{
      collect(){
        
      }
    }
}
</script>
<style>
#home_skin .skin_box{
  padding-top: 0.5em;
  width: 50%;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
#home_skin .skin_box img{
  width: 80%;
  margin: 0 10% auto;
  border-radius: 0.3em;
}
#home_skin .skin_name {
  
  font-size: 0.85em;
  width: 80%;
  height: 1.5em;
  overflow: hidden;
  margin: 0 auto;
}
#home_skin .skin_name #span1{
  display: block;
  float: left;
  width: 35%;
  height: 1em;
  overflow: hidden;
}
#home_skin .skin_name #span2{
  display: block;
  float: left;
  width: 65%;
  height: 1em;
  overflow: hidden;
  text-align: end;
}
#home_skin .skin_opera{
  display: block;
  width: 80%;
  height: 1em;
  margin: 0 auto;
}
#home_skin .skin_opera #skin_btn{
  font-size: 0.8em;
  height: 2em;
  width: 45%;
}
</style>
