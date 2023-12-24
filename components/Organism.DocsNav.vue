<template>
  <nav>
    <!-- search -->
    <label class="field-group">
      <div class="input input-group">
        <i class="bi-search"></i>
        <input type="text" class="input" />
        <span>Ctrl K</span>
      </div>
    </label>

    <!-- links -->
    <ul class="list list-hoverable">
      <template v-for="(links, i) in docs" :key="i">
        <li class="text-secondary mt-5">{{ i }}</li>
        <NuxtLink
          v-for="(link, j) in links"
          :key="j"
          :to="getDocPath(normalizeLink(link))"
          :class="{ active: isPageActive(link) }"
          class="list-item"
        >
          {{ link }}
        </NuxtLink>
      </template>
    </ul>
  </nav>
</template>

<script setup lang="ts">
// interfaces
interface Sections {
  [i: string]: string[];
}
interface SectionMap {
  sectionName: string;
  articleIndex: number;
}

// computed
const isPageActive = computed<Function>(() => (link: string) => {
  const have = useRoute().path;
  const expected = getDocPath(normalizeLink(link));
  return have === expected;
});
const getCurrentSection = computed<SectionMap>(() => {
  const articleName = normalizeArticleName(useRoute().path.split("/docs/")[1]);

  for (const [sectionName, articles] of Object.entries(docs.value)) {
    const articleIndex = articles.indexOf(articleName);

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

    return docs.value[nextSectionName][0];
  }

  return section[articleIndex + 1];
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

    return prevSection[prevSection.length - 1];
  }

  return section[articleIndex - 1];
});

// data
const docs = ref<Sections>({
  "Getting Started": ["Installation", "License"],
  Customization: ["Dark Mode", "Theme"],
});

// methods
function normalizeLink(label: string): string {
  return label.toLowerCase().replaceAll(" ", "-");
}
function normalizeArticleName(link: string): string {
  const parts = link.split("-");

  for (const i in parts) {
    const part = parts[i];
    parts[i] = part.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return parts.join(" ");
}
function getDocPath(link: string): string {
  return `/docs/${link}`;
}

// expose
defineExpose({ getNextPage, getPrevPage, getCurrentSection, docs, normalizeLink, getDocPath });
</script>

<style scoped>
.active {
  color: rgb(var(--theme500));
}
</style>
