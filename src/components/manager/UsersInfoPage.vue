<template>
<!--    信息展示-->
  <div style="text-align: center">
    <el-table :data="infos" style="width: 100%">
      <el-table-column label="头像" align="center">
        <template v-slot="scope">
          <div class="block">
            <el-avatar shape="square" :size="70" :src="scope.row.avatar"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"/>
      <el-table-column prop="age" label="年龄" width="180"/>
      <el-table-column prop="sex" label="性别"/>
      <el-table-column prop="email" label="Email"/>
      <el-table-column prop="address" label="地址"/>
      <el-table-column prop="phoneNum" label="电话号码"/>
      <el-table-column prop="dept" label="部门"/>
      <el-table-column prop="birthday" label="生日"/>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-row>
            <el-button type="primary" @click="change1(scope.row.id)">修改</el-button>
            <el-button type="danger" @click="deleteById(scope.row.id)">删除</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>

<!--  分页工具-->
  <el-row>
    <el-col :span="8"></el-col>
    <el-col :span="8">
      <div class="demo-pagination-block">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5,7]"
            :small="false"
            :disabled="false"
            :background="false"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </el-col>
    <el-col :span="8"></el-col>
  </el-row>


  <!--  修改信息对话框-->
  <el-dialog
      v-model="dialogVisible"
      title="修改信息"
      width="40%"
      :before-close="handleClose"
  >
    <el-form :model="changeFrom" label-width="120px" style="margin-top: 0px">
      <el-form-item label="Activity name">
        <el-input v-model="changeFrom.name"/>
      </el-form-item>
      <el-form-item label="年龄">
        <!--        <el-input v-model="changeFrom.age" />-->
        <el-input-number v-model="changeFrom.age" :min="1" :max="100"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="changeFrom.sex" placeholder="性别">
          <el-option label="男" value="男"/>
          <el-option label="女" value="女"/>
        </el-select>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="changeFrom.email"/>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="changeFrom.address"/>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="changeFrom.phoneNum"/>
      </el-form-item>
      <el-form-item label="部门">
        <el-input v-model="changeFrom.dept"/>
      </el-form-item>

      <el-form-item label="生日: ">
        <div class="block">
          <el-date-picker
              v-model="changeFrom.birthday"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="change2">修改</el-button>
        <el-button @click="this.dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>

</template>

<script>
import axios from "axios";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "UserInfo",
  data() {
    return {
      infos: [],
      // 修改信息的表单是否展示
      dialogVisible: false,
      // 修改信息的表单
      changeFrom: {
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
      // 当前页码
      currentPage: 1,
      // 每页显示条数
      pageSize: 5,
      total: 0
    }
  },
  methods: {
    getAll() {
      axios.get('/infos').then((res) => {
        this.infos = res.data.data;
        console.log(res.data)
      })
    },

    /*    getAll() {
          console.log(123)
        },*/

    change1(id) {
      console.log(id);
      this.dialogVisible = true;
      axios.get('/infos/' + id).then((res) => {
        this.changeFrom = res.data.data;
        console.log(this.changeFrom)
      })
    },
    change2() {
      console.log(this.changeFrom)
      axios.put('/infos', this.changeFrom).then((res) => {
        if (res.data.code == 20031) {
          ElMessage.success(res.data.msg);
          this.dialogVisible = false;
          this.getByPage();
        } else {
          ElMessage.error(res.data.msg);
          this.dialogVisible = false;
          this.getByPage();
        }
      })
    },
    // 关闭修改对话框
    handleClose() {
      this.dialogVisible = false;
    },

    // 删除用户以及信息
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
            axios.delete('/infos/' + id).then((res) => {
              if (res.data.code === 20021) {
                ElMessage.success(res.data.msg);
                this.getByPage();
              } else {
                ElMessage.error(res.data.msg);
                this.getByPage();
              }
            })
          })
          .catch(() => {
            // 点击取消删除
            ElMessage.info('已删除取消')
          })

    },
    //分页相关
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.getByPage();
    },
    handleCurrentChange(val) {
      console.log("当前页: " + this.currentPage)
      this.getByPage();
    },
    getByPage() {
      axios.get("/infos/" + this.pageSize + "/" + this.currentPage).then((res) => {
        this.total = res.data.data.total;
        this.infos = res.data.data.list;
      })
    },
  },
  mounted() {
    axios.get("/infos/" + this.pageSize + "/" + this.currentPage).then((res) => {
      this.total = res.data.data.total;
      this.infos = res.data.data.list;
    })
  }
}
</script>

<style scoped>

.dialog-footer button:first-child {
  margin-right: 10px;
}


html { overflow-x: hidden; overflow-y: auto; }

</style>
