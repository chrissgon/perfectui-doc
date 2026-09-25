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

// The site's own title and description (messaging SECTION-1); T-sh-9 keeps this call.
usePageMeta({
  title: "Perfect UI · The bare minimum for elegant interfaces",
  description:
    "A CSS and JavaScript library with no reset, no font, no runtime dependencies and no rule outside a pui- class; the browser does the work.",
});
</script>
