<template>
  <footer
    class="flex flex-col items-center gap-2 text-center border-t border-solid border-secondary pt-10"
  >
    <img
      src="/logo.svg"
      alt="Perfect UI Logo"
      width="90"
      class="logo"
    >
    <p class="text-secondary">
      © {{ new Date().getFullYear() }} Perfect UI
    </p>
  </footer>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>