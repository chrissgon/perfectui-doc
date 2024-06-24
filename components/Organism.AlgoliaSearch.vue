<template>
  <OrganismSearchCard
    ref="OrganismSearchCardRef"
    @search="search"
    @close="close"
  >
    <article class="flex flex-col gap-4 p-4">
      <div
        v-for="(item, i) in list"
        :key="i"
        class="card !bg-transparent list unmarker list-hoverable"
        @click="close"
      >
        <NuxtLink
          :to="item.url.replace(DEFAULT_DOMAIN, '')"
          class="list-item !p-0 [html.dark_&]:hover:!bg-gray-700"
        >
          <article class="card-content !flex gap-2 items-center !py-2">
            <i
              class="bi-book btn btn-white !bg-transparent [html.dark_&]:!border-transparent [html.dark_&]:!bg-slate-600 !p-[5px] !px-2 rounded-md mr-2"
            ></i>

            <div class="w-full overflow-hidden whitespace-nowrap text-ellipsis">
              <p class="badge badge-solid-primary mb-1">{{ item.title }}</p>

              <p
                class="text-xs w-full overflow-hidden whitespace-nowrap text-ellipsis"
              >
                {{ item.description }}
              </p>
            </div>

            <i class="bi-chevron-right"></i>
          </article>
        </NuxtLink>
      </div>

      <p v-if="!list.length" class="text-center text-secondary">
        No results found
      </p>
    </article>
  </OrganismSearchCard>
</template>

<script setup lang="ts">
import { AlgoliaListDTO, type IAlgoliaList } from "~/shared";
import type OrganismSearchCard from "./Organism.SearchCard.vue";

// data
const DEFAULT_DOMAIN = "https://perfectui.netlify.app";
const OrganismSearchCardRef = ref<InstanceType<
  typeof OrganismSearchCard
> | null>();
const { result, search: algolia } = useAlgoliaSearch("perfectui");
const list = reactive<IAlgoliaList>([]);

async function search(doubt: string): Promise<void> {
  reset();

  if (!doubt.trim()) return;

  await algolia({
    query: doubt,
  });

  Object.assign(list, AlgoliaListDTO(result.value.hits));
}
function close(): void {
  emit("close");
  reset();
  OrganismSearchCardRef.value?.reset();
}
function reset(): void {
  list.length = 0;
}

// emits
interface IEmits {
  (e: "close"): void;
}
const emit = defineEmits<IEmits>();
</script>

<style scoped></style>
