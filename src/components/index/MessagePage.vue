<template>
<!--  <div>
    <el-form :label-position="labelPosition" label-width="800px" :model="message" style="max-width: 460px; text-align: center" >
      <el-form-item label="姓名">
        <el-input v-model="message.name"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="message.phone"></el-input>
      </el-form-item>
      <el-form-item label="留言内容">
        <el-input type="textarea" :rows="5" v-model="message.content"></el-input>
      </el-form-item>
    </el-form>
  </div>-->

  <el-row>
    <el-col :span="8"></el-col>
    <el-col :span="8">
      <div>
        <el-form :label-position="labelPosition" label-width="800px" :model="message" style="max-width: 1000px; text-align: center" >
          <el-form-item label="姓名">
            <el-input v-model="message.name"></el-input>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input v-model="message.phone"></el-input>
          </el-form-item>
          <el-form-item label="留言内容">
            <el-input type="textarea" :rows="5" v-model="message.content"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" @click="addMessage">
              <el-icon><Check /></el-icon>&nbsp;提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
    <el-col :span="8"></el-col>
  </el-row>

</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "MessagePage",
  data() {
    return {
      labelPosition: 'top',
      message: {
        name: '',
        phone: '',
        content: ''
      }
    }
  },
  methods:{
    addMessage() {

      if (this.message.name == '' || this.message.phone == '' || this.message.content == '') {
        ElMessage.info("请完整填写信息")
      } else {
        axios.post('/messages', this.message).then((res) => {
          if (res.data.code == 20011) {
            this.message.name = '' ;
            this.message.phone = '' ;
            this.message.content = ''
            ElMessage.success(res.data.msg);
          } else {
            ElMessage.error(res.data.msg);
          }
        })
      }
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
