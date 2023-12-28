<template>
  <!-- item -->
  <ul class="list">
    <li class="list-item !flex items-center gap-5 !py-4 max-w-sm">
      <!-- icon -->
      <aside
        class="relative min-w-[40px] min-h-[40px] flex justify-center items-center icon-gradient rounded-md"
      >
        <slot name="icon" />
      </aside>
      <!-- info -->
      <article>
        <!-- title -->
        <h2 class="text-base font-semibold">
          <slot name="title" />
        </h2>
        <!-- text -->
        <p class="text-secondary">
          <slot name="description" />
        </p>
      </article>
    </li>
  </ul>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>