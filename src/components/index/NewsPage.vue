<template>
<!--  <div style="height: 30px">
  <span v-for="news in allNews">
    <el-row>
      <el-col :span="7">
        <div style="text-align: right">
&lt;!&ndash;            <div @click="open">
              {{news.name}}
            </div>&ndash;&gt;
          <el-link type="info" @click="open(news.id)">{{ news.name }}</el-link>
        </div>
      </el-col>
      <el-col :span="10"></el-col>
      <el-col :span="7">
        <div style="text-align: left">{{news.addDate}}</div>
      </el-col>
    </el-row>
  </span>
  </div>-->


  <div style="height: 30px">
  <span v-for="news in allNews">
    <el-row>
      <el-col :span="7">
        <div style="text-align: right">
          <router-link :to="'news/' + news.id">
            {{news.name}}
          </router-link>
        </div>
      </el-col>
      <el-col :span="10"></el-col>
      <el-col :span="7">
        <div style="text-align: left">{{news.addDate}}</div>
      </el-col>
    </el-row>
  </span>
  </div>

</template>

<script>
import axios from "axios";
import router from "../../router";

export default {
  name: "NewsPage",
  data() {
    return {
      allNews: []
    }
  },
  methods:{
    open(id) {
      router.push("/index/news/" + id)
    }
  },
  mounted() {
    axios.get("/news").then((res) => {
      this.allNews = res.data.data;
      console.log(this.allNews)
    })
  }
}
</script>

<style scoped>

</style>
