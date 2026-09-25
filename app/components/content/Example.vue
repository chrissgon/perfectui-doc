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
      <button type="button" :class="['pui-btn pui-link ml-auto', copied ? 'pui-success' : 'pui-surface']" @click="onCopy">
        {{ copied ? "Copied" : "Copy" }}
      </button>
      <span role="status" class="sr-only">{{ copied ? "Copied" : "" }}</span>
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
      :class="['p-4 font-mono', stacked ? 'max-h-56 overflow-y-auto border-t text-[13px]' : 'text-sm']"
      :tabindex="stacked ? 0 : undefined"
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
// `stacked` (the landing's showcase, ExampleRef): preview above code, no tabs and no copy; its
// code has a maximum height and scrolls vertically, so the four cells stay the same height (user
// review 2026-09-25), which makes it a focusable, named scroll region.
const props = withDefaults(defineProps<{ layout?: "tabs" | "stacked" }>(), { layout: "tabs" });
const stacked = computed(() => props.layout === "stacked");
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

// "Copied" in green for 1500 ms (approved design); when no copy works the code is selected.
const { copied, copy } = useCopy(1500);
const codePanel = ref<HTMLElement | null>(null);
async function onCopy() {
  if (await copy(snippet.value)) return;
  active.value = "code";
  await nextTick();
  const pre = codePanel.value?.querySelector("pre");
  if (pre) window.getSelection()?.selectAllChildren(pre);
}
</script>

<style scoped>
.example-canvas {
  background-image: radial-gradient(var(--pui-border) 1px, transparent 1px);
  background-size: 16px 16px;
}
/* Long lines wrap, so the code panel never scrolls (user review, 2026-09-25). */
.example :deep(pre) {
  margin: 0;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
</style>
