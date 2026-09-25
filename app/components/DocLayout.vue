<template>
  <!-- One column below 1024 px, sidebar and content from 1024, headings column from 1280
       (approved design; the export's breakpoints). -->
  <div
    class="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)] gap-8 p-4 sm:p-8 lg:grid-cols-[272px_minmax(0,1fr)] xl:grid-cols-[272px_minmax(0,1fr)_208px]"
  >
    <div class="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto">
      <slot name="sidebar" />
    </div>
    <div class="min-w-0 max-w-[72ch]">
      <slot />
    </div>
    <div class="hidden xl:sticky xl:top-24 xl:block xl:self-start">
      <slot name="toc" />
    </div>
  </div>
</template>
