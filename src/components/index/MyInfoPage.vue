<template>
    <div>
      <div style="margin-top: 10px">
          <el-image style="height: 150px; width: 150px" :src="info.avatar"/>
        <el-row>
          <el-col :span="6">
            姓名: <span v-text="info.name"/>
          </el-col>
          <el-col :span="6">
            年龄: <span v-text="info.age"></span>
          </el-col>
          <el-col :span="6">
            性别: <span v-text="info.sex"/>
          </el-col>
          <el-col :span="6">
            部门: <span v-text="info.dept"></span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            地址: <span v-text="info.address"></span>
          </el-col>
          <el-col :span="6">
            电话: <span v-text="info.phoneNum"></span>
          </el-col>
          <el-col :span="6">
            Email: <span v-text="info.email"></span>
          </el-col>
          <el-col :span="6">
            生日: <span v-text="info.birthday.slice(0,10)"></span>
          </el-col>
        </el-row>
      </div>
    </div>

</template>

<script>
import axios from "axios";
import store from "../../store";

export default {
  name: "MyInfo",
  data() {
    return {
      info: {
        id: '',
        userId: '',
        name: '',
        age: '',
        sex: '',
        email: '',
        address: '',
        phoneNum: '',
        avatar: '',
        dept: '',
        birthday: ''
      }
    }

  },
  methods: {
    errorHandler() {
      return true
    }
  },
  mounted() {
    axios.get("/infos/getByLoginUserId/" + store.state.loginUserId).then((res) => {
      console.log(res.data.data);
      this.info = res.data.data;
      store.commit('loginSuccess2', res.data.data.name);
      console.log("info: " + this.info)
    })
  }
}
</script>


<style scoped>

</style>
