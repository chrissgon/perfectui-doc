<template>
  <ContentRenderer v-if="example" :value="example" />
</template>

<script setup lang="ts">
import { latestVersion, versionPrefix, type DocsCollection } from "~/versions";

// ADR-0008: renders one named `::example` of a documentation page of the latest version, so the
// landing shows the documentation's own examples. A missing page or name stops the prerender.
const props = defineProps<{ page: string; name: string }>();
const path = `${versionPrefix(latestVersion)}/${props.page}`;

type Node = [string, Record<string, unknown>, ...unknown[]];

const { data } = await useAsyncData(`example-ref:${path}#${props.name}`, () =>
  queryCollection(latestVersion.collection as DocsCollection).path(path).first(),
);
const body = data.value?.body as { type: string; value: Node[] } | undefined;
const node = body?.value.find((n) => n[0] === "example" && n[1]?.name === props.name);
if (!data.value || !body || !node) {
  throw createError({ statusCode: 500, fatal: true, statusMessage: `ExampleRef: no example named "${props.name}" in ${path}` });
}

// The example alone, stacked, with the page's highlighting styles.
const example = {
  ...data.value,
  body: { ...body, value: [["example", { ...node[1], layout: "stacked" }, ...node.slice(2)], ...body.value.filter((n) => n[0] === "style")], toc: undefined },
};
</script>
