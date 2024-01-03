<template>
  <ul
    class="list !w-full bg-secondary border-l-4 border-solid border-amber-500"
  >
    <li class="list-item !cursor-default">
      <i class="bi-exclamation-triangle-fill text-amber-500 mr-2" />
      <slot />
    </li>
  </ul>
</template>

<script setup lang="ts"></script>

<style scoped></style>
