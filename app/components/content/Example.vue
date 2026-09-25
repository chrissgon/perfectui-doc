<template>
  <div data-example class="my-6">
    <div data-example-preview>
      <!-- The snippet is the page author's own Markdown, rendered at build time. -->
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="snippet" />
    </div>
    <div data-example-code>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VNode } from "vue";

// ADR-0002, option A: the author writes one fenced block in the default slot; Nuxt Content
// renders it as a highlighted <pre> whose `code` prop keeps the raw text, which becomes the
// live preview. The code tab is the slot itself, highlighted by Shiki at build time.
const slots = useSlots();

function findCode(nodes: VNode[]): string | undefined {
  for (const node of nodes) {
    const code = (node.props as { code?: unknown } | null)?.code;
    if (typeof code === "string") return code;
    if (Array.isArray(node.children)) {
      const found = findCode(node.children as VNode[]);
      if (found) return found;
    }
  }
  return undefined;
}

const snippet = computed(() => findCode(slots.default?.() ?? [])?.trim() ?? "");
</script>
