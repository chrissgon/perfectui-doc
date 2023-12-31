<template>
  <button
    aria-label="Dark Mode"
    class="h-fit"
    @click="changeTheme"
  >
    <i
      class="bi text-lg leading-none"
      :class="isDark ? 'bi-moon' : 'bi-brightness-high'"
    />
    <!--  -->
  </button>
</template>

<script setup lang="ts">
import { setMode } from "@chrissgon/perfectui";

// computed
const getTheme = computed<"dark" | "light">(() =>
  isDark.value ? "dark" : "light"
);

// data
const isDark = useCookie("darkmode", {
  default: () => false,
});

// methods
function changeTheme(): void {
  isDark.value = !isDark.value;
  setMode(getTheme.value);
}

// setup
if (process.client) {
  setMode(getTheme.value);
}
</script>

<style scoped></style>
