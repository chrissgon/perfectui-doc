<template>
  <article class="min-w-full container relative flex flex-col gap-4">
    <h1 class="text-xl font-semibold">
      <slot name="title" />
    </h1>
    <slot />
  </article>
</template>

<script setup lang="ts"></script>

<style>
.container  > p {
  color: rgb(var(--contentSecondary));
}
</style>
