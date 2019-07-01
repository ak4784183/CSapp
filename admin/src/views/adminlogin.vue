<template>
  <div>
    <el-container>
      <el-header>管理员登录<router-link to="/home"><span style="float:right;color:white;"><strong>首页</strong></span>
      </router-link></el-header>
      <el-main>
        <div id="login_box">
          <el-form ref="loginform" :model="loginform" label-width="100px" style="margin-top:100px;">
            <el-form-item label="用户名" style="width:430px;margin-top:30px;">
              <el-input v-model="loginform.username" type="text"></el-input>
            </el-form-item>

            <el-form-item label="密码" style="width:430px;margin-top:30px;margin-bottom:30px;">
              <el-input v-model="loginform.password" type="password"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click.prevent="loginSubmit">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "add",
  data() {
    return {
      loginform: {
        username:"",
        password:""
      }
    };
  },
  methods: {
    loginSubmit() {
     if (this.loginform.username!=""&&this.loginform.password!="") {
          var loginReq={
          username:this.loginform.username,
          password:this.loginform.password
      }
      this.$axios
      .post("http://localhost:4000/login/adminlogin",loginReq)
      .then(res=>{
          if (res.data.status==200) {
              
              this.$store.commit("setAdmin", res.data.token);
              this.$router.push('home');
          }else{
              alert(res.data.LoginError);
          }
      })
      .catch(err=>{
          console.log(err);
      })
     }else{
         alert("请填入完整的登录信息");
     }
    },
    backHome(){
      this.$router.push('/home');
    }
  }
};
</script>
<style>
#login_box {
  width: 30%;
  margin: 0 auto;
}
.el-header {
  background-color: black;
  color: white;
  text-align: center;
  line-height: 60px;
}


.el-main {
  background-color:white;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>