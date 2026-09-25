<template>
  <nav v-if="links.length && mode === 'column'" aria-label="On this page">
    <p class="text-xs font-semibold tracking-wide uppercase">On this page</p>
    <ul class="mt-3 space-y-2 border-l text-sm" style="border-color: var(--pui-border)">
      <li v-for="link in links" :key="link.id">
        <a
          :href="`#${link.id}`"
          :aria-current="current === link.id ? 'location' : undefined"
          class="-ml-px block border-l-2 pl-3"
          :style="{
            borderColor: current === link.id ? 'var(--pui-theme)' : 'transparent',
            color: current === link.id ? 'var(--site-theme-ink)' : 'var(--pui-text-muted)',
          }"
        >
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
  <!-- Below 1280 px: a Perfect UI accordion item (user review 2026-09-25). -->
  <div v-else-if="links.length" class="pui-accordion mb-6 xl:hidden">
    <details data-toc-disclosure class="pui-accordion-item">
      <summary class="text-sm font-semibold">
        On this page
        <SiteIcon name="chevron-down" class="pui-accordion-icon size-3.5" />
      </summary>
      <ul class="grid border-t px-2 pt-1 pb-2" style="border-color: var(--pui-border)">
        <li v-for="link in links" :key="link.id">
          <a :href="`#${link.id}`" class="flex min-h-10 items-center rounded-md px-2 text-sm">{{ link.text }}</a>
        </li>
      </ul>
    </details>
  </div>
</template>

<script setup lang="ts">
import type { TocLink } from "@nuxt/content";

// The page's h2 list (REQ-4): a sticky column from 1280 px, a disclosure in the content below.
const props = defineProps<{ links: TocLink[]; mode: "column" | "disclosure" }>();

// Current heading from the scroll position (handoff: root margin -80px 0px -60% 0px).
const current = ref(props.links[0]?.id ?? "");
let observer: IntersectionObserver | undefined;
onMounted(() => {
  if (props.mode !== "column") return;
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.find((e) => e.isIntersecting);
      if (visible) current.value = visible.target.id;
    },
    { rootMargin: "-80px 0px -60% 0px" },
  );
  for (const link of props.links) {
    const heading = document.getElementById(link.id);
    if (heading) observer.observe(heading);
  }
});
onBeforeUnmount(() => observer?.disconnect());
</script>
