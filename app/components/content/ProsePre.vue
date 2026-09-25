<template>
  <!-- Long lines wrap (prose.css), so a code block is never a scroll region to focus. Outside an
       example block (which has its own Copy) the block carries a copy icon. -->
  <pre v-if="inExample" :class="$props.class"><slot /></pre>
  <div v-else class="code-block relative">
    <pre ref="pre" :class="$props.class"><slot /></pre>
    <CodeCopyButton :text="code ?? ''" :target="pre" />
  </div>
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
const pre = ref<HTMLElement | null>(null);
</script>

<style>
pre code .line {
  display: block;
}
</style>
