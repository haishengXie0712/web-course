<script setup lang="ts">
async function getMediaDevices() {
  const userMedia = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  console.log(userMedia);
  const devices = await navigator.mediaDevices.enumerateDevices();
  console.log(devices);
}
getMediaDevices();
</script>

<template>
  <div>component-0601</div>
</template>

