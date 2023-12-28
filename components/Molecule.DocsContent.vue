<template>
  <article class="relative flex flex-col gap-4">
    <h1 class="text-xl font-semibold">
      <slot name="title" />
    </h1>
    <slot />
  </article>
</template>

<script setup lang="ts"></script>

<style>
p {
  opacity: 0.7;
}
</style>
