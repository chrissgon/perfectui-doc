<template>
  <div class="card border-warn">
    <article class="flex gap-3 !px-6 card-content">
      <i class="bi-exclamation-triangle-fill text-amber-500" />

      <div class="whitespace-break-spaces">
        <p class="text-amber-500 mb-2">
          Attention needed
        </p>
        <slot />
      </div>
    </article>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.list {
  background-color: rgb(var(--backgroundSecondary));
}
</style>
