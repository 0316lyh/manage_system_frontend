<template>
  {{content}}
</template>

<script>
import axios from "axios";

export default {
  name: "MessageDetailsPage",
  data() {
    return {
      id: this.$route.params.id,
      content: '',
    }
  },
  methods:{

  },
  mounted() {
    axios.get('/messages/' + this.id).then((res) => {
      if (res.data.code === 20041) {
        this.content = res.data.data;
      }
    })
  }
}
</script>

<style scoped>

</style>
