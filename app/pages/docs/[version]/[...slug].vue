<template>
  <article v-if="page" class="mx-auto max-w-3xl p-8">
    <h1 class="text-4xl font-semibold">{{ page.title }}</h1>
    <p class="mt-2">{{ page.description }}</p>
    <ContentRenderer :value="page" class="mt-8" />
  </article>
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

// At setup, so the prerendered HTML carries the meta (lesson from the incremental attempt).
useSeoMeta({ title: page.value.title, description: page.value.description });
</script>
