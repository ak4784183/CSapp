<template>
  <div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="market">市场</mt-tab-item>
      <mt-tab-item id="collection">收藏</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="market">
        <div id="searchbox">
          <form action method="get">
            <input type="search" name="search" id="search_input" v-model="value">
            <!-- <button type="submit" id="search_btn">搜索</button> -->
            <mt-button
              type="primary"
              id="search_btn"
              style="float:right;"
              @click.prevent="searchSkin"
            >搜索</mt-button>
          </form>
        </div>
        <div id="home_skin">
          <div class="skin_box" v-for="item in skindata" :key="item._id">
            <img :src="'http://localhost:4000/'+item.pic" alt>
            <div class="skin_name">
              <span id="span1">${{item.price}}</span>
              <span id="span2">{{item.skinname}}</span>
            </div>
            <div class="skin_opera">
              <form action method="get">
                <mt-button
                  type="danger"
                  id="skin_btn"
                  style="float:left;"
                  @click.prevent="collect(item._id)"
                >收藏</mt-button>
                <mt-button
                  type="primary"
                  id="skin_btn"
                  style="float:right;"
                  @click.prevent="buy(item._id,item.price)"
                >购买</mt-button>
              </form>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="collection">
        <div id="collect_box">
          <div class="collect_skin" v-for="collect in collectdata" :key="collect._id">
            <img :src="'http://localhost:4000/'+collect.pic" alt width="100">
            <div class="collect_name">
              <span>饰品:{{collect.skinname}}</span>
              <span>
                价格:
                <strong style="color:red;">{{collect.price}}</strong>
              </span>
            </div>
            <div class="collect_setup">
              <span
                type="danger"
                id="recollect_span"
                style="float:left;"
                @click.prevent="recollect(collect._id)"
              >取消收藏</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { Indicator } from 'mint-ui';
