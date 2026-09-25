<template>
  <div class="inline-flex">
    <!-- The version badge is the menu's trigger (user, 2026-09-25). -->
    <button
      type="button"
      class="pui-badge pui-soft pui-theme inline-flex cursor-pointer items-center gap-1"
      :aria-label="`Version ${current.label}, choose another`"
      :popovertarget="menuId"
    >
      {{ current.label }}<SiteIcon name="chevron-down" class="size-3" />
    </button>
    <div :id="menuId" ref="menu" data-version-menu class="pui-dropdown p-1" popover>
      <ul class="m-0 grid min-w-[190px] list-none gap-0.5 p-0">
        <li v-for="version in versions" :key="version.id">
          <!-- Without JavaScript the link opens the major's first page. -->
          <a
            :href="versionPrefix(version)"
            :aria-current="version.id === current.id ? 'true' : undefined"
            class="pui-btn pui-link pui-surface w-full justify-between gap-4"
            @click.prevent="pick(version)"
          >
            <span>{{ version.label }} <span v-if="version.latest" class="text-xs" style="color: var(--site-muted-ink)">latest</span></span>
            <SiteIcon v-if="version.id === current.id" name="check" class="size-4" />
          </a>
        </li>
        <li v-for="archived in archivedVersions" :key="archived.label">
          <a :href="archived.href" class="pui-btn pui-link pui-surface w-full justify-between gap-4" rel="noopener">
            <span>{{ archived.label }}</span>
            <span class="text-xs" style="color: var(--site-muted-ink)">GitHub</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { archivedVersions, latestVersion, versionPrefix, versions, type DocVersion } from "~/versions";

// Spec library-docs-and-versions REQ-9: the documented majors (the one being read marked) and the
// versions documented elsewhere; picking a major keeps the page when it exists there (REQ-6).
const route = useRoute();
const current = computed(() => versions.find((v) => route.path.startsWith(`/docs/${v.id}`)) ?? latestVersion);
const menuId = useId();
const menu = ref<HTMLElement | null>(null);
const nuxtApp = useNuxtApp();

// The switch queries the content database, so its code loads only when a reader picks another
// major; the header on every page stays as light as before.
async function pick(version: DocVersion) {
  menu.value?.hidePopover();
  if (version.id === current.value.id) return;
  const { switchVersion } = await import("~/utils/switch-version");
  await nuxtApp.runWithContext(() => switchVersion(route.path, version));
}
</script>
