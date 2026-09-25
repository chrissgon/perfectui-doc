<template>
  <!-- Rendered after hydration only: without JavaScript there is nothing to copy with. -->
  <span class="absolute top-2 right-2">
    <button
      v-if="mounted"
      type="button"
      :class="['pui-btn pui-link size-8 justify-center p-0', copied ? 'pui-success' : 'pui-surface']"
      :aria-label="copied ? 'Copied' : 'Copy code'"
      :title="copied ? 'Copied' : 'Copy code'"
      @click="onCopy"
    >
      <SiteIcon :name="copied ? 'check' : 'copy'" class="size-4" />
    </button>
    <span role="status" class="sr-only">{{ copied ? "Copied" : "" }}</span>
  </span>
</template>

<script setup lang="ts">
// The copy icon inside a code block (user review 2026-09-25, as on the 0.23 site): copies the
// block's text, shows a green check for 1500 ms, and selects the code when no copy works. The
// parent is positioned and keeps room on the right for the button.
const props = defineProps<{ text: string; target?: HTMLElement | null }>();

const mounted = ref(false);
onMounted(() => (mounted.value = true));
const { copied, copy } = useCopy(1500);

async function onCopy() {
  if (await copy(props.text)) return;
  if (props.target) window.getSelection()?.selectAllChildren(props.target);
}
</script>
