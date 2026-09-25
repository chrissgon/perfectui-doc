<template>
  <footer class="border-t" style="border-color: var(--pui-border)">
    <div class="mx-auto flex max-w-[1200px] flex-col gap-10 px-5 pt-14 pb-10 sm:px-10 md:pt-24">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <p class="m-0 max-w-[28ch] text-lg font-semibold tracking-tight md:text-[22px]">{{ tagline }}</p>
        <nav aria-label="Footer" class="-mx-4 flex flex-wrap gap-1">
          <NuxtLink :to="versionPrefix(latestVersion)" class="pui-btn pui-link pui-surface">Docs</NuxtLink>
          <a :href="site.repository" class="pui-btn pui-link pui-surface">GitHub</a>
          <a :href="site.figma" class="pui-btn pui-link pui-surface">Figma</a>
          <a :href="`${site.repository}/blob/main/LICENSE`" class="pui-btn pui-link pui-surface">{{ site.license }} license</a>
        </nav>
      </div>
      <SiteLogo variant="wordmark" class="block w-full [&_svg]:h-auto [&_svg]:w-full" />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { site } from "~/site.config";
import { latestVersion, versionPrefix } from "~/versions";

// REQ-7. The tagline comes from the landing copy (content/landing.yml).
const { data: copy } = await useAsyncData("landing-copy", () => queryCollection("landing").first());
const tagline = computed(() => copy.value?.tagline);
</script>
