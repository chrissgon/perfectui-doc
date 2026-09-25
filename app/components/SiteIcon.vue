<template>
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path v-for="d in paths[name]" :key="d" :d="d" />
  </svg>
</template>

<script setup lang="ts">
// Lucide icons from the handoff assets (github, figma, ellipsis-vertical) and Lucide's menu.
const paths = {
  github: [
    "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
    "M9 18c-4.51 2-5-2-7-2",
  ],
  figma: [
    "M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z",
    "M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z",
    "M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z",
    "M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z",
    "M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z",
  ],
  ellipsis: ["M12 11.5v1M12 4.5v1M12 18.5v1"],
  menu: ["M4 6h16M4 12h16M4 18h16"],
} as const;

defineProps<{ name: keyof typeof paths }>();
</script>
