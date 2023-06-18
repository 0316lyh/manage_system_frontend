<template>

  <div>
    <el-table :data="news" style="width: 100%">
      <el-table-column width="300"></el-table-column>
      <el-table-column prop="name" label="姓名" width="300"/>
      <el-table-column prop="addDate" label="时间" width="300"/>
      <el-table-column label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;操作" align="left">
        <template v-slot="scope">
          <el-row>
            <el-button type="primary" @click="change1(scope.row.id)">修改</el-button>
            <el-button type="danger" @click="deleteById(scope.row.id)">删除</el-button>
          </el-row>
        </template>
      </el-table-column>

    </el-table>
  </div>
  <div>
    <el-button type="success" @click="addNews1">添加公告</el-button>
  </div>


  <!--  修改公告的表单-->
  <el-dialog
      v-model="dialogVisible"
      title="修改公告"
      width="40%"
      :before-close="handleClose"
  >
    <el-form :model="changeFrom" label-width="120px" style="margin-top: -80px">
      <el-form-item label="标题">
        <el-input v-model="changeFrom.name"/>
      </el-form-item>
      <el-form-item label="公告内容">
        <el-input
            v-model="changeFrom.content"
            :rows="10"
            type="textarea"
            size="large"
            placeholder="请输入公告内容"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="change2">修改</el-button>
        <el-button @click="this.dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>


  <!--  新增公告表单-->
  <el-dialog
      v-model="dialogVisible2"
      title="修改公告"
      width="40%"
      :before-close="handleClose"
  >
    <el-form :model="addFrom" label-width="120px" style="margin-top: -80px">
      <el-form-item label="标题">
        <el-input v-model="addFrom.name"
                  type="text"
                  placeholder="请输入标题"/>
      </el-form-item>
      <el-form-item label="公告内容">
        <el-input
            v-model="addFrom.content"
            :rows="10"
            type="textarea"
            size="large"
            placeholder="请输入公告内容"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addNews2">新增</el-button>
        <el-button @click="this.dialogVisible2 = false">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>


</template>

<script>
import axios from "axios";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "ManagerNewsPage",
  data() {
    return {
      news: [],
      // 修改公告的表单是否展示
      dialogVisible: false,
      // 新增公告的表单是否展示
      dialogVisible2: false,
      // 修改的表单
      changeFrom: {
        id: '',
        name: '',
        content: '',
        addDate: ''
      },
      // 新增的表单
      addFrom: {
        id: '',
        name: '',
        content: '',
        addDate: ''
      }
    }
  },
  methods: {
    getAll() {
      axios.get('/news').then((res) => {
        if (res.data.code == 20041) {
          this.news = res.data.data;
        }
      })
    },

    // 根据id删除
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
            axios.delete('/news/' + id).then((res) => {
              if (res.data.code === 20021) {
                ElMessage.success(res.data.msg);
                this.getAll();
              } else {
                ElMessage.error(res.data.msg);
                this.getAll();
              }
            })
          })
          .catch(() => {
            // 点击取消删除
            ElMessage.info('已删除取消')
          })

    },

    // 修改公告
    change1(id) {
      this.dialogVisible = true;
      axios.get('/news/' + id).then((res) => {
        if (res.data.code === 20041) {
          this.changeFrom = res.data.data;
        }
      })
    },
    change2() {
      axios.put("/news", this.changeFrom).then((res) => {
        if (res.data.code === 20031) {
          this.dialogVisible = false;
          ElMessage.success(res.data.msg);
          this.getAll();
        } else {
          ElMessage.error(res.data.msg);
          this.getAll();
        }
      })
    },

    addNews1() {
      this.addFrom.id = '',
          this.addFrom.name = '',
          this.addFrom.content = '',
          this.addFrom.addDate = '',
          this.dialogVisible2 = true;
    },

    addNews2() {
      axios.post('/news', this.addFrom).then((res) => {
        if (res.data.code == 20011) {
          ElMessage.success(res.data.msg);
          this.dialogVisible2 = false;
          this.getAll();
        } else {
          ElMessage.error(res.data.msg);
          this.getAll();
          this.dialogVisible2 = false;
        }
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
