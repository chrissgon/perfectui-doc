<template>
  <div class="bg-gradient"></div>
  <div class="bg-guideline"></div>
  <MoleculeCodeWorker />
  <NuxtPage class="relative z-1" />
</template>

<script setup lang="ts">
import pkg from "./package.json";
import "@chrissgon/perfectui/dist/perfectui.css";

// setup
if (process.client) {
  sessionStorage.removeItem("themeColor");

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
</script>

<style>
@import "./assets/highlight.css";
@import url("https://fonts.googleapis.com/css2?family=Fira+Code&display=swap");
@import url("https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github.min.css");

body,
html {
  max-width: 100vw;
  scroll-behavior: smooth;
}

html:has(.nav.opened) ,html:has(.sections.opened) {
  overflow: hidden !important;
}

.dark .logo {
  filter: invert(1);
}

input[type="color"] {
  appearance: none;
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
  --backgroundGuideline: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(0 0 0 / 0.03)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
}

.dark {
  color-scheme: dark;
  --backgroundGradientPrimary: var(--theme950);
  --backgroundGuideline: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.03)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
}

.icon {
  display: inline-block;
  vertical-align: middle;
}

.bg-gradient {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(
    195deg,
    rgb(var(--backgroundPrimary)) 5%,
    rgba(var(--backgroundGradientPrimary), 0.8) 20%,
    rgb(var(--backgroundPrimary)) 40%
  );
  background-size: 100% 100vh;
  background-repeat: no-repeat;
}

.bg-guideline {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-image: var(--backgroundGuideline);
  mask-image: linear-gradient(0deg, transparent, black, black, transparent);
}

.bg-guideline-download {
  mask-image: linear-gradient(35deg, transparent, black, black, transparent);
}

.input {
  width: fit-content !important;
}
.field-group .input {
  width: 1px !important;
}

pre,
code,
pre *,
code * {
  font-family: "Fira Code";
  font-size: 14px;
}

.firacode {
  font-family: "Fira Code";
}

.modal {
  z-index: 4;
}
.z-1 {
  z-index: 1;
}
.z-2 {
  z-index: 2;
}
.z-3 {
  z-index: 3;
}
</style>
