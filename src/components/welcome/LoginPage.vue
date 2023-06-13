<template>
  <div style="text-align: center; margin: 0 50px">

    <div style="margin-top: 150px">
      <div style="font-size: 25px">登录</div>
      <div style="font-size: 14px; color: grey">进入系统之前请登录</div>
    </div>
    <div style="margin-top: 30px">
      <el-input v-model="form.username" type="text" placeholder="用户名/邮箱">
        <template #prefix>
          <el-icon>
            <User/>
          </el-icon>
        </template>
      </el-input>
      <el-input v-model="form.password" type="password" placeholder="密码" style="margin-top: 5px">
        <template #prefix>
          <el-icon>
            <Lock/>
          </el-icon>
        </template>
      </el-input>
    </div>

    <el-row style="margin-top: 5px">
      <el-col :span="12" style="text-align: left">
        <el-radio-group v-model="form.userType">
          <el-radio :label="1">用户登陆</el-radio>
          <el-radio :label="2">管理员登录</el-radio>
        </el-radio-group>

      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-link>忘记密码?</el-link>
      </el-col>
    </el-row>

    <div style="margin-top: 20px; text-align: left">
      <el-button style="width: 100px" type="success" @click="login">登录</el-button>
    </div>

    <div style="margin-top: 10px; text-align: left">
      <el-button style="width: 100px" type="primary" @click="router.push('/register')">立即注册</el-button>
    </div>
  </div>
</template>

<script setup>
  import {reactive} from "vue";
  import {ElMessage} from "element-plus";
  import router from "../../router";
  import axios from "axios";
  import store from "../../store";

  const form = reactive({
    username: '',
    password: '',
    userType: 2    //1-用户  2-管理员
  })


  const login = function () {
    if (form.userType == 1) {
      // 普通用户登录
      axios.post('/users', form).then((res) => {
        if (res.data.code === 20051) {
          console.log(res.data)
          // 登陆成功后标记登录的账号id
          store.commit('loginSuccess', res.data.data)
          ElMessage.success(res.data.msg);
          setTimeout(() => {
            console.log( '登录的账号id: ' + store.state.loginUserId)
            router.push('/index')
          },500)
        } else {
          ElMessage.error(res.data.msg);
          form.username="";
          form.password="";
        }
      })
    } else {
      // 管理员登录
      console.log("管理员登录...")
      axios.post('/managers', form).then((res) => {
        if (res.data.code == 20051) {
          router.push('/manager');
        } else {
          ElMessage.error(res.data.msg);
          form.username="";
          form.password="";
        }
      })
    }
/*    axios.post('/users', form).then((res) => {
      if (res.data.code === 20051) {
        console.log(res.data)
        // 登陆成功后标记登录的账号id
        store.commit('loginSuccess', res.data.data)
        ElMessage.success(res.data.msg);
        setTimeout(() => {
          console.log( '登录的账号id: ' + store.state.loginUserId)
          router.push('/index')
        },500)
      } else {
        ElMessage.error(res.data.msg);
        form.username="";
        form.password="";
      }

    })*/
  }
</script>

<style scoped>

</style>
