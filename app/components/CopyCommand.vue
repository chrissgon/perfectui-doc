<template>
  <div class="pui-input-group w-[380px] max-w-full font-mono" style="background: var(--pui-bg)">
    <span class="pui-addon">$</span>
    <input ref="input" class="pui-input min-w-0" readonly :value="text" :aria-label="label">
    <!-- Rendered after hydration only: without JavaScript there is nothing to copy with (EDGE-1). -->
    <button
      v-if="mounted"
      type="button"
      :class="['pui-btn pui-link px-3', copied ? 'pui-success' : 'pui-surface']"
      :aria-label="copied ? 'Copied' : `Copy ${label.toLowerCase()}`"
      @click="copy"
    >
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path v-if="copied" d="M20 6 9 17l-5-5" />
        <template v-else>
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </template>
      </svg>
    </button>
    <span role="status" class="sr-only">{{ copied ? "Copied" : "" }}</span>
  </div>
</template>

<script setup lang="ts">
// REQ-3: copies the command; "Copied" for 1800 ms (landing handoff). Without clipboard access
// the command is selected for a manual copy, with no dialog (EDGE-9).
const { text, label = "Install command" } = defineProps<{ text: string; label?: string }>();

const input = ref<HTMLInputElement | null>(null);
const mounted = ref(false);
const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

onMounted(() => (mounted.value = true));
onBeforeUnmount(() => clearTimeout(timer));

async function copy() {
  try {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied.value = false), 1800);
  } catch {
    input.value?.focus();
    input.value?.select();
  }
}
</script>
