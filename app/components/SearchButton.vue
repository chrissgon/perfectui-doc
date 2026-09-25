<template>
  <button
    type="button"
    class="pui-btn pui-outline pui-surface gap-6 px-2.5 max-lg:size-9 max-lg:justify-center max-lg:p-0"
    :aria-label="`Search (${shortcut})`"
    @click="open()"
  >
    <span class="flex items-center gap-2"><SiteIcon name="search" /><span class="max-lg:hidden">Search</span></span>
    <kbd class="rounded border px-1.5 py-0.5 font-mono text-xs max-lg:hidden" style="border-color: var(--pui-border)">{{ shortcut }}</kbd>
  </button>
  <!-- Loaded on first open: the dialog, the search code and MiniSearch are their own chunks (NFR-2). -->
  <LazySearchDialog v-if="wanted" ref="dialog" :version="version" />
</template>

<script setup lang="ts">
import { latestVersion, versions } from "~/versions";

// Search REQ-1: the header button, `/` outside text fields, Cmd+K or Ctrl+K, and `#search=<query>`
// open the dialog; the version is the one being read, or the latest on the landing (REQ-4).
const route = useRoute();
const version = computed(() => versions.find((v) => route.path.startsWith(`/docs/${v.id}`))?.id ?? latestVersion.id);

const dialog = ref<{ open: (query?: string) => void } | null>(null);
const shortcut = ref("Ctrl K");
const wanted = ref(false);
let pending: string | undefined;

function open(query?: string) {
  if (dialog.value) return dialog.value.open(query);
  pending = query;
  wanted.value = true;
}
// The first open waits for the dialog's chunk, then opens it.
watch(dialog, (component) => component?.open(pending));

// A text field keeps its slash (EDGE-8).
const typing = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

function onKeydown(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    open();
  } else if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey && !typing(event.target)) {
    event.preventDefault();
    open();
  }
}

onMounted(() => {
  if (/Mac|iPhone|iPad/.test(navigator.platform)) shortcut.value = "⌘K";
  window.addEventListener("keydown", onKeydown);
});
// After hydration: a dialog opened while the page hydrates is closed again.
onNuxtReady(() => {
  const hash = /^#search=(.*)$/.exec(location.hash);
  if (hash) open(decodeURIComponent(hash[1]!));
});
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>
