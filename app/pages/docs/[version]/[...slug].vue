<template>
  <DocLayout v-if="page">
    <template #sidebar>
      <DocSidebar :sections="sections" :current-path="path" />
    </template>
    <article>
      <DocHeader
        :section="sectionTitle"
        :title="page.title"
        :description="page.description"
        :since="page.since"
        :changed="page.changed"
        :from="page.from"
        :to="page.to"
      />
      <DocToc :links="tocLinks" mode="disclosure" />
      <ContentRenderer :value="page" class="doc-prose" />
      <DocPager :prev="prev" :next="next" :edit-url="editUrl" />
    </article>
    <template #toc>
      <DocToc :links="tocLinks" mode="column" />
    </template>
  </DocLayout>
</template>

<script setup lang="ts">
import { site } from "~/site.config";
import { versions, type DocsCollection } from "~/versions";

// Resolves /docs/<version>/<section>/<slug> (content-model spec REQ-1); anything else is a 404.
const route = useRoute();
const version = versions.find((v) => v.id === route.params.version);
if (!version) throw createError({ statusCode: 404, statusMessage: "Version not found", fatal: true });

// Empty segments are dropped: a trailing slash (a host redirect, a typed URL) is the same page.
const slug = ([] as string[]).concat(route.params.slug ?? []).filter(Boolean).join("/");
const path = `/docs/${version.id}/${slug}`;
const collection = version.collection as DocsCollection;

const { data: page } = await useAsyncData(path, () => queryCollection(collection).path(path).first());
if (!page.value || path.endsWith("/.navigation")) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
}

const sections = await useDocsNav(version);
const sectionTitle = computed(
  () => sections.value.find((s) => s.children?.some((p) => p.path === path))?.title,
);

// Previous and next in navigation order.
const order = computed(() => sections.value.flatMap((s) => s.children ?? []));
const index = computed(() => order.value.findIndex((p) => p.path === path));
const prev = computed(() => order.value[index.value - 1]);
const next = computed(() => order.value[index.value + 1]);

const tocLinks = computed(() => page.value?.body?.toc?.links ?? []);
// The stem keeps the collection prefix ("docs/v1/04.components/03.button"); the file is under content/.
const editUrl = computed(
  () => `${site.docsRepository}/edit/${site.docsBranch}/content/${page.value?.stem.replace(/^docs\//, "")}.md`,
);

// At setup, so the prerendered HTML carries the meta (lesson from the incremental attempt).
usePageMeta({ title: page.value.title, description: page.value.description });
</script>
