<template>
  <section class="w-full rounded group group-col">
    <!-- tabs -->
    <nav
      class="overflow-auto group-item flex gap-2 border border-solid border-secondary p-2"
    >
      <span
        v-for="tab in tabs"
        :key="tab"
        class="btn style-white !border-none !px-3 !py-2"
        :class="{ 'bg-secondary': tab === activeTab }"
        @click="changeTab(tab)"
      >
        <slot :name="`h${tab}`" />
      </span>

      <!-- default -->
      <span
        v-if="!tabs"
        class="btn style-white !bg-transparent !cursor-default !border-none !px-3 !py-2"
      >
        <slot name="header" />
      </span>
    </nav>

    <!-- contents -->
    <div class="group-item border border-solid border-secondary bg-secondary">
      <article
        v-for="tab in tabs"
        v-show="tab === activeTab"
        :key="tab"
      >
        <slot :name="tab" />
      </article>

      <!-- default -->
      <article v-if="!tabs">
        <slot />
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
// props
interface IProps {
  tabs?: string[];
}
const props = defineProps<IProps>();

// data
const activeTab = ref<string>(props.tabs ? props.tabs[0] : "default");

// methods
function changeTab(tab: string): void {
  activeTab.value = tab;
}
</script>

<style scoped></style>
