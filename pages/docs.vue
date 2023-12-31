<template>
  <section class="flex flex-col items-center overflow-x-hidden lg:px-10">
    <!-- header -->
    <header
      class="bg-nav fixed w-full flex justify-center items-center border-b border-secondary border-solid py-3 px-5 lg:px-10 z-10"
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
      class="bg-nav fixed lg:hidden w-full flex items-center gap-2 border-b border-secondary border-solid px-5 py-3 mt-[52px] z-10"
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
        OrganismDocsNavRef?.docs[
          OrganismDocsNavRef?.getCurrentSection.sectionName
        ][OrganismDocsNavRef?.getCurrentSection.articleIndex]
      }}
    </header>

    <div class="w-full max-w-7xl mt-[101px] lg:mt-[52px]">
      <OrganismDocsNav
        ref="OrganismDocsNavRef"
        :class="{ translateNav: navIsOpen }"
        class="height-nav w-[250px] max-lg:-translate-x-[250px] fixed overflow-y-auto scrollbar lg:-ml-5 p-5 border-r border-solid border-secondary z-10"
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

        <AtomFooter />
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import OrganismDocsNav from "../components/Organism.DocsNav.vue";

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
const OrganismDocsNavRef = ref<InstanceType<typeof OrganismDocsNav>>();
const navIsOpen = ref<boolean>(false);

// setup
if (useRoute().name === "docs") {
  navigateTo("/docs/installation");
}
onBeforeRouteUpdate(closeNav);

// methods
function toggleNav(): void {
  navIsOpen.value = !navIsOpen.value;
}
function closeNav(): void {
  navIsOpen.value = false;
}
</script>

<style scoped>
.height-nav {
  height: calc(100vh - 52px);
}
.bg-nav {
  background: rgba(var(--backgroundPrimary), 0.9);
  backdrop-filter: blur(10px);
}

.translateNav {
  transform: translateX(0px) !important;
}
.translateArticle {
  transform: translateX(250px) !important;
}
</style>
