<script setup lang="ts">
async function getMediaDevices() {
  // 如果获取得不到 可能需要先调用 getUserMedia
  const devices = await navigator.mediaDevices.enumerateDevices();
  console.log(devices);
}
getMediaDevices();
</script>

<template>
  <div>component-0501</div>
</template>

