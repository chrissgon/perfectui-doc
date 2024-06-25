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
          <AtomFigmaLink class="max-sm:hidden" />
        </aside>
      </header>

      <!-- banner -->
      <main
        class="text-center flex flex-col justify-center items-center gap-10"
      >
        <p class="badge badge-black !text-white !bg-[#10A37F] !py-1 !px-2 -mb-5 font-semibold">
          <AtomIconChatGPT class="inline w-4 scale-110 -translate-y-[1px] mr-1" />
          Now with Chat GPT
        </p>
        <h1 class="text-5xl max-sm:!text-4xl font-bold max-w-2xl">
          An modern framework for crafting elegant interfaces
        </h1>
        <p class="text-base max-w-2xl">
          Perfect UI's goal is to provide the bare minimum for creating
          applications, with the aim of being lightweight and customizable.
        </p>

        <div class="flex flex-wrap justify-center gap-5">
          <NuxtLink
            to="/docs/installation"
            class="btn btn-solid-primary flex-1"
          >
            Get Started
          </NuxtLink>
          <NuxtLink to="/docs/installation?assistant=true" class="btn btn-white !text-[#10A37F] !border-[#10A37F]">
            <AtomIconChatGPT class="inline w-4 scale-110 [&_path]:!fill-[#10A37F] -translate-y-[1px] mr-1" />
              Learn with Assistant
          </NuxtLink>
        </div>
      </main>
    </section>

    <section class="w-full flex justify-center">
      <!-- why -->
      <div
        id="why"
        class="flex md:justify-center md:items-center max-w-[1300px] flex-wrap gap-5"
      >
        <a href="#darkmode">
          <MoleculeListItem>
            <template #icon>
              <i class="bi-moon-stars-fill text-base text-theme" />
            </template>
            <template #title> Dark Mode & Theme Helpers </template>
            <template #description>
              Perfect UI offers all components with dark mode and helpers for
              setting theme and colors.
            </template>
          </MoleculeListItem>
        </a>

        <a href="#responsive">
          <MoleculeListItem>
            <template #icon>
              <i class="bi-aspect-ratio-fill text-base text-theme" />
            </template>
            <template #title> Fully Responsive Components </template>
            <template #description>
              All components are responsive, providing a better user experience.
            </template>
          </MoleculeListItem>
        </a>

        <a href="#faster">
          <MoleculeListItem>
            <template #icon>
              <i class="bi-lightning-fill text-base text-theme" />
            </template>
            <template #title> Lightweight & Customizable </template>
            <template #description>
              Perfect UI was designed with the aim of providing a minimal and
              customizable basis for developing interfaces.
            </template>
          </MoleculeListItem>
        </a>

        <NuxtLink to="/docs/tailwind-css">
          <MoleculeListItem>
            <template #icon>
              <i class="bi-heart-fill text-base text-theme" />
            </template>
            <template #title>
              Inspired by Tailwind CSS
            </template>
            <template #description>
              Perfect UI is a framework inspired by Tailwind CSS, combine both
              to strengthen your application.
            </template>
          </MoleculeListItem>
        </NuxtLink>
      </div>
    </section>

    <div class="flex flex-col items-center">
      <!-- darkmode -->
      <OrganismReasonItem
        id="darkmode"
        class="max-w-[1300px]"
      >
        <template #icon>
          <i class="bi-moon-stars-fill text-base text-theme"></i>
        </template>
        <template #subtitle>
          Native Dark Mode
        </template>
        <template #title>
          Do you like dark mode? Use it
        </template>

        <p class="text-base">
          Perfect UI provides native darkmode for all components, and helpers
          such as <code class="text-theme text-base">setMode</code> to define a
          preferred mode.
        </p>

        <NuxtLink
          to="/docs/dark-mode"
          class="btn btn-white w-fit mt-2"
        >
          Learn more <i class="bi-chevron-right"></i>
        </NuxtLink>

        <template #widget>
          <MoleculeWidgetMode class="w-full" />
        </template>
      </OrganismReasonItem>

      <!-- theme -->
      <OrganismReasonItem
        id="theme"
        class="max-w-[1300px]"
      >
        <template #icon>
          <i class="bi-palette-fill text-base text-theme"></i>
        </template>
        <template #subtitle>
          Theme Color
        </template>
        <template #title>
          Define your color palette
        </template>

        <p class="text-base">
          To better match your platform, you can easily define a color palette
          to use across all components.
        </p>

        <NuxtLink
          to="/docs/theme-color"
          class="btn btn-white w-fit mt-2"
        >
          Learn more <i class="bi-chevron-right"></i>
        </NuxtLink>

        <template #widget>
          <div class="sm:min-w-[500px] flex justify-center">
            <MoleculeWidgetCalendar class="w-fit" />
          </div>
        </template>
      </OrganismReasonItem>

      <!-- responsive -->
      <OrganismReasonItem
        id="responsive"
        class="max-w-[1300px] flex-col"
      >
        <template #icon>
          <i class="bi-aspect-ratio-fill text-base text-theme"></i>
        </template>
        <template #subtitle>
          Fully Responsive
        </template>
        <template #title>
          Everything's responsive
        </template>

        <p class="text-base">
          Don't worry about responsiveness anymore, every component is designed
          to be responsive, ensuring a better user experience.
        </p>

        <template #widget>
          <MoleculeResizableElement class="w-full">
            <MoleculeWidgetResponsive class="p-1" />
          </MoleculeResizableElement>
        </template>
      </OrganismReasonItem>

      <!-- faster -->
      <OrganismReasonItem
        id="faster"
        class="max-w-[1300px]"
      >
        <template #icon>
          <i class="bi-lightning-fill text-base text-theme"></i>
        </template>
        <template #subtitle>
          The faster
        </template>
        <template #title>
          Lightweight & Customizable
        </template>

        <p class="text-base">
          The goal of Perfect UI is to provide the essentials, enabling
          customization and speed with under
          <b class="text-base font-bold text-theme">30kb</b>.
        </p>

        <template #widget>
          <div class="sm:min-w-[500px] flex justify-center w-full">
            <MoleculeWidgetBuild class="max-w-[500px]" />
          </div>
        </template>
      </OrganismReasonItem>
    </div>

    <!-- download -->
    <div
      class="flex flex-col gap-2 items-center py-10 px-5 bg-secondary rounded-md bg-guideline bg-guideline-download !relative"
    >
      <h1 class="text-3xl text-center font-semibold">
        Download <span class="text-theme text-3xl">Perfect UI</span>
      </h1>
      <p class="text-secondary text-center">
        Our code is available for you to download, inspect, and modify:
      </p>

      <div class="flex flex-wrap justify-center gap-5 mt-6">
        <NuxtLink
          to="/docs/installation"
          class="btn btn-solid-primary flex-1 text-center"
        >
          Get Started
        </NuxtLink>
        <button
          class="btn btn-white firacode flex items-center gap-3"
          @click="copyInstallCode"
        >
          npm i @chrissgon/perfectui
          <hr class="vertical" />
          <i
            v-if="!copied"
            class="bi-copy"
          ></i>
          <i
            v-if="copied"
            class="bi-check-circle-fill text-success"
          ></i>
        </button>
      </div>
    </div>

    <!-- TODO -->
    <!-- Create a bot to hire us using lowbot -->
    <!-- <button class="btn btn-solid-primary fixed bottom-10 right-10 !px-4 !py-3.5 rounded-full">
      <i class="bi-chat-fill text-3xl"></i>
    </button> -->

    <OrganismFooter />
  </div>
</template>

<script setup lang="ts">
// data
const copied = ref<boolean>(false);

// methods
function copyInstallCode(): void {
  navigator.clipboard.writeText("npm i @chrissgon/perfectui");
  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 1000);
}
</script>

<style></style>
