<template>
  <section class="flex flex-col items-center overflow-x-hidden lg:px-10">
    <!-- header -->
    <header
      class="bg-nav fixed w-full flex justify-center items-center border-b border-secondary border-solid py-3 px-5 lg:px-10 z-3"
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
      class="bg-nav fixed lg:hidden w-full flex items-center gap-2 border-b border-secondary border-solid mt-[51px] whitespace-nowrap z-2"
    >
      <i
        class="bi-list text-2xl leading-3 cursor-pointer p-3"
        @click="toggleNav"
      />
      <span class="text-secondary">{{
        OrganismDocsNavRef?.getCurrentSection.sectionName
      }}</span>
      >
      <p class="w-full">
        {{
          OrganismDocsNavRef?.getLinkTreated(
            OrganismDocsNavRef?.docs[
              OrganismDocsNavRef?.getCurrentSection.sectionName
            ][OrganismDocsNavRef?.getCurrentSection.articleIndex]
          )
        }}
      </p>

      <i
        class="bi-view-list text-xl leading-3 cursor-pointer p-3"
        @click="toggleSection"
      />
    </header>

    <div class="w-full max-w-7xl flex justify-between mt-[101px] lg:mt-[52px]">
      <OrganismDocsNav
        ref="OrganismDocsNavRef"
        :class="{ opened: navIsOpen }"
        class="nav height-nav w-[250px] max-lg:-translate-x-[250px] fixed overflow-auto scrollbar lg:-ml-5 p-5 max-lg:pb-24 border-r border-solid border-secondary"
      />

      <article
        :class="{
          translateArticle: navIsOpen,
          'max-lg:-translate-x-[250px]': sectionIsOpen,
        }"
        class="flex flex-col gap-6 lg:ml-[230px] lg:max-w-[calc(100%-230px)] xl:max-w-[800px] min-h-screen p-10 max-xl:pr-0 max-lg:p-5 w-full"
        @click="closeAll"
      >
        <NuxtPage />

        <div>
          <!-- prev -->
          <NuxtLink
            v-if="OrganismDocsNavRef?.getPrevPage"
            :to="getLinkPrevPage"
            class="btn style-white float-left"
          >
            <i class="bi-chevron-left" />
            {{ OrganismDocsNavRef.getPrevPage }}
          </NuxtLink>
          <!-- next -->
          <NuxtLink
            v-if="OrganismDocsNavRef?.getNextPage"
            :to="getLinkNextPage"
            class="btn style-white float-right"
          >
            {{ OrganismDocsNavRef.getNextPage }}
            <i class="bi-chevron-right" />
          </NuxtLink>
        </div>

        <OrganismFooter />
      </article>

      <aside
        :class="{ 'translate-x-[0px] opened': sectionIsOpen }"
        class="sections w-[250px] xl:pr-5 max-xl:fixed max-xl:right-0 max-xl:translate-x-[250px] max-xl:pl-5 max-xl:border-l border-solid border-secondary"
      >
        <div class="xl:fixed overflow-y-auto lg:pt-10 pt-5 pb-32 h-screen">
          <b class="font-bold">On this page</b>

          <ClientOnly>
            <ul class="list unmarker mt-4">
              <a
                v-for="{ id, label } in links"
                :key="id"
                :href="`#${id}`"
                :class="{ active: currentLinkID === id }"
                class="list-item section-link"
                @click.prevent="goToSection"
              >
                {{ label }}
              </a>
            </ul>

            <!-- <div
              class="p-px bg-gradient-to-tr from-blue-200 via-transparent rounded-2xl dark:from-blue-900 dark:via-transparent scale-90 max-w-[300px]"
            >
              <div class="p-3 bg-white rounded-2xl [.dark_&]:!bg-gray-900">
                <img
                  class="[.dark_&]:hidden rounded-lg"
                  src="https://preline.co/assets/img/others/pro.jpg"
                  alt="Preline Pro"
                />
                <img
                  class="[.dark_&]:block hidden rounded-lg"
                  src="https://preline.co/assets/img/others/pro-dark.jpg"
                  alt="Preline Pro"
                />
                <p class="mt-3 text-sm text-gray-800 dark:text-white">
                  Looking for more beautiful and advanced Tailwind examples?
                </p>
                <p class="mt-2">
                  <span
                    class="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 font-medium dark:text-blue-500"
                  >
                    Visit Preline Pro
                    <svg
                      class="flex-shrink-0 size-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        class="lg:opacity-0 lg:-translate-x-1 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 lg:transition"
                        d="M5 12h14"
                      ></path>
                      <path
                        class="lg:-translate-x-1.5 lg:group-hover:translate-x-0 lg:transition"
                        d="m12 5 7 7-7 7"
                      ></path>
                    </svg>
                  </span>
                </p>
              </div>
            </div> -->
          </ClientOnly>
        </div>
      </aside>
    </div>

    <!-- <OrganismAssistantChatGPT
      v-show="assistantIsVisible"
      @close="hideAll"
      @click.self="hideAll"
    /> -->

    <OrganismAlgoliaSearch />
    <!-- <OrganismAssistantChatGPT :open="!!route.query.assistant" /> -->
  </section>
