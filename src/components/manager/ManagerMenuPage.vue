<template>

  <el-row class="tac">
    <el-col :span="24">
      <el-menu
          class="el-menu-vertical-demo"
      >
        <el-menu-item index="1"  @click="open('/manager')">
          <el-icon><UserFilled /></el-icon>
          <span>员工信息</span>
        </el-menu-item>
        <el-menu-item index="2" @click="open('/manager/message')">
          <el-icon><EditPen /></el-icon>
          <span>查看留言</span>
        </el-menu-item>
        <el-menu-item index="3" @click="open('/manager/news')">
          <el-icon><Tickets /></el-icon>
          <span>公告</span>
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
