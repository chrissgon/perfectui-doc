<template>
  <section class="flex items-center max-lg:flex-col gap-10 p-5 sm:p-10">
    <header class="flex flex-col gap-3">
      <!-- icon -->
      <AtomIconGradient>
        <slot name="icon" />
      </AtomIconGradient>

      <!-- subtitle -->
      <h4 class="text-base font-medium text-theme">
        <slot name="subtitle" />
      </h4>
      <!-- title -->
      <h2 class="text-3xl font-bold">
        <slot name="title" />
      </h2>
      <!-- text -->
      <slot />
    </header>
    <article class="flex flex-1 gap-4 p-4">
      <slot name="widget" />
    </article>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
