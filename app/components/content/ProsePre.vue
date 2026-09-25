<template>
  <!-- A code block scrolls sideways when a line is long, so outside an example block (which has
       its own focusable panel) it is focusable and named, as WCAG asks of a scroll region. -->
  <pre
    :class="$props.class"
    :tabindex="inExample ? undefined : 0"
    :aria-label="inExample ? undefined : `${language ?? 'Code'} example`"
  ><slot /></pre>
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
const inExample = inject("in-example", false);
</script>

<style>
pre code .line {
  display: block;
}
</style>
