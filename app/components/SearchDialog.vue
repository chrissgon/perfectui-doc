<template>
  <dialog ref="dialog" class="pui-modal search-dialog" aria-label="Search the documentation" closedby="any" @close="query = ''">
    <div class="pui-card flex h-full max-h-[inherit] flex-col">
      <div class="flex items-center gap-2.5 border-b p-3" style="border-color: var(--pui-border)">
        <div class="pui-input-group min-w-0 flex-1">
          <span class="pui-addon"><SiteIcon name="search" /></span>
          <input
            ref="input"
            v-model="query"
            class="pui-input"
            type="search"
            :placeholder="`Search ${version} docs`"
            :aria-label="`Search ${version} docs`"
            :aria-controls="listId"
            :aria-activedescendant="selectedId"
            autocomplete="off"
            spellcheck="false"
            @keydown="onKeydown"
          >
        </div>
        <button type="button" class="pui-btn pui-link pui-surface px-2.5" aria-label="Close search" @click="close">
          <SiteIcon name="x" />
        </button>
      </div>

      <div :id="listId" role="listbox" aria-label="Results" class="min-h-0 flex-1 overflow-y-auto p-2">
        <div v-if="state === 'loading'" aria-busy="true" class="flex flex-col gap-3 px-2 py-3">
          <span class="text-sm" style="color: var(--pui-text-muted)">Loading the search index</span>
          <span v-for="w in ['62%', '80%', '48%']" :key="w" class="h-3 rounded" :style="{ width: w, background: 'var(--pui-bg-muted)' }" />
        </div>
        <div v-else-if="state === 'unavailable'" class="flex flex-col items-center gap-3 px-2 py-7 text-center text-sm" style="color: var(--pui-text-muted)">
          <span>Search is unavailable</span>
          <button type="button" class="pui-btn pui-outline pui-surface" @click="retry">Retry</button>
        </div>
        <p v-else-if="prepared && !results.length" class="m-0 px-2 py-7 text-center text-sm" style="color: var(--pui-text-muted)">
          No results for '{{ prepared }}'
        </p>
        <template v-else>
          <div v-for="group in groups" :key="group.title" role="group" :aria-label="group.title" class="pt-1 pb-2">
            <div class="px-2.5 py-1.5 text-xs font-semibold tracking-[0.08em] uppercase" style="color: var(--pui-text-muted)">{{ group.title }}</div>
            <NuxtLink
              v-for="item in group.items"
              :id="optionId(item.index)"
              :key="item.result.id"
              :to="item.result.url"
              role="option"
              :aria-selected="item.index === selected"
              tabindex="-1"
              :class="['flex flex-col gap-0.5 rounded-md border px-2.5 py-2', item.index === selected ? 'pui-soft pui-theme' : '']"
              :style="{ borderColor: item.index === selected ? 'var(--pui-theme)' : 'transparent', color: 'var(--pui-text)' }"
              @click="close"
              @mousemove="selected = item.index"
            >
              <span class="text-sm font-semibold">{{ item.result.heading || item.result.title }}</span>
              <!-- The snippet is escaped page text with <mark> added (shared/search-query.ts). -->
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span class="search-snippet text-[13px] leading-normal" style="color: var(--pui-text-muted)" v-html="item.result.snippet" />
            </NuxtLink>
          </div>
        </template>
      </div>

      <div class="flex flex-wrap gap-x-5 gap-y-2 border-t px-4 py-2.5 text-xs max-sm:hidden" style="border-color: var(--pui-border); color: var(--pui-text-muted)">
        <span class="flex items-center gap-1.5"><kbd>↑</kbd><kbd>↓</kbd>to move</span>
        <span class="flex items-center gap-1.5"><kbd>Enter</kbd>to open</span>
        <span class="flex items-center gap-1.5"><kbd>Esc</kbd>to close</span>
      </div>
      <p aria-live="polite" class="sr-only">{{ announcement }}</p>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { prepareQuery, type SearchResult } from "#shared/search-query";

// Search design: SearchDialog on pui-modal (approved export). The index loads on the first
// open; states are empty (input only), loading, results, no results, unavailable with Retry.
const props = defineProps<{ version: string }>();
const version = toRef(props, "version");
const { state, query, results, open: load, retry } = useSearch(version);

const dialog = ref<HTMLDialogElement | null>(null);
const input = ref<HTMLInputElement | null>(null);
const listId = useId();

const prepared = computed(() => prepareQuery(query.value));
// Grouped by page in result order; `index` is the item's position in the displayed order, which
// the arrow keys, the pointer and Enter all use.
const groups = computed(() => {
  const byTitle = new Map<string, { title: string; items: { result: SearchResult; index: number }[] }>();
  for (const result of results.value) {
    if (!byTitle.has(result.title)) byTitle.set(result.title, { title: result.title, items: [] });
    byTitle.get(result.title)!.items.push({ result, index: 0 });
  }
  let index = 0;
  for (const group of byTitle.values()) for (const item of group.items) item.index = index++;
  return [...byTitle.values()];
});
const flat = computed(() => groups.value.flatMap((g) => g.items.map((i) => i.result)));
const selected = ref(0);
const optionId = (index: number) => `${listId}-${index}`;
const selectedId = computed(() => (flat.value.length ? optionId(selected.value) : undefined));

watch(results, () => (selected.value = 0));

const announcement = computed(() => {
  const result = flat.value[selected.value];
  return result ? `${selected.value + 1} of ${flat.value.length}: ${result.title}${result.heading ? `, ${result.heading}` : ""}` : "";
});

function onKeydown(event: KeyboardEvent) {
  if (!flat.value.length) return;
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const step = event.key === "ArrowDown" ? 1 : flat.value.length - 1;
    selected.value = (selected.value + step) % flat.value.length;
    document.getElementById(selectedId.value!)?.scrollIntoView({ block: "nearest" });
  } else if (event.key === "Enter") {
    event.preventDefault();
    const result = flat.value[selected.value];
    if (result) {
      close();
      void navigateTo(result.url);
    }
  }
}

function open(initial = "") {
  if (initial) query.value = initial;
  if (!dialog.value?.open) dialog.value?.showModal();
  input.value?.focus();
  void load();
}

function close() {
  dialog.value?.close();
}

defineExpose({ open, close });
</script>

<style scoped>
/* Full screen below 640 px (approved export at 360 px); a centred panel above. */
.search-dialog {
  width: min(640px, calc(100vw - 32px));
  max-width: min(640px, calc(100vw - 32px));
  height: min(560px, calc(100vh - 96px));
  max-height: min(560px, calc(100vh - 96px));
  margin: 72px auto auto;
}
@media (max-width: 639px) {
  .search-dialog {
    width: 100vw;
    max-width: 100vw;
    height: 100dvh;
    max-height: 100dvh;
    margin: 0;
  }
}
kbd {
  padding: 3px 6px;
  border: 1px solid var(--pui-border);
  border-radius: 4px;
  font: 12px/1 var(--font-mono);
  color: var(--pui-text);
}
.search-snippet :deep(mark) {
  padding: 0 2px;
  border-radius: 3px;
  background: color-mix(in oklab, var(--pui-theme) 18%, transparent);
  color: var(--pui-text);
  font-weight: 600;
}
</style>
