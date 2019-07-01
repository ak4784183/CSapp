<template>
  <div>
    <el-container>
      <el-header>饰品信息编辑</el-header>
      <el-main>
        <div id="skin_box">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="饰品名称">
              <el-input v-model="form.skinname"></el-input>
            </el-form-item>

            <el-form-item label="饰品价格">
              <el-input v-model="form.price"></el-input>
            </el-form-item>

            <el-form-item label="购买用户">
              <el-input v-model="form.buyer"></el-input>
            </el-form-item>
            
            <el-form-item label="饰品价格">
              <img :src="form.pic" style="
                    width:350px;
                    border-radius: 0.05em;
                    ">
            </el-form-item>
            
            
            <el-form-item label="饰品图片">
              <el-col :span="24">
                <input type="file" ref="img">
              </el-col>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click.prevent="onSubmit" style="margin-right:50px;">确定修改</el-button>
              <router-link to="/home"><el-button>取消</el-button></router-link>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "update",
  data() {
    return {
      form: {
        
      }
    };
  },
  created(){
    var skinId=this.$route.params.id;
    this.$axios
    .get('http://localhost:4000/update/'+skinId)
    .then(res=>{
      
      this.form=res.data.skinmessage;
      this.form.pic='http://localhost:4000'+res.data.skinmessage.pic;
      console.log(this.form);
    })
    .catch(err=>{
      console.log(err);
    })

  },
  methods: {
    onSubmit() {
      
      var subID=this.$route.params.id;
      var skindata=new FormData();
      skindata.append('skinname',this.form.skinname);
      skindata.append('price',this.form.price);
      skindata.append('buyer',this.form.buyer);
      
      
      // 验证输入框的值是否写入，避免污染数据库
      if ((this.form.name!=="")&&(this.form.price!=="")) {
        if (this.$refs.img.files[0]) {
           skindata.append('pic',this.$refs.img.files[0]);
           this.$axios
      .post('http://localhost:4000/update/pic/'+subID,skindata)
      .then(res=>{
        console.log("提交成功");
        this.$router.push("/home");
      })
      .catch(err=>{
        console.log(err);
      })
        }else{
      this.$axios
      .post('http://localhost:4000/update/'+subID,skindata)
      .then(res=>{
        console.log("提交成功");
        this.$router.push("/home");
      })
      .catch(err=>{
        console.log(err);
      })
        }
     
      }
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