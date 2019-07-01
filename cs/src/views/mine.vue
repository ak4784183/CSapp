<template>
  <div class="mine_box">
    <mt-cell title="个人头像" id="mine_head">
      <router-link :to="{name:'setheader',params:{name:this.goId}}">
        <img :src="'http://localhost:4000'+userdata.pic" alt="header" class="img_header">
      </router-link>
    </mt-cell>
    <mt-cell title="游戏昵称">
      <span id="mine_name">{{userdata.username}}</span>
    </mt-cell>
    <mt-cell title="手机号码">
      <router-link :to="{name:'setuser',params:{name:this.goId}}">
        <span>{{userdata.phone}}</span>
        <img src="@/assets/img/go.png" alt="go" class="img_go">
      </router-link>
    </mt-cell>
    <mt-cell title="邮箱账号">
      <router-link :to="{name:'setuser',params:{name:this.goId}}">
        <span>{{userdata.email}}</span>
        <img src="@/assets/img/go.png" alt="go" class="img_go">
      </router-link>
    </mt-cell>
    <mt-cell title="个性签名">
      <router-link :to="{name:'setuser',params:{name:this.goId}}">
        <span>{{userdata.note}}</span>
        <img src="@/assets/img/go.png" alt="go" class="img_go">
      </router-link>
    </mt-cell>
    <mt-cell title="修改密码">
      <router-link :to="{name:'changepsd',params:{name:this.$route.params.name}}">
        <img src="@/assets/img/go.png" alt="go" class="img_go">
      </router-link>
    </mt-cell>
    <mt-cell title="您的钱包">      
        <span>{{userdata.money}}元 </span>
        <img src="@/assets/img/money.png" alt="go" class="img_go" @click.prevent="charge">
    </mt-cell>
    <mt-cell>      
        <!-- 单纯的填充 -->
    </mt-cell>
    <mt-button type="danger" id="mine_toLogin" @click.prevent="backlogin">
      <strong>退出</strong>
    </mt-button>
    <mt-popup
  v-model="popupVisible"
  popup-transition="popup-fade">
  <form id="charge" method="post">
    <mt-field label="充值钱包" placeholder="请输入充值数目" id="chargeIpt" type="number" v-model="add" ></mt-field>
    <mt-button type="primary" id="chargeBtn1" @click.prevent="chargeSubmit">充值</mt-button>
    <mt-button type="danger" id="chargeBtn2" @click.prevent="charge">取消</mt-button>
  </form>
</mt-popup>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { Popup } from 'mint-ui';
import Vue from 'vue';
Vue.component(Popup.name, Popup);
import { MessageBox } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  name: "mine",
  created() {
    this.getuserMessage();
  },
  data() {
    return {
      userdata: "",
      goId: this.$route.params.name,
      popupVisible:false,
      add:0
    };
  },
  methods: {
    getuserMessage(){
      var userid = this.$route.params.name;
    this.$axios
      .get("http://localhost:4000/seeuser/" + userid)
      .then(res => {
        // console.log(res.data);
        this.userdata = res.data.usermessage[0];
      })
      .catch(err => {});
    },
    backlogin() {
      MessageBox.confirm("确定退出吗?").then(action => {
        Indicator.open({
          text: "正在退出...",
          spinnerType: "fading-circle"
        });
        this.$store.commit("removeToken");
        this.$store.commit("removeName");
        // 因为作用域的原因，setTimeout里的回调必须用ES6语法,这样才能正确的获取到this
        setTimeout(()=>{
           
          this.$router.push("/login");
        }, 1000);
      });
    },
    charge(){
      this.popupVisible=!this.popupVisible;
    },
    chargeSubmit(){
      var chargename=this.userdata.username;
      var chargeForm={
        money:this.add
      }
      this.$axios.post('http://localhost:4000/addmoney/'+chargename,chargeForm)
      .then(res=>{
        Toast({
            message: "充值成功成功",
            iconClass: 'iconfont icon-chongzhi',
            duration: 1000
          });
        // console.log(res.data.message)
        this.charge();
         this.getuserMessage();
      })
      .catch(err=>{
        console.log(err);
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
  beforeRouteEnter (to, from, next) {
        Indicator.close();
        next();
    }
};
</script>

<style>
.mine_box .img_header {
  margin-top: 0.5em;
  height: 4em;
  width: 4em;
  border-radius: 50%;
  border: 0.5px solid black;
}
.mine_box .img_go {
  width: 1.5em;
}
.mine_box span {
  font-size: 0.9em;
}
#mine_head {
  height: 5em;
}
#mine_head span {
  vertical-align: end;
}
#mine_toLogin {
  width: 30%;
  font-size: 1em;

  height: 2.8em;
  margin: 3em 35% auto;
}
/* 头像 */
#mine_headerImg {
  border-radius: 50%;
}
/* 用户名 */
#mine_name {
  font-weight: bold;
  margin-right: 1em;
  color: black;
}
/* 充值 */
#charge{
  border: 1.5px solid black;
  background-color: rgba(0, 0, 0, 0.05);
  /* border-radius: 0.5em; */
  width: 15em;
  height: 8em;
}
#chargeIpt{
  background-color:  rgba(0, 0, 0, 0);
}
#chargeBtn1{
  float: left;
  margin-top: 1.2em;
  margin-left: 1em;
}
#chargeBtn2{
  float: right;
  margin-top: 1.2em;
  margin-right: 1em;
}
</style>
