<template>
  <!-- One column below 1024 px, sidebar and content from 1024, headings column from 1280
       (approved design; the export's breakpoints and measures). -->
  <div
    class="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)] px-4 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[272px_minmax(0,1fr)_208px] xl:gap-12"
  >
    <div class="docs-sidebar lg:sticky lg:top-[65px] lg:h-[calc(100vh-65px)] lg:self-start lg:overflow-y-auto lg:border-r lg:pt-7 lg:pr-4 lg:pb-10" style="border-color: var(--pui-border)">
      <slot name="sidebar" />
    </div>
    <!-- The content fills its column; the 72ch reading width applies once the headings column
         sits beside it (user review 2026-09-25). -->
    <!-- The page's main landmark (the landing has its own): screen readers jump here. -->
    <main class="min-w-0 pt-7 pb-16 sm:pt-12 xl:max-w-[72ch]">
      <slot />
    </main>
    <div class="hidden xl:sticky xl:top-[65px] xl:block xl:self-start xl:pt-12">
      <slot name="toc" />
    </div>
  </div>
</template>

<style scoped>
.docs-sidebar {
  scrollbar-width: thin;
}
</style>
