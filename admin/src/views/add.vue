<template>
  <div>
    <el-container>
      <el-header>饰品库<router-link to="/home"><span style="float:right;color:white;"><strong>首页</strong></span>
      </router-link></el-header>
      <el-main>
        <div id="skin_box">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="饰品名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="饰品价格">
              <el-input v-model="form.price"></el-input>
            </el-form-item>

            <el-form-item label="饰品图片">
              <el-col :span="24">
                <input type="file" name="" id="" ref="pic">
              </el-col>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click.prevent="skinSubmit">上架</el-button>
              <el-button @click.prevent="backHome">取消</el-button>
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
      form: {
        name: "",
        price:"",
        pic:""
      }
    };
  },
  methods: {
    skinSubmit() {
      
      var skindata=new FormData();
      skindata.append('skinname',this.form.name);
      skindata.append('price',this.form.price);
      skindata.append('pic',this.$refs.pic.files[0]);
      
      
      console.log(skindata)
      // 验证输入框的值是否写入，避免污染数据库
      if ((this.form.name!=="")&&(this.form.price!=="")&&(this.$refs.pic.files[0])) {
        this.$axios.post('http://localhost:4000/add',skindata).then(res=>{
        console.log(res.data);
        this.$router.push('/home');
      }).catch(err=>{
        console.log(err);
      })
      }else{
        alert('请输入完整的饰品信息');
      }
      
    },
    backHome(){
      this.$router.push('/home');
    }
  }
};
</script>
<style>
#skin_box {
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