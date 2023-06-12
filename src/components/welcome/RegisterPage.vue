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

    <div style="margin-top: 20px; text-align: left">
      <el-button style="width: 100px" type="success" @click="register">注册</el-button>
    </div>

    <div style="margin-top: 10px; text-align: left">
      <el-button style="width: 100px" type="primary" @click="returnLogin">返回登录</el-button>
    </div>

    </div>

</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";
import store from "../../store";
import {reactive} from "vue";
import router from "../../router";

export default {
  name: "RegisterPage",
  data() {
    return {
      store1: store,
      form: {
        username: "",
        password: "",
        remember: false
      }
    }
  },
  methods: {
    register() {
      let this_ = this;
      axios.post("/users/register", this.form).then((res) => {
        if (res.data.code === 20011) {
          ElMessage.success('注册成功');
          setTimeout(() => {
            router.push("/");

          },500)
        } else {
          ElMessage.error(res.data.msg);
          this.form.username='';
          this.form.password='';
        }
      })
    },
    returnLogin() {
      router.push('/');
    }
  }
}
</script>

<style scoped>

</style>
