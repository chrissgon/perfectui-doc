<template>
  <ul
    class="list !w-full bg-secondary border-l-4 border-solid border-amber-600"
  >
    <li class="list-item">
      <i class="bi-exclamation-triangle-fill text-amber-600 mr-2" />
      <slot />
    </li>
  </ul>
</template>

<script setup lang="ts"></script>

<style scoped></style>
