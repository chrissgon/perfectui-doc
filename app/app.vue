<template>
  <!-- The toggle and the picker move into SiteHeader with T-sh-4. -->
  <div>
    <div class="fixed top-3 right-3 z-10 flex">
      <ThemePicker />
      <ModeToggle />
    </div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// Mode and theme before first paint (library docs/darkmode.md, "Avoiding the flash"): the
// cookie sets data-pui-mode and the session colour sets --pui-theme before any stylesheet.
// No cookie leaves the attribute absent, so the page follows the system (EDGE-4).
const noFlash = `(function(d){var e=d.documentElement,m=d.cookie.match(/(?:^|; )pui-mode=(light|dark)/);if(m)e.setAttribute("data-pui-mode",m[1]);try{var t=sessionStorage.getItem("pui-theme");if(t)e.style.setProperty("--pui-theme",t)}catch(_){}})(document)`;

useHead({
  script: [{ innerHTML: noFlash, tagPriority: "critical", tagPosition: "head" }],
});
</script>
