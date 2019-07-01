<template>
  <div>
    <el-container>
      <el-header>
        <h1 width="50%">
          首页信息统一管理
          <router-link to="/home">
            <el-button style="float:right;height:35px;margin-top:12px;">饰品管理</el-button>
          </router-link>
          <router-link to="/addNews">
            <el-button style="float:right;height:35px;margin-top:12px;margin-right:10px;">发布新闻</el-button>
          </router-link>
        </h1>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <el-table :data="newsData" style="width: 100%;">
                <el-table-column prop="index" label="新闻编号" width="150"></el-table-column>
                <el-table-column prop="title" label="新闻名" width="270"></el-table-column>
                <el-table-column label="新闻图片" width="220">
                  <template slot-scope="scope">
                    <!-- 图片的绑定地址必须加上serve项目的端口号，来获取静态文件 -->
                    <img
                      :src="'http://localhost:4000'+scope.row.newsPic"
                      style="
                    width:120px;
                    height:80px;
                    border-radius: 5px;
                    "
                    >
                  </template>
                </el-table-column>

                <el-table-column prop="content" label="文章内容" width="400" style="overflow:hidden;"></el-table-column>
                <el-table-column prop="createAt" label="发布日期" width="280"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                    >撤销</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
  name: "home",
  data() {
    return {
      newsData: []
    };
  },
  created() {
    this.initnews();
  },
  methods: {
    initnews(){
      this.$axios
      .get("http://localhost:4000/adminNews")
      .then(res => {
        for (let index = 0; index < res.data.newsResult.length; index++) {
          res.data.newsResult[index].createAt = this.$moment(res.data.newsResult[index].createAt).format("YYYY-MM-DD hh:mm");
          res.data.newsResult[index].content = res.data.newsResult[
            index
          ].content.substr(0, 55)+'...';
          this.newsData.push(res.data.newsResult[index]);
          res.data.newsResult[index].index = index + 1;
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    handleEdit(index, row) {
      // 通过提交新闻ID跳转路由
      // console.log(row._id);
      this.$router.push({
        name:'updatenews',
        params:{
          id:row._id
        }
      });
    },
    handleDelete(index, row) {
      var deletenewsID = row._id;
      this.$axios
      .get('http://localhost:4000/deleteNews/'+deletenewsID)
      .then(res=>{
        // 特别奇怪的BUG，重新刷新一遍数据会重复一次
        // 手动F5刷新吧，暂时找不到解决办法
        // this.initnews();
      })
      .catch(err=>{
        console.log(err);
      })
    },
  }
};
</script>
<style>
.el-header,
.el-footer {
  background-color: black;
  color: white;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
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
