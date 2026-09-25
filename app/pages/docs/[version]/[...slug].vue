<template>
  <div class="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-8 p-4 sm:p-8 lg:grid-cols-[272px_minmax(0,1fr)]">
    <!-- Two columns until the documentation layout (T-cm-11). -->
    <DocSidebar :sections="sections" :current-path="path" />
    <article v-if="page">
      <DocHeader
        :section="sectionTitle"
        :title="page.title"
        :description="page.description"
        :since="page.since"
        :changed="page.changed"
      />
      <ContentRenderer :value="page" />
    </article>
  </div>
</template>

<script setup lang="ts">
import type { Collections } from "@nuxt/content";
import { versions } from "~/versions";

// Resolves /docs/<version>/<section>/<slug> (content-model spec REQ-1); anything else is a 404.
const route = useRoute();
const version = versions.find((v) => v.id === route.params.version);
if (!version) throw createError({ statusCode: 404, statusMessage: "Version not found", fatal: true });

const slug = ([] as string[]).concat(route.params.slug ?? []).join("/");
const path = `/docs/${version.id}/${slug}`;
const collection = version.collection as keyof Collections;

const { data: page } = await useAsyncData(path, () => queryCollection(collection).path(path).first());
if (!page.value || path.endsWith("/.navigation")) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
}

const sections = await useDocsNav(version);
const sectionTitle = computed(
  () => sections.value.find((s) => s.children?.some((p) => p.path === path))?.title,
);

// At setup, so the prerendered HTML carries the meta (lesson from the incremental attempt).
useSeoMeta({ title: page.value.title, description: page.value.description });
</script>
