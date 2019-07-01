<template>
    <div id="seenews">
        <h2 class="see_header">{{news.title}}</h2>
        <p class="see_content">{{news.content}}</p>


        <mt-button type="danger" id="see_back" @click.prevent="backNews"><strong>返回</strong></mt-button>
    </div>
</template>
<script>
import { Indicator } from "mint-ui";
export default {
    name:"seenews",
    data() {
        return {
            news:''
        }
    },
    created() {
        this.$axios
      .get('http://localhost:4000/seeNews/'+this.$route.params.id)
      .then(res=>{
        // console.log(res.data.newsContent)
        this.news=res.data.newsContent;
      })
      .catch(err=>{
        console.log(err);
      })
    },
    methods: {
        backNews(){
            // console.log(this.$store.state.username)
            this.$router.push({
                name:'news',
                params:{
                    name:this.$store.state.username
                }
            })
        }
    },
    beforeRouteEnter (to, from, next) {
        Indicator.close();
        next();
    },
    beforeRouteLeave (to, from, next) {
        Indicator.open({
        text: "返回中...",
        spinnerType: "fading-circle"
      });
      setTimeout(()=>{
          next();
      },500)
    }
}
</script>
<style scoped>
#seenews .see_header{
    display: block;
    width: 90%;
    height: 100%;
    margin: 0 auto;
    color: purple;
    font-weight: bold;
    font-size: 1.3em;
    text-align: center;
    margin-bottom: 2em;
    margin-top: 1em;
}

#seenews .see_content{
    display: block;
    width: 90%;
    height: 100%;
    color: black;
    margin: 0 auto;
    font-family: fantasy;
    font-size: 1.1em;

}

#see_back{
    display: block;
    margin: 0 auto;
    margin-top: 2em;
    margin-bottom: 2em;
    width: 4.5em;
    height: 1.8em;
}
</style>

