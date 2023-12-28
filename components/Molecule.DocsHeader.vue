<template>
  <header class="flex flex-col gap-4">
    <h4 class="text-theme-500">
      <slot name="subtitle" />
    </h4>
    <h1 class="text-4xl font-bold">
      <slot name="title" />
    </h1>
    <p class="opacity-60 text-base font-medium">
      <slot />
    </p>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped></style>
