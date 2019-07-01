<template>
  <div id="changepsdBox">
    <!-- <router-link :to="{name:'mine',params:{name:this.$route.params.name}}"><mt-button icon="back" size="small" style="color:black;">返回</mt-button></router-link> -->
    <form action method="post" style="margin-bottom:3em;">
      <mt-field label="原密码" placeholder="输入原密码" type="password" v-model="form.oldpsd"></mt-field>
      <mt-field label="新密码" placeholder="输入要变更的密码" type="password" v-model="form.newpsd"></mt-field>
      <mt-field label="再次确认" placeholder="再次输入一次新密码" type="password" v-model="form.finish"></mt-field>
    </form>
    <mt-button type="primary" class="psdbox_btn1" @click.prevent="psdSubmit">提交修改</mt-button>
    <mt-button type="danger" class="psdbox_btn2" @click.prevent="backMine1">取消修改</mt-button>
  </div>
</template>
<script>
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";
import { setTimeout } from 'timers';
export default {
  name: "charge",
  data() {
    return {
      form: {
        oldpsd: "",
        newpsd: "",
        finish: ""
      }
    };
  },
  methods: {
    psdSubmit() {
      if (this.form.newpsd == this.form.finish) {
        let obj = {
          findpsd: this.form.oldpsd,
          password: this.form.newpsd
        };
        this.$axios
          .post("http://localhost:4000/changepsd/" + this.$route.params.name, obj)
          .then(res => {
            if (res.data.status == 500) {
              Toast({
                message: "原密码不正确",
                iconClass: "iconfont icon-quxiao",
                duration: 1500
              });
            }else{
                Toast({
                message: "密码修改成功",
                iconClass: "iconfont icon-chenggong",
                duration: 1500
              });
              setTimeout(()=>{
                  this.$router.push({
                      name:"mine",
                      params:{
                          name:this.$route.params.name
                      }
                  })
              },1500)
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        Toast({
          message: "新密码不一致",
          iconClass: "iconfont icon-quxiao",
          duration: 1500
        });
      }
    },
    backMine1() {
      this.$router.push({
        name: "mine",
        params: {
          name: this.$route.params.name
        }
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    Indicator.open({
      text: "加载中...",
      spinnerType: "fading-circle"
    });
    setTimeout(() => {
      next();
    }, 500);
  },
  beforeRouteEnter(to, from, next) {
    Indicator.close();
    next();
  }
};
</script>
<style>
#psdBtn1 {
  width: 4em;
  display: block;
  margin-top: 5px;
  margin: 0 auto;
}
#changepsdBox .psdbox_btn1 {
  float: left;
  margin-left: 15%;
}
#changepsdBox .psdbox_btn2 {
  float: right;
  margin-right: 15%;
}
</style>
