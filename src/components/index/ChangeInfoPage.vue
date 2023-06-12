<template>
  <hr>
  <div>
    <div style="margin-top: 10px">
      <el-image style="height: 150px; width: 150px" :src="info.avatar"/>
<!--      <el-row>
        <el-col :span="6">
          姓名: <el-input width="20%" v-model="info.name"/>
        </el-col>
        <el-col :span="6">
          年龄: <el-input v-model="info.age"/>
        </el-col>
        <el-col :span="6">
          性别: <el-input v-model="info.sex"/>
        </el-col>
        <el-col :span="6">
          部门: <el-input v-model="info.dept"/>
        </el-col>
      </el-row>-->

<!--      <el-row>
        <el-col :span="6">
          地址: <el-input v-model="info.address"/>
        </el-col>
        <el-col :span="6">
          电话: <el-input v-model="info.phoneNum"/>
        </el-col>
        <el-col :span="6">
          Email: <el-input v-model="info.email"/>
        </el-col>
        <el-col :span="6">
          <div class="block">
            <span class="demonstration">生日: </span>
            <el-date-picker
                v-model="info.birthday"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>-->


      <el-row :gutter="24">
        <el-col :span="6" >
          <el-form-item label="姓名: ">
            <el-input v-model="info.name" width="20px" size="large"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="年龄: ">
            <el-input v-model="info.age" size="large"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别: ">
            <el-input v-model="info.sex" width="20px" size="large"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="部门: ">
            <el-input v-model="info.dept" width="20px" size="large"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="地址: ">
            <el-input v-model="info.address" width="20px" size="large"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="电话: ">
            <el-input v-model="info.phoneNum" width="20px" size="large"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Email: ">
            <el-input v-model="info.email" width="20px" size="large"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="生日: ">
            <div class="block">
              <el-date-picker
                  v-model="info.birthday"
                  type="date"
                  value-format="YYYY-MM-DD"
                  placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
<!--          <div class="block">
            <span class="demonstration">生日: </span>
            <el-date-picker
                v-model="info.birthday"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="选择日期">
            </el-date-picker>
          </div>-->
        </el-col>
      </el-row>
      <el-button type="primary" size="large" @click="changeInfo">
        <span style="font-size: 1rem">提交</span>
      </el-button>
    </div>
  </div>
  <hr>
</template>

<script>
import axios from "axios";
import store from "../../store";
import {ElMessage} from "element-plus";

export default {
  name: "ChangeInfoPage",
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
  mounted() {
    axios.get("/infos/" + store.state.loginUserId).then((res) => {
      this.info = res.data.data;
      store.commit('loginSuccess2', res.data.data.name);
    })
  },
  methods: {
    changeInfo() {
      axios.put("/infos",this.info).then((res) => {
        if (res.data.code == 20031) {
          ElMessage.success(res.data.msg);
        } else {
          ElMessage.error(res.data.msg);
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
