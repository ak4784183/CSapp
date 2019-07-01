<template>
  <div id="login_div">
    <mt-header title="请您登录CS饰品网" id="login_top">
      <mt-button slot="right">
        <i>
          <img src="@/assets/img/register.png" alt="图片">
        </i>
      </mt-button>
    </mt-header>
    <section id="loginbox">
      <form action method="post">
        <div class="logindiv">
          <img src="@/assets/img/login.png" alt>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="用户名"
            v-model="data.username"
          >
        </div>
        <div class="passdiv">
          <img src="@/assets/img/password.png" alt>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="密码"
            v-model="data.password"
          >
        </div>

        <router-link to="/register">
          <mt-button type="danger" id="form_toReg">
            <strong>注册</strong>
          </mt-button>
        </router-link>

        <mt-button type="primary" id="form_login" @click.prevent="loginSubmit">
          <strong>登录</strong>
        </mt-button>
      </form>
    </section>
    <mt-tabbar id="login_sure">
      <mt-tab-item id="tab1">
        <span style="font-size:1.2em;color:white;">加入我们</span>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
import { constants } from "crypto";
export default {
  name: "login",
  data() {
    return {
      data: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    loginSubmit() {
      var data = {
        username: this.data.username,
        password: this.data.password
      };
      if (this.data.username == "" && this.data.password == "") {
        MessageBox('登录提示', '用户名或者密码不能为空');
      } else {
        this.$axios
          .post("http://localhost:4000/login", data)
          .then(res => {
            // console.log(res.data.token);

            // 通过返回的状态码决定是否跳转
            if (res.data.status == 404) {
              MessageBox('登录提示', '用户名或者密码输入错误');
            } else {
              Indicator.open({
                text: "正在登录...",
                spinnerType: "fading-circle"
              });
              setTimeout(()=> {
                 var tokenName = res.data.username;
              this.$store.commit("setName", this.data.username);
              this.$store.commit("setToken", res.data.token);
              this.$router.push({
                name: "news",
                params: {
                  name: tokenName
                }
              });
              }, 1500);
             console.log(res.data.backMoney)
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    Indicator.close();
    next();
  }
};
</script>

<style>
#login_div {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
#login_top {
  height: 3em;
}
#loginbox {
  flex: 1;
  background: url(../assets/img/mobile2.jpg) no-repeat;
  background-size: cover;
}
#loginbox form {
  width: 65%;
  margin: 0 auto;
  margin-top: 80%;
}
#loginbox form .logindiv {
  border-radius: 0.3em;

  width: 100%;
  height: 2em;
  border: 0.4px solid black;
  background-color: rgba(255, 255, 255, 0.6);
}
#loginbox form .passdiv {
  border-radius: 0.3em;
  width: 100%;
  height: 2em;
  border: 0.4px solid black;
  margin-top: 2em;
  background-color: rgba(255, 255, 255, 0.6);
}
#loginbox form #username,
#loginbox form #password {
  width: 86%;
  float: right;
  height: 2em;
  border-radius: 0.3em;
  /* border: 0.075em solid black; */
  color: black;
  background-color: rgba(0, 0, 0, 0);
}
#loginbox form img {
  width: 12%;
  float: left;
}
#form_toReg {
  margin-top: 2em;
  width: 35%;
  height: 1.6em;
  float: left;
}
#form_login {
  margin-top: 2em;
  width: 35%;
  height: 1.6em;
  float: right;
}
#form_login strong {
  color: white;
  font-size: 0.9em;
}
#form_toReg strong {
  color: #1e90ff;
  font-size: 0.9em;
}
#login_sure {
  font-weight: bold;
  background-color: black;
}
</style>
