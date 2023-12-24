<template>
  <section class="flex flex-col items-center overflow-x-hidden">
    <!-- header -->
    <header
      class="bg-nav fixed w-full flex justify-between border-b border-secondary border-solid py-3 px-5 lg:px-36 z-10"
    >
      <AtomLogoVersion />

      <aside class="flex items-center gap-5">
        <AtomThemeColorPicker />
        <AtomDarkMode />
        <AtomGithubLink />
      </aside>
    </header>

    <header
      class="bg-nav fixed lg:hidden w-full flex items-center gap-2 border-b border-secondary border-solid px-5 py-3 mt-[52px] z-10"
    >
      <i
        @click="toggleNav"
        class="bi-list text-2xl leading-3 cursor-pointer"
      ></i>
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

    <div
      class="relative w-full flex flex-wrap lg:pl-36 mt-[101px] lg:mt-[52px]"
    >
      <OrganismDocsNav
        ref="OrganismDocsNavRef"
        :class="{ translateNav: navIsOpen }"
        class="height-nav w-[250px] max-lg:-translate-x-[250px] fixed overflow-y-auto scrollbar lg:-ml-5 p-5 border-r border-solid border-secondary z-10"
      />

      <article
        :class="{ translateArticle: navIsOpen }"
        class="flex flex-col gap-6 flex-1 lg:ml-[230px] min-h-screen p-10"
      >
        <NuxtPage />

        <div>
          <!-- prev -->
          <NuxtLink
            v-if="OrganismDocsNavRef?.getPrevPage"
            :to="getLinkPrevPage"
            class="btn btn-white float-left max-sm:w-full text-center"
          >
            <i class="bi-chevron-left"></i>
            {{ OrganismDocsNavRef.getPrevPage }}
          </NuxtLink>
          <!-- next -->
          <NuxtLink
            v-if="OrganismDocsNavRef?.getNextPage"
            :to="getLinkNextPage"
            class="btn btn-white float-right max-sm:w-full text-center max-sm:mt-4"
          >
            {{ OrganismDocsNavRef.getNextPage }}
            <i class="bi-chevron-right"></i>
          </NuxtLink>
        </div>

        <footer
          class="flex flex-col items-center gap-2 text-center border-t border-solid border-secondary pt-10"
        >
          <img src="/logo.svg" alt="Perfect UI Logo" width="90" class="logo" />
          <p class="text-secondary">
            © {{ new Date().getFullYear() }} Perfect UI
          </p>
        </footer>
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
useRouter().push("/docs/installation");
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
  background: rgba(var(--backgroundPrimary), 0.5);
  backdrop-filter: blur(10px);
}

.translateNav {
  transform: translateX(0px) !important;
}
.translateArticle {
  transform: translateX(250px) !important;
}
</style>
