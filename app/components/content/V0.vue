<template>
  <NuxtLink v-if="href" :to="href"><code>{{ name }}</code></NuxtLink>
  <code v-else>{{ name }}</code>
</template>

<script setup lang="ts">
import { versions, versionPrefix, type DocsCollection } from "~/versions";

// `:v0{name="btn" to="components/button"}` in the migration guide (migration-guide design,
// REQ-3): a link to the previous major's page when that page is in this build, else the name as
// plain code (EDGE-1, EDGE-2). The previous major is the configured version that is not latest.
const props = defineProps<{ name: string; to: string }>();
const previous = versions.find((v) => !v.latest);
const path = previous ? `${versionPrefix(previous)}/${props.to}` : "";

const { data: href } = await useAsyncData(`v0-link:${props.to}`, async () => {
  if (!previous) return null;
  const page = await queryCollection(previous.collection as DocsCollection).path(path).select("path").first();
  return page ? path : null;
});
</script>
