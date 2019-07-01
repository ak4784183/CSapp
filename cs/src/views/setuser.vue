<template>
  <div class="setbox">
    <mt-field label="邮箱" type="email" v-model="form.email"></mt-field>
    <mt-field label="手机号" type="tel" v-model="form.phone"></mt-field>
    <mt-field label="个性签名" placeholder="填入您的反恐经典语句" type="textarea" rows="4" v-model="form.note"></mt-field>
    <mt-button type="primary" class="setbox_btn1" @click.prevent="setSubmit">提交修改</mt-button>
    <mt-button type="danger" class="setbox_btn2" @click.prevent="backMine">取消修改</mt-button>
  </div>
</template>
<script>
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";
export default {
  name: "setuser",
  data() {
    return {
      form: {
        email: "",
        phone: "",
        note:""
      }
    };
  },
  created() {
    var setname=this.$route.params.name;
    this.$axios
    .get('http://localhost:4000/seeuser/'+setname)
    .then(res=>{
      this.form=res.data.usermessage[0];
    })
    .catch(err=>{
      console.log(err);
    })
  },
  methods: {
    setSubmit(){         
      var updatename=this.$store.state.username;
      var updateData={
        email:this.form.email,
        phone:this.form.phone,
        note:this.form.note
      }
      this.$axios
    .post('http://localhost:4000/seeuser/'+updatename,updateData)
    .then(res=>{
      Toast({
            message: "个人信息修改成功",
            iconClass: 'iconfont icon-icon_set_up',
            duration: 1000
          });
          setTimeout(()=>{
            this.$router.push({
        name:'mine',
        params:{
          name:this.$route.params.name
        }
      })
          },1000)
      
      
    })
    .catch(err=>{
      console.log(err);
    })
    },
    backMine(){
      this.$router.push({
        name:'mine',
        params:{
          name:this.$route.params.name
        }
      })
    }
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
};
</script>
<style>
.setbox .setbox_btn1 {
  float: left;
  margin-left: 15%;
  
}
.setbox .setbox_btn2{
  float: right;
  margin-right: 15%;
}
</style>
