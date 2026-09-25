<template>
  <!-- The handoff's mark and wordmark with fill="currentColor", so they follow the mode;
       the markup is the repository's own asset. -->
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span aria-hidden="true" class="site-logo inline-flex" v-html="svg" />
</template>

<script setup lang="ts">
import mark from "~/assets/logo/mark.svg?raw";
import wordmark from "~/assets/logo/wordmark.svg?raw";

const props = defineProps<{ variant: "mark" | "wordmark" }>();
const svg = computed(() => (props.variant === "mark" ? mark : wordmark));
</script>

<style scoped>
.site-logo :deep(svg) {
  height: 100%;
  width: auto;
}
</style>
