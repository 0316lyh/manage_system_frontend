<template>
    <div style="text-align: center">
      {{ content }}
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewsDetails",
  data() {
    return {
      id: this.$route.params.id,
      content: '',
    }
  },
  methods: {},
  mounted() {
    axios.get("/news/" + this.id).then((res) => {
      this.content = res.data.data.content;
    })
  }
}
</script>

<style scoped>

</style>
