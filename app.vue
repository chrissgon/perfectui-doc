<template>
  <MoleculeCodeWorker />
  <NuxtPage />
</template>

<script setup lang="ts">
import pkg from "./package.json";
import "@chrissgon/perfectui/dist/perfectui.css";

// setup
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
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Fira+Code&display=swap");
@import url("https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/github.min.css");

body,
html {
  overflow-x: initial;
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
}

.dark {
  color-scheme: dark;
  --backgroundGradientPrimary: var(--theme950);
}

.icon {
  display: inline-block;
  vertical-align: middle;
}

body {
  background: linear-gradient(
    195deg,
    rgb(var(--backgroundPrimary)) 5%,
    rgb(var(--backgroundGradientPrimary)) 20%,
    rgb(var(--backgroundPrimary)) 40%
  );
  background-size: 100% 100vh;
  background-repeat: no-repeat;
}

.input {
  width: fit-content !important;
}
.field-group .input {
  width: 1px !important;
}

.icon-gradient {
  background: linear-gradient(
    150deg,
    rgb(var(--backgroundGradientPrimary)),
    rgb(var(--backgroundPrimary))
  );
}

/* code */
/* @media (prefers-color-scheme: light) {
}
@media (prefers-color-scheme: dark) {
  .shiki.material-theme-lighter {
    display: none;
  }
} */

pre *,
code * {
  font-family: "Fira Code";
}

/* code */
/* 

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
  color: #cbd5e1 !important;
}
.token.atrule,
.token.attr-value,
.token.keyword {
  color: #60d3ec !important;
}
.token.punctuation {
  color: #64748b !important;
} */
</style>
