<template>
  <div>
    <div style="width: 100vw; height: 100vh; overflow: hidden; display: flex">
      <div style="flex: 1">
        <el-image
            style="width: 100%; height: 100%"
            fit="cover"
            src="https://img1.baidu.com/it/u=3098128080,3103919457&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800"
        ></el-image>
        <div class="welcome-title">
          <div>欢迎来到</div>
        </div>
      </div>


      <div style="width: 500px; background-color: white">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomeView"
}
</script>

<style scoped>


</style>
