<template>
  <footer class="mt-16">
    <nav aria-label="Pagination" class="grid grid-cols-2 gap-4">
      <NuxtLink v-if="prev" :to="prev.path" class="rounded-[9px] border p-4" style="border-color: var(--pui-border)">
        <span class="block text-xs" style="color: var(--pui-text-muted)">Previous</span>
        <span class="font-semibold" style="color: var(--site-theme-ink)">{{ prev.title }}</span>
      </NuxtLink>
      <span v-else />
      <NuxtLink
        v-if="next"
        :to="next.path"
        class="rounded-[9px] border p-4 text-right"
        style="border-color: var(--pui-border)"
      >
        <span class="block text-xs" style="color: var(--pui-text-muted)">Next</span>
        <span class="font-semibold" style="color: var(--site-theme-ink)">{{ next.title }}</span>
      </NuxtLink>
    </nav>
    <p class="mt-8 border-t pt-6 text-sm" style="border-color: var(--pui-border)">
      <a :href="editUrl">Edit this page on GitHub</a>
    </p>
  </footer>
</template>

<script setup lang="ts">
// Previous and next in navigation order, and the source file's edit link (REQ-4).
defineProps<{
  prev?: { path: string; title: string };
  next?: { path: string; title: string };
  editUrl: string;
}>();
</script>
