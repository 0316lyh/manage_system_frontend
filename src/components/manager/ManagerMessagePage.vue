<template>
  <div style="text-align: center">
    <el-table :data="messages" style="width: 100%">
      <el-table-column width="350"></el-table-column>
      <el-table-column prop="name" label="姓名" width="300"/>
      <el-table-column prop="phone" label="联系方式" width="300"/>

      <el-table-column label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;操作" align="left">
        <template v-slot="scope">
          <el-row>
            <el-button type="success" @click="open(scope.row.id)">查看</el-button>
            <el-button type="danger" @click="deleteById(scope.row.id)">删除</el-button>
          </el-row>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import router from "../../router";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "ManagerMessagePage",
  data() {
    return{
      messages: [],
    }
  },
  methods:{
    getAll() {
      axios.get('/messages').then((res) => {
        if (res.data.code == 20041) {
          this.messages = res.data.data
        }
      })
    },

    // 路由跳转
    open(id) {
      router.push('/manager/message/' + id);
    },

    // 删除留言
    deleteById(id) {

      ElMessageBox.confirm(
          '确定要删除吗？ 此操作无法恢复！',
          'Warning',
          {
            confirmButtonText: '确认删除',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            // 点击确定删除
            axios.delete('/messages/' + id).then((res) => {
              if (res.data.code == 20021) {
                ElMessage.success(res.data.msg);
                this.getAll();
              } else {
                ElMessage.info(res.data.msg);
                this.getAll();
              }
            })
          })
          .catch(() => {
            // 点击取消删除
            ElMessage.info('已删除取消')
          })
    }
  },
  mounted() {
    this.getAll();
  }
}
</script>

<style scoped>

</style>
