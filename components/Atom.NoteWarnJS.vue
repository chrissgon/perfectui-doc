<template>
  <AtomNoteWarn titled>
    <template #title>
      Requires JS
    </template>

    Note that this component requires use our javascript file to works, else you
    can skip this message if you are already using Perfect UI as a package.

    <NuxtLink
      class="block w-fit"
      to="/docs/installation"
    >
      <button class="btn style-white mt-4">
        Learn more <i class="bi-chevron-right"></i>
      </button>
    </NuxtLink>
  </AtomNoteWarn>
</template>

<script setup lang="ts"></script>

<style scoped></style>
