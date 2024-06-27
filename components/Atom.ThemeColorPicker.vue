<template>
  <label
    for="color"
    class="rounded-full overflow-hidden field-group cursor-pointer !flex-initial"
  >
    <input
      id="color"
      v-model="hex"
      type="color"
      name="color"
      class="w-6 h-6 cursor-pointer"
      @change="changeThemeColor"
    />
  </label>
</template>

<script setup lang="ts">
import { setThemeColor } from "@chrissgon/perfectui";
import Values from "values.js";

// data
const chan = new BroadcastChannel("color:change");
const hex = ref<string>(
  process.client ? sessionStorage.getItem("themeColor") ?? "#07b6f0" : "#07b6f0"
);

// methods
async function changeThemeColor(): Promise<void> {
  sessionStorage.setItem("themeColor", hex.value);
  chan.postMessage(hex.value);

  const palette = new Values(hex.value).all(18);

  const tones = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  const theme: any = {};
  for (const tone in palette) {
    const { rgb } = palette[tone];
    theme[tones[tone]] = rgb;
  }

  setThemeColor(theme);
}

// setup
chan.onmessage = ({ data }) => {
  if (data === hex.value) return;

  hex.value = data;
};
</script>

<style scoped></style>
