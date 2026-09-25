<template>
  <div data-example class="example my-6 overflow-hidden rounded-[9px] border" style="border-color: var(--pui-border)">
    <div class="flex items-center border-b px-3" style="border-color: var(--pui-border)">
      <div role="tablist" aria-label="Example" class="flex" @keydown="onKeydown">
        <button
          v-for="tab in tabs"
          :id="`${uid}-${tab}-tab`"
          :key="tab"
          :ref="(el) => (buttons[tab] = el as HTMLButtonElement)"
          type="button"
          role="tab"
          :aria-selected="active === tab"
          :aria-controls="`${uid}-${tab}`"
          :tabindex="active === tab ? 0 : -1"
          class="-mb-px border-b-2 px-3 py-2.5 text-sm"
          :style="{ borderColor: active === tab ? 'var(--pui-theme)' : 'transparent' }"
          @click="active = tab"
        >
          {{ tab === "preview" ? "Preview" : "Code" }}
        </button>
      </div>
      <span class="ml-auto font-mono text-xs" style="color: var(--pui-text-muted)">{{ lang }}</span>
      <button type="button" class="pui-btn pui-link pui-surface ml-3" @click="copy">
        {{ copied ? "Copied" : "Copy" }}
      </button>
    </div>
    <div
      :id="`${uid}-preview`"
      data-example-preview
      role="tabpanel"
      :aria-labelledby="`${uid}-preview-tab`"
      :hidden="active !== 'preview'"
      class="example-canvas overflow-x-auto p-8"
    >
      <!-- The snippet is the page author's own Markdown, rendered at build time (ADR-0002). -->
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="flex flex-wrap items-center justify-center gap-3" v-html="snippet" />
    </div>
    <div
      :id="`${uid}-code`"
      ref="codePanel"
      data-example-code
      role="tabpanel"
      :aria-labelledby="`${uid}-code-tab`"
      :hidden="active !== 'code'"
      class="overflow-x-auto p-4 font-mono text-sm"
      style="background: var(--pui-bg-emphasis)"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VNode } from "vue";

// ADR-0002: one fenced block in the default slot gives the live preview (the raw text kept in
// the rendered <pre>'s `code` prop) and the code tab (the slot, highlighted at build time).
withDefaults(defineProps<{ lang?: string }>(), { lang: "html" });
const slots = useSlots();
const uid = useId();

type Tab = "preview" | "code";
const tabs: Tab[] = ["preview", "code"];
const active = ref<Tab>("preview");
const buttons: Partial<Record<Tab, HTMLButtonElement>> = {};

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

function onKeydown(event: KeyboardEvent) {
  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
  const next = tabs[(tabs.indexOf(active.value) + 1) % tabs.length]!;
  active.value = next;
  buttons[next]?.focus();
}

// "Copied" for 1500 ms (approved design); without clipboard access the code is selected.
const copied = ref(false);
const codePanel = ref<HTMLElement | null>(null);
let timer: ReturnType<typeof setTimeout> | undefined;
async function copy() {
  try {
    await navigator.clipboard.writeText(snippet.value);
    copied.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied.value = false), 1500);
  } catch {
    active.value = "code";
    await nextTick();
    const pre = codePanel.value?.querySelector("pre");
    if (pre) window.getSelection()?.selectAllChildren(pre);
  }
}
onBeforeUnmount(() => clearTimeout(timer));
</script>

<style scoped>
.example-canvas {
  background-image: radial-gradient(var(--pui-border) 1px, transparent 1px);
  background-size: 16px 16px;
}
.example :deep(pre) {
  margin: 0;
  white-space: pre;
}
</style>
