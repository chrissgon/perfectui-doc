<template>
  <div class="p-5 sm:p-10 gradient-background">
    <section
      class="p-10 pt-5 py-15 border sm:border-solid rounded-2xl border-secondary"
    >
      <header class="flex justify-between mb-10">
        <img src="/logo.svg" alt="PerfectUI Logo" width="100" class="logo" />

        <aside class="flex gap-5">
          <label id="color" class="field-group">
            <div
              class="w-6 h-6 rounded-full"
              :style="{ background: hex }"
            ></div>
            <input
              v-model="hex"
              @change="changeThemeColor"
              type="color"
              name="color"
              class="invisible w-0"
            />
          </label>
          <button @click="changeTheme">
            <i v-if="isDark" class="bi bi-moon text-lg leading-none"></i>
            <i
              v-if="!isDark"
              class="bi bi-brightness-high text-lg leading-none"
            ></i>
          </button>
          <a href="https://github.com/chrissgon/perfectui" target="_blank"
            ><i class="bi-github text-2xl leading-none"></i
          ></a>
        </aside>
      </header>

      <main
        class="text-center flex flex-col justify-center items-center gap-10"
      >
        <h1 class="text-5xl max-sm:!text-4xl font-bold max-w-2xl text-gradient">
          An modern framework for crafting elegant interfaces
        </h1>
        <p class="text-base max-w-2xl">
          PerfectUI's goal is to provide the bare minimum for creating
          applications, with the aim of being lightweight and customizable.
        </p>

        <div class="flex flex-wrap gap-5">
          <a href="#started" class="btn btn-solid-primary flex-1">
            Get Started
            <i class="bi bi-rocket-takeoff-fill text-base leading-none"></i>
          </a>
          <a href="#why" class="btn btn-white !border-none flex-1"
            >Why PerfectUI?</a
          >
        </div>
      </main>
    </section>

    <section
      id="why"
      class="flex justify-center items-center max-md:flex-wrap gap-5 mt-5 pt-5"
    >
      <!-- item -->
      <ul class="list">
        <li class="list-item !flex items-center gap-5 !py-4 max-w-sm">
          <!-- icon -->
          <aside
            class="relative min-w-[40px] min-h-[40px] flex justify-center items-center icon-gradient rounded-md"
          >
            <i class="bi-moon-stars text-md text-theme-500"></i>
          </aside>
          <!-- info -->
          <article>
            <!-- title -->
            <h2 class="text-base font-semibold">Darkmode & Theme Helpers</h2>
            <!-- text -->
            <p class="text-secondary">
              PerfectUI offers all components with dark mode and helpers for
              setting theme and colors.
            </p>
          </article>
        </li>
      </ul>
      <ul class="list">
        <li class="list-item !flex items-center gap-5 !py-4 max-w-sm">
          <!-- icon -->
          <aside
            class="relative min-w-[40px] min-h-[40px] flex justify-center items-center icon-gradient rounded-md"
          >
            <i class="bi-bounding-box text-md text-theme-500"></i>
          </aside>
          <!-- info -->
          <article>
            <!-- title -->
            <h2 class="text-base font-semibold">Fully responsive components</h2>
            <!-- text -->
            <p class="text-secondary">
              All components are responsive, providing a better user experience.
            </p>
          </article>
        </li>
      </ul>
      <ul class="list">
        <li class="list-item !flex items-center gap-5 !py-4 max-w-sm">
          <!-- icon -->
          <aside
            class="relative min-w-[40px] min-h-[40px] flex justify-center items-center icon-gradient rounded-md"
          >
            <i class="bi-lightning text-lg text-theme-500"></i>
          </aside>
          <!-- info -->
          <article>
            <!-- title -->
            <h2 class="text-base font-semibold">Lightweight & Customizable</h2>
            <!-- text -->
            <p class="text-secondary">
              PerfectUI was designed with the aim of providing a minimal and
              customizable basis for developing interfaces.
            </p>
          </article>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import pkg from "./package.json";
import { setTheme, setThemeColor } from "@chrissgon/perfectui";
import "@chrissgon/perfectui/dist/perfectui.css";
import Values from "values.js";

// computed
const getTheme = computed<"dark" | "light">(() =>
  isDark.value ? "dark" : "light"
);

// data
const isDark = useCookie("darkmode", {
  default: () => false,
});
const hex = ref<string>("#07b6f0");

// setup
if (process.client) {
  setTheme(getTheme.value);
  useSeoMeta({
    description: pkg.description,
    ogTitle: pkg.displayName,
    ogDescription: pkg.description,
    ogImage: "/thumb.png",
    ogUrl: location.origin,
    twitterTitle: pkg.displayName,
    twitterDescription: pkg.description,
    twitterImage: "/thumb.png",
    twitterCard: "summary_large_image",
  });
}

// methods
function changeTheme(): void {
  isDark.value = !isDark.value;
  setTheme(getTheme.value);
}
async function changeThemeColor(): Promise<void> {
  const pallete = new Values(hex.value).all(18);

  const tones = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  const theme: any = {};
  for (const tone in pallete) {
    const { rgb } = pallete[tone];
    theme[tones[tone]] = rgb;
  }

  console.log(theme);

  setThemeColor(theme);
}
</script>

<style>
.dark .logo {
  filter: invert(1);
}

input[type="color"] {
  -webkit-appearance: none;
  outline: none !important;
}
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type="color"]::-webkit-color-swatch {
  border: none;
}

:root {
  --backgroundGradientPrimary: var(--theme50);
  --textGradientPrimary: var(--theme400);
  --textGradientSecondary: var(--theme950);
}

.dark {
  --backgroundGradientPrimary: var(--theme950);
  --textGradientPrimary: var(--theme400);
  --textGradientSecondary: var(--theme50);
}

body {
  background: linear-gradient(
    150deg,
    rgb(var(--backgroundGradientPrimary)),
    rgb(var(--backgroundPrimary)),
    rgb(var(--backgroundPrimary)),
    rgb(var(--backgroundGradientPrimary))
  );
  background-size: 100% 100%;
  min-height: 100vh;
}

.text-gradient {
  background: linear-gradient(
    150deg,
    rgb(var(--textGradientPrimary)),
    rgb(var(--textGradientSecondary))
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.icon-gradient {
  background: linear-gradient(
    150deg,
    rgb(var(--backgroundGradientPrimary)),
    rgb(var(--backgroundPrimary)) /* rgb(var(--backgroundGradientPrimary)) */
  );
}
</style>
