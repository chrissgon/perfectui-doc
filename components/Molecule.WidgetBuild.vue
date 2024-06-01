<template>
  <!-- tabs -->
  <OrganismTabs>
    <template #header>
      <div class="flex gap-1">
        <div class="bg-tertiary w-3 h-3 rounded-full"></div>
        <div class="bg-tertiary w-3 h-3 rounded-full"></div>
        <div class="bg-tertiary w-3 h-3 rounded-full"></div>
      </div>
    </template>

    <pre class="w-full overflow-auto p-5"><code
    v-html="CODE_VIEW_BUILD"
    /></pre>
  </OrganismTabs>
</template>

<script setup lang="ts">
// data
const CODE_VIEW_BUILD = `<span class="text-fuchsia-500">$</span> <span class="text-secondary">vite build</span>
<span class="text-theme">vite v5.2.8</span> <span class="text-success">building for production...</span>
<span class="text-success">✓</span> 4 modules transformed.

<span class="text-theme">[vite:dts]</span> <span class="text-success">Start generate declaration files...</span>
<span class="text-secondary">dist/</span><span class="text-fuchsia-500">perfectui.css</span>  <span class="text-secondary">25.84 kB │ gzip: 4.99 kB</span>
<span class="text-secondary">dist/</span><span class="text-amber-600 [.dark_&]:text-amber-300">perfectui.js</span>    <span class="text-secondary">3.63 kB │ gzip: 1.63 kB</span>
<span class="text-theme">[vite:dts]</span> <span class="text-success">Declaration files built in 1256ms.</span>

<span class="text-secondary">dist/</span><span class="text-fuchsia-500">perfectui.css</span>      <span class="text-secondary">25.84 kB │ gzip: 4.99 kB</span>
<span class="text-secondary">dist/</span><span class="text-amber-600 [.dark_&]:text-amber-300">perfectui.umd.cjs</span>   <span class="text-secondary">3.09 kB │ gzip: 1.58 kB</span>
`;
</script>

<style scoped></style>
