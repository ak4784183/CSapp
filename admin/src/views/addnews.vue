<template>
  <div>
    <el-container>
      <el-header>发布新闻</el-header>
      <el-main>
        
        <form id="news_box" method="post">
          <el-input
            type="text"
            placeholder="请输入内容"
            v-model="newsForm.title"
            maxlength="30"
            show-word-limit
            id="newsTitle"
          ></el-input>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="newsForm.content"
            maxlength="1000"
            show-word-limit
            id="newsContent"
            :rows="13"
          ></el-input>
          
          <div style="float:left;">
            新闻图片：
            <input type="file" name="" id="" ref="newpic">
          </div>
          
          <el-button type="primary" @click.prevent="newsSubmit">发布</el-button>
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
        title:"CS",
        content:"GO",
        newpic:""
        }
    };
  },
  methods: {
    newsSubmit(){

      if (this.$refs.newpic.files[0]) {
        var newsform=new FormData();
      newsform.append('title',this.newsForm.title);
      newsform.append('content',this.newsForm.content);
      newsform.append('newsPic',this.$refs.newpic.files[0]);
      // console.log(this.$refs.newpic.files[0]);
      this.$axios
      .post('http://localhost:4000/addNews',newsform)
      .then(res=>{
        this.$router.push('/news');
      })
      .catch(err=>{
        console.log(err);
      })
      }else{
        alert("图片新闻不能为空")
      }
      
    },
    backHome() {
      this.$router.push("/news");
    }
  }
};
</script>
<style>
#news_box {
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