</template>

<script setup lang="ts">
import { type ISectionLinks } from "~/shared";
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
const sectionIsOpen = ref<boolean>(false);
const router = useRoute();
const links = reactive<ISectionLinks>([]);
const currentLinkID = ref<string>("");

// methods
function init(): void {
  if (!process.client) return;
  updateLinks();
}
function toggleNav(): void {
  closeSection();
  navIsOpen.value = !navIsOpen.value;
}
function toggleSection(): void {
  closeNav();
  sectionIsOpen.value = !sectionIsOpen.value;
}
function closeNav(): void {
  navIsOpen.value = false;
}
function closeSection(): void {
  sectionIsOpen.value = false;
}
function closeAll(): void {
  closeNav();
  closeSection();
}
function updateLinks(): void {
  links.length = 0;
  Object.assign(links, getSectionLinks());
}
function setCurrentLink(): void {
  const sections = document.querySelectorAll(
    ".docs-content"
  ) as NodeListOf<HTMLElement>;

  const offsetTop = window.innerHeight > 1024 ? 100 : 125;

  window.onscroll = () => {
    for (const section of sections) {
      const sectionTop = section.offsetTop - offsetTop;
      if (scrollY >= sectionTop) {
        currentLinkID.value = section.getAttribute("id") ?? "";
      }
    }
  };
}
function goToSection(e: MouseEvent): void {
  const href = (e.target as HTMLElement).getAttribute("href");

  if (!href) return;

  const targetElement = document.querySelector(href) as HTMLElement;

  if (!targetElement) return;
  const offsetTop = window.innerHeight > 1024 ? 75 : 125;
  window.scrollTo({
    top: targetElement.offsetTop - offsetTop,
    behavior: "smooth",
  });

  closeAll();
}
function getSectionLinks(): ISectionLinks {
  const sections: ISectionLinks = [];

  const contents = document.querySelectorAll(
    ".docs-content"
  ) as NodeListOf<HTMLElement>;

  for (const content of contents) {
    sections.push({
      id: content.id,
      label: content.querySelector(".docs-title")?.textContent?.trim() ?? "",
    });
  }

  return sections;
}

// setup
init();
if (router.name === "docs") {
  navigateTo("/docs/installation");
}
onBeforeRouteUpdate(() => {
  closeAll();
});
onUpdated(() => {
  updateLinks();
  currentLinkID.value = links[0].id;
  setCurrentLink();
});
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

.nav.opened {
  transform: translateX(0px) !important;
}
.translateArticle {
  transform: translateX(250px) !important;
}

.sections .active {
  background-color: transparent;
  color: rgb(var(--theme500));
}
.sections.opened {
  transform: translateX(0px) !important;
}
</style>
