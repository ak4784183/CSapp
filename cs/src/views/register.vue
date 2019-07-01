<template>
  <div id="register_div">
    <mt-header title="注册你的账户信息">
      <mt-button slot="left">
        <router-link to="/login" style="color:white;">
          <i>
            <img src="@/assets/img/back.png" alt>
          </i>
        </router-link>
      </mt-button>
    </mt-header>
    <section id="registerbox">
      <form action method="post" id="register_form ">
        <mt-field label="用户名" placeholder="一旦创建不可更改(小于12字符)" v-model="form.username"></mt-field>
        <mt-field label="密码" placeholder="小于16字符" type="password" v-model="form.password"></mt-field>
        <mt-field label="邮箱" placeholder="请填入正确邮箱" type="email" v-model="form.email"></mt-field>
        <mt-field label="手机号" placeholder="请输入正确手机号格式" type="tel" v-model="form.phone"></mt-field>
        <mt-button type="primary" id="form_reg" @click.prevent="regSubmit">
          <strong>确认</strong>
        </mt-button>
      </form>
    </section>
    <mt-tabbar id="register_sure">
      <mt-tab-item id="tab1">
        <span style="font-size:1.2em;color:white;">加入我们</span>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { Toast } from "mint-ui";
import { setTimeout } from 'timers';
export default {
  name: "register",
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
        phone: ""
      }
    };
  },
  methods: {
    regSubmit() {
      //邮箱和手机号的正则表达式
      var regEmail = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
      var regPhone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      var data = {
        username: this.form.username,
        password: this.form.password,
        email: this.form.email,
        phone: this.form.phone
      };

      //验证注册信息是否正确
      if (this.form.username == "" && this.form.password == "") {
        MessageBox('提示', '用户名或者密码不能为空');
        
      } else if (this.form.username.length >= 12) {
        MessageBox('提示', '用户名超过十二字符');
      } else if (this.form.password.length >= 16) {
        MessageBox('提示', '密码超过十六字符');
      } 
      else if (regEmail.test(this.form.email) == false) {
        MessageBox('提示', '邮箱格式错误');
      } else if (regPhone.test(this.form.phone) == false) {
        MessageBox('提示', '手机号格式错误');
      } 
      else {
        this.$axios
          .post("http://localhost:4000/register", data)
          .then(res => {
            // console.log(res.data);
            
            if (res.data.status == 500) {
              Toast({
              message: "用户名已存在",
              iconClass: "iconfont icon-quxiao"
            });
            } else {
              Toast({
              message: "注册成功",
              iconClass: "iconfont icon-zhuce",
              duration:1500
            });
              setTimeout(()=>{
                this.$router.push("login");
              },1500)
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style>
#register_div {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
#registerbox {
  display: flex;
  flex: 1;
  align-items: center;
  background: url(../assets/img/mobile3.jpg) no-repeat;
  background-size: cover;
}
#registerbox form {
  width: 90%;
  margin: auto;
}

#register_sure {
  font-weight: bold;
  background-color: black;
}
#form_reg {
  width: 25%;
  height: 1.6em;
  margin: 20% 35% auto;
  flex: 1;
}
#form_reg strong,
#form_login strong {
  color: white;
  font-size: 0.9em;
}
</style>
