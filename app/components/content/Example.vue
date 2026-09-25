<template>
  <div
    data-example
    :class="stacked ? 'example flex h-full flex-col' : 'example my-6 overflow-hidden rounded-[9px] border'"
    style="border-color: var(--pui-border)"
  >
    <div v-if="!stacked" class="flex items-center border-b px-3" style="border-color: var(--pui-border)">
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
      :role="stacked ? undefined : 'tabpanel'"
      :aria-labelledby="stacked ? undefined : `${uid}-preview-tab`"
      :hidden="!stacked && active !== 'preview'"
      :class="['example-canvas overflow-x-auto', stacked ? 'grid min-h-44 flex-1 place-items-center px-[clamp(16px,4vw,48px)] py-6' : 'p-8']"
    >
      <!-- The snippet is the page author's own Markdown, rendered at build time (ADR-0002). -->
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div ref="previewEl" class="flex flex-wrap items-center justify-center gap-3" v-html="preview" />
    </div>
    <div
      :id="`${uid}-code`"
      ref="codePanel"
      data-example-code
      :role="stacked ? undefined : 'tabpanel'"
      :aria-labelledby="stacked ? undefined : `${uid}-code-tab`"
      :hidden="!stacked && active !== 'code'"
      :class="['overflow-x-auto p-4 font-mono', stacked ? 'max-h-40 overflow-y-auto border-t text-[13px]' : 'text-sm']"
      tabindex="0"
      :aria-label="stacked ? 'Example code' : undefined"
      style="background: var(--pui-bg-emphasis)"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VNode } from "vue";
import { scopeExample } from "#shared/example-scope";

// ADR-0002: one fenced block in the default slot gives the live preview (the raw text kept in
// the rendered <pre>'s `code` prop) and the code tab (the slot, highlighted at build time).
// `stacked` (the landing's showcase, ExampleRef): preview above code, no tabs and no copy.
const props = withDefaults(defineProps<{ lang?: string; layout?: "tabs" | "stacked" }>(), { lang: "html", layout: "tabs" });
const stacked = computed(() => props.layout === "stacked");
// The code panel is the focusable region; the block's own <pre> need not be (ProsePre).
provide("in-example", true);
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
// The live preview gets its own ids and group names, so two examples on a page never open each
// other's overlays; the code tab and the copy keep the author's HTML.
const preview = computed(() => scopeExample(snippet.value, uid.replace(/[^\w-]/g, "")));

// Hydration re-assigns v-html, so the preview's elements are new after mount, and the library's
// indeterminate fallback only applies itself at load and on the next pointer or focus event. The
// block applies the attribute to its own checkboxes, as the library documents it.
const previewEl = ref<HTMLElement | null>(null);
function applyIndeterminate() {
  for (const box of previewEl.value?.querySelectorAll<HTMLInputElement>("input[type=checkbox][indeterminate]") ?? []) {
    box.indeterminate = true;
  }
}
onMounted(applyIndeterminate);
watch(preview, () => nextTick(applyIndeterminate));

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
