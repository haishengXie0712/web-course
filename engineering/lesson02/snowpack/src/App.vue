<template>
  <div>time: {{ time }}</div>
</template>

<script>
import {ref} from "vue";
import

export default {
  name: "App",
  setup() {
    const time = ref(new Date().getTime());
    setInterval(() => {
      time.value = new Date().getTime()
    }, 1000)
    return {
      time
    }
  }
}
</script>

<style scoped>

</style>
