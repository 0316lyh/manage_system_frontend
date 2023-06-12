<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
          class="el-menu-vertical-demo"

      >
        <el-menu-item index="1"  @click="open('/index')">
          <el-icon><UserFilled /></el-icon>
          <span>个人信息</span>
        </el-menu-item>
        <el-menu-item index="2" @click="open('/index/change')">
          <el-icon><EditPen /></el-icon>
          <span>修改信息</span>
        </el-menu-item>
        <el-menu-item index="3" @click="open('/index/news')">
          <el-icon><Tickets /></el-icon>
          <span>公告</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><Message /></el-icon>
          <span>留言</span>
        </el-menu-item>

      </el-menu>
    </el-col>
  </el-row>

</template>

<script>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import router from "../../router";
export default {
  name: "MenuPage",
  data() {
    return {}
  },
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    open(url) {

      router.push(url);
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
