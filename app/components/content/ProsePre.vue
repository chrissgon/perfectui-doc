<template>
  <!-- Long lines wrap (prose.css), so a code block is never a scroll region to focus. -->
  <pre :class="$props.class"><slot /></pre>
</template>

<script setup lang="ts">
// MDC's ProsePre (same props, so the example block still reads `code` from the vnode).
defineProps<{
  code?: string;
  language?: string | null;
  filename?: string | null;
  highlights?: number[];
  meta?: string | null;
  class?: string | null;
}>();
</script>

<style>
pre code .line {
  display: block;
}
</style>
