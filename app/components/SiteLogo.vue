<template>
  <!-- The handoff's wordmark with fill="currentColor", so it follows the mode;
       the markup is the repository's own asset. -->
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span aria-hidden="true" class="site-logo inline-flex" v-html="svg" />
</template>

<script setup lang="ts">
import wordmark from "~/assets/logo/wordmark.svg?raw";

// The site shows the wordmark only (user, 2026-09-25); the mark lives on as the favicon.
defineProps<{ variant: "wordmark" }>();
const svg = wordmark;
</script>

<style scoped>
.site-logo :deep(svg) {
  height: 100%;
  width: auto;
}
</style>
