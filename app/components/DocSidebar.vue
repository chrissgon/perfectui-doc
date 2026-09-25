<template>
  <div>
    <nav id="docs-nav" ref="panel" aria-label="Documentation" popover class="docs-nav">
      <details v-for="section in sections" :key="section.path" open class="mb-4">
        <summary class="cursor-pointer text-xs font-semibold tracking-wide uppercase">
          {{ section.title }}
        </summary>
        <ul class="mt-2 space-y-1">
          <li v-for="item in section.children" :key="item.path">
            <NuxtLink
              :to="item.path"
              :aria-current="item.path === currentPath ? 'page' : undefined"
              :class="['block rounded-md px-3 py-1.5', item.path === currentPath ? 'pui-soft pui-theme' : '']"
            >
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </details>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

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
.docs-nav:popover-open {
  inset: 0 auto 0 0;
  width: min(20rem, 85vw);
  height: 100dvh;
  padding: 1.5rem;
  border-right: 1px solid var(--pui-border);
  background: var(--pui-bg);
  color: var(--pui-text);
}
</style>
