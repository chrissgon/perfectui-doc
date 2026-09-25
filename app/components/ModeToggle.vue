<template>
  <button
    type="button"
    class="pui-btn pui-link pui-surface px-2.5 max-sm:px-1.5"
    :data-mode="mode"
    :aria-label="label"
    :title="label"
    @click="cycle"
  >
    <!-- Lucide sun, moon and monitor (handoff assets); the icon shows the current mode. -->
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <template v-if="mode === 'light'">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </template>
      <path v-else-if="mode === 'dark'" d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
      <template v-else>
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </template>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { getMode, setMode, type Mode } from "@chrissgon/perfectui/mode";

// REQ-8: light → dark → system; the label names the mode a click switches to.
const next: Record<Mode, Mode> = { light: "dark", dark: "system", system: "light" };

// The prerendered HTML cannot know the cookie, so the toggle starts at "system" and reads
// the stored mode after hydration (EDGE-5); the page itself was already patched by the head script.
const mode = ref<Mode>("system");
onMounted(() => {
  mode.value = getMode();
});

const label = computed(() => `Switch to ${next[mode.value]} mode`);

function cycle() {
  mode.value = next[mode.value];
  setMode(mode.value);
}
</script>
