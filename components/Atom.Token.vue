<template>
  <span class="token -mr-1">
    `<slot />`
  </span>
</template>

<script setup lang="ts"></script>

<style scoped>
.token {
  font-family: "Fira Code";
  color: #d82830;
}
.dark .token {
  color: #ff7b72;
}
</style>
