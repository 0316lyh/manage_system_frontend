<template>

  <div class="common-layout">
    <div>
      <el-container>
        <el-header>
          <router-view name="header1"/>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <router-view name="menu1"/>
          </el-aside>
          <el-main>
            <router-view name="myInfo"/>
            <router-view name="change"/>
            <router-view name="news1"/>
            <router-view name="newsDetails"/>
            <router-view name="message1"/>
            <router-view name="changepassword"/>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>

</template>

<script>
import router from "../router";

export default {
  name: "IndexView",
  data() {

  },
  methods: {},
  mounted() {

  }
}
</script>

<style scoped>

div {
  height: 100%;
  width: 100%;
}

.el-container {
  height: 100%;
  width: 100%;
}

.el-header, .el-footer {
  background-color: #bed3f3;
  color: #cc5a5a;
  text-align: right;
  line-height: 30px;
}

.el-aside {
  background-color: #e1baba;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #ffffff;
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
