<template>
  <!-- item -->
  <a class="list">
    <li class="list-item !flex items-center gap-5 !py-4 md:max-w-sm">
      <!-- icon -->
      <AtomIconGradient>
        <slot name="icon" />
      </AtomIconGradient>
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
  </a>
</template>

<script setup lang="ts"></script>

<style scoped></style>
