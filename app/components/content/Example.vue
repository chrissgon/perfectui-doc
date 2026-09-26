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
    <!-- The showcase's code scrolls under a copy icon that stays in its corner. -->
    <div v-if="stacked" class="relative border-t" style="border-color: var(--pui-border)">
      <div
        :id="`${uid}-code`"
        ref="codePanel"
        data-example-code
        class="h-56 overflow-y-auto p-4 pr-12 font-mono text-[13px]"
        tabindex="0"
        aria-label="Example code"
        style="background: var(--pui-bg-emphasis)"
      >
        <slot />
      </div>
      <CodeCopyButton :text="snippet" :target="codePanel" class="right-4" />
    </div>
    <div
      v-else
      :id="`${uid}-code`"
      ref="codePanel"
      data-example-code
      role="tabpanel"
      :aria-labelledby="`${uid}-code-tab`"
      :hidden="active !== 'code'"
      class="p-4 font-mono text-sm"
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
// code has one fixed height and scrolls vertically, so every row of the showcase lines up whatever
// the snippet's length (user review 2026-09-25); a scroll region, so focusable and named.
const props = withDefaults(defineProps<{ layout?: "tabs" | "stacked" }>(), { layout: "tabs" });
const stacked = computed(() => props.layout === "stacked");
// The block has its own copy control; its <pre> needs no copy icon (ProsePre).
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

// Hydration re-assigns v-html, so the preview's elements are new after mount. perfectui 1.0.0
// applies the attribute to checkboxes inserted later (ADR-0001), but without this block the
// site's "indeterminate checkbox example" test still failed about one run in three under a
// parallel load (2026-09-26); kept until that is explained (docs/product/ideas.md, IDEA-4).
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
