<template>
    <div id="goods_box">
         <div class="goods_skin" v-for="buy in goodsData" :key="buy._id">
           <img :src="'http://localhost:4000/'+buy.pic" alt="">
           <div class="goods_name">
             <span style="color:blue;font-weight:bold;">
             饰品:{{buy.skinname}}
             
           </span>
           <span style="color:red;font-weight:bold;">
             价格:{{buy.price}}元
           </span>
            <span style="color:green;font-weight:bold;">
             购买时间:{{buy.updateAt}}
           </span>
           </div>
           <!-- <div class="goods_buy">
             <span style="font-weight:bold;color:green;">饰品详情</span>
         </div> -->
         </div>

         
        
        </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import { type } from 'os';
export default {
  name: 'goods',
  data() {
    return {
      goodsData:""
    }
  },
  created() {
    var goodsName=this.$route.params.name;
    this.$axios
    .get('http://localhost:4000/buy/'+goodsName)
    .then(res=>{
      // console.log(res.data);
      this.goodsData=res.data.goodsmessage;
      for (const key in this.goodsData) {
        // console.log(this.goodsData[key].updateAt)
        this.goodsData[key].updateAt=this.$moment(this.goodsData[key].updateAt).format("YYYY-MM-DD hh:mm:ss")
      }
    })
    .catch(err=>{
      console.log(err);
    })
  },
  beforeRouteEnter (to, from, next) {
        Indicator.close();
        next();
    },
    beforeRouteLeave (to, from, next) {
    Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      setTimeout(()=>{
        next();
      },300)
  }
}
</script>

<style>
#goods_box{
  width: 100%;
  height: 100%;
  
}
#goods_box .goods_skin{
  margin: 0 auto;
  padding-top: 1em;
  width: 95%;
  height: 6em;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  /* border-radius: 0.5em; */
}
#goods_box .goods_skin img{
  width: 7.5em;
  height: 4.8em;
  border-radius: 0.5em;
  float: left;
  box-shadow: 1px 1px 1px #888888; 
}

#goods_box .goods_name{
  float: left;
  width: 63%;
  height: 4em;
  margin-left: 0.6em;
  padding-top: 0.2em;
}
#goods_box .goods_name span{
  display: block;
  font-size: 0.85em;
  width: 100%;
  height: 2em;
  overflow: hidden;
}
#goods_box .goods_buy{
  float: right;
  width: 18%;
  height: 5em;
}
#goods_box .goods_buy span{
  display: block;
  margin: 40% 0 auto;
  font-size: 0.9em;
}
</style>
