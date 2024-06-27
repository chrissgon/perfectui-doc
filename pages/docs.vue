<template>
  <section class="flex flex-col items-center overflow-x-hidden lg:px-10">
    <!-- header -->
    <header
      class="bg-nav fixed w-full flex justify-center items-center border-b border-secondary border-solid py-3 px-5 lg:px-10 z-20"
    >
      <div class="w-full max-w-7xl flex justify-between">
        <AtomLogoVersion />

        <aside class="flex items-center gap-5">
          <AtomThemeColorPicker />
          <AtomDarkMode />
          <AtomGithubLink />
          <AtomFigmaLink class="max-sm:hidden" />
        </aside>
      </div>
    </header>

    <header
      class="bg-nav fixed lg:hidden w-full flex items-center gap-2 border-b border-secondary border-solid px-5 py-3 mt-[51px] z-10"
    >
      <i
        class="bi-list text-2xl leading-3 cursor-pointer"
        @click="toggleNav"
      />
      <span class="text-secondary">{{
        OrganismDocsNavRef?.getCurrentSection.sectionName
      }}</span>
      >
      {{
        OrganismDocsNavRef?.getLinkTreated(
          OrganismDocsNavRef?.docs[
            OrganismDocsNavRef?.getCurrentSection.sectionName
          ][OrganismDocsNavRef?.getCurrentSection.articleIndex]
        )
      }}
    </header>

    <div class="w-full max-w-7xl mt-[101px] lg:mt-[52px]">
      <OrganismDocsNav
        ref="OrganismDocsNavRef"
        :class="{ translateNav: navIsOpen }"
        class="height-nav w-[250px] max-lg:-translate-x-[250px] fixed overflow-auto scrollbar lg:-ml-5 p-5 max-lg:pb-24 border-r border-solid border-secondary z-10"
        @assistant="showAssistant"
        @search="showSearch"
      />

      <article
        :class="{ translateArticle: navIsOpen }"
        class="flex flex-col gap-6 lg:ml-[230px] min-h-screen pt-5 lg:pt-10 pl-10 max-lg:px-5"
        @click="closeNav"
      >
        <NuxtPage />

        <div>
          <!-- prev -->
          <NuxtLink
            v-if="OrganismDocsNavRef?.getPrevPage"
            :to="getLinkPrevPage"
            class="btn btn-white float-left"
          >
            <i class="bi-chevron-left" />
            {{ OrganismDocsNavRef.getPrevPage }}
          </NuxtLink>
          <!-- next -->
          <NuxtLink
            v-if="OrganismDocsNavRef?.getNextPage"
            :to="getLinkNextPage"
            class="btn btn-white float-right"
          >
            {{ OrganismDocsNavRef.getNextPage }}
            <i class="bi-chevron-right" />
          </NuxtLink>
        </div>

        <OrganismFooter />
      </article>
    </div>

    <OrganismAssistantChatGPT
      v-show="assistantIsVisible"
      @close="hideAll"
      @click.self="hideAll"
    />
    <!-- TODO -->
    <!-- implements algolia search -->
    <OrganismAlgoliaSearch
      v-show="searchIsVisible"
      @close="hideAll"
      @click.self="hideAll"
    />
  </section>
</template>

<script setup lang="ts">
import OrganismDocsNav from "../components/Organism.DocsNav.vue";
import hotkeys from "hotkeys-js";

// computed
const getLinkPrevPage = computed<string>(() => {
  const nav = OrganismDocsNavRef.value;
  if (!nav || !nav.getPrevPage) return "";

  return nav.getDocPath(nav.normalizeLink(nav.getPrevPage));
});
const getLinkNextPage = computed<string>(() => {
  const nav = OrganismDocsNavRef.value;
  if (!nav || !nav.getNextPage) return "";

  return nav.getDocPath(nav.normalizeLink(nav.getNextPage));
});

// data
const route = useRoute()
const OrganismDocsNavRef = ref<InstanceType<typeof OrganismDocsNav>>();
const navIsOpen = ref<boolean>(false);
const router = useRoute();
// const assistantIsVisible = ref<boolean>(!!route.query.assistant);
const assistantIsVisible = ref<boolean>(false);
const searchIsVisible = ref<boolean>(false);

// methods
function init(): void {
  if (!process.client) return;
  hotkeys("ctrl+k", () => {
    showSearch();
  });
}
function toggleNav(): void {
  navIsOpen.value = !navIsOpen.value;
  document.body.style.overflow = navIsOpen.value ? "hidden" : "auto";
}
function closeNav(): void {
  document.body.style.overflow = "auto";
  navIsOpen.value = false;
}
function showAssistant(): void {
  assistantIsVisible.value = true;
  document.documentElement.style.overflow = "hidden";

  focusInput(".OrganismAssistantChatGPT .OrganismSearchCardInput");
}
function hideAssistant(): void {
  assistantIsVisible.value = false;
  document.documentElement.style.overflow = "auto";
}
function showSearch(): void {
  searchIsVisible.value = true;
  document.documentElement.style.overflow = "hidden";

  focusInput(".OrganismAlgoliaSearch .OrganismSearchCardInput");
}
function hideSearch(): void {
  searchIsVisible.value = false;
  document.documentElement.style.overflow = "auto";
}
function focusInput(selector: string): void {
  const input = document.querySelector(selector) as HTMLInputElement;

  if (!input || !input.focus) {
    setTimeout(() => {
      focusInput(selector);
    }, 1000);
    return;
  }

  setTimeout(() => {
    input?.focus();
  }, 100);
}
function hideAll(): void {
  closeNav();
  hideAssistant();
  hideSearch();
}

// setup
init();
if (router.name === "docs") {
  navigateTo("/docs/installation");
}
onBeforeRouteUpdate(hideAll);
</script>

<style scoped>
.height-nav {
  height: calc(100vh - 52px);
  height: calc(100dvh - 52px);
}
.bg-nav {
  background: rgba(var(--backgroundPrimary), 0.7);
  backdrop-filter: blur(10px);
}
.bg-search {
  background: rgba(var(--backgroundPrimary), 0.5);
  backdrop-filter: blur(5px);
}

.translateNav {
  transform: translateX(0px) !important;
}
.translateArticle {
  transform: translateX(250px) !important;
}
</style>
