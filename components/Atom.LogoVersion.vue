<template>
  <NuxtLink
    to="/"
    class="flex items-center gap-2"
  >
    <img
      src="/logo.svg"
      alt="Perfect UI Logo"
      width="90"
      height="16"
      class="logo"
    />
    <span class="badge style-white rounded-full">{{ version }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { version } from "@chrissgon/perfectui/package.json";
</script>

<style scoped></style>
