<template>

  <el-row>
    <el-col :span="8"></el-col>
    <el-col :span="8">
      <div>
        <el-form :label-position="labelPosition" label-width="800px" :model="changePasswordForm"
                 style="max-width: 1000px; text-align: center">
          <el-form-item label="原密码">
            <el-input type="password" v-model="changePasswordForm.oldPassword"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input type="password" v-model="newPassword1"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码">
            <el-input type="password" v-model="newPassword2"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" @click="changePassword">
              <el-icon>
                <Check/>
              </el-icon>&nbsp;提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
    <el-col :span="8"></el-col>
  </el-row>
</template>

<script>
import {ElMessage} from "element-plus";
import store from "../../store";
import axios from "axios";

export default {
  name: "ChangePasswordPage",
  data() {
    return {
      labelPosition: 'top',
      changePasswordForm: {
        oldPassword: '',
        newPassword: '',
        loginUserId: ''
      },
      newPassword1: '',
      newPassword2: '',
    }
  },
  methods: {
    changePassword() {
      // 两次新密码不一致
      if (this.newPassword1 != this.newPassword2) {
        ElMessage.error('两次新密码不一致！');
        return;
      }

      this.changePasswordForm.newPassword = this.newPassword1;

      axios.put("/users/changePassword", this.changePasswordForm).then((res) => {
        if (res.data.code == 20031) {
          ElMessage.success(res.data.msg);
        } else {
          ElMessage.error(res.data.msg);
        }
      })
      // 请求后清空输入框
      this.changePasswordForm.oldPassword = '';
      this.changePasswordForm.newPassword = '';
      this.newPassword1 = '';
      this.newPassword2 = '';
    }
  },
  mounted() {
    this.changePasswordForm.loginUserId = store.state.loginUserId;
  }
}
</script>

<style scoped>

</style>
