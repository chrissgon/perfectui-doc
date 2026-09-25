<template>
  <div class="inline-flex">
    <button
      type="button"
      class="pui-btn pui-link pui-surface px-2.5 max-sm:px-1.5"
      aria-label="Theme colour"
      title="Theme colour"
      :popovertarget="panelId"
    >
      <span aria-hidden="true" class="block size-[18px] rounded-full border" :style="swatch('var(--pui-theme)')" />
    </button>
    <div :id="panelId" class="pui-dropdown pui-align-end p-3" popover>
      <div class="flex items-center gap-2">
        <button
          v-for="preset in presets"
          :key="preset.name"
          type="button"
          class="size-6 rounded-full border"
          :style="swatch(preset.value ?? defaultTheme)"
          :aria-label="preset.name"
          :title="preset.name"
          :aria-pressed="current === preset.value"
          @click="apply(preset.value)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// REQ-9: sets --pui-theme on <html> to one of the presets and keeps it for the session under the
// key the head script in app.vue reads (`pui-theme`). The free colour input was removed in the
// user review of 2026-09-25; the site's own text still does not derive from --pui-theme (EDGE-6).
export interface ThemePreset {
  name: string;
  /** A CSS colour, or null for the library's own theme colour. */
  value: string | null;
}

const { presets = [
  { name: "Default", value: null },
  { name: "Violet", value: "#7c3aed" },
  { name: "Success", value: "var(--pui-success)" },
  { name: "Error", value: "var(--pui-error)" },
  { name: "Warn", value: "var(--pui-warn)" },
] } = defineProps<{ presets?: ThemePreset[] }>();

const storageKey = "pui-theme";
const defaultTheme = "light-dark(#0092cd, #07b6f0)";
const panelId = useId();

const current = ref<string | null>(null);

onMounted(() => {
  current.value = sessionStorage.getItem(storageKey);
});

function apply(value: string | null) {
  current.value = value;
  const root = document.documentElement.style;
  if (value === null) {
    root.removeProperty("--pui-theme");
    sessionStorage.removeItem(storageKey);
    return;
  }
  root.setProperty("--pui-theme", value);
  sessionStorage.setItem(storageKey, value);
}

const swatch = (colour: string) => ({ background: colour, borderColor: "var(--pui-border)" });
</script>
