<template>
  <OrganismSearchCard @search="search">
    <article class="flex flex-col gap-4 p-4">
      
      {{ list }}
    </article>
  </OrganismSearchCard>
</template>

<script setup lang="ts">
import { type IAlgoliaList } from "~/shared";
// import { AlgoliaListDTO } from "~/shared/dto";

// data
const { result, search: algolia } = useAlgoliaSearch("perfectui");
const list = reactive<IAlgoliaList>([
  {
    tags: [
      "installation",
      "quick start",
      "getting started",
      "npm",
      "bun",
      "yarn",
      "pnpm",
      "install",
    ],
    url: "https://perfectui.netlify.app/docs/installation",
    title: "Get started with Perfect UI",
    description:
      "An exceptionally lightweight and highly customizable CSS and JavaScript framework for crafting elegant user interfaces.",
  },
]);

async function search(doubt: string): Promise<void> {
  await algolia({
    query: doubt,
  });

  list.length = 0;
  // Object.assign(list, AlgoliaListDTO(result.value.hits));
}
</script>

<style scoped></style>
