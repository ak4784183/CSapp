<template>
  <div id="newsBox">
    <div id="lunbo">
      <mt-swipe :auto="4000">
        <mt-swipe-item>
          <img src="@/assets/img/lunbo/1.jpg" alt="轮播图">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="@/assets/img/lunbo/2.png" alt="轮播图">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="@/assets/img/lunbo/3.jpg" alt="轮播图">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="@/assets/img/lunbo/4.jpg" alt="轮播图">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="news_box">
      <div
        class="news_item"
        v-for="item in newsform"
        :key="item._id"
        @click.prevent="seenews(item._id)"
      >
        <div class="itemLeft">
          <div class="news_content">
            <p>{{item.title}}</p>
            <span class="news_icon">CSGO</span>
            <div class="news_date">
              <img src="@/assets/img/date.png" alt>
              <span class="news_spandate">{{item.createAt}}</span>
            </div>
          </div>
        </div>
        <div class="itemRight">
          <img :src="'http://localhost:4000/'+item.newsPic" alt width="95%">
        </div>
      </div>

      <!-- <div class="news_item">
            <div class="itemLeft">
                <div class="news_content">
                    <p>小鸡“大行动”更新后，国外玩家是什么反应</p>
                    <div class="news_date"></div>
                </div>
            </div>
            <div class="itemRight">
                <img src="@/assets/img/content/2.jpg" alt="" width="95%">
                
            </div>
        </div>

        <div class="news_item">
            <div class="itemLeft">
                <div class="news_content">
                    <p>反恐精英这个名字是怎么来的？</p>
                    <div class="news_date"></div>
                </div>
            </div>
            <div class="itemRight">
                <img src="@/assets/img/content/3.jpg" alt="" width="95%">
            </div>
      </div>-->
    </div>
  </div>
</template>
<script>
import { Indicator } from "mint-ui";
export default {
  name: "news",
  data() {
    return {
      newsform: ""
    };
  },
  created() {
    this.$axios
      .get("http://localhost:4000/adminNews")
      .then(res => {
        this.newsform = res.data.newsResult;
        for (const key in this.newsform) {
          if (this.newsform.hasOwnProperty(key)) {
            this.newsform[key].createAt = this.$moment(
              this.newsform[key].createAt
            ).format("YYYY-MM-DD hh:mm");
          }
        }
      })
      .catch(err => {});
  },
  methods: {
    seenews(newsId) {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      setTimeout(()=>{
        this.$router.push({
        name: "seenews",
        params: {
          id: newsId
        }
      });
      },500)
      
    }
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
  beforeRouteEnter(to, from, next) {
    Indicator.close();
    next();
  }
};
</script>
<style>
#newsBox {
  height: 100%;
  width: 100%;
  /* background-color: blue; */
}
#newsBox #lunbo {
  width: 100%;
  height: 12em;
  box-shadow: 2px 2px 2px #888;
}
/* 轮播图片 */
#newsBox #lunbo img {
  width: 100%;
  height: 100%;
  background-size: 100%;
}
#newsBox .news_box {
  width: 100%;
}
/* 新闻条 */
#newsBox .news_box .news_item {
  width: 100%;
  height: 7em;
}
/* 新闻标题 */
#newsBox .news_box .news_item .itemLeft {
  float: left;
  width: 65%;
  height: 7em;
}
#newsBox .news_box .news_item .itemLeft .news_content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
/* 新闻时间 */
#newsBox .news_box .news_item .itemLeft .news_content .news_date {
  width: 94%;
  height: 1.25em;
  margin-left: 3%;
  margin-bottom: 1%;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.5);
}
#newsBox .news_box .news_item .itemLeft .news_content p {
  width: 100%;
  font-size: 0.9em;
  font-weight: bold;
  margin-top: 4%;
  margin-left: 3%;
}
#newsBox .news_box .news_item .itemLeft .news_content .news_icon {
  margin-left: 3%;
  width: 3em;
  height: 1em;
  background-color: orange;
  box-shadow: 1px 1px 1px #888;
  border-radius: 0.2em;
}
#newsBox .news_box .news_item .itemLeft .news_content .news_spandate {
  height: 1em;
  width: 50%;
  font-size: 0.9em;
}
#newsBox .news_box .news_item .itemRight {
  float: right;
  width: 35%;
  height: 7em;
}
/* 新闻图片 */
#newsBox .news_box .news_item .itemRight img {
  width: 96%;
  height: 87%;
  background-size: 100%;
  margin: 0 auto;
  margin-top: 6%;
  border-radius: 0.2em;
  box-shadow: 1px 1px 1px #888;
}
</style>
