<template>
  <div>
    <el-container>
      <el-header>编辑新闻</el-header>
      <el-main>
        <form id="addnews_box" method="post">
          <el-input
            type="text"
            v-model="newsForm.title"
            maxlength="30"
            show-word-limit
            id="newsTitle"
          ></el-input>
          <el-input
            type="textarea"
            v-model="newsForm.content"
            maxlength="1000"
            show-word-limit
            id="newsContent"
            :rows="13"
          ></el-input>
          <div style="float:left;">
            新闻图片：
            <input type="file" name="" id="" ref="newimg">
          </div>

          <el-button type="primary" @click.prevent="changeSubmit">确认</el-button>
          <el-button @click.prevent="backHome">取消</el-button>
        </form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "addnew",
  data() {
    return {
      newsForm:{
        title:"输入您的标题",
        content:"输入文章内容",
        newpic:""
        }
    };
  },
  created() {
    this.$axios.get('http://localhost:4000/updatenews/'+this.$route.params.id)
      .then(res=>{
        console.log(res.data);
        this.newsForm=res.data.news;
      })
      .catch(err=>{
        console.log(err);
      })
  },
  methods: {
    changeSubmit(){
      var newsId=this.newsForm._id;
      // console.log(newsId);
      let newsform=new FormData();
      newsform.append('title',this.newsForm.title);
      newsform.append('content',this.newsForm.content);

      if (this.$refs.newimg.files[0]) {
      newsform.append('newsPic',this.$refs.newimg.files[0]);
      // console.log(this.$refs.newpic.files[0]);
      this.$axios
      .post('http://localhost:4000/updatenews/'+newsId,newsform)
      .then(res=>{
        this.$router.push('/news');
      })
      .catch(err=>{
        console.log(err);
      })
      }else{
        this.$axios
      .post('http://localhost:4000/updatenews/pic/'+newsId,newsform)
      .then(res=>{
        this.$router.push('/news');
      })
      .catch(err=>{
        console.log(err);
      })
      }

        
      
    },
    backHome() {
      this.$router.push("/news");
    }
  }
};
</script>
<style>
#addnews_box {
  width: 60%;
  margin: 0 auto;
}
.el-header {
  background-color: black;
  color: white;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: white;
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