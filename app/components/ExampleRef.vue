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
type Body = { type: string; value: Node[] };

// The page is reduced to the one example (stacked) and its highlighting styles inside the
// fetcher, so the landing's payload carries only that, not the whole page.
const { data: example } = await useAsyncData(`example-ref:${path}#${props.name}`, async () => {
  const page = await queryCollection(latestVersion.collection as DocsCollection).path(path).first();
  const body = page?.body as Body | undefined;
  const node = body?.value.find((n) => n[0] === "example" && n[1]?.name === props.name);
  if (!page || !body || !node) return null;
  return {
    id: page.id,
    body: { type: body.type, value: [["example", { ...node[1], layout: "stacked" }, ...node.slice(2)], ...body.value.filter((n) => n[0] === "style")] },
  };
});
if (!example.value) {
  throw createError({ statusCode: 500, fatal: true, statusMessage: `ExampleRef: no example named "${props.name}" in ${path}` });
}
</script>
