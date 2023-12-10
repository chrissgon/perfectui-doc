<template>
  <div class="p-5 sm:p-10">
    <section
      class="p-10 pt-5 py-15 border sm:border-solid rounded-2xl border-secondary"
    >
      <header class="flex justify-between mb-10">
        <img src="/logo.svg" alt="PerfectUI Logo" width="100" class="logo" />

        <aside class="flex gap-5">
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
        <h1 class="text-3xl sm:text-5xl font-bold max-w-2xl">
          An modern framework for crafting elegant interfaces
        </h1>
        <p class="text-base max-w-2xl">
          PerfectUI's goal is to provide the bare minimum for creating
          applications, with the aim of being lightweight and customizable.
        </p>

        <div class="flex flex-wrap gap-5">
          <a href="#started" class="btn btn-black flex-1">
            Get Started
            <i class="bi bi-rocket-takeoff-fill text-base leading-none"></i>
          </a>
          <a href="#why" class="btn btn-white flex-1">Why PerfectUI?</a>
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
            class="relative min-w-[40px] min-h-[40px] flex justify-center items-center bg-secondary rounded-md"
          >
            <i class="bi-moon-stars text-md"></i>
          </aside>
          <!-- info -->
          <article>
            <!-- title -->
            <h2 class="text-base font-semibold">Darkmode & Theme Helpers</h2>
            <!-- text -->
            <p>
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
            class="relative min-w-[40px] min-h-[40px] flex justify-center items-center bg-secondary rounded-md"
          >
            <i class="bi-bounding-box text-md"></i>
          </aside>
          <!-- info -->
          <article>
            <!-- title -->
            <h2 class="text-base font-semibold">Fully responsive components</h2>
            <!-- text -->
            <p>
              All components are responsive, providing a better user experience.
            </p>
          </article>
        </li>
      </ul>
      <ul class="list">
        <li class="list-item !flex items-center gap-5 !py-4 max-w-sm">
          <!-- icon -->
          <aside
            class="relative min-w-[40px] min-h-[40px] flex justify-center items-center bg-secondary rounded-md"
          >
            <i class="bi-lightning text-md"></i>
          </aside>
          <!-- info -->
          <article>
            <!-- title -->
            <h2 class="text-base font-semibold">Lightweight & Customizable</h2>
            <!-- text -->
            <p>
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
import pkg from "./package.json"
import { setTheme } from "@chrissgon/perfectui";
import "@chrissgon/perfectui/dist/perfectui.css";

// computed
const getTheme = computed<"dark" | "light">(() =>
  isDark.value ? "dark" : "light"
);

// data
const isDark = useCookie("darkmode", {
  default: () => false,
});

// setup
setTheme(getTheme.value);
if (process.client) {
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
</script>

<style scoped>
.dark .logo {
  filter: invert(1);
}
</style>
