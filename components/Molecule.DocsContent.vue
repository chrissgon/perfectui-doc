<template>
  <article
    class="docs-content container min-w-full relative flex flex-col gap-4"
  >
    <h1 class="text-xl font-semibold docs-title">
      <slot name="title" />
    </h1>
    <slot />
  </article>
</template>

<script setup lang="ts"></script>

<style>
.container > p {
  color: rgb(var(--contentSecondary));
}
</style>
