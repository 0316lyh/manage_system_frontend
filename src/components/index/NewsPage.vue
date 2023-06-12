<template>
  <div style="height: 30px">
  <span v-for="news in allNews">
    <el-row>
      <el-col :span="7">
        <div style="text-align: right">
<!--            <div @click="open">
              {{news.name}}
            </div>-->
          <el-link type="info" @click="open(news.id)">{{ news.name }}</el-link>
        </div>
      </el-col>
      <el-col :span="10"></el-col>
      <el-col :span="7">
        <div style="text-align: left">{{news.addDate}}</div>
      </el-col>
    </el-row>
  </span>
  </div>
  <hr>

<!--  <el-table
      :data="allNews"
      style="width: 100%"
      @click="f1"
  >
    <el-table-column prop="" label="" width="300" >11</el-table-column>
    <el-table-column prop="name" label="" width="180" />
    <el-table-column prop="" label="" width="500" />
    <el-table-column prop="addDate" label="" />
  </el-table>-->

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
