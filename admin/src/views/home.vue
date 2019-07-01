<template>
  <div>
    <el-container>
      <el-header>
        <h1 width="50%">
            <el-button style="float:left;height:35px;margin-top:12px;" @click.prevent="backLogin">注销</el-button>          
          CS饰品管理页面
          <router-link to="/news">
            <el-button style="float:right;height:35px;margin-top:12px;">首页新闻</el-button>
          </router-link>
          <router-link to="/add">
            <el-button style="float:right;height:35px;margin-top:12px;margin-right:10px;">上架饰品</el-button>
          </router-link>
        </h1>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <el-form ref="form" :model="form">
                <el-input
                  v-model="form.name"
                  placeholder="请输入饰品名称"
                  suffix-icon="el-icon-search"
                  style="width:500px;margin-right:20px;"
                ></el-input>
                <el-button type="primary" @click.prevent="searchSubmit">搜索</el-button>
                <el-button type="danger" @click.prevent="allSubmit">显示全部</el-button>
              </el-form>
              <el-table :data="tableData" style="width: 100%;">
                <el-table-column prop="index" label="皮肤编号" width="190"></el-table-column>
                <el-table-column prop="skinname" label="饰品名称" width="190"></el-table-column>
                <el-table-column label="图片" width="190">
                  <template slot-scope="scope">
                    <!-- 图片的绑定地址必须加上serve项目的端口号，来获取静态文件 -->
                    <img
                      :src="'http://localhost:4000'+scope.row.pic"
                      style="
                    width:100px;
                    border-radius: 5px;
                    "
                    />
                  </template>
                </el-table-column>
                <el-table-column prop="price" label="饰品价格" width="190"></el-table-column>
                <el-table-column prop="createAt" label="上架日期" width="190"></el-table-column>
                <el-table-column prop="updateAt" label="修改日期" width="190"></el-table-column>
                <el-table-column prop="buyer" label="购买用户" width="190"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                    >下架</el-button>
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
export default {
  name: "home",
  data() {
    return {
      tableData: [],
      form: {
        name: ""
      }
    };
  },
  created() {
    this.init();
  },
  beforeMount() {
    // 设置日期格式
    // Date.format(this.tableData.createAt,"YYYY/MM hh-mm-ss");
    // 截取日期字符串
  },
  methods: {
    handleEdit(index, row) {
      var id = row._id;
      this.$axios
        .get("http://localhost:4000/update/" + id)
        .then(res => {
          this.$router.push({
            name: "update",
            params: {
              id: id
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleDelete(index, row) {
      var deleteID = row._id;
      this.$axios
        .get("http://localhost:4000/delete/" + deleteID)
        .then(res => {
          // console.log("删除");
          this.init();
        })
        .catch(err => {
          console.log(err);
        });
    },
    init() {
      this.$axios
        .get("http://localhost:4000/adminHome")
        .then(res => {
          for (let index = 0; index < res.data.skinlist.length; index++) {
            res.data.skinlist[index].createAt = this.$moment(
              res.data.skinlist[index].createAt
            ).format("YYYY-MM-DD hh:mm");
            res.data.skinlist[index].updateAt = this.$moment(
              res.data.skinlist[index].updateAt
            ).format("YYYY-MM-DD hh:mm");
            this.tableData.push(res.data.skinlist[index]);
            res.data.skinlist[index].index = index + 1;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchSubmit(){
      // 管理员搜索饰品功能
      // console.log(this.form.name);
      var findname=this.form.name;
      
      this.$axios
      .get("http://localhost:4000/search/"+findname)
      .then(res=>{
        this.tableData.length=0;
        for (let find = 0; find < res.data.skinmessage.length; find++) {
            res.data.skinmessage[find].createAt = this.$moment(
              res.data.skinmessage[find].createAt
            ).format("YYYY-MM-DD hh:mm");
            res.data.skinmessage[find].updateAt = this.$moment(
              res.data.skinmessage[find].updateAt
            ).format("YYYY-MM-DD hh:mm");
            this.tableData.push(res.data.skinmessage[find]);
            res.data.skinmessage[find].index = find + 1;
          }
      })
      .catch(err=>{
        console.log(err);
      })
    },
    allSubmit(){
      this.init();
    },
    backLogin(){
      this.$store.commit("removeAdmin");
      this.$router.push('adminlogin');
    }
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
