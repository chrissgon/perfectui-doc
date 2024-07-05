<template>
  <nav>
    <div
      class="cursor-pointer !min-w-full field-group input-group input mb-6 !rounded-md"
      data-modal="modalAlgolia"
    >
      <i class="bi-search"></i>
      <input
        type="text"
        class="input pointer-events-none"
        placeholder="Quick search"
        readonly
      />
      <div class="text-secondary font-medium !pr-2">
        <span class="badge badge-white kdb leading-none"> / </span>
      </div>
    </div>

    <!-- resources -->
    <ul
      class="unmarker list flex flex-col gap-2 [&>.list-item]:cursor-pointer [&>.list-item]:!bg-transparent font-medium mb-10 [&>.list-item]:!px-0 [&>.list-item_i]:p-[5px] [&>.list-item_i]:px-2 [&>.list-item_i]:opacity-50 [&>.list-item.active_i]:!opacity-100 [&>.list-item:hover_i]:!opacity-100 [&>.list-item_i]:rounded-md [&>.list-item_i]:mr-2 [&>.list-item]:opacity-75 [&>.list-item.active]:!opacity-100 [&>.list-item:hover]:!opacity-100"
    >
      <!-- assistant -->
      <li
        class="list-item"
        data-modal="modalAssistant"
        disabled
      >
        <i class="btn btn-white !bg-[#10A37F] !border-[#10A37F] !px-[7px]">
          <AtomIconChatGPT class="inline w-4 scale-110 -translate-y-[1px]" />
        </i>
        Assistant

        <span class="badge badge-white">In Progress</span>
      </li>
      <!-- TODO -->
      <!-- develop the pages below -->
      <NuxtLink
        to="/docs/examples"
        disabled
        :class="{ active: isPageActive(getLinkTreated('examples')) }"
        class="list-item"
      >
        <i
          class="bi-grid-1x2-fill btn btn-white [.active_&]:!border-sky-500 [.active_&]:!bg-sky-500 [.active_&]:!text-white"
        ></i>
        Examples

        <span class="badge badge-white">In Progress</span>
      </NuxtLink>

      <!-- templates -->
      <NuxtLink
        to="/docs/templates"
        disabled
        :class="{ active: isPageActive(getLinkTreated('templates')) }"
        class="list-item"
      >
        <i
          class="bi-box-fill btn btn-white [.active_&]:!border-pink-500 [.active_&]:!bg-pink-500 [.active_&]:!text-white"
        ></i>
        Templates

        <span class="badge badge-white">In Progress</span>
      </NuxtLink>

      <!-- resources -->
      <NuxtLink
        to="/docs/resources"
        disabled
        :class="{ active: isPageActive(getLinkTreated('resources')) }"
        class="list-item"
      >
        <i
          class="bi-stack btn btn-white [.active_&]:!border-violet-500 [.active_&]:!bg-violet-500 [.active_&]:!text-white"
        ></i>
        Resources

        <span class="badge badge-white">In Progress</span>
      </NuxtLink>

      <!-- figma -->
      <li class="list-item">
        <a
          href="https://www.figma.com/file/szD991W25tQxPuqhfRektk/PerfectUI?type=design&t=NFXUM1OyFfIo9Csc-6"
          target="_blank"
        >
          <i
            class="btn btn-white [.active_&]:!border-white [.active_&]:!bg-white [.active_&]:!text-white !px-[7px]"
          >
            <AtomIconFigma class="inline" />
          </i>
          Figma
        </a>
      </li>
    </ul>

    <!-- links -->
    <ul class="menu-list list list-hoverable unmarker">
      <template
        v-for="(links, i) in docs"
        :key="i"
      >
        <p class="font-medium mb-5 mt-5 first:!mt-0">
          {{ i }}
        </p>
        <NuxtLink
          v-for="(link, j) in links"
          :key="j"
          :to="getDocPath(normalizeLink(getLinkTreated(link)))"
          :class="{ active: isPageActive(getLinkTreated(link)) }"
          class="list-item !bg-transparent text-secondary"
        >
          {{ getLinkTreated(link) }}
          <span
            v-if="isNewPage(link)"
            class="badge badge-solid-primary"
          >
            New
          </span>
        </NuxtLink>
      </template>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { type ISectionMap, type ISections, NAV_SECTIONS } from "@/shared";

// computed
const getLinkTreated = computed<Function>(() => (link: string) => {
  return link.replaceAll("$N", "");
});
const isNewPage = computed<Function>(() => (link: string) => {
  return /\$N/.test(link);
});
const isPageActive = computed<Function>(() => (link: string) => {
  const have = route.path;
  const expected = getDocPath(normalizeLink(link));
  return have === expected;
});
const getCurrentSection = computed<ISectionMap>(() => {
  const parts = route.path.split("/docs/");

  if (parts.length < 2) {
    return {
      sectionName: "Getting Started",
      articleIndex: 0,
    };
  }

  const articleName = normalizeArticleName(parts[1]);
  for (const [sectionName, articles] of Object.entries(docs.value)) {
    const articleIndex = articles.findIndex((article) =>
      new RegExp(articleName, "i").test(article)
    );

    if (articleIndex === -1) continue;

    return {
      sectionName,
      articleIndex,
    };
  }

  return {
    sectionName: "Getting Started",
    articleIndex: 0,
  };
});
const getNextPage = computed<string | undefined>(() => {
  const { sectionName, articleIndex } = getCurrentSection.value;
  const section = docs.value[sectionName];

  const isLastArticleBySection = articleIndex === section.length - 1;

  if (isLastArticleBySection) {
    const keys = Object.keys(docs.value);
    const nextSectionName = keys.at(keys.indexOf(sectionName) + 1);

    if (!nextSectionName) return;

    return getLinkTreated.value(docs.value[nextSectionName][0]);
  }

  return getLinkTreated.value(section[articleIndex + 1]);
});
const getPrevPage = computed<string | undefined>(() => {
  const { sectionName, articleIndex } = getCurrentSection.value;
  const section = docs.value[sectionName];

  const isFirstArticleBySection = articleIndex === 0;

  if (isFirstArticleBySection) {
    const keys = Object.keys(docs.value);
    const sectionIndex = keys.indexOf(sectionName);

    if (!sectionIndex) return;

    const prevSectionName = keys.at(sectionIndex - 1);

    if (!prevSectionName) return;

    const prevSection = docs.value[prevSectionName];

    return getLinkTreated.value(prevSection[prevSection.length - 1]);
  }

  return getLinkTreated.value(section[articleIndex - 1]);
});

// data
const docs = ref<ISections>(NAV_SECTIONS);
const route = useRoute();

// methods
function normalizeLink(label: string): string {
  return label.toLowerCase().trimEnd().replaceAll(" ", "-");
}
function normalizeArticleName(link: string): string {
  const parts = link.split("-");

  for (const i in parts) {
    const part = parts[i];
    parts[i] = part.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  }

  return parts.join(" ");
}
function getDocPath(link: string): string {
  return `/docs/${link}`;
}

// expose
defineExpose({
  getNextPage,
  getPrevPage,
  getCurrentSection,
  docs,
  normalizeLink,
  getDocPath,
  getLinkTreated,
});
</script>

<style scoped>
.menu-list .list-item {
  border-left: 2px solid rgba(var(--borderSecondary), 0.3);
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  margin-left: -2px;
}

.menu-list .list-item:hover {
  border-color: rgb(var(--borderSecondary));
}

.menu-list .active {
  color: rgb(var(--theme500));
  border-color: rgb(var(--theme500)) !important;
}
</style>
