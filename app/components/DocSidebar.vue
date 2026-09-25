<template>
  <div>
    <nav id="docs-nav" ref="panel" aria-label="Documentation" popover class="docs-nav">
      <!-- Each section is a Perfect UI accordion item (user review 2026-09-25), drawn as the
           approved design's section: no frame, a small uppercase title and a chevron. -->
      <div class="pui-accordion gap-3">
        <details v-for="section in sections" :key="section.path" open class="pui-accordion-item border-0">
          <summary class="rounded-md px-3 py-1.5 text-xs font-semibold tracking-[0.08em] uppercase" style="color: var(--pui-text-muted)">
            {{ section.title }}
            <SiteIcon name="chevron-down" class="pui-accordion-icon size-3.5" />
          </summary>
          <ul class="mt-1 grid gap-px p-0">
            <li v-for="item in section.children" :key="item.path">
              <NuxtLink
                :to="item.path"
                :aria-current="item.path === currentPath ? 'page' : undefined"
                :class="['nav-link block rounded-md px-3 py-1.5 text-sm', item.path === currentPath ? 'pui-soft pui-theme' : '']"
              >
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
        </details>
      </div>
      <!-- Below 1024 px the header hides GitHub and Figma, so the panel carries them. -->
      <div class="mt-4 grid gap-0.5 border-t pt-4 lg:hidden" style="border-color: var(--pui-border)">
        <a :href="site.repository" class="pui-btn pui-link pui-surface justify-start gap-2.5"><SiteIcon name="github" />GitHub</a>
        <a :href="site.figma" class="pui-btn pui-link pui-surface justify-start gap-2.5"><SiteIcon name="figma" />Figma</a>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";
import { site } from "~/site.config";

// Sections from the content folders (REQ-4); below 1024 px a popover panel opened by the
// header's menu control (SiteHeader), no script of ours (approved design, handoff documentation-page).
const props = defineProps<{ sections: ContentNavigationItem[]; currentPath: string }>();

// Client-side navigation keeps the page, so close the panel when the page changes.
const panel = ref<HTMLElement | null>(null);
watch(
  () => props.currentPath,
  () => {
    if (panel.value?.matches(":popover-open")) panel.value.hidePopover();
  },
);
</script>

<style scoped>
/* From 1024 px the popover is an ordinary, always-visible column. */
@media (min-width: 1024px) {
  .docs-nav {
    display: block;
    position: static;
    inset: auto;
    margin: 0;
    padding: 0;
    border: 0;
    width: auto;
    height: auto;
    overflow: visible;
    background: transparent;
    color: inherit;
  }
}
/* Pages read muted until hovered or current (approved design, documentation-page export). */
.nav-link {
  color: var(--pui-text-muted);
  transition:
    color 0.15s ease,
    background-color 0.15s ease;
}
.nav-link:hover {
  color: var(--pui-text);
}
.nav-link[aria-current="page"] {
  color: var(--site-theme-ink);
}
.docs-nav:popover-open {
  inset: 0 auto 0 0;
  width: min(20rem, 85vw);
  height: 100dvh;
  padding: 1.5rem 1rem;
  overflow-y: auto;
  scrollbar-width: thin;
  border-right: 1px solid var(--pui-border);
  background: var(--pui-bg);
  color: var(--pui-text);
}
</style>
