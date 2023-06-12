<template>
  <div>
    <span style="margin-top: -20px">你好</span>&nbsp;&nbsp;
    <el-avatar style="margin-top: 10px"
        :src="src"
    />&nbsp;&nbsp;
    <span style="line-height: 10px" v-text="loginUsername"/>
    &nbsp;&nbsp;
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
    return {
      loginUserId: '',
      loginUsername: '',
      src: ''
    }
  },
  methods: {
    // 登出操作
    logout() {
      console.log(this.loginUserId)
      store.state.loginUserId = -1;
      router.push('/');
      ElMessage.info('你已登出')
    }
  },
  mounted() {
    console.log("loginUserId === " + store.state.loginUserId);
    axios.get('/infos/' + store.state.loginUserId).then((res) => {
      if (res.data.code === 20041) {
        this.loginUserId = res.data.data.userId;
        this.loginUsername = res.data.data.name;
        this.src = res.data.data.avatar
        console.log(this.src)
      }
    })
  }
}
</script>

<style scoped>

</style>
