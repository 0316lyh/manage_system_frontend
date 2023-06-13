<template>
  <div>
    <span style="margin-top: -20px">你好&nbsp;&nbsp;管理员</span>

    <el-button style="margin-top: -10px" type="danger" @click="logout">登出</el-button>
  </div>


</template>

<script>
import axios from "axios";
import store from "../../store";
import router from "../../router";
import {ElMessage} from "element-plus";

export default {
  name: "HeaderPage",
  data() {
    return {}
  },
  methods: {
    // 登出操作
    logout() {
      router.push('/');
      ElMessage.info('你已登出')
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
