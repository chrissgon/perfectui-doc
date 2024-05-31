<template>
  <!-- home -->
  <div class="p-5 sm:p-10 !pb-0 flex flex-col gap-10">
    <section
      class="p-10 max-sm:p-5 pt-5 border rounded-2xl border-secondary pb-20"
    >
      <!-- header -->
      <header class="flex justify-between mb-10 max-sm:-mx-5">
        <AtomLogoVersion />

        <aside class="flex items-center gap-5">
          <AtomThemeColorPicker />
          <AtomDarkMode />
          <AtomGithubLink />
          <AtomFigmaLink />
        </aside>
      </header>

      <!-- banner -->
      <main
        class="text-center flex flex-col justify-center items-center gap-10"
      >
        <h1 class="text-5xl max-sm:!text-4xl font-bold max-w-2xl">
          An modern framework for crafting elegant interfaces
        </h1>
        <p class="text-base max-w-2xl">
          Perfect UI's goal is to provide the bare minimum for creating
          applications, with the aim of being lightweight and customizable.
        </p>

        <div class="flex flex-wrap gap-5">
          <NuxtLink
            to="/docs/installation"
            class="btn btn-solid-primary flex-1"
          >
            Get Started
            <i class="bi bi-rocket-takeoff-fill text-base leading-none" />
          </NuxtLink>
          <a
            href="#why"
            class="btn btn-white !border-none flex-1"
          >Why Perfect UI?</a>
        </div>
      </main>
    </section>

    <!-- why -->
    <section
      id="why"
      class="flex md:justify-center md:items-center max-md:flex-wrap gap-5"
    >
      <MoleculeListItem href="#darkmode">
        <template #icon>
          <i class="bi-moon-stars text-md text-theme" />
        </template>
        <template #title>
          Dark Mode & Theme Helpers
        </template>
        <template #description>
          Perfect UI offers all components with dark mode and helpers for
          setting theme and colors.
        </template>
      </MoleculeListItem>

      <MoleculeListItem>
        <template #icon>
          <i class="bi-bounding-box text-md text-theme" />
        </template>
        <template #title>
          Fully Responsive Components
        </template>
        <template #description>
          All components are responsive, providing a better user experience.
        </template>
      </MoleculeListItem>

      <MoleculeListItem>
        <template #icon>
          <i class="bi-lightning text-lg text-theme" />
        </template>
        <template #title>
          Lightweight & Customizable
        </template>
        <template #description>
          Perfect UI was designed with the aim of providing a minimal and
          customizable basis for developing interfaces.
        </template>
      </MoleculeListItem>
    </section>

    <!-- darkmode -->
    <OrganismReasonItem id="darkmode">
      <template #icon>
        <i class="bi-moon-stars text-md text-theme"></i>
      </template>
      <template #subtitle>
        Native Dark Mode
      </template>
      <template #title>
        Do you like dark mode? Use it
      </template>

      <p class="text-base">
        PerfectUI provides native darkmode for all components, and helpers such
        as <code class="text-theme text-base">setMode</code> to define a preferred
        mode
      </p>

      <NuxtLink
        to="/docs/dark-mode"
        class="btn btn-white w-fit mt-2"
      >
        Learn more <i class="bi-chevron-right"></i>
      </NuxtLink>

      <template #widget>
        <MoleculeWidgetMode />
      </template>
    </OrganismReasonItem>

    <!-- theme -->
    <OrganismReasonItem id="theme">
      <template #icon>
        <i class="bi-palette text-md text-theme"></i>
      </template>
      <template #subtitle>
        Theme Color
      </template>
      <template #title>
        Define your color palette
      </template>

      <p class="text-base">
        To better match your platform, you can easily define a color palette to use across all components
      </p>

      <NuxtLink
        to="/docs/theme-color"
        class="btn btn-white w-fit mt-2"
      >
        Learn more <i class="bi-chevron-right"></i>
      </NuxtLink>

      <template #widget>
        <MoleculeWidgetCalendar />
      </template>
    </OrganismReasonItem>
    <AtomFooter />
  </div>

  <!-- <section class="-mx-10 flex max-lg:flex-col flex-wrap">
        <header
          class="flex h-fit px-5 items-center gap-2 lg:hidden w-full border-secondary border-b border-t border-solid py-4 sticky top-0 bg-primary"
        >
          <i class="bi-list text-xl leading-none"></i>
          Guides > Getting Started
        </header>
  
        <nav
          class="max-lg:hidden w-72 border-r border-solid border-secondary overflow-auto sticky h-screen top-0"
          >
          <h4 class="text-4xl">Guides</h4>
        </nav>
  
        <article class="flex-1 overflow-auto p-5">
          <NuxtPage />
        </article>
      </section> -->
</template>

<script setup lang="ts"></script>

<style></style>
