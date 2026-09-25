<template>
  <header data-doc-header class="mb-8">
    <p v-if="section" class="text-xs font-semibold tracking-wide uppercase" style="color: var(--site-theme-ink)">
      {{ section }}
    </p>
    <div class="mt-2 flex flex-wrap items-center gap-3">
      <h1 class="text-[42px] leading-tight font-semibold tracking-tight">{{ title }}</h1>
      <span v-if="since" class="pui-badge pui-soft pui-theme">Added in {{ since }}</span>
      <span v-if="changed" class="pui-badge pui-soft pui-theme">Changed in {{ changed }}</span>
    </div>
    <!-- Escaped text with `inline code` turned into <code>. -->
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p class="mt-3 text-base leading-6" style="color: var(--pui-text-muted)" v-html="descriptionHtml" />
    <p v-if="from && to" data-range class="mt-2 font-mono text-sm" style="color: var(--pui-text-muted)">
      Applies to {{ from }} → {{ to }}
    </p>
  </header>
</template>

<script setup lang="ts">
// Title, description and the since / changed badges from frontmatter (content-model REQ-7).
const props = defineProps<{
  section?: string;
  title: string;
  description: string;
  since?: string;
  changed?: string;
  /** Version range of a migration page (migration-guide design). */
  from?: string;
  to?: string;
}>();

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const descriptionHtml = computed(() =>
  escape(props.description).replace(/`([^`]+)`/g, "<code>$1</code>"),
);
</script>
