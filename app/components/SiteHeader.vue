<template>
  <!-- Glass (user review 2026-09-25): the page shows through, blurred, under a translucent
       page colour. Menus and dialogs open in the top layer, so the backdrop filter does not
       become their containing block. -->
  <header class="site-glass sticky top-0 z-20">
    <div :class="['mx-auto flex h-16 items-center justify-between gap-1 px-2 sm:gap-3 sm:px-6', wide ? 'max-w-[1440px]' : 'max-w-[1200px]']">
      <div class="flex items-center gap-2">
        <NuxtLink to="/" class="pui-btn pui-link pui-surface px-1" aria-label="Perfect UI home">
          <SiteLogo variant="wordmark" class="h-4" />
        </NuxtLink>
        <span class="pui-badge pui-soft pui-theme">{{ latestVersion.label }}</span>
      </div>

      <nav aria-label="Site" class="flex items-center gap-0.5 sm:gap-1">
        <NuxtLink
          :to="docsPath"
          :class="['pui-btn pui-link max-lg:hidden', onDocs ? 'pui-theme' : 'pui-surface']"
          :aria-current="onDocs ? 'page' : undefined"
        >
          Docs
        </NuxtLink>
        <SearchButton v-if="features.search" />
        <span aria-hidden="true" class="mx-1.5 h-5 w-px max-lg:hidden" style="background: var(--pui-border)" />
        <ThemePicker />
        <ModeToggle />
        <a :href="site.repository" class="pui-btn pui-link pui-surface px-2.5 max-lg:hidden" aria-label="GitHub">
          <SiteIcon name="github" />
        </a>
        <a :href="site.figma" class="pui-btn pui-link pui-surface px-2.5 max-lg:hidden" aria-label="Figma">
          <SiteIcon name="figma" />
        </a>

        <!-- Below 1024 px: a docs page opens its sidebar panel (DocSidebar's #docs-nav); other
             pages keep the links in a menu (approved exports). -->
        <button
          v-if="onDocPage"
          type="button"
          class="pui-btn pui-link pui-surface px-2.5 max-sm:px-1.5 lg:hidden"
          aria-label="Documentation menu"
          popovertarget="docs-nav"
        >
          <SiteIcon name="menu" />
        </button>
        <template v-else>
          <button type="button" class="pui-btn pui-link pui-surface px-2.5 max-sm:px-1.5 lg:hidden" aria-label="Menu" :popovertarget="menuId">
            <SiteIcon name="ellipsis" />
          </button>
          <div :id="menuId" class="pui-dropdown pui-align-end" popover>
            <div class="grid min-w-[180px] gap-0.5">
              <NuxtLink :to="docsPath" class="pui-btn pui-link pui-surface justify-between">
                Docs <span class="pui-badge pui-soft pui-theme">{{ latestVersion.label }}</span>
              </NuxtLink>
              <a :href="site.repository" class="pui-btn pui-link pui-surface justify-start gap-2.5"><SiteIcon name="github" />GitHub</a>
              <a :href="site.figma" class="pui-btn pui-link pui-surface justify-start gap-2.5"><SiteIcon name="figma" />Figma</a>
            </div>
          </div>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { features } from "~/features";
import { site } from "~/site.config";
import { latestVersion, versionPrefix } from "~/versions";

// REQ-6, REQ-7: the same header on the landing and on every documentation page.
const route = useRoute();
const docsPath = versionPrefix(latestVersion);
const onDocs = computed(() => route.path.startsWith("/docs/"));
// A documentation page (not a version index) renders the sidebar the menu control opens.
const onDocPage = computed(() => /^\/docs\/[^/]+\/.+/.test(route.path));
const wide = onDocs;
const menuId = useId();
</script>

<style scoped>
.site-glass {
  background: color-mix(in oklab, var(--pui-bg) 85%, transparent);
  -webkit-backdrop-filter: blur(8px) saturate(160%);
  backdrop-filter: blur(8px) saturate(160%);
  /* The edge fades into the content instead of a hard border (user review 2026-09-25): a faint
     hairline, then a shadow in the header's own colour. */
  box-shadow:
    0 1px 0 color-mix(in oklab, var(--pui-border) 45%, transparent),
    0 6px 18px -2px color-mix(in oklab, var(--pui-bg) 65%, transparent);
}
/* Without backdrop filters the header stays opaque, so its text never sits on bare content. */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .site-glass {
    background: var(--pui-bg);
  }
}
</style>
