<template>

  <div>
    <div style="margin-top: 10px">
      <el-image style="height: 150px; width: 150px" :src="info.avatar"/>&nbsp;
      <el-button style="margin-top: -23px" @click="dialogTableVisible = true">修改</el-button>
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="姓名: ">
            <el-input v-model="info.name" width="20px" size="large"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="年龄: ">
            <el-input-number v-model="info.age" :min="1" :max="100"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别: ">
            <el-select v-model="info.sex" placeholder="性别">
              <el-option label="男" value="男"/>
              <el-option label="女" value="女"/>
            </el-select>
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
        </el-col>
      </el-row>
      <el-button type="primary" size="large" @click="changeInfo">
        <span style="font-size: 1rem">提交</span>
      </el-button>
    </div>
  </div>



  <el-dialog v-model="dialogTableVisible" title="请上传你的头像">
    <el-upload
        class="upload-demo"
        :action="'http://localhost:8080/load/avatar/' + loginUserId"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-button size="small" type="primary" @click="afterUpload">确定</el-button>
  </el-dialog>

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
      },
      loginUserId: '',
      // 修改头像的对话框是否显示
      dialogTableVisible: false,
      fileList: [],
    }
  },
  mounted() {
    this.getAll();
  },
  methods: {
    getAll() {
      this.loginUserId = store.state.loginUserId;
      console.log(this.loginUserId)

      axios.get("/infos/getByLoginUserId/" + this.loginUserId).then((res) => {
        this.info = res.data.data;
        store.commit('loginSuccess2', res.data.data.name);
      })
    },
    // 修改信息
    changeInfo() {
      axios.put("/infos", this.info).then((res) => {
        if (res.data.code == 20031) {
          ElMessage.success(res.data.msg);
        } else {
          ElMessage.error(res.data.msg);
        }
      })
    },
    // 上传头像相关
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    // 上传后点确认
    afterUpload() {
      this.fileList = [];
      this.dialogTableVisible = false;
      location.reload();
    }
  },


}
</script>

<style scoped>

</style>
