<template>
  <main class="mx-auto max-w-3xl p-8">
    <!-- Placeholder until the landing (T-sh-9); it also proves the cascade layer order:
         the button keeps its fill and w-full wins. -->
    <h1 class="text-4xl font-semibold">Perfect UI</h1>
    <p class="mt-4"><NuxtLink :to="`/docs/${latestVersion.id}`">Documentation</NuxtLink></p>
    <button id="layer-check" class="pui-btn pui-solid pui-theme mt-6 w-full">
      Get started
    </button>
  </main>
</template>

<script setup lang="ts">
import { latestVersion } from "~/versions";
</script>
