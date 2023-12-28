<template>
  <label
    id="color"
    class="field-group cursor-pointer !flex-initial"
  >
    <div
      class="w-6 h-6 rounded-full"
      :style="{ background: hex }"
    />
    <input
      v-model="hex"
      type="color"
      name="color"
      class="invisible w-0"
      @change="changeThemeColor"
    >
  </label>
</template>

<script setup lang="ts">
import { setThemeColor } from "@chrissgon/perfectui";
import Values from "values.js";

// data
const hex = ref<string>("#07b6f0");

// methods
async function changeThemeColor(): Promise<void> {
  const pallete = new Values(hex.value).all(18);

  const tones = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  const theme: any = {};
  for (const tone in pallete) {
    const { rgb } = pallete[tone];
    theme[tones[tone]] = rgb;
  }

  setThemeColor(theme);
}
</script>

<style scoped></style>
