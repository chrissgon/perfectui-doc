<template>
  <aside
    class="w-fit relative min-w-[40px] min-h-[40px] flex justify-center items-center icon-gradient rounded-md"
  >
    <slot />
  </aside>
</template>

<script setup lang="ts"></script>

<style scoped>
.icon-gradient {
  background: linear-gradient(
    150deg,
    rgb(var(--backgroundGradientPrimary)),
    rgb(var(--backgroundPrimary))
  );
}
</style>
