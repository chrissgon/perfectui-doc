<template>
  <main class="mx-auto max-w-3xl p-8">
    <h1 class="text-4xl font-semibold">Documentation {{ version.label }}</h1>
    <p v-if="missing" role="status" class="pui-card mt-4 p-4">
      {{ missingName }} has no page in {{ version.label }}. You are on the {{ version.label }} index.
    </p>
    <section v-for="section in sections" :key="section.path" class="mt-6">
      <h2 class="text-2xl font-semibold">{{ section.title }}</h2>
      <ul class="mt-2">
        <li v-for="item in section.children" :key="item.path">
          <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup lang="ts">
import { versions } from "~/versions";

// The index of one version, and the landing point of a failed version switch (REQ-6, EDGE-1).
const route = useRoute();
const found = versions.find((v) => v.id === route.params.version);
if (!found) throw createError({ statusCode: 404, statusMessage: "Version not found", fatal: true });
const version = found;

const missing = computed(() => (typeof route.query.missing === "string" ? route.query.missing : ""));
const missingName = computed(() => missing.value.split("/").pop() ?? "");

const sections = await useDocsNav(version);

usePageMeta({
  title: `Documentation ${version.label}`,
  description: `Every page of the Perfect UI ${version.label} documentation.`,
});
</script>
