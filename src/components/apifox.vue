<template>
  <div class="container">
    <div class="iframe-container">
      <iframe :src="url" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: #24262c00;
  margin-top: 25px;
  margin-left: 2vw;
  height: 80vh;
  width: 71vw;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.iframe-container iframe {
  width: 68vw;
  height: 75vh;
  margin-top: 15px;
  border-radius: 10px;
}
</style>

<script setup>
const url = "https://apifox.com/";
</script>