import { setTimeout } from 'timers';
export default {
  name: "home1",
  data() {
    return {
      value: "",
      selected: "market",
      headername: "首页",
      skindata: "",
      collectdata: "",
      money:0
    };
  },
  created() {
    this.getUserMoney();
    this.collectreflash();
    this.reflash();
  },
  computed: {
    
  },
  methods: {
    getUserMoney(){     
      this.$axios
      .get("http://localhost:4000/charge/"+this.$route.params.name)
      .then(res=>{
        this.money=res.data.money;
      })
      .catch(err=>{
        console.log(err);
      })
    },
    reflash() {
      this.$axios
        .get("http://localhost:4000/home")
        .then(res => {
          this.skindata = res.data.skinlist;
          // console.log(this.skindata);
        })
        .catch(err => {
          console.log(err);
        });
    },
    collectreflash() {
      this.$axios
        .get("http://localhost:4000/collection/" + this.$route.params.name)
        .then(res => {
          // console.log("收藏数据："+res.data.skinResult);
          this.collectdata = res.data.skinResult;
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchSkin() {
      var searchSkinValue = this.value;
      this.$axios
        .get("http://localhost:4000/search/" + searchSkinValue)
        .then(res => {
          Toast({
            message: "搜索结果如下",
            iconClass: 'iconfont icon-sousuo',
            duration:1000
          });
          
          setTimeout(()=>{
            this.skindata = "";
            this.skindata = res.data.skinmessage;
          },1000)
        })
        .catch(err => {
          console.log(err);
        });
    },
    collect(skinId) {
      // console.log(skinId);
      var collectname = this.$route.params.name;
      // console.log(collectname);
      var collectList = {
        username: collectname,
        skinId: skinId
      };
      this.$axios
        .post("http://localhost:4000/collection", collectList)
        .then(res => {
          // console.log(res.data.message);
          this.collectreflash();
          Toast({
            message: "收藏成功",
            iconClass: 'iconfont icon-chenggong',
            duration:1500
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    recollect(skinId) {
      var recollectname = this.$route.params.name;
      var recollectList = {
        username: recollectname,
        skinId: skinId
      };
      this.$axios
        .post("http://localhost:4000/recollect", recollectList)
        .then(res => {
          // console.log(res.data.message);
          this.collectreflash();
          Toast({
            message: "取消收藏",
            iconClass: 'iconfont icon-quxiao',
            duration:1500
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    buy(buyId,skinprice) {

      if (skinprice>=this.money) {
        Toast({
            message: "您当前钱包余额不足，请前往充值",
            iconClass: 'iconfont icon-chongzhi',
            duration:1500
          });
      }else{
        let newMoney=this.money-skinprice;
        console.log(newMoney);
        
        let buyname = this.$route.params.name;
        this.setMoney(newMoney,buyname);
        this.getUserMoney();
      // console.log(buyId);
      let buylist = {
        username: buyname,
        skinId: buyId
      };
      Toast({
            message: "购买成功",
            iconClass: 'iconfont icon-goumai',
            duration:1500
          });
      this.$axios
        .post("http://localhost:4000/buy", buylist)
        .then(res => {
          // console.log(res.data);
          
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
    setMoney(newmoney,buy_user){
      const nowMoney={
        username:buy_user,
        money:newmoney
      }
      this.$axios.post('http://localhost:4000/charge/'+buy_user,nowMoney)
      .then(res=>{
        console.log(res.data.message)
        this.getUserMoney();
      })
      .catch(err=>{
        console.log(err);
      })
  },
}, 
beforeRouteLeave (to, from, next) {
    Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      setTimeout(()=>{
        next();
      },300)
  },
beforeRouteEnter (to, from, next) {
        Indicator.close();
        next();
    }
};

</script>

<style>
#searchbox {
  display: flex;
  margin-top: 0.6em;
  justify-content: space-around;
}
#search_input {
  width: 18em;
  height: 2em;
  border-radius: 0.5em;
  border: 0.05em solid black;
}
#search_btn {
  margin-left: 0.5em;
  width: 3.6em;
  height: 2em;
  font-size: 1em;
}
#home_skin {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

/* 饰品列表 */
#home_skin .skin_box {
  padding-top: 0.5em;
  width: 50%;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
#home_skin .skin_box img {
  width: 80%;
  margin: 0 10% auto;
  border-radius: 0.3em;
  box-shadow: 1px 1px 1px #888888;
}
#home_skin .skin_name {
  font-size: 0.85em;
  width: 80%;
  height: 1em;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 0.1em;
  margin-bottom: 0.1em;
}
#home_skin .skin_name #span1 {
  display: block;
  float: left;
  width: 35%;
  height: 1em;
  overflow: hidden;
}
#home_skin .skin_name #span2 {
  display: block;
  float: left;
  width: 65%;
  height: 1em;
  overflow: hidden;
  text-align: end;
}
#home_skin .skin_opera {
  display: block;
  width: 80%;
  height: 1em;
  margin: 0 auto;
}
#home_skin .skin_opera #skin_btn {
  font-size: 0.8em;
  height: 2em;
  width: 45%;
}

/* 收藏 */
#collect_box {
  width: 100%;
  height: 100%;
}
#collect_box .collect_skin {
  margin: 0 auto;
  padding-top: 1em;
  width: 95%;
  height: 6em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  /* border-radius: 0.5em; */
}
#collect_box .collect_skin img {
  width: 6.5em;
  height: 4.8em;
  border-radius: 0.5em;
  float: left;
  margin-left: 1em;
  margin-right: 0.5em;
  box-shadow: 1px 1px 1px #888888;
}

#collect_box .collect_name {
  float: left;
  width: 30%;
  height: 5em;
  margin-left: 0.6em;
  padding-top: 0.2em;
}
#collect_box .collect_name span {
  display: block;
  font-size: 0.9em;
  width: 100%;
  height: 2.5em;
  padding-top: 0.4em;
  overflow: hidden;
}
#collect_box .collect_setup {
  float: right;
  width: 18%;
  height: 3em;
  margin-right: 0.5em;
}
#collect_box .collect_setup #recollect_span {
  width: 5em;
  height: 2em;
  font-size: 1em;
  color: purple;
  margin-top: 2em;
  font-weight: bold;
}
</style>
