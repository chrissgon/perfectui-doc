<template>
  <dialog
    id="modalAlgolia"
    ref="modalRef"
    class="modal"
    @mousedown.self="close"
  >
    <div class="card w-full bg-tertiary [html:not(.dark)_&]:!bg-white">
      <!-- header -->
      <header
        class="card-header bg-secondary [html:not(.dark)_&]:!bg-white flex items-center"
      >
        <i
          class="bi-chevron-left btn"
          @click="close"
        ></i>
        <!-- input -->
        <input
          v-model="doubt"
          type="text"
          class="outline-none bg-transparent w-full mx-2 mousetrap"
          placeholder="Search documentation"
          @keyup="search"
        />
      </header>
      <hr />

      <!-- content -->
      <article class="card-content p-4 gap-4">
        <!-- item -->
        <div
          v-for="(item, i) in list"
          :key="i"
          class="card list !border-none unmarker list-hoverable"
          @click="close"
        >
          <NuxtLink
            :to="getRedirectURL(item)"
            class="list-item !p-0 [.dark_&]:hover:!bg-gray-800 [.dark_&.active]:!bg-gray-700 [.dark_&]:hover:!bg-gray-700"
            :class="{ active: currentItemIndex === i }"
          >
            <!-- :class="{'[.dark_&]!bg-gray-700'}" -->
            <article class="card-content !flex gap-2 items-center !py-2">
              <i
                class="bi-book btn btn-white !bg-transparent [.dark_&]:!border-transparent [.dark_&]:!bg-gray-700 !p-[5px] !px-2 rounded-md mr-2"
              ></i>

              <div class="w-full">
                <p class="text-sm font-semibold text-theme mb-1">
                  {{ item.title }}

                  <span
                    v-if="item.requireJavascript"
                    class="badge badge-outline-warn ml-2"
                  >
                    <i class="bi-exclamation-triangle-fill text-xs"></i>
                    Require Javascript
                  </span>
                </p>

                <p class="text-xs">
                  {{ item.description }}
                </p>
              </div>

              <i class="bi-chevron-right"></i>
            </article>
          </NuxtLink>
        </div>

        <p
          v-if="!list.length"
          class="text-center text-secondary"
        >
          No results found
        </p>
      </article>

      <hr />

      <!-- footer -->
      <footer
        class="card-header flex items-center max-sm:flex-wrap max-sm:justify-center gap-2 whitespace-nowrap"
      >
        <!-- commands -->
        <div
          class="max-sm:hidden text-xs text-secondary flex items-center gap-2"
        >
          <span class="badge badge-white kdb leading-none">
            <i class="bi-arrow-return-left text-xs px-0.5"></i>
          </span>
          to select
        </div>
        <div
          class="max-sm:hidden text-xs text-secondary flex items-center gap-2"
        >
          <span class="badge badge-white kdb leading-none">
            <i class="bi-arrow-down text-xs px-0.5"></i>
          </span>
          <span class="badge badge-white kdb leading-none">
            <i class="bi-arrow-up text-xs px-0.5"></i>
          </span>

          to navigate
        </div>
        <div
          class="max-sm:hidden sm:w-full text-xs text-secondary flex items-center gap-2"
        >
          <span class="badge badge-white kdb !px-1.5">ESC</span> to close
        </div>

        <!-- algolia link -->
        <a
          href="https://www.algolia.com/developers/?utm_source=perfectui&utm_medium=referral&utm_content=powered_by&utm_campaign=docsearch"
          target="_blank"
          class="text-secondary text-xs max-sm:w-full text-center max-sm:my-2"
        >
          Search by <AtomIconAlgolia class="inline ml-2" />
        </a>
      </footer>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import type { IAlgoliaItem, IAlgoliaList } from "~/shared";
import mousetrap from "../public/mousetrap.js";
import { AlgoliaListDTO } from "~/shared/dto.js";

// data
const DEFAULT_DOMAIN = "https://perfectui.netlify.app";
const router = useRouter();
const modalRef = ref<InstanceType<typeof HTMLDialogElement> | null>(null);
const { result, search: algolia } = useAlgoliaSearch("perfectui");
const list = reactive<IAlgoliaList>([]);
const doubt = ref<string>("");
const lastDoubt = ref<string>("");
const currentItemIndex = ref<number>(-1);

// methods
function init(): void {
  if (!process.client) return;

  mousetrap?.bind("/", () => {
    show();
    return false;
  });
  mousetrap?.bind("esc", () => {
    close();
  });
  mousetrap?.bind("up", () => {
    prevItem();
  });
  mousetrap?.bind("down", () => {
    nextItem();
  });
  mousetrap?.bind("enter", () => {
    const item = list[currentItemIndex.value];

    if (!item) return;

    router.push(getRedirectURL(item));
    close();
  });
}
async function search(): Promise<void> {
  if (!doubt.value.trim()) return;
  if (lastDoubt.value === doubt.value) return;

  lastDoubt.value = doubt.value;

  await algolia({
    query: doubt.value,
  });

  resetList();
  Object.assign(list, AlgoliaListDTO(result.value.hits));
}
function show(): void {
  modalRef.value?.show();
}
function close(): void {
  modalRef.value?.close();
  reset();
}
function resetList(): void {
  list.length = 0;
  currentItemIndex.value = -1;
}
function reset(): void {
  doubt.value = "";
  lastDoubt.value = "";
  list.length = 0;
  currentItemIndex.value = -1;
}
function prevItem(): void {
  if (currentItemIndex.value <= 0) return;
  currentItemIndex.value--;
}
function nextItem(): void {
  if (currentItemIndex.value >= list.length - 1) return;
  currentItemIndex.value++;
}
function getRedirectURL(item: IAlgoliaItem): string {
  return item.url.replace(DEFAULT_DOMAIN, "");
}

// setup
init();
</script>

<style scoped>

</style>
