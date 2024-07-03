<template>
  <article class="min-w-full lg:pt-[75px] lg:-mt-[75px] pt-[125px] -mt-[125px] container relative flex flex-col gap-4 docs-content">
    <h1 class="text-xl font-semibold docs-title">
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
