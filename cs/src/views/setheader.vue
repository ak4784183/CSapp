<template>
    <div id="setheader">
        <router-link :to="{name:'mine',params:{name:this.$route.params.name}}"><mt-button icon="back" size="small" style="color:black;">返回</mt-button></router-link>
        <div class="div_header">
            <img :src="'http://localhost:4000'+picData.pic" alt="">
        </div>
        <form action="" method="post" id="pic_form">
            <input type="file" ref="headerpic" class="picInput">
            <mt-button type="primary" class="picBtn" @click.prevent="picSubmit"><strong>上传</strong></mt-button>
        </form>
        <!-- <mt-button type="danger" id="header_back" @click.prevent="backmine"><strong>取消</strong></mt-button> -->
    </div>
</template>
<script>
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";
import { setTimeout } from 'timers';
export default {
    name:"setheader",
    data() {
        return {
            picData:""
        }
    },
    created() {
        var picname=this.$route.params.name;
        this.$axios
        .get('http://localhost:4000/setpic/'+picname)
        .then(res=>{
            this.picData=res.data.usermessage[0];
            // console.log(this.picData);
        })
        .catch(err=>{

        })
    },
    methods: {
        picSubmit(){

            if (this.$refs.headerpic.files[0]) {
                
                var username=this.$route.params.name;
            var picID=this.picData._id;
            var picForm=new FormData();
            picForm.append('username',this.picData.username);
            picForm.append('password',this.picData.password);
            picForm.append('eamil',this.picData.eamil);
            picForm.append('phone',this.picData.phone);
            picForm.append('note',this.picData.note);
            picForm.append('pic',this.$refs.headerpic.files[0]);
            this.$axios
            .post('http://localhost:4000/setpic/'+picID,picForm)
            .then(res=>{
                 Toast({
            message: "头像更换成功",
            iconClass: 'iconfont icon-tupian',
            duration:1000
          });
                setTimeout(()=>{ this.$router.push({
                    name:"mine",
                    params:{
                        name:this.$route.params.name
                    }
                });},1000)
               
            })
            .catch(err=>{

            })
            } else {
                alert('请上传您的头像')
            }
            
        }
        // backmine(){
        //     this.$router.push({
        //         name:'mine',
        //         params:{
        //             name:this.$route.name
        //         }
        //     })
        // }
    },
    beforeRouteLeave (to, from, next) {
    Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      setTimeout(()=>{
        next();
      },500)
  },
  beforeRouteEnter(to, from, next) {
    Indicator.close();
    next();
  }
}
</script>
<style>
#setheader {
    width: 100%;    
}
#setheader .div_header{
    width: 8em;
    height: 8em;
    margin: 0 auto;
    margin-top: 20%;
    border-radius: 50%;
    border: 0.5px solid rgba(0,0,0,1);
    box-shadow: 1px 1px 1px #888;
    overflow: hidden;
}
#setheader .div_header img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
#pic_form{
    display: block;
    width: 60%;
    margin: 0 auto;
    height: 5em;
    margin-bottom: 1px;
    margin-top: 30%;
}
#pic_form .picBtn{
    display: block;
    width: 6em;
    height: 2em;
    margin: 0 auto;
    margin-top: 10%;
    
}
#pic_form .picInput{
    display: block;
    width: 100%;
}
/* 返回按钮 */
#header_back{
    display: block;
    display: block;
    width: 6em;
    height: 2em;
    margin: 0 auto;
    margin-top: 6%;
}
</style>